import { Form, Input, Modal, Select, type FormProps } from "antd";
import { useEffect, type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from 'react-phone-number-input';

import { close, stateManageCompanyOwner } from "../model/slice";
import type { IManageCompanyOwnerFields } from "../model/types";
import { useCreateCompanyOwner, useUpdateCompanyOwner } from "../model/mutations";

import { useCompanyOwnerById } from "@entities/directors";
import { useManualCompanyList } from "@entities/companies";

import 'react-phone-number-input/style.css';

const ManageDirectorModal: FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm<IManageCompanyOwnerFields>();
  const { isOpen, companyOwnerId } = useSelector(stateManageCompanyOwner);
  const { mutateAsync: mutateAsyncCreate, isPending: isPendingCreate } = useCreateCompanyOwner();
  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } = useUpdateCompanyOwner();
  const isEdit = !!companyOwnerId;
  const title = !isEdit ? "Direktor yaratish" : "Direktorni yangilash";
  const { data, isLoading } = useCompanyOwnerById(companyOwnerId, isEdit);
  const { data: manualCompanyList, isLoading: isLoadingManualCompanyList } = useManualCompanyList(isOpen);

  const companyList = manualCompanyList?.map((company) => ({
    label: company.name,
    value: company.id
  })) ?? [];

  useEffect(() => {
    if (isEdit && data) {
      form.setFieldsValue({
        fullName: data.fullName,
        username: data.username,
        position: data.position,
        companyId: data.companyId,
        phone: data.phone,
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
        ...values,
        companyOwnerId
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
        <Form.Item<IManageCompanyOwnerFields>
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
            rules={[{ 
              required: true,
              message: 'Parolni kiriting'
            }]}
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
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ManageDirectorModal;