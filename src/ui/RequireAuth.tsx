import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';

export interface Permissions {
  mestrePerm? :boolean
  children: JSX.Element
}

export function RequireAuth(props: Permissions) {
    let auth = useAuth();
    let location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
      if (auth.loading) return;
      if (!auth.valid) {
        navigate("/login", {state: {from: location}, replace: true})
      }

      if ((props.mestrePerm ?? false) && !(auth.currentUser?.permissions.isCocDm ?? false)) {
        let from = (location.state as any)?.from?.pathname || "/";
        notifications.show({
          message: "Você não tem permissão para acessar esse recurso!",
          id: "error_no_permission",
          color: 'red'
        });
        navigate(from, {replace: true})
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.loading])
  
    return props.children;
  }