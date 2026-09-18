import type { FC } from "react";
import { Form, Input, Modal, type FormProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import type { IGrantAccessFields } from "../model/types";
import { close, stateGrantAccessEmployee } from "../model/slice";
import { useGrantAccess } from "../model/mutations";

const GrantAccessModal: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm<IGrantAccessFields>();
  const { isOpen, employeeId } = useSelector(stateGrantAccessEmployee);
  const { mutateAsync, isPending } = useGrantAccess();

  const handleClose = () => {
    dispatch(close());
    form.resetFields();
  }

  const handleOk = () => {
    form.submit();
  }

  const handleSubmit: FormProps<IGrantAccessFields>['onFinish'] = (values) => {
    if (!employeeId) return;

    mutateAsync({
      ...values,
      employeeId,
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
      title={t("employees.grantAccessTitle")}
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
        <Form.Item<IGrantAccessFields>
          className="modal__item"
          layout="vertical"
          label={t("employees.login")}
          name="username"
          rules={[{
            required: true,
            message: t("employees.loginRequired")
          }]}
        >
          <Input
            className="modal__input"
          />
        </Form.Item>
        <Form.Item<IGrantAccessFields>
          className="modal__item"
          layout="vertical"
          label={t("employees.password")}
          name="password"
          rules={[
            {
              required: true,
              message: t("employees.passwordRequired")
            },
            {
              min: 8,
              message: t("employees.passwordMinLength"),
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
