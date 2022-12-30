import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { SessionWithSheets } from "../components/models/Session";
import { useQuery } from "../components/hooks/useQuery";
import { CoCService } from "../components/services/CoCService";
import { Skeleton } from "@mui/material";
import { DetalhesMesaCoC } from "../ui/DetalhesMesaCoC";

export function DetalhesMesaCoCQueryParam() {
    const query = useQuery();

    const [loading, setLoading] = useState(true);
    const [mesa, setMesa] = useState<SessionWithSheets | null>(null);
    const { enqueueSnackbar } = useSnackbar();
    
    const mesaId = query.get("uuid");    
    
    useEffect(() => {
        setLoading(true);
        if (mesaId) {
            CoCService.getMesa(mesaId).then(res => {
                setMesa(res.data);
                setLoading(false);
            }).catch(err => {
                enqueueSnackbar("Não foi possível buscar detalhes da mesa!", {
                    variant: 'error',
                    key: 'error_mesa_not_found'
                });
            });
        } else {
            enqueueSnackbar("Não foi possível buscar detalhes da mesa!", {
                variant: 'error',
                key: 'error_mesa_not_found'
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mesaId])

    return loading ? <Skeleton variant='rectangular' animation='wave'/> : <DetalhesMesaCoC mesa={mesa}></DetalhesMesaCoC>
}