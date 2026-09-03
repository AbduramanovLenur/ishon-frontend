import { useEffect, type FC } from "react";
import { Form, Input, InputNumber, Modal, Switch, type FormProps } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { close, stateManageCompany } from "../model/slice";
import type { IManageCompanyFields } from "../model/types";
import { useCreateCompany, useUpdateCompany } from "../model/mutations";

import { useCompanyById } from "@entities/companies";
import { status } from "@shared/config";

const ManageCompanyModal: FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm<IManageCompanyFields>();
  const { isOpen, companyId } = useSelector(stateManageCompany);
  const { mutateAsync: mutateAsyncCreate, isPending: isPendingCreate } = useCreateCompany();
  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } = useUpdateCompany();
  const isEdit = !!companyId;
  const title = !isEdit ? "Kompaniya yaratish" : "Kompaniyani yangilash";
  const { data, isLoading } = useCompanyById(companyId, isEdit);

  useEffect(() => {
    if (isEdit && data) {
      form.setFieldsValue({
        name: data.name,
        address: data.address,
        objectLimit: data.objectLimit,
        employeeLimit: data.employeeLimit,
        status: data.status === status.ACTIVE ? true : false
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
        status: values.status ? status.ACTIVE : status.INACTIVE
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
      centered
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
          label: "modal__label",
          help: "modal__help"
        }}
      >
        <Form.Item<IManageCompanyFields>
          className="modal__item"
          layout="vertical"
          label="Kompaniya nomi" 
          name="name"
          rules={[{ 
            required: true,
            message: 'Kompaniya nomini kiriting'
          }]}
        >
          <Input 
            className="modal__input"
            disabled={isEdit && isLoading} 
          />
        </Form.Item>
        <Form.Item<IManageCompanyFields>
          className="modal__item"
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
          className="modal__item"
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
          className="modal__item"
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
        {isEdit && <Form.Item<IManageCompanyFields>
          name="status"
          label="Holat"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>}
      </Form>
    </Modal>
  );
}

export default ManageCompanyModal;