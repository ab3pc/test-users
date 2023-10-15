import { Space, Tag, Table as AntTable } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { FilterValue, SortOrder, SorterResult } from "antd/es/table/interface";
import React from "react";
import style from "./index.module.css";
import { SearchInput } from "../search-input";

export interface DataUserTableType {
	key: number;
	fullname: string;
	phone: string;
	email: string;
}

export interface TableParams {
	pagination?: TablePaginationConfig;
	sortField?: string;
	order?: SortOrder;
	filters?: Record<string, FilterValue>;
}

type TableProps = {
	data: DataUserTableType[];
	onEdit: (record: DataUserTableType) => void;
	onDelete: (record: DataUserTableType) => void;
	currentUserId?: number;
	loading?: boolean;
	tableParams?: TableParams;
	handleTableChange: (
		pagination: TablePaginationConfig,
		filters: Record<string, FilterValue>,
		sorter: SorterResult<DataUserTableType>,
	) => void;
};

const UsersTable: React.FC<TableProps> = ({
	data = [],
	onEdit,
	onDelete,
	currentUserId,
	tableParams,
	handleTableChange,
	loading,
}) => {
	const [filteredData, setFilteredData] = React.useState(data);
	const [searchValue, setSearchValue] = React.useState("");

	React.useEffect(() => {
		setFilteredData(data);
		onSearch(searchValue);
	}, [data]);

	const onSearch = (value: string): void => {
		const searchValue = value.toLowerCase();
		setSearchValue(searchValue);
		const usersData = data.filter((user) => {
			const userValues =
				`${user.fullname}${user.email}${user.phone}`.toLowerCase();

			return userValues.includes(searchValue);
		});
		setFilteredData(usersData);
	};

	const columns: ColumnsType<DataUserTableType> = [
		{
			title: "Full name",
			dataIndex: "fullname",
			key: "fullname",
			defaultSortOrder: tableParams?.order,
			sorter: true,
			sortDirections: ["ascend", "descend"],
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone",
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => {
				const isCurrentUser = currentUserId === record.key;

				return (
					<Space size="middle">
						<a onClick={() => onEdit(record)}>Edit</a>
						{!isCurrentUser && <a onClick={() => onDelete(record)}>Delete</a>}
					</Space>
				);
			},
		},
	];
	return (
		<>
			<div className={style.searchContainer}>
				<SearchInput onSearch={onSearch} />
			</div>
			<AntTable
				columns={columns}
				dataSource={filteredData}
				pagination={tableParams?.pagination}
				onChange={handleTableChange}
				loading={loading}
			/>
		</>
	);
};

export { UsersTable };
