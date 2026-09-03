import { Form, Input, Modal, type FormProps } from "antd";
import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { stateResetPasswordCompanyOwner, close } from "../model/slice";
import type { IResetPasswordFields } from "../model/types";
import { useResetPasswordCompanyOwner } from "../model/mutations";

const ResetPasswordCompanyOwnerModal: FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm<IResetPasswordFields>();
  const { isOpen, companyOwnerId } = useSelector(stateResetPasswordCompanyOwner);
  const { mutateAsync, isPending } = useResetPasswordCompanyOwner();

  const closeManageModalHandle = () => {
    dispatch(close());
    form.resetFields();
  }

  const onOkHandle = () => {
    form.submit();
  }

  const onSubmitHandle: FormProps<IResetPasswordFields>['onFinish'] = (values) => {
    if (!companyOwnerId) return;

    mutateAsync({
      ...values,
      companyOwnerId
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
      title={"Parolni yangilash"}
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
        <Form.Item<IResetPasswordFields>
          className="modal__item"
          layout="vertical"
          label="Yangi parol"
          name="newPassword"
          rules={[
            { 
              required: true,
              message: 'Yangi parolni kiriting'
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
        <Form.Item<IResetPasswordFields>
          className="modal__item"
          layout="vertical"
          label="Yangi parolni tasdiqlash"
          name="confirmNewPassword"
          rules={[
            { 
              required: true,
              message: 'Yangi parolni tasdiqlang'
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

export default ResetPasswordCompanyOwnerModal;