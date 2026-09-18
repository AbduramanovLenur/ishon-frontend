import { useEffect, type FC } from "react";
import { Flex, Form, Input, InputNumber, Modal, Switch, TimePicker, type FormProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

import ObjectLocationField from "./ObjectLocationField";
import { useCreateObject, useUpdateObject } from "../model/mutations";
import { close, stateManageObject } from "../model/slice";
import type { IManageObjectFields } from "../model/types";

import { useObjectById } from "@entities/objects";
import { defaultValues, status } from "@shared/config";

import styles from "./ManageObjectModal.module.scss";

const ManageObjectModal: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm<IManageObjectFields>();
  const { isOpen, objectId } = useSelector(stateManageObject);
  const { mutateAsync: createObject, isPending: isCreating } = useCreateObject();
  const { mutateAsync: updateObject, isPending: isUpdating } = useUpdateObject();
  const isEdit = !!objectId;
  const title = isEdit ? t("objects.edit") : t("objects.create");
  const { data, isLoading } = useObjectById(objectId, isEdit);

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
        attendanceClosingTime: dayjs(data.attendanceClosingTime, "HH:mm:ss"),
        lateEntryGraceMinutes: data.lateEntryGraceMinutes,
        earlyLeaveGraceMinutes: data.earlyLeaveGraceMinutes,
        status: data?.status === status.ACTIVE,
      });
    }
  }, [data, isEdit, form]);

  const handleClose = () => {
    dispatch(close());
    form.resetFields();
  }

  const handleOk = () => {
    form.submit();
  }

  const handleSubmit: FormProps<IManageObjectFields>['onFinish'] = (values) => {
    const formattedValues = {
      ...values,
      shiftStartTime: values.shiftStartTime.format("HH:mm"),
      shiftEndTime: values.shiftEndTime.format("HH:mm"),
      attendanceClosingTime: values.attendanceClosingTime.format("HH:mm"),
    };

    if (isEdit) {
      updateObject(
        { ...formattedValues, objectId, status: values.status ? status.ACTIVE : status.INACTIVE },
        { onSuccess: handleClose }
      );
      return;
    }

    createObject(formattedValues, { onSuccess: handleClose });
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
      styles={{
        body: {
          maxHeight: "70vh",
          overflowY: "auto",
          paddingRight: 8,
        },
      }}
      title={title}
      open={isOpen}
      okText={t("common.save")}
      cancelText={t("common.cancel")}
      onOk={handleOk}
      onCancel={handleClose}
      confirmLoading={isCreating || isUpdating}
      zIndex={3000}
      destroyOnHidden
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        classNames={{
          label: "modal__label",
          help: "modal__help"
        }}
      >
        <Form.Item<IManageObjectFields>
          className="modal__item"
          layout="vertical"
          label={t("objects.name")}
          name="name"
          rules={[{
            required: true,
            message: t("objects.nameRequired")
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
          label={t("objects.address")}
          name="address"
          rules={[{
            required: true,
            message: t("objects.addressRequired")
          }]}
        >
          <Input
            className="modal__input"
            disabled={isEdit && isLoading}
          />
        </Form.Item>
        <ObjectLocationField
          form={form}
          isOpen={isOpen}
          isEdit={isEdit}
        />
        <Form.Item<IManageObjectFields>
          className="modal__item"
          layout="vertical"
          label={t("objects.radius")}
          name="geofenceRadiusMeters"
          rules={[{
            required: true,
            message: t("objects.radiusRequired")
          }]}
          initialValue={defaultValues.radius}
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
            className="modal__item not-margened-item"
            layout="vertical"
            label={t("objects.shiftStart")}
            name="shiftStartTime"
            rules={[{
              required: true,
              message: t("objects.shiftStartRequired")
            }]}
          >
            <TimePicker
              format="HH:mm"
              style={{ width: "100%" }}
              className="modal__timepicker"
            />
          </Form.Item>
          <Form.Item<IManageObjectFields>
            className="modal__item not-margened-item"
            layout="vertical"
            label={t("objects.shiftEnd")}
            name="shiftEndTime"
            rules={[{
              required: true,
              message: t("objects.shiftEndRequired")
            }]}
          >
            <TimePicker
              format="HH:mm"
              style={{ width: "100%" }}
              className="modal__timepicker"
            />
          </Form.Item>
        </Flex>
        <Form.Item<IManageObjectFields>
          className="modal__item"
          layout="vertical"
          label={t("objects.closingTime")}
          name="attendanceClosingTime"
          rules={[{
            required: true,
            message: t("objects.closingTimeRequired")
          }]}
        >
          <TimePicker
            format="HH:mm"
            style={{ width: "100%" }}
            className="modal__timepicker"
          />
        </Form.Item>
        <Flex className={styles['object-manage-modal__flex']}>
          <Form.Item<IManageObjectFields>
            className="modal__item not-margened-item"
            layout="vertical"
            label={t("objects.lateGrace")}
            name="lateEntryGraceMinutes"
            rules={[{
              required: true,
              message: t("objects.lateGraceRequired")
            }]}
          >
            <InputNumber
              className="modal__input"
              disabled={isEdit && isLoading}
              min={0}
              suffix={t("objects.minutes")}
            />
          </Form.Item>
          <Form.Item<IManageObjectFields>
            className="modal__item not-margened-item"
            layout="vertical"
            label={t("objects.earlyGrace")}
            name="earlyLeaveGraceMinutes"
            rules={[{
              required: true,
              message: t("objects.earlyGraceRequired")
            }]}
          >
            <InputNumber
              className="modal__input"
              disabled={isEdit && isLoading}
              min={0}
              suffix={t("objects.minutes")}
            />
          </Form.Item>
        </Flex>
        {isEdit && <Form.Item<IManageObjectFields>
          name="status"
          label={t("common.status")}
          valuePropName="checked"
          className="modal__switch not-margened-item"
        >
          <Switch />
        </Form.Item>}
      </Form>
    </Modal>
  );
}

export default ManageObjectModal;
