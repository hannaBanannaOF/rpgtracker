import { notification } from 'antd';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

export interface Permissions {
  mestrePerm? :boolean
  children: JSX.Element
}

export function RequireAuth(props: Permissions) {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.valid()) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if ((props.mestrePerm ?? false) && !(auth.getCurrUser()?.is_mestre ?? false)) {
      let from = (location.state as any)?.from?.pathname || "/";
      notification.error({
        message: "Proibido!",
        description: "Você precisa ser mestre de alguma mesa para acessar esse recurso!"
      });
      return <Navigate to={from} replace />
    }
  
    return props.children;
  }