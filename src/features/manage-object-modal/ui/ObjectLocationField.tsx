import { Form, Input } from "antd";
import { useEffect, type FC } from "react";
import type { FormInstance } from "antd/lib/form";

import type { IManageObjectFields } from "../model/types";

import { GeofenceMap } from "@shared/ui";
import { useCurrentLocation } from "@/shared/lib";

interface IObjectLocationFieldProps {
  form: FormInstance<IManageObjectFields>;
  isOpen: boolean;
  isEdit: boolean;
}

const ObjectLocationField: FC<IObjectLocationFieldProps> = ({ form, isOpen, isEdit }) => {
  const { latitude: currentLatitude, longitude: currentLongitude } = useCurrentLocation();
  const latitude = Form.useWatch("latitude", form);
  const longitude = Form.useWatch("longitude", form);
  const radius = Form.useWatch("geofenceRadiusMeters", form);

  useEffect(() => {
    if (!isOpen || isEdit || currentLatitude === null || currentLongitude === null) {
      return;
    }

    form.setFieldsValue({
      latitude: String(currentLatitude),
      longitude: String(currentLongitude),
    });
  }, [isOpen, isEdit, currentLatitude, currentLongitude, form]);

  const handlePositionChange = ({ latitude, longitude }: {
    latitude: number;
    longitude: number;
  }) => {
    form.setFieldsValue({
      latitude: String(latitude),
      longitude: String(longitude),
    });
  };

  return (
    <>
      <Form.Item<IManageObjectFields>
        name="latitude"
        hidden
      >
        <Input />
      </Form.Item>

      <Form.Item<IManageObjectFields>
        name="longitude"
        hidden
      >
        <Input />
      </Form.Item>

      <Form.Item
        className="modal__item"
        label="Obyekt joylashuvi"
        layout="vertical"
      >
        <GeofenceMap
          latitude={latitude !== undefined ? Number(latitude) : undefined}
          longitude={longitude !== undefined ? Number(longitude) : undefined}
          radius={radius ?? 0}
          editable
          onPositionChange={handlePositionChange}
          height={200}
        />
      </Form.Item>
    </>
  );
};

export default ObjectLocationField;