import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { MesaBase } from "../components/models/Mesa";
import { useQuery } from "../components/routes/WithRouter";
import { CoCService } from "../components/services/CoCService";

export function DetalhesMesaCoC() {
    const query = useQuery();
    const mesaId = query.get("pk") as unknown as number;    

    const [loading, setLoading] = useState(true);
    const [mesa, setMesa] = useState<MesaBase | null>(null);
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        setLoading(true);
        CoCService.getMesa(mesaId).then(res => {
            setMesa(res.data);
            setLoading(false);
        }).catch(err => {
            //err.response?.data?.detail ?? ""
            enqueueSnackbar("Não foi possível buscar detalhes da mesa!", {
                variant: 'error',
                key: 'error_mesa_not_found'
            });
        });
    }, [mesaId])
}