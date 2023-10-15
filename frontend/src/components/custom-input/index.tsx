import { Form, Input } from "antd";
import { Rule } from "antd/es/form";

type Props = {
	name: string;
	placeholder: string;
	type?: string;
	required?: boolean;
	value?: string;
};

export const CustomInput = ({
	type = "text",
	name,
	placeholder,
	required = true,
	value,
}: Props) => {
	const isEmailType = type === "email";

	const rules = [
		isEmailType && {
			type: "email",
			message: "The input is not valid E-mail!",
		},
		{ required, message: `Please input ${placeholder}` },
	].filter(Boolean) as Rule[];

	return (
		<Form.Item
			name={name}
			rules={rules}
			initialValue={value}
			//   shouldUpdate={true}
		>
			<Input placeholder={placeholder} type={type} size="large" />
		</Form.Item>
	);
};
