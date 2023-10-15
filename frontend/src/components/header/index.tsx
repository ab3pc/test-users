import {
	LoginOutlined,
	LogoutOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Layout, Space, Typography } from "antd";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
//import { logout, selectUser } from "../../features/auth/authSlice";
//import { CustomButton } from "../custom-button";
import { AppRoute, StorageKey } from "../../common/enums/enums";
import { CustomButton } from "../custom-button";
import style from "./index.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { authActions } from "../../store/actions";

export const Header: React.FC = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();

	const onLogoutClick = (): void => {
		dispatch(authActions.logout());
		navigate(AppRoute.SIGN_IN);
	};

	return (
		<Layout.Header className={style.header}>
			<Space>
				<TeamOutlined className={style.teamIcon} />
				<Link to={AppRoute.USERS}>
					<CustomButton type="ghost">
						<Typography.Title level={1}>Users</Typography.Title>
					</CustomButton>
				</Link>
			</Space>
			{user ? (
				<CustomButton
					type="ghost"
					icon={<LogoutOutlined />}
					onClick={onLogoutClick}
				>
					Logout
				</CustomButton>
			) : (
				<Space>
					<Link to={AppRoute.SIGN_UP}>
						<CustomButton type="ghost" icon={<UserOutlined />}>
							Register
						</CustomButton>
					</Link>
					<Link to={AppRoute.SIGN_IN}>
						<CustomButton type="ghost" icon={<LoginOutlined />}>
							Login
						</CustomButton>
					</Link>
				</Space>
			)}
		</Layout.Header>
	);
};
