import { Form, Input, Modal, Select, type FormProps } from "antd";
import { useEffect, type FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { close, stateManageCompanyOwner } from "../model/slice";
import type { IManageCompanyOwnerFields } from "../model/types";
import { useCreateCompanyOwner, useUpdateCompanyOwner } from "../model/mutations";

import { useCompanyOwnerById } from "@entities/directors";

import styles from "./ManageDirectorModal.module.scss";

const ManageDirectorModal: FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm<IManageCompanyOwnerFields>();
  const { isOpen, companyOwnerId } = useSelector(stateManageCompanyOwner);
  const { mutateAsync: mutateAsyncCreate, isPending: isPendingCreate } = useCreateCompanyOwner();
  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } = useUpdateCompanyOwner();
  const isEdit = !!companyOwnerId;
  const title = !isEdit ? "Direktor yaratish" : "Direktorni yangilash";
  const { data, isLoading } = useCompanyOwnerById(companyOwnerId, isEdit);

  useEffect(() => {
    if (isEdit && data) {
      form.setFieldsValue({
        fullName: data.fullName,
        position: data.position,
        companyId: data.companyId,
        phone: data.phone
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

  const onSubmitHandle: FormProps<IManageCompanyOwnerFields>['onFinish'] = (values) => {
    if (isEdit) {
      mutateAsyncUpdate({
        companyOwnerId,
        fullName: values.fullName,
        position: values.position,
        companyId: values.companyId,
        phone: values.phone
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
        <Form.Item<IManageCompanyOwnerFields>
          className={styles['modal__item']}
          layout="vertical"
          label="To‘liq ism-familiya"
          name="fullName"
          rules={[{ 
            required: true,
            message: 'To‘liq ism-familiyangizni kiriting'
          }]}
        >
          <Input 
            className={styles['modal__input']} 
            disabled={isEdit && isLoading}
          />
        </Form.Item>
        {!isEdit && (
          <Form.Item<IManageCompanyOwnerFields>
            className={styles['modal__item']}
            layout="vertical"
            label="Login"
            name="username"
            rules={[{ 
              required: true,
              message: 'Loginni kiriting'
            }]}
          >
            <Input 
              className={styles['modal__input']}
            />
          </Form.Item>
        )}
        {!isEdit && (
          <Form.Item<IManageCompanyOwnerFields>
            className={styles['modal__item']}
            layout="vertical"
            label="Parol"
            name="password"
            rules={[{ 
              required: true,
              message: 'Parolni kiriting'
            }]}
          >
            <Input.Password 
              className={styles['modal__input']}
            />
          </Form.Item>
        )}
        <Form.Item<IManageCompanyOwnerFields>
          className={styles['modal__item']}
          layout="vertical"
          label="Lavozim"
          name="position"
          rules={[{ 
            required: true,
            message: 'Lavozimni kiriting'
          }]}
        >
          <Input 
            className={styles['modal__input']}
            disabled={isEdit && isLoading}
          />
        </Form.Item>
        <Form.Item<IManageCompanyOwnerFields>
          className={styles['modal__item']}
          layout="vertical"
          label="Kampaniya"
          name="companyId"
          rules={[{ 
            required: true,
            message: 'Kompaniyani tanlang'
          }]}
        >
          <Select options={[]} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ManageDirectorModal;