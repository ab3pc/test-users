import React from "react";
import { DataStatus } from "../../common/enums/enums";
import { EditUserForm } from "../../components/forms/edit-user-form";
import { Layout } from "../../components/layout";
import { AsyncModal } from "../../components/modal";
import { DataUserTableType, UsersTable } from "../../components/users-table";
import { usersActions } from "../../store/actions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ConfirmModal } from "../../components/confirm-modal";
import { TablePaginationConfig } from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { useSearchParams } from "react-router-dom";
import {
	SortTypesFetchData,
	SortTypesTable,
	UsersFilterKeys,
} from "../../common/types/types";

export const Main: React.FC = () => {
	const { users, dataStatus, auth } = useAppSelector((state) => ({
		users: state.users.users,
		dataStatus: state.users.dataStatus,
		auth: state.auth,
	}));
	const dispatch = useAppDispatch();
	const [searchParams, setSearchParams] = useSearchParams();

	const isLoading = dataStatus === DataStatus.PENDING;
	const [openEditModal, setOpenEditModal] = React.useState(false);
	const [openConfirmModal, setOpenConfirmModal] = React.useState(false);
	const [resetForm, setResetForm] = React.useState(false);
	const [selectedUser, setSelectedUser] =
		React.useState<DataUserTableType | null>(null);

	const handleTableChange = (
		pagination: TablePaginationConfig,
		filters: Record<string, FilterValue>,
		sorter: SorterResult<DataUserTableType>,
	) => {
		const order = sorter?.order || SortTypesTable.ASC;
		const sortBy = SortTypesFetchData[order];
		setSearchParams({ sort: sortBy });
	};

	const getSortValue = () => {
		const urlSortByValue = searchParams.get(UsersFilterKeys.sort);
		const hasUrlSortBy =
			urlSortByValue === SortTypesTable.NONE || !Boolean(urlSortByValue);

		return hasUrlSortBy ? SortTypesFetchData.none : (urlSortByValue as string);
	};

	const sortTypeValue = getSortValue();

	React.useEffect(() => {
		const queryData = {
			sort: sortTypeValue,
		};

		setSearchParams({ sort: sortTypeValue });
		dispatch(usersActions.getUsers(queryData));
	}, [sortTypeValue]);

	const usersData = React.useMemo(() => {
		if (!users) return [];
		return users.map(({ id, email, fullname, phone }) => ({
			email,
			fullname,
			phone,
			key: Number(id),
		}));
	}, [users]);

	const handleOnEditUser = (user: DataUserTableType) => {
		setSelectedUser(user);
		setOpenEditModal(true);
	};

	const handleOnDeleteUser = (user: DataUserTableType) => {
		setSelectedUser(user);
		setOpenConfirmModal(true);
	};

	const handleConfirmDeleteUser = async () => {
		if (!selectedUser?.key) return;
		await dispatch(usersActions.deleteUser({ id: selectedUser.key }));
		setOpenConfirmModal(false);
		setSelectedUser(null);
	};
	const handleCancelDeleteUser = () => {
		setOpenConfirmModal(false);
		setSelectedUser(null);
	};

	const handleOnCloseEditUser = () => {
		setOpenEditModal(false);
		setResetForm(!resetForm);
		setSelectedUser(null);
	};

	const handleSubmitEditUser = async (data: DataUserTableType) => {
		const newUserData = { ...data, id: selectedUser?.key as number };

		const res = await dispatch(usersActions.updateUser(newUserData));
		if (!res?.error) {
			handleOnCloseEditUser();
		}
	};

	return (
		<Layout>
			<div>
				<UsersTable
					data={usersData}
					onDelete={handleOnDeleteUser}
					onEdit={handleOnEditUser}
					currentUserId={auth.user?.id}
					tableParams={{ order: SortTypesTable[sortTypeValue] }}
					handleTableChange={handleTableChange}
					loading={isLoading}
				/>
			</div>
			<AsyncModal
				title="Edit user"
				open={openEditModal}
				setOpen={setOpenEditModal}
				onClose={handleOnCloseEditUser}
				renderComponent={() => (
					<EditUserForm
						onSunbmit={handleSubmitEditUser}
						onClose={handleOnCloseEditUser}
						isLoading={isLoading}
						resetForm={resetForm}
						{...selectedUser}
					/>
				)}
			/>
			<ConfirmModal
				content="Are you sure to delete this user?"
				open={openConfirmModal}
				onSubmit={handleConfirmDeleteUser}
				onCancel={handleCancelDeleteUser}
			/>
		</Layout>
	);
};
