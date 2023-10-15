import { Spin } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

type Props = {
	size: "small" | "default" | "large";
};

const Spinner: React.FC<Props> = ({ size = "default" }) => {
	const icon = <LoadingOutlined style={{ fontSize: 40 }} spin />;
	return <Spin size={size} indicator={icon} />;
};

export { Spinner };
