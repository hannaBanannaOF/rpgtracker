import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NotificationKeys } from '../Constants';

export interface Permissions {
  mestrePerm? :boolean
  children: JSX.Element
}

export function RequireAuth(props: Permissions) {
    let auth = useAuth();
    let location = useLocation();
    let navigate = useNavigate();
    const { t } = useTranslation('notifications');

    useEffect(() => {
      if (auth.loading) return;
      if (!auth.valid) {
        navigate("/login", {state: {from: location}, replace: true})
      }

      if ((props.mestrePerm ?? false) && !(auth.currentUser?.permissions.isCocDm ?? false)) {
        let from = (location.state as any)?.from?.pathname || "/";
        notifications.show({
          message: t('noPermission'),
          ...NotificationKeys.ErrorNoPermission
        });
        navigate(from, {replace: true})
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.loading])
  
    return props.children;
  }