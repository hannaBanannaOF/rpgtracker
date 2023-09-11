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
export function DetalhesMesaCoCQueryParam() {
    const query = useQuery();

    let navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [mesa, setMesa] = useState<SessionBase | null>(null);
    const mesaId = query.get("uuid");    
    
    useEffect(() => {
        setLoading(true);
        if (mesaId) {
            AccountService.getMesaViewPermission(mesaId).then((_) => {
                CoCService.getMesa(mesaId).then(res => {
                    setMesa(res.data);
                    setLoading(false);
                }).catch(err => {
                    notifications.show({
                        id: "error_mesa_not_found",
                        message: "Não foi possível buscar detalhes da mesa!",
                        color: "red"
                    });
                });
            }).catch(err => {
                notifications.show({
                    id: err.statusCode === 404 ? "error_mesa_not_found" : "error_no_permission",
                    message: err.statusCode === 404 ? "Não foi possível buscar detalhes da mesa!" : "Você não tem permissão para ver essa mesa!",
                    color: "red"
                });
                navigate("/me/sessions");
            })
        } else {
            notifications.show({
                id: "error_mesa_not_found",
                message: "Não foi possível buscar detalhes da mesa!",
                color: "red"
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