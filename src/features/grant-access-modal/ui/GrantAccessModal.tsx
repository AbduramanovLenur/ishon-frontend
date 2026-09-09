import type { FC } from "react";
import { Form, Input, Modal, type FormProps } from "antd";
import { useDispatch, useSelector } from "react-redux";

import type { IGrantAccessFields } from "../model/types";
import { close, stateGrantAccessEmployee } from "../model/slice";
import { useGrantAccess } from "../model/mutations";

const GrantAccessModal: FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm<IGrantAccessFields>();
  const { isOpen, employeeId } = useSelector(stateGrantAccessEmployee);
  const { mutateAsync, isPending } = useGrantAccess();

  const closeManageModalHandle = () => {
    dispatch(close());
    form.resetFields();
  }

  const onOkHandle = () => {
    form.submit();
  }

  const onSubmitHandle: FormProps<IGrantAccessFields>['onFinish'] = (values) => {
    if (!employeeId) return;

    mutateAsync({
      ...values,
      employeeId,
    }, {
      onSuccess: () => {
        closeManageModalHandle();
      }
    });
  }

  return (
    <Modal
      centered
      classNames={{
        close: 'centered',
        container: 'modal__container',
        header: 'modal__header',
        title: 'modal__title',
        body: 'modal__body'
      }}
      title="Kirish huquqlarini berish"
      open={isOpen}
      okText="Saqlash"
      cancelText="Yopish"
      onOk={onOkHandle}
      onCancel={closeManageModalHandle}
      confirmLoading={isPending}
      style={{ zIndex: 1000 }}
    >
      <Form
        form={form}
        onFinish={onSubmitHandle}
        classNames={{
          label: "modal__label",
          help: "modal__help"
        }}
      >
        <Form.Item<IGrantAccessFields>
          className="modal__item"
          layout="vertical"
          label="Login" 
          name="username"
          rules={[{ 
            required: true,
            message: 'Loginni kiriting'
          }]}
        >
          <Input 
            className="modal__input"
          />
        </Form.Item>
        <Form.Item<IGrantAccessFields>
          className="modal__item"
          layout="vertical"
          label="Parol"
          name="password"
          rules={[
            { 
              required: true,
              message: 'Parolni kiriting'
            },
            {
              min: 8,
              message: "Parol kamida 8 ta belgidan iborat bo‘lishi kerak",
            }
          ]}
        >
          <Input.Password 
            className="modal__input"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default GrantAccessModal;