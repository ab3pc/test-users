//import { User } from "@prisma/client";
import { Card, Form, Row, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AppRoute } from "../../common/enums/enums";
import { CustomButton } from "../../components/custom-button";
import { CustomInput } from "../../components/custom-input";
import { Layout } from "../../components/layout";
import { PasswordInput } from "../../components/password-input";
import style from "./index.module.css";
import { UserSignUpRequestDto } from "../../common/enums/users/users";
//import { isErrorWithMessage } from "../../utils/is-error-with-message";

//type RegisterData = Omit<User, "id"> & { confirmPassword: string };
type Props = {
  onSubmit: (payload: UserSignUpRequestDto) => void;
};

export const Register:React.FC<Props> = ({onSubmit}) => {
  //const navigate = useNavigate();
  // const user = useSelector(selectUser);
  // const [error, setError] = useState("");
  // const [registerUser] = useRegisterMutation();

  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   }
  // }, [user, navigate]);

  // const register = async (data: RegisterData) => {
  //   try {
  //     await registerUser(data).unwrap();

  //     navigate("/");
  //   } catch (err) {
  //     const maybeError = isErrorWithMessage(err);

  //     if (maybeError) {
  //       setError(err.data.message);
  //     } else {
  //       setError("Неизвестная ошибка");
  //     }
  //   }
  // };

  return (
    <Layout>
      <Row className={style.formConatiner} align="middle" justify="center">
        <Card title="Create an account" style={{ width: "30rem" }}>
          <Form onFinish={onSubmit}>
            <CustomInput type="text" name="fullname" placeholder="Full name" />
            <CustomInput type="email" name="email" placeholder="Email" />
            <CustomInput type="number" name="phone" placeholder="Phone" required={false}/>
            <PasswordInput name="password" placeholder="Password" />
            <PasswordInput name="confirmPassword" placeholder="Confirm password" />
            <CustomButton type="primary" htmlType="submit">
              Create
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
            Already have an account? <Link to={AppRoute.SIGN_IN}>Login here</Link>
            </Typography.Text>
            {/* <ErrorMessage message={error} /> */}
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};