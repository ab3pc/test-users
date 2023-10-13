import React from "react"
import { Form, Button } from "antd"
import { SizeType } from "antd/es/config-provider/SizeContext"

type Props = {
  children: React.ReactNode
  htmlType?: "button" | "submit" | "reset"
  size?: SizeType
  onClick?: () => void
  type?: "primary" | "link" | "text" | "default" | "dashed" | "ghost"
  danger?: boolean
  loading?: boolean
  shape?: "circle" | "default" | "round"
  icon?: React.ReactNode
}

export const CustomButton = ({
  children,
  type = "default",
  danger,
  loading,
  htmlType = "button",
  onClick,
  shape,
  icon,
  size = "large",
}: Props) => {
  return (
    <Form.Item>
      <Button
        type={type}
        htmlType={htmlType}
        danger={danger}
        loading={loading}
        size={size}
        shape={shape}
        onClick={onClick}
        icon={icon}
      >
        {children}
      </Button>
    </Form.Item>
  )
}
