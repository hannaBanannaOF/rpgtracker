import { SessionBase, SessionWithSheets } from "../models/Session";
import { useState } from "react";
import { COCCharacterSheet } from "../models/CharacterSheet";
import { CoCService } from "../services/CoCService";
import TitleDividerWithIcon from "./TitleDividerWithIcon";
import { GiArchiveResearch } from "react-icons/gi";
import { useSubscription } from "react-stomp-hooks";
import { useAuth } from "../providers/AuthProvider";
import { Center, Grid, SegmentedControl, Skeleton } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { DetalhesFichaCoC } from "./DetalhesFichaCoC";
import { GoBack } from "./GoBack";

export interface DetalhesMesaCoCProps {
    mesa?: SessionBase | null;
}

export function DetalhesMesaCoC(props: DetalhesMesaCoCProps) {

    const [characterName, setCharacterName] = useState(undefined);
    const [playerName, setPlayerName] = useState(undefined);
    const [ selectedSheet, setSelectedSheet ] = useState<COCCharacterSheet | null>(null);
    const [ selectedSheetId, setSelectedSheetId ] = useState<string | undefined>(undefined);
    const [ mesaWithFullInfo, setMesaWithFullInfo ] = useState<SessionWithSheets | null>(null);
    const [ loading, setLoading ] = useState(false);

    const auth = useAuth();

    useSubscription([`/topic/${auth.currentUser?.uuid}/sessions/${props.mesa?.uuid}`, `/topic/${auth.currentUser?.uuid}/character-sheet/${selectedSheetId}/infos`], (message) => {
        let data = JSON.parse(message.body);
        if (data['infos'] && data['session']) {
            setMesaWithFullInfo(data.infos[0]);
        }
        if (data['infos'] && !data['session']) {
            let first = data.infos[0];
            if (first['characterName']) {
                setCharacterName(first.characterName);
            }
        }
        if (data['users']) {
            let first = data.users[0];
            if (first['displayName']) {
                setPlayerName(first.displayName);
            }
        }
    })

    const handleChange = (v: string) => {
        setSelectedSheetId(undefined);
        setCharacterName(undefined);
        setPlayerName(undefined);
        if (v != null) {
            setSelectedSheetId(v);
            setLoading(true);
            CoCService.getFicha(v).then(res => {
                setSelectedSheet(res.data);
                setLoading(false);
            }).catch(err => {
                notifications.show({
                    id: "error_ficha_not_found",
                    message: "Não foi possível buscar detalhes da ficha!",
                    color: "red"
                });
                setSelectedSheetId(undefined);
                setSelectedSheet(null);
                setLoading(false);
            });
        }
    }

    return <Grid grow>
        <Grid.Col>
            <GoBack />
        </Grid.Col>
        <Grid.Col span={12}>
            <TitleDividerWithIcon icon={<GiArchiveResearch size={20}/>} label="Fichas da mesa"/>
            <Skeleton visible={mesaWithFullInfo == null}>
                <Center>
                    <SegmentedControl  color="teal"
                        onChange={handleChange}
                        value={selectedSheetId}
                        data={(mesaWithFullInfo?.sessionSheets ?? []).map((e) => {
                            return {label: e.characterName, value: e.uuid}
                        })}
                    />
                </Center>
                {selectedSheetId && <Skeleton visible={loading}>
                    <TitleDividerWithIcon label="Detalhes da ficha" />
                    <DetalhesFichaCoC ficha={selectedSheet} fromSession playerName={playerName} characterName={characterName} />
                </Skeleton>}
            </Skeleton>
        </Grid.Col>
    </Grid>
}