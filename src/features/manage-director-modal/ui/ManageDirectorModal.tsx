import { Form, Input, Modal, Select, type FormProps } from "antd";
import { useEffect, type FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { close, stateManageCompanyOwner } from "../model/slice";
import type { IManageCompanyOwnerFields, IPhoneNumber } from "../model/types";
import { useCreateCompanyOwner, useUpdateCompanyOwner } from "../model/mutations";

import { useCompanyOwnerById } from "@entities/directors";
import { useManualCompanyList } from "@entities/companies";

import styles from "./ManageDirectorModal.module.scss";
import PhoneInput from "antd-phone-input";
import parsePhoneNumber from 'libphonenumber-js'

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
      const phone = data.phone
      ? parsePhoneNumber(data.phone)
      : undefined;

      form.setFieldsValue({
        fullName: data.fullName,
        position: data.position,
        companyId: data.companyId,
        phone: phone
        ? {
            countryCode: Number(phone.countryCallingCode),
            areaCode: phone.nationalNumber.slice(0, 2),
            phoneNumber: phone.nationalNumber.slice(2),
            isoCode: phone.country?.toLowerCase(),
            valid: phone.isValid,
          }
        : undefined,
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

  const phoneValidatorHandle = (_: unknown, value: string) => {
    if (!value) {
      return Promise.reject(
        new Error("Telefon raqamni kiriting")
      );
    }
  
    const phone = parsePhoneNumber(value);
  
    if (!phone?.isValid()) {
      return Promise.reject(
        new Error("Telefon raqami noto‘g‘ri")
      );
    }
  
    return Promise.resolve();
  };

  const phoneGetValueFromEventHandle = (value: IPhoneNumber) => {
    if (!value) {
      return undefined;
    }
  
    return `+${value.countryCode}${value.areaCode}${value.phoneNumber}`;
  };

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
            disabled={isEdit && isLoading}
          />
        </Form.Item>
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
          label="Kompaniya"
          name="companyId"
          rules={[{ 
            required: true,
            message: 'Kompaniyani tanlang'
          }]}
        >
          <Select options={companyList} loading={isLoadingManualCompanyList || (isLoading && isEdit)} />
        </Form.Item>
        <Form.Item<IManageCompanyOwnerFields>
          className={styles['modal__item']}
          layout="vertical"
          label="Telefon raqami"
          name="phone"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: 'Telefon raqamini kiriting',
              validator: phoneValidatorHandle
            },
          ]}
          getValueFromEvent={phoneGetValueFromEventHandle}
        >
          <PhoneInput className={styles['modal__input']} country="uz" onlyCountries={["uz"]} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ManageDirectorModal;