import type { FC } from "react";
import { Form, Input, InputNumber, Modal, Switch, type FormProps } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { close, stateManageCompany } from "../model/manageCompanySlice";
import type { IManageFields } from "../model/types";

import styles from "./ManageCompanyModal.module.scss";

const ManageCompanyModal: FC = () => {
  const { isOpen, companyId } = useSelector(stateManageCompany);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  
  const isEdit = Number.isFinite(companyId);
  const title = !isEdit ? "Kampaniya yaratish" : "Kampaniyani yangilash";

  const closeManageModalHandle = () => {
    dispatch(close());
    form.resetFields();
  }

  const onOkHandle = () => {
    form.submit();
  }

  const onSubmitHandle: FormProps<IManageFields>['onFinish'] = (values) => {
    console.log(values);
  }

  return (
    <Modal 
      classNames={{
        close: 'centered',
        container: styles['manage-company__form-container'],
        header: styles['manage-company__form-header'],
        title: styles['manage-company__form-title'],
        body: styles['manage-company__form-body']
      }}
      title={title}
      open={isOpen}
      okText="Saqlash"
      cancelText="Yopish"
      onOk={onOkHandle}
      onCancel={closeManageModalHandle}
    >
      <Form 
        form={form}
        onFinish={onSubmitHandle}
        classNames={{
          label: styles['manage-company__form-label'],
          help: styles['manage-company__form-help']
        }}
      >
        <Form.Item<IManageFields>
          className={styles['manage-company__form-item']}
          layout="vertical" 
          label="Kompaniya nomi" 
          name="company" 
          rules={[{ 
            required: true,
            message: 'Kompaniya nomini kiriting'
          }]}
        >
          <Input className={styles['manage-company__form-input']} />
        </Form.Item>
        <Form.Item<IManageFields>
          className={styles['manage-company__form-item']}
          layout="vertical" 
          label="Kompaniya manzili" 
          name="address" 
          rules={[{ 
            required: true,
            message: 'Kompaniya manzilini kiriting'
          }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<IManageFields>
          className={styles['manage-company__form-item']}
          layout="vertical" 
          label="Obyektlar soni" 
          name="numberOfObjects" 
          rules={[{ 
            required: true,
            message: 'Obyektlar sonini kiriting'
          }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item<IManageFields>
          className={styles['manage-company__form-item']}
          layout="vertical" 
          label="Xodimlar soni" 
          name="numberOfEmployees" 
          rules={[{ 
            required: true,
            message: 'Xodimlar sonini kiriting'
          }]}
        >
          <InputNumber min={0} />
        </Form.Item>
      </Form>
      {isEdit && <Form.Item<IManageFields>
        name="isActive"
        label="Holat"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>}
    </Modal>
  );
}

export default ManageCompanyModal;