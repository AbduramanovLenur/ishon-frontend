import { ConfigProvider, Flex, Form, Input, InputNumber, Modal, TimePicker, type FormProps } from "antd";
import { useEffect, type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import uzUZ from "antd/locale/uz_UZ";
import dayjs from "dayjs";

import { useCreateObject, useUpdateObject } from "../model/mutations";
import { close, stateManageObject } from "../model/slice";
import type { IManageObjectFields } from "../model/types";

import { useObjectById } from "@entities/objects";
import { status } from "@shared/config";

import styles from "./ManageObjectModal.module.scss";
import { useCurrentLocation } from "@/shared/lib";

const ManageObjectModal: FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm<IManageObjectFields>();
  const { isOpen, objectId } = useSelector(stateManageObject);
  const { mutateAsync: mutateAsyncCreate, isPending: isPendingCreate } = useCreateObject();
  const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } = useUpdateObject();
  const isEdit = !!objectId;
  const title = !isEdit ? "Obyekt yaratish" : "Obyektni yangilash";
  const { data, isLoading } = useObjectById(objectId, isEdit);
  const { latitude, longitude } = useCurrentLocation();

  console.log(latitude, longitude);

  useEffect(() => {
    if (isEdit && data) {
      form.setFieldsValue({
        name: data.name,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        geofenceRadiusMeters: data.geofenceRadiusMeters,
        shiftStartTime: dayjs(data.shiftStartTime, "HH:mm:ss"),
        shiftEndTime: dayjs(data.shiftEndTime, "HH:mm:ss"),
        lateEntryGraceMinutes: data.lateEntryGraceMinutes,
        earlyLeaveGraceMinutes: data.earlyLeaveGraceMinutes,
        status: data.status === status.ACTIVE,
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
    console.log(values.shiftStartTime.format("HH:mm"))
    if (isEdit) {
      mutateAsyncUpdate({
        ...values,
        objectId,
        shiftStartTime: values.shiftStartTime.format("HH:mm"),
        shiftEndTime: values.shiftEndTime.format("HH:mm"),
        status: values.status ? status.ACTIVE : status.INACTIVE
      }, {
        onSuccess: () => {
          closeManageModalHandle();
        }
      })
      return;
    }

    mutateAsyncCreate({
      ...values,
      shiftStartTime: values.shiftStartTime.format("HH:mm"),
      shiftEndTime: values.shiftEndTime.format("HH:mm")
    }, {
      onSuccess: () => {
        closeManageModalHandle();
      }
    });
  }

  return (
    <ConfigProvider locale={uzUZ}>
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
          <Form.Item<IManageObjectFields>
            className="modal__item"
            layout="vertical"
            label="Manzil"
            name="address"
            rules={[{ 
              required: true,
              message: 'Manzilni kiriting'
            }]}
          >
            <Input 
              className="modal__input"
              disabled={isEdit && isLoading}
            />
          </Form.Item>
          <Form.Item<IManageObjectFields>
            className="modal__item"
            layout="vertical"
            label="Geofence radiusi"
            name="geofenceRadiusMeters"
            rules={[{ 
              required: true,
              message: 'Geofence radiusini kiriting'
            }]}
          >
            <InputNumber
              className="modal__input"
              disabled={isEdit && isLoading}
              min={0}
              suffix="m"
            />
          </Form.Item>
          <Flex className={styles['object-manage-modal__flex']}>
            <Form.Item<IManageObjectFields>
              className="modal__item"
              layout="vertical"
              label="Ish kuni boshlanish vaqti"
              name="shiftStartTime"
              rules={[{ 
                required: true,
                message: 'Ish kuni boshlanish vaqtini kiriting'
              }]}
            >
              <TimePicker
                format="HH:mm"
                style={{ width: "100%" }}
                className="modal__timepicker"
              />
            </Form.Item>
            <Form.Item<IManageObjectFields>
              className="modal__item"
              layout="vertical"
              label="Ish kuni tugash vaqti"
              name="shiftEndTime"
              rules={[{ 
                required: true,
                message: 'Ish kuni tugash vaqtini kiriting'
              }]}
            >
              <TimePicker
                format="HH:mm"
                style={{ width: "100%" }}
                className="modal__timepicker"
              />
            </Form.Item>
          </Flex>
          <Flex className={`${styles['object-manage-modal__flex']} not-margened-bottom`}>
            <Form.Item<IManageObjectFields>
              className="modal__item"
              layout="vertical"
              label="Erta ketishga ruxsat etilgan vaqt (daq.)"
              name="earlyLeaveGraceMinutes"
              rules={[{ 
                required: true,
                message: 'Erta ketishga ruxsat etilgan vaqtni kiriting'
              }]}
            >
              <InputNumber
                className="modal__input"
                disabled={isEdit && isLoading}
                min={0}
                suffix="daq"
              />
            </Form.Item>
            <Form.Item<IManageObjectFields>
              className="modal__item"
              layout="vertical"
              label="Kechikishga ruxsat etilgan vaqt (daq.)"
              name="lateEntryGraceMinutes"
              rules={[{ 
                required: true,
                message: 'Kechikishga ruxsat etilgan vaqtni kiriting'
              }]}
            >
              <InputNumber
                className="modal__input"
                disabled={isEdit && isLoading}
                min={0}
                suffix="daq"
              />
            </Form.Item>
          </Flex>
        </Form>
      </Modal>
    </ConfigProvider>
  );
}

export default ManageObjectModal;