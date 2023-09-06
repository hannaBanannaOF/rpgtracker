import { notifications } from '@mantine/notifications';
import { Skeleton } from '@mantine/core';
import { useQuery } from "../hooks/useQuery";
import { COCCharacterSheet } from "../models/CharacterSheet";
import { CoCService } from "../services/CoCService";
import { DetalhesFichaCoCWithSubscription } from "../ui/DetalhesFichaCoC";
import { useEffect, useState } from "react";
import { StompSessionProvider } from 'react-stomp-hooks';

export function DetalhesFichaCoCQueryParam() {
    const query = useQuery();

    const [loading, setLoading] = useState(true);
    const [ficha, setFicha] = useState<COCCharacterSheet | null>(null);

    const fichaId = query.get("uuid");

    useEffect(() => {
        setLoading(true);
        if (fichaId) {
            CoCService.getFicha(fichaId).then(res => {
                setFicha(res.data);
                setLoading(false);
            }).catch(err => {
                notifications.show({
                    id: "error_ficha_not_found",
                    message: "Não foi possível buscar detalhes da ficha!",
                    color: "red"
                });
            });
        } else {
            setLoading(false);
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