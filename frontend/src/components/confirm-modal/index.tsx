import { Modal } from "antd";
import React from "react";

type Props = {
	content?: string;
	open: boolean;
	onSubmit: () => void;
	onCancel: () => void;
};
const ConfirmModal: React.FC<Props> = ({
	content,
	open,
	onSubmit,
	onCancel,
}) => {
	return (
		<Modal
			title="Delete"
			open={open}
			onOk={onSubmit}
			confirmLoading={false}
			onCancel={onCancel}
		>
			<p>{content}</p>
		</Modal>
	);
};

export { ConfirmModal };
