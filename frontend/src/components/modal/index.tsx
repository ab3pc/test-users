import { Button, Modal } from "antd";
import React from "react";

type Props = {
	open: boolean;
	title: string;
	setOpen: (value: boolean) => void;
	onClose?: () => void;
	renderComponent?: () => JSX.Element;
};

const AsyncModal: React.FC<Props> = ({
	open,
	setOpen,
	onClose,
	renderComponent,
	title,
}) => {
	const [confirmLoading, setConfirmLoading] = React.useState(false);

	const showModal = () => {
		setOpen(true);
	};

	const handleCancel = () => {
		setOpen(false);
		onClose?.();
	};
	return (
		<>
			<Modal
				title={title}
				open={open}
				footer={null}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				{renderComponent?.()}
			</Modal>
		</>
	);
};

export { AsyncModal };
