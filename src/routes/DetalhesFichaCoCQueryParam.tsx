import { Skeleton } from "@mui/lab";
import { useSnackbar } from "notistack";
import { useQuery } from "../components/hooks/useQuery";
import { COCCharacterSheet } from "../components/models/CharacterSheet";
import { CoCService } from "../components/services/CoCService";
import { DetalhesFichaCoC } from "../ui/DetalhesFichaCoC";
import { useEffect, useState } from "react";

export function DetalhesFichaCoCQueryParam() {
    const query = useQuery();
    const { enqueueSnackbar } = useSnackbar();

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
                enqueueSnackbar("Não foi possível buscar detalhes da ficha!", {
                    variant: "error",
                    key: "error_ficha_not_found"
                });
            });
        } else {
            setLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fichaId])

    return loading ? <Skeleton variant='rectangular' animation='wave'/> : <DetalhesFichaCoC ficha={ficha}></DetalhesFichaCoC>
}