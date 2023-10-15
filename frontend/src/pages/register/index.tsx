import { Card, Form, Row, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { AppRoute } from "../../common/enums/enums";
import { CustomButton } from "../../components/custom-button";
import { CustomInput } from "../../components/custom-input";
import { Layout } from "../../components/layout";
import { PasswordInput } from "../../components/password-input";
import { UserSignUpRequestDto } from "../../common/enums/users/users";
import style from "./index.module.css";

type Props = {
	onSubmit: (payload: UserSignUpRequestDto) => void;
};

export const Register: React.FC<Props> = ({ onSubmit }) => {
	return (
		<Layout>
			<Row className={style.formConatiner} align="middle" justify="center">
				<Card title="Create an account" style={{ width: "30rem" }}>
					<Form onFinish={onSubmit}>
						<CustomInput type="text" name="fullname" placeholder="Full name" />
						<CustomInput type="email" name="email" placeholder="Email" />
						<CustomInput
							type="number"
							name="phone"
							placeholder="Phone"
							required={false}
						/>
						<PasswordInput name="password" placeholder="Password" />
						<PasswordInput
							name="confirmPassword"
							placeholder="Confirm password"
						/>
						<CustomButton type="primary" htmlType="submit">
							Create
						</CustomButton>
					</Form>
					<Space direction="vertical" size="large">
						<Typography.Text>
							Already have an account?{" "}
							<Link to={AppRoute.SIGN_IN}>Login here</Link>
						</Typography.Text>
					</Space>
				</Card>
			</Row>
		</Layout>
	);
};
