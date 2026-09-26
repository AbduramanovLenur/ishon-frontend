import { type FC } from "react";
import { Button, Form, Input, type FormProps } from "antd";
import { useTranslation } from "react-i18next";

import type { IAuthFields } from "../model/types";
import { useLogin } from "../model/mutations";

import styles from "./AuthForm.module.scss";

const AuthForm: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<IAuthFields>(); 
  const { mutateAsync, isPending } = useLogin();

  const handleSubmit: FormProps<IAuthFields>['onFinish'] = (values) => {
    mutateAsync(values);
  }

  return (
    <>
      <Form
        className={styles['auth-form__form']}
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item<IAuthFields>
          className={styles['auth-form__item']}
          label={t("auth.login")}
          name="username"
          rules={[
            {
              required: true,
              message: t("auth.loginRequired"),
            },
          ]}
        >
          <Input
            className={styles['auth-form__login']}
            placeholder={t("auth.loginPlaceholder")}
          />
        </Form.Item>

        <Form.Item<IAuthFields>
          className={styles['auth-form__item']}
          label={t("auth.password")}
          name="password"
          rules={[
            {
              required: true,
              message: t("auth.passwordRequired"),
            },
          ]}
        >
          <Input.Password
            className={styles['auth-form__password']}
            placeholder={t("auth.passwordPlaceholder")}
          />
        </Form.Item>

        <Form.Item
          className={styles['auth-form__item']}
        >
          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={isPending}
          >
            {t("auth.submit")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default AuthForm;
