import type { FC } from "react";
import { Avatar, Divider, Flex, Form, Input, Modal, Skeleton, Typography, type FormProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import type { IResetPasswordEmployeeFields } from "../model/types";
import { close, stateResetPasswordEmployee } from "../model/slice";
import { useResetPasswordEmployee } from "../model/mutations";

import { useEmployeeLogin } from "@entities/employees";

const ResetPasswordEmployeeModal: FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm<IResetPasswordEmployeeFields>();
  const { isOpen, employeeId } = useSelector(stateResetPasswordEmployee);
  const { mutateAsync, isPending } = useResetPasswordEmployee();
  const { data, isLoading } = useEmployeeLogin(employeeId, isOpen);

  const closeManageModalHandle = () => {
    dispatch(close());
    form.resetFields();
  }

  const onOkHandle = () => {
    form.submit();
  }

  const onSubmitHandle: FormProps<IResetPasswordEmployeeFields>['onFinish'] = (values) => {
    if (!employeeId) return;

    mutateAsync({
      ...values,
      employeeId
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
      zIndex={3000}
    >
      {isLoading ? (
        <Flex align="center" gap={12} style={{ padding: '12px 0' }}>
          <Skeleton.Avatar active size={40} />
          <Skeleton.Input active size="small" style={{ width: 120, height: 22 }} />
        </Flex>
      ) : (
        <Flex
          align="center"
          gap={12}
          style={{
            padding: '12px 16px',
            borderRadius: 8,
            backgroundColor: '#f5f5f5',
          }}
        >
          <Avatar
            size={40}
            icon={<UserOutlined />}
            style={{ backgroundColor: '#1677ff' }}
          />
          <Flex vertical={true} gap={2}>
            <Typography.Text type="secondary" style={{ fontSize: 12, lineHeight: 1 }}>
              Login
            </Typography.Text>
            <Typography.Text strong style={{ fontSize: 15 }}>
              {data?.login ?? '—'}
            </Typography.Text>
          </Flex>
        </Flex>
      )}

      <Divider style={{ margin: '16px 0' }} />

      <Form
        form={form}
        onFinish={onSubmitHandle}
        classNames={{
          label: "modal__label",
          help: "modal__help"
        }}
      >
        <Form.Item<IResetPasswordEmployeeFields>
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
        <Form.Item<IResetPasswordEmployeeFields>
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

export default ResetPasswordEmployeeModal;