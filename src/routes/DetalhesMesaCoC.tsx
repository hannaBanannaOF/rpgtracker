import { Skeleton, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { FichaType } from "../models/Ficha";
import { MesaBase } from "../models/Mesa";
import { CoCService } from "../services/CoCService";
import { DetalhesFichaCoC } from "./DetalhesFichaCoC";

interface DetalhesMesaCoCProps {
    pk?: number;
}

export function DetalhesMesaCoC(props: DetalhesMesaCoCProps) {
    const [loading, setLoading] = useState(true);
    const [mesa, setMesa] = useState<MesaBase | null>(null);
    const { enqueueSnackbar } = useSnackbar();
    const [fichaSelecionada, setFichaSelecionada] = useState<number | undefined>(0);

    useEffect(() => {
        setLoading(true);
        CoCService.getMesa(props.pk!).then(res => {
            setMesa(res.data);
            setFichaSelecionada(mesa?.fichas_mesa[0].id);
            setLoading(false);
        }).catch(err => {
            //err.response?.data?.detail ?? ""
            enqueueSnackbar("Não foi possível buscar detalhes da mesa!", {
                variant: 'error',
                key: 'error_mesa_not_found'
            });
        });
    }, [props.pk]);

    const handleToggle = (event: React.MouseEvent<HTMLElement>, newValue: number) => {
        setFichaSelecionada(newValue)
    }

    return loading ? <Skeleton variant='rectangular' animation='wave'/> : (
        <React.Fragment>
            <ToggleButtonGroup
                value={fichaSelecionada}
                exclusive
                onChange={handleToggle}
            >
                {mesa!.fichas_mesa.map((item: FichaType) => {
                    return <ToggleButton value={item.id}>{item.nome_personagem}</ToggleButton>
                })}
            </ToggleButtonGroup>
            <DetalhesFichaCoC pk={fichaSelecionada} />
        </React.Fragment>
    )
}