import { useEffect, useState, type FC } from 'react';
import { Form, Input, Popover, message, type FormProps } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import type { IAttendanceFields } from '../model/types';

import { useAttendance, useUploadFacePicture } from '@features/face-verification';
import { LanguageSwitcher } from '@features/language-switcher';
import { GeofenceMap, WebcamCapture } from '@shared/ui';
import { eventTypes } from '@shared/config';

import { useTelegramLocation } from '@shared/lib';
import AttendanceActions from './AttendanceActions';

import styles from './Attendance.module.scss';

const Attendance: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<IAttendanceFields>();
  const [photoKey, setPhotoKey] = useState(0);
  const { latitude, longitude, isGeolocationAvailable, isGeolocationEnabled } = useTelegramLocation();
  const { mutateAsync: mutateASyncUpload, isPending: isPendingUploadFile } = useUploadFacePicture();
  const { mutateAsync: mutateAsyncAttendance, isPending: isPendingAttendance } = useAttendance();

  useEffect(() => {
    if (latitude != null && longitude != null) {
      form.setFieldsValue({ latitude, longitude });
    }
  }, [latitude, longitude, form]);

  const handleCapture = (file: File) => {
    form.setFieldsValue({ photo: file });
  };

  const handleDelete = () => {
    form.setFieldsValue({ photo: null });
  };

  const handleSubmit: FormProps<IAttendanceFields>['onFinish'] = async (values) => {
    if (!values.photo) {
      message.warning(t("attendance.takePhoto"));
      return;
    }

    if (!isGeolocationAvailable) {
      message.error(t("attendance.geoNotSupported"));
      return;
    }

    if (!isGeolocationEnabled) {
      message.error(t("attendance.geoNotPermitted"));
      return;
    }

    if (values.latitude == null || values.longitude == null) {
      message.warning(t("attendance.locationNotDetected"));
      return;
    }

    let fileUrl = '';
    const file = values.photo;

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await mutateASyncUpload(formData);
      fileUrl = uploadResponse.data?.fileUrl ?? '';
    }

    mutateAsyncAttendance({
      fileUrl,
      eventType: values.eventType,
      latitude: values.latitude,
      longitude: values.longitude,
    }, {
      onSuccess: () => {
        form.setFieldsValue({ photo: null });
        setPhotoKey((k) => k + 1);
      }
    });
  };

  const handleSetEventType = (
    eventType: Exclude<
      (typeof eventTypes)[keyof typeof eventTypes], 
      typeof eventTypes.NOT_LEFT | typeof eventTypes.NOT_CHECKED_IN
    >,
  ) => {
    form.setFieldsValue({ eventType });
  };

  const helpContent = (
    <div className={styles['attendance__help']}>
      <p className={styles['attendance__help-title']}>{t("attendance.helpTitle")}</p>
      <ol className={styles['attendance__help-list']}>
        <li dangerouslySetInnerHTML={{ __html: t("attendance.helpStep1") }} />
        <li dangerouslySetInnerHTML={{ __html: t("attendance.helpStep2") }} />
        <li dangerouslySetInnerHTML={{ __html: t("attendance.helpStep3") }} />
        <li dangerouslySetInnerHTML={{ __html: t("attendance.helpStep4") }} />
        <li dangerouslySetInnerHTML={{ __html: t("attendance.helpStep5") }} />
      </ol>
    </div>
  );

  return (
    <div className={styles['attendance']}>
      <div className={styles['attendance__inner']}>
        <div className={styles['attendance__switcher']}>
          <LanguageSwitcher />
        </div>
        <div className={styles['attendance__header']}>
          <h1 className={styles['attendance__title']}>{t("attendance.title")}</h1>
          <Popover content={helpContent} trigger="click" placement="topRight">
            <button type="button" className={styles['attendance__help-btn']}>
              <QuestionCircleOutlined />
            </button>
          </Popover>
        </div>

        <p className={styles['attendance__subtitle']}>
          {t("attendance.subtitle")}
        </p>

        <Form
          form={form}
          className={styles['attendance__form']}
          onFinish={handleSubmit}
        >
          <Form.Item name="photo" hidden>
            <Input />
          </Form.Item>

          <Form.Item name="latitude" hidden>
            <Input />
          </Form.Item>

          <Form.Item name="longitude" hidden>
            <Input />
          </Form.Item>

          <Form.Item name="eventType" hidden>
            <Input />
          </Form.Item>

          <WebcamCapture key={photoKey} onCapture={handleCapture} onDelete={handleDelete} />

          <GeofenceMap
            height={200}
            latitude={latitude}
            longitude={longitude}
            dragging={false}
            doubleClickZoom={false}
            scrollWheelZoom={false}
            touchZoom={false}
            zoomControl={false}
            emptyMessage={t("attendance.locationNotDetermined")}
          />

          <AttendanceActions
            onEnter={() => handleSetEventType(eventTypes.ENTER)}
            onExit={() => handleSetEventType(eventTypes.EXIT)}
            isPending={isPendingAttendance || isPendingUploadFile}
          />
        </Form>
      </div>
    </div>
  );
};

export default Attendance;
