import { notifications } from '@mantine/notifications';
import { Skeleton } from '@mantine/core';
import { useEffect, useState } from "react";
import { SessionBase } from "../models/Session";
import { useQuery } from "../hooks/useQuery";
import { CoCService } from "../services/CoCService";
import { DetalhesMesaCoC } from "../ui/DetalhesMesaCoC";
import { StompSessionProvider } from 'react-stomp-hooks';

export function DetalhesMesaCoCQueryParam() {
    const query = useQuery();

    const [loading, setLoading] = useState(true);
    const [mesa, setMesa] = useState<SessionBase | null>(null);
    const mesaId = query.get("uuid");    
    
    useEffect(() => {
        setLoading(true);
        if (mesaId) {
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