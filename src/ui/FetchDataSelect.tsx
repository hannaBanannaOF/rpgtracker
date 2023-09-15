import { Loader, Select } from "@mantine/core";
import { ReactNode, useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { UseFormReturnType } from "@mantine/form";
import { LookupClass, LookupClient, LookupService } from "../services/LookupService";
import { useDebouncedValue } from "@mantine/hooks";
import { DefaultEmpty } from "./DefaultEmpty";
import { useTranslation } from "react-i18next";
import { NotificationKeys } from "../Constants";

export interface FetchDataSelectProps {
    formKey: string;
    lookupClass: LookupClass,
    label?: string | ReactNode,
    notNull?: boolean,
    form: UseFormReturnType<any>,
    lookupClient: LookupClient
}

export function FetchDataSelect(props: FetchDataSelectProps) {
    const [ data, setData ] = useState<any>();
    const [ loading, setLoading ] = useState(true);
    const [ query, setQuery ] = useState<string | undefined>(undefined);

    const [ debouncedQuery ] = useDebouncedValue(query, 200);

    const { t } = useTranslation('notifications');
    
    useEffect(() => {
        setLoading(true);
        let search = debouncedQuery === '' ? undefined : debouncedQuery;
        let initialData = search !== undefined ? props.form.getInputProps(props.formKey).value : undefined;
        LookupService.lookupData(props.lookupClient, props.lookupClass, initialData, search).then((res) => {
            setData(res.data.content);
            setLoading(false);
        }).catch(err => {
            notifications.show({
                message: t('lookup.fetchError'),
                ...NotificationKeys.ErrorLookup
            });
            setLoading(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.form.getInputProps(props.formKey).value, debouncedQuery])

    return <Select label={props.label} data={data ?? []} withAsterisk={props.notNull}
        nothingFound={data && <DefaultEmpty visible={true} />} 
        rightSection={loading && <Loader size="xs" />}
        dropdownPosition="bottom"
        searchable
        onSearchChange={(query) => {
            setQuery(query);
        }}
        searchValue={query}
        {...props.form.getInputProps(props.formKey)}
    />
}