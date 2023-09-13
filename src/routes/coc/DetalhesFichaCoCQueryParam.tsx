import { notifications } from '@mantine/notifications';
import { Skeleton } from '@mantine/core';
import { useQuery } from "../../hooks/useQuery";
import { COCCharacterSheet } from "../../models/CharacterSheet";
import { CoCService } from "../../services/CoCService";
import { DetalhesFichaCoCWithSubscription } from "../../ui/DetalhesFichaCoC";
import { useEffect, useState } from "react";
import { StompSessionProvider } from 'react-stomp-hooks';
import { AccountService } from '../../services/AccountService';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NotificationKeys } from '../../Constants';

export function DetalhesFichaCoCQueryParam() {
    const query = useQuery();

    let navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [ficha, setFicha] = useState<COCCharacterSheet | null>(null);

    const fichaId = query.get("uuid");

    const { t } = useTranslation('notifications');

    useEffect(() => {
        setLoading(true);
        if (fichaId) {
            AccountService.getFichaViewPermission(fichaId).then((_) => {
                CoCService.getFicha(fichaId).then(res => {
                    setFicha(res.data);
                    setLoading(false);
                }).catch(err => {
                    notifications.show({
                        message: t('characterSheet.notFound'),
                        ...NotificationKeys.ErrorFichaNotFound
                    });
                });
            }).catch(err => {
                let key = err.statusCode === 404 ? NotificationKeys.ErrorFichaNotFound : NotificationKeys.ErrorNoPermission
                notifications.show({
                    message: t(err.statusCode === 404 ? 'characterSheet.notFound' : 'noPermission'),
                    ...key
                });
                navigate("/me/sheets");
            })
        } else {
            notifications.show({
                message: t('characterSheet.notFound'),
                ...NotificationKeys.ErrorFichaNotFound
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fichaId])

    return (
        <Skeleton visible={loading}> 
            <StompSessionProvider url={`${process.env.REACT_APP_WS_URL}coc/ws`}>
                <DetalhesFichaCoCWithSubscription ficha={ficha} />
            </StompSessionProvider>
        </Skeleton>
    )
}