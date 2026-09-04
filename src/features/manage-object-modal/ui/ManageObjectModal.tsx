import { Form, Input, Modal, type FormProps } from "antd";
import { useEffect, type FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useCreateObject, useUpdateObject } from "../model/mutations";
import { close, stateManageObject } from "../model/slice";
import type { IManageObjectFields } from "../model/types";

import { useObjectById } from "@entities/objects";
import { status } from "@shared/config";

const ManageObjectModal: FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm<IManageObjectFields>();
  const { isOpen, objectId } = useSelector(stateManageObject);
  const { mutateAsync: mutateAsyncCreate, isPending: isPendingCreate } = useCreateObject();
  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } = useUpdateObject();
  const isEdit = !!objectId;
  const title = !isEdit ? "Obyekt yaratish" : "Obyektni yangilash";
  const { data, isLoading } = useObjectById(objectId, isEdit);

  useEffect(() => {
    if (isEdit && data) {
      form.setFieldsValue({
        name: data.name,
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

  const onSubmitHandle: FormProps<IManageObjectFields>['onFinish'] = (values) => {
    if (isEdit) {
      mutateAsyncUpdate({
        ...values,
        objectId,
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
        <Form.Item<IManageObjectFields>
          className="modal__item"
          layout="vertical"
          label="Obyekt nomi"
          name="name"
          rules={[{ 
            required: true,
            message: 'Obyekt nomini kiriting'
          }]}
        >
          <Input 
            className="modal__input"
            disabled={isEdit && isLoading}
          />
        </Form.Item>
        {/* <Form.Item<IManageCompanyOwnerFields>
          className="modal__item"
          layout="vertical"
          label="To‘liq ism-familiya"
          name="fullName"
          rules={[{ 
            required: true,
            message: 'To‘liq ism-familiyangizni kiriting'
          }]}
        >
          <Input 
            className="modal__input"
            disabled={isEdit && isLoading}
          />
        </Form.Item>
        <Form.Item<IManageCompanyOwnerFields>
          className="modal__item"
          layout="vertical"
          label="Login"
          name="username"
          rules={[{ 
            required: true,
            message: 'Loginni kiriting'
          }]}
        >
          <Input 
            className="modal__input"
            disabled={isEdit && isLoading}
          />
        </Form.Item>
        {!isEdit && (
          <Form.Item<IManageCompanyOwnerFields>
            className="modal__item"
            layout="vertical"
            label="Parol"
            name="password"
            rules={[
              { 
                required: true,
                message: 'Parolni kiriting'
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
        )}
        <Form.Item<IManageCompanyOwnerFields>
          className="modal__item"
          layout="vertical"
          label="Lavozim"
          name="position"
          rules={[{ 
            required: true,
            message: 'Lavozimni kiriting'
          }]}
        >
          <Input 
            className="modal__input"
            disabled={isEdit && isLoading}
          />
        </Form.Item>
        <Form.Item<IManageCompanyOwnerFields>
          className="modal__item"
          layout="vertical"
          label="Kompaniya"
          name="companyId"
          rules={[{ 
            required: true,
            message: 'Kompaniyani tanlang'
          }]}
        >
          <Select 
            className="modal__select"
            options={companyList} 
            loading={isLoadingManualCompanyList || (isLoading && isEdit)} 
            disabled={isLoadingManualCompanyList || (isLoading && isEdit)}
          />
        </Form.Item>
        <Form.Item<IManageCompanyOwnerFields>
          className="modal__item"
          layout="vertical"
          label="Telefon raqami"
          name="phone"
          rules={[
            {
              required: true,
              message: 'Telefon raqamini kiriting'
            },
          ]}
        >
          <PhoneInput
            className="modal__phone"
            international
            defaultCountry="UZ"
            onChange={() => {}}
            disabled={isEdit && isLoading}
          />
        </Form.Item> */}
      </Form>
    </Modal>
  );
}

export default ManageObjectModal;