import { useEffect, type FC } from "react";
import { Form, Input, InputNumber, Modal, Switch, type FormProps } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { close, stateManageCompany } from "../model/slice";
import type { IManageCompanyFields } from "../model/types";
import { useCreateCompany, useUpdateCompany } from "../model/mutations";

import { useCompanyById } from "@entities/companies";
// import { status } from "@shared/config";

import styles from "./ManageCompanyModal.module.scss";

const ManageCompanyModal: FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm<IManageCompanyFields>();
  const { isOpen, companyId } = useSelector(stateManageCompany);
  const { mutateAsync: mutateAsyncCreate, isPending: isPendingCreate } = useCreateCompany();
  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } = useUpdateCompany();
  const isEdit = !!companyId;
  const title = !isEdit ? "Kampaniya yaratish" : "Kampaniyani yangilash";
  const { data, isLoading } = useCompanyById(companyId, isEdit);

  useEffect(() => {
    if (isEdit && data) {
      form.setFieldsValue({
        name: data.name,
        address: data.address,
        objectLimit: data.objectLimit,
        employeeLimit: data.employeeLimit,
        isActive: true
      });
    }
  }, [data, isEdit, form]);

  const closeManageModalHandle = () => {
    dispatch(close());
    form.resetFields();
  }

  const onOkHandle = () => {
    form.submit();
  }

  const onSubmitHandle: FormProps<IManageCompanyFields>['onFinish'] = (values) => {
    if (isEdit) {
      mutateAsyncUpdate({
        companyId,
        name: values.name,
        address: values.address,
        objectLimit: values.objectLimit,
        employeeLimit: values.employeeLimit,
        isActive: true
      }, {
        onSuccess: () => {
          closeManageModalHandle();
        }
      })
      return;
    }

    mutateAsyncCreate(values, {
      onSuccess: () => {
        closeManageModalHandle();
      }
    });
  }

  return (
    <Modal 
      classNames={{
        close: 'centered',
        container: 'modal__container',
        header: 'modal__header',
        title: 'modal__title',
        body: 'modal__body'
      }}
      title={title}
      open={isOpen}
      okText="Saqlash"
      cancelText="Yopish"
      onOk={onOkHandle}
      onCancel={closeManageModalHandle}
      confirmLoading={isPendingCreate || isPendingUpdate}
      style={{ zIndex: 1000 }}
    >
      <Form 
        form={form}
        onFinish={onSubmitHandle}
        classNames={{
          label: styles['modal__label'],
          help: styles['modal__help']
        }}
      >
        <Form.Item<IManageCompanyFields>
          className={styles['modal__item']}
          layout="vertical"
          label="Kompaniya nomi" 
          name="name"
          rules={[{ 
            required: true,
            message: 'Kompaniya nomini kiriting'
          }]}
        >
          <Input 
            className={styles['modal__input']} 
            disabled={isEdit && isLoading} 
          />
        </Form.Item>
        <Form.Item<IManageCompanyFields>
          className={styles['modal__item']}
          layout="vertical" 
          label="Kompaniya manzili" 
          name="address" 
          rules={[{ 
            required: true,
            message: 'Kompaniya manzilini kiriting'
          }]}
        >
          <Input 
            disabled={isEdit && isLoading} 
          />
        </Form.Item>
        <Form.Item<IManageCompanyFields>
          className={styles['modal__item']}
          layout="vertical" 
          label="Obyektlar soni" 
          name="objectLimit" 
          rules={[{ 
            required: true,
            message: 'Obyektlar sonini kiriting'
          }]}
        >
          <InputNumber 
            min={0} 
            disabled={isEdit && isLoading} 
          />
        </Form.Item>
        <Form.Item<IManageCompanyFields>
          className={styles['modal__item']}
          layout="vertical" 
          label="Xodimlar soni" 
          name="employeeLimit" 
          rules={[{ 
            required: true,
            message: 'Xodimlar sonini kiriting'
          }]}
        >
          <InputNumber 
            min={0} 
            disabled={isEdit && isLoading} 
          />
        </Form.Item>
      </Form>
      {isEdit && <Form.Item<IManageCompanyFields>
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