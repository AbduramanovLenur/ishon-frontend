import { Button } from 'antd';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { type FC } from 'react';

import styles from './Attendance.module.scss';

interface IAttendanceActionsProps {
  onEnter: () => void;
  onExit: () => void;
  isPending: boolean;
}

const AttendanceActions: FC<IAttendanceActionsProps> = ({
  onEnter,
  onExit,
  isPending,
}) => (
  <div className={styles['attendance__actions']}>
    <Button
      type="primary"
      htmlType="submit"
      icon={<LoginOutlined />}
      className={styles['attendance__btn']}
      onClick={onEnter}
      disabled={isPending}
    >
      Kirish
    </Button>

    <Button
      htmlType="submit"
      icon={<LogoutOutlined />}
      className={`${styles['attendance__btn']} ${styles['attendance__btn--exit']}`}
      onClick={onExit}
      disabled={isPending}
    >
      Chiqish
    </Button>
  </div>
);

export default AttendanceActions;
