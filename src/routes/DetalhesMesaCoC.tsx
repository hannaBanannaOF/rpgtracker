import { notification } from "antd";
import { useEffect, useState } from "react";
import { MesaBase } from "../components/models/Mesa";
import { useQuery } from "../components/routes/WithRouter";
import { CoCService } from "../components/services/CoCService";

export function DetalhesMesaCoC() {
    const query = useQuery();
    const mesaId = query.get("pk") as unknown as number;    

    const [loading, setLoading] = useState(true);
    const [mesa, setMesa] = useState<MesaBase | null>(null);

    useEffect(() => {
        setLoading(true);
        CoCService.getMesa(mesaId).then(res => {
            setMesa(res.data);
            setLoading(false);
        }).catch(err => {
            notification.error({
                message: "Não foi possível buscar detalhes da mesa!",
                description: err.response?.data?.detail ?? ""
            });
        });
    }, [mesaId])
}