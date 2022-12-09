import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { usePermission } from '../providers/PermissionProvider';

export interface Permissions {
  mestrePerm? :boolean
  children: JSX.Element
}

export function RequireAuth(props: Permissions) {
    let auth = useAuth();
    let permission = usePermission();
    let location = useLocation();

    if (!auth.valid) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if ((props.mestrePerm ?? false) && !(permission.userIsDM ?? false)) {
      let from = (location.state as any)?.from?.pathname || "/";
      return <Navigate to={from} replace />
    }
  
    return props.children;
  }