import type { FC } from "react";
import { Form, Input, Modal, type FormProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { stateResetPasswordCompanyOwner, close } from "../model/slice";
import type { IResetPasswordFields } from "../model/types";
import { useResetPasswordCompanyOwner } from "../model/mutations";

const ResetPasswordCompanyOwnerModal: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm<IResetPasswordFields>();
  const { isOpen, companyOwnerId } = useSelector(stateResetPasswordCompanyOwner);
  const { mutateAsync, isPending } = useResetPasswordCompanyOwner();

  const handleClose = () => {
    dispatch(close());
    form.resetFields();
  }

  const handleOk = () => {
    form.submit();
  }

  const handleSubmit: FormProps<IResetPasswordFields>['onFinish'] = (values) => {
    if (!companyOwnerId) return;

    mutateAsync({
      ...values,
      companyOwnerId
    }, {
      onSuccess: handleClose
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
      title={t("resetPassword.title")}
      open={isOpen}
      okText={t("common.save")}
      cancelText={t("common.cancel")}
      onOk={handleOk}
      onCancel={handleClose}
      confirmLoading={isPending}
      zIndex={3000}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        classNames={{
          label: "modal__label",
          help: "modal__help"
        }}
      >
        <Form.Item<IResetPasswordFields>
          className="modal__item"
          layout="vertical"
          label={t("resetPassword.newPassword")}
          name="newPassword"
          rules={[
            {
              required: true,
              message: t("resetPassword.newPasswordRequired")
            },
            {
              min: 8,
              message: t("resetPassword.newPasswordMin"),
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
          label={t("resetPassword.confirmNewPassword")}
          name="confirmNewPassword"
          rules={[
            {
              required: true,
              message: t("resetPassword.confirmNewPasswordRequired")
            },
            {
              min: 8,
              message: t("resetPassword.newPasswordMin"),
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
