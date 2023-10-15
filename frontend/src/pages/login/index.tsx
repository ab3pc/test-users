import { Card, Form, Row, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { AppRoute } from "../../common/enums/enums";
import { CustomButton } from "../../components/custom-button";
import { CustomInput } from "../../components/custom-input";
import { Layout } from "../../components/layout";
import { PasswordInput } from "../../components/password-input";
import style from "./index.module.css";
import { UserSignInRequestDto } from "../../common/enums/users/users";

type Props = {
	onSubmit: (payload: UserSignInRequestDto) => void;
};

export const Login: React.FC<Props> = ({ onSubmit }) => {
	return (
		<Layout>
			<Row className={style.formConatiner} align="middle" justify="center">
				<Card title="Login" style={{ width: "30rem" }}>
					<Form onFinish={onSubmit}>
						<CustomInput type="email" name="email" placeholder="Email" />
						<PasswordInput name="password" placeholder="Password" />
						<CustomButton type="primary" htmlType="submit" loading={false}>
							Enter
						</CustomButton>
					</Form>
					<Space direction="vertical" size="large">
						<Typography.Text>
							Don't Have an account?<Link to={AppRoute.SIGN_UP}> Register</Link>
						</Typography.Text>
					</Space>
				</Card>
			</Row>
		</Layout>
	);
};
