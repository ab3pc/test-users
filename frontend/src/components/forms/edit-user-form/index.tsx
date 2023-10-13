import { Card, Form, Row } from "antd"
import React from "react"
import style from "./index.module.css"
import { CustomInput } from "../../custom-input"
import { DataUserTableType } from "../../../common/types/types"
import { CustomButton } from "../../custom-button"

type Props = {
  key?: number
  fullname?: string
  phone?: string
  email?: string
  isLoading?: boolean
  resetForm?: boolean
  onClose: () => void
  onSunbmit: (data: DataUserTableType) => void
}

const EditUserForm = (props: Props | null) => {
  const [form] = Form.useForm()

  React.useEffect(() => {
    form.resetFields()
  }, [props?.resetForm])

  return (
    <div>
      <Row className={style.formConatiner} align="middle" justify="center">
        <Card title="User information" style={{ width: "30rem" }}>
          <Form form={form} onFinish={(values) => props?.onSunbmit(values)}>
            <CustomInput
              type="text"
              name="fullname"
              placeholder="Full name"
              value={props?.fullname}
            />
            <CustomInput
              type="email"
              name="email"
              placeholder="Email"
              value={props?.email}
            />
            <CustomInput
              type="number"
              name="phone"
              placeholder="Phone"
              required={false}
              value={props?.phone}
            />
            <div className={style.buttonsContainer}>
              <CustomButton
                size="middle"
                type="ghost"
                htmlType="reset"
                onClick={props?.onClose}
              >
                Cancel
              </CustomButton>
              <CustomButton
                size="middle"
                type="primary"
                htmlType="submit"
                loading={props?.isLoading}
              >
                Update
              </CustomButton>
            </div>
          </Form>
        </Card>
      </Row>
    </div>
  )
}

export { EditUserForm }
