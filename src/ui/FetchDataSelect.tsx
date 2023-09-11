import { Loader, Select, Skeleton } from "@mantine/core";
import { useEffect, useState } from "react";
import { CoCService } from "../services/CoCService";
import { notifications } from "@mantine/notifications";
import { UseFormReturnType } from "@mantine/form";

export interface FetchDataSelectProps {
    formKey: string;
    lookupClass?: 'skillRarity' | 'skillKind' | 'notUsableSkill' | 'usableSkill' | 'ammo' | 'skillPointCalculationRule',
    label: string,
    notNull?: boolean,
    form: UseFormReturnType<any>,
}

export function FetchDataSelect(props: FetchDataSelectProps) {
    const [ data, setData ] = useState<any>();
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        setLoading(true);
            let initialData = props.form.getInputProps(props.formKey).value;
            CoCService.lookupData(props.lookupClass, initialData === undefined ? '' : initialData).then((res) => {
                setData(res.data.content);
            }).catch(err => {
                notifications.show({
                    message: 'Erro ao buscar valores do Lookup!',
                    id: 'error_lookup_data',
                    color: 'red'
                });
                setLoading(false)
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.form])

    return <Select label={props.label} data={data ?? []} withAsterisk={props.notNull}
        nothingFound={data && "Nada aqui :/"} 
        rightSection={!data && loading && <Loader size="xs" />}
        dropdownPosition="bottom"
        {...props.form.getInputProps(props.formKey)}
    />
}