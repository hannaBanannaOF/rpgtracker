import { SessionSheet, SessionWithSheets } from "../components/models/Session";
import React, { useState } from "react";
import { COCCharacterSheet } from "../components/models/CharacterSheet";
import { ToggleButtonGroup, ToggleButton, Divider, Typography, Skeleton } from "@mui/material";
import { DetalhesFichaCoC } from "./DetalhesFichaCoC";
import { CoCService } from "../components/services/CoCService";
import { useSnackbar } from "notistack";

export interface DetalhesMesaCoCProps {
    mesa?: SessionWithSheets | null;
}

export function DetalhesMesaCoC(props: DetalhesMesaCoCProps) {

    const { enqueueSnackbar } = useSnackbar();

    const [ selectedSheet, setSelectedSheet ] = useState<COCCharacterSheet | null>(null);
    const [ selectedSheetId, setSelectedSheetId ] = useState<string | null>(null);
    const [ loading, setLoading ] = useState(false);

    const handleChange = (e: any, v: string) => {
        if (v != null) {
            setSelectedSheetId(v);
            setLoading(true);
            CoCService.getFicha(v).then(res => {
                setSelectedSheet(res.data);
                setLoading(false);
            }).catch(err => {
                enqueueSnackbar("Não foi possível buscar detalhes da ficha!", {
                    variant: "error",
                    key: "error_ficha_not_found"
                });
                setSelectedSheetId(null);
                setSelectedSheet(null);
                setLoading(false);
            });
        }
    }

    return <React.Fragment>
        <Divider textAlign='left'>
            <Typography variant='h6' component="div">Fichas da mesa</Typography>
        </Divider>
        <ToggleButtonGroup
            onChange={handleChange}
            value={selectedSheetId}
            exclusive
            sx={{ marginBottom: "24px" }}
        >
            {props.mesa?.characterSheets.map((sheet: SessionSheet) => {
                return <ToggleButton value={sheet.uuid} color={"primary"}>{sheet.characterName}</ToggleButton>
            })}
        </ToggleButtonGroup>
        <React.Fragment>
            { selectedSheetId && <Divider textAlign='left'>
                <Typography variant='h6' component="div">Detalhes da ficha</Typography>
            </Divider>}
            {loading ? <Skeleton variant='rectangular' animation='wave'/> : <DetalhesFichaCoC ficha={selectedSheet} />}
        </React.Fragment>
    </React.Fragment>
}