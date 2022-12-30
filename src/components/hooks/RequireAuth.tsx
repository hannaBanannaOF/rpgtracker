import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffectOnce } from '../../utils/UseEffectOnce';
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
    let navigate = useNavigate();
    let { enqueueSnackbar } = useSnackbar();

    useEffectOnce(() => {
      if (!auth.valid) {
        // return <Navigate to="/login" state={{ from: location }} replace />;
        navigate("/login", {state: {from: location}, replace: true})
      }
  
      if ((props.mestrePerm ?? false) && !(permission.userIsDM ?? false)) {
        let from = (location.state as any)?.from?.pathname || "/";
        // return <Navigate to={from} replace />
        enqueueSnackbar("Você não tem permissão para acessar esse recurso!", {
          variant: "error",
          key: "error_no_permission"}
        );
        navigate(from, {replace: true})
      }
    })
  
    return props.children;
  }