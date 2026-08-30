import { type FC } from "react";
import { Button, Form, Input, type FormProps } from "antd";

import type { IAuthFields } from "../model/types";
import { useLogin } from "../model/mutations";

import styles from "./LoginForm.module.scss";

const LoginForm: FC = () => {
  const [form] = Form.useForm<IAuthFields>();
  const { mutateAsync, isPending, contextHolder } = useLogin();

  const onSubmitHandle: FormProps<IAuthFields>['onFinish'] = (values) => {
    mutateAsync(values);
  }

  return (
    <>
      <Form
        className={styles['login-form__form']}
        form={form}
        layout="vertical"
        onFinish={onSubmitHandle}
      >
        <Form.Item<IAuthFields>
          className={styles['login-form__item']}
          label="Login"
          name="username"
          rules={[
            {
              required: true,
              message: "Loginni kiriting",
            },
          ]}
        >
          <Input 
            className={styles['login-form__login']}
            placeholder="Loginni kiriting" 
          />
        </Form.Item>

        <Form.Item<IAuthFields>
          className={styles['login-form__item']}
          label="Parol"
          name="password"
          rules={[
            {
              required: true,
              message: "Parolni kiriting",
            },
          ]}
        >
          <Input.Password 
            className={styles['login-form__password']}
            placeholder="Parolni kiriting" 
          />
        </Form.Item>

        <Form.Item
          className={styles['login-form__item']}
        >
          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={isPending}
          >
            Kirish
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </>
  );
}

export default LoginForm;