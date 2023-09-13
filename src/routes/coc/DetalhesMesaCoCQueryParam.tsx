import { notifications } from '@mantine/notifications';
import { Skeleton } from '@mantine/core';
import { useEffect, useState } from "react";
import { SessionBase } from "../../models/Session";
import { useQuery } from "../../hooks/useQuery";
import { CoCService } from "../../services/CoCService";
import { DetalhesMesaCoC } from "../../ui/DetalhesMesaCoC";
import { StompSessionProvider } from 'react-stomp-hooks';
import { AccountService } from '../../services/AccountService';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NotificationKeys } from '../../Constants';
export function DetalhesMesaCoCQueryParam() {
    const query = useQuery();

    let navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [mesa, setMesa] = useState<SessionBase | null>(null);
    const mesaId = query.get("uuid");    

    const { t } = useTranslation('notifications');
    
    useEffect(() => {
        setLoading(true);
        if (mesaId) {
            AccountService.getMesaViewPermission(mesaId).then((_) => {
                CoCService.getMesa(mesaId).then(res => {
                    setMesa(res.data);
                    setLoading(false);
                }).catch(err => {
                    notifications.show({
                        message: t('session.notFound'),
                        ...NotificationKeys.ErrorMesaNotFound
                    });
                });
            }).catch(err => {
                let key = err.statusCode === 404 ? NotificationKeys.ErrorMesaNotFound : NotificationKeys.ErrorNoPermission
                notifications.show({
                    message: t(err.statusCode === 404 ? 'session.notFound' : 'noPermission'),
                    ...key
                });
                navigate("/me/sessions");
            })
        } else {
            notifications.show({
                message: t('session.notFound'),
                ...NotificationKeys.ErrorMesaNotFound
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mesaId])

    return (
        <Skeleton visible={loading}>
            <StompSessionProvider url={`${process.env.REACT_APP_WS_URL}coc/ws`} onUnhandledMessage={(msg) => console.log(msg)}>
                <DetalhesMesaCoC mesa={mesa} />
            </StompSessionProvider>
        </Skeleton>
    )
}