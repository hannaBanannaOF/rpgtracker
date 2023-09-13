import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Checkbox, Grid, Group, NumberInput, TextInput, Textarea } from "@mantine/core";
import { FormValidateInput } from "@mantine/form/lib/types";
import { NotificationProps, notifications } from "@mantine/notifications";
import { FetchDataSelect } from "./FetchDataSelect";
import { LookupClass, LookupClient } from "../services/LookupService";
import { useTranslation } from "react-i18next";
import { NotificationKeys } from "../Constants";

export interface InlineFormProps {
    lookupClient: LookupClient;
    dataFetch? : (uuid: string) => Promise<any>;
    formMapping?: FormMapping[];
    validate?: FormValidateInput<{}>;
    update?: (data: any) => Promise<any>;
    add?: (data: any) => Promise<any>;
    onSaveSucess?: () => void;
    saveMessage?: NotificationProps;
    onSaveError?: (err: any) => void;
}

export interface FormMapping {
    key: string;
    label: string;
    dataType: 'string' | 'number' | 'text' | 'boolean' | 'select';
    notNull?: boolean;
    span?: number;
    defaultValue?: any;
    lookupClass?: LookupClass;
}

export interface FormProps extends InlineFormProps{
    selectedUuid: string;
}

export function Form(props: FormProps) {
    const [ saving, setSaving ] = useState(false);
    const [ data, setData ] = useState(undefined);

    const form = useForm({
        initialValues: {},
        validate: props.validate,
        validateInputOnChange: true
    });

    const { t } = useTranslation('general');

    useEffect(() => {
        let formData = {} as any;
        if (props.dataFetch && props.selectedUuid !== '') {
            props.dataFetch(props.selectedUuid).then(res => {
                setData(res.data);
                Object.entries(res.data).forEach((entry) => {
                    let key = entry[0];
                    let value = entry[1];
                    let mapping = props.formMapping?.find(map => map.key === key);
                    if (mapping !== undefined || key === 'id') {
                        formData[key] = value ?? '';
                    }
                });
                console.log(formData);
                form.setValues(formData);
                form.resetDirty(formData);
            });
        } else { 
            (props.formMapping ?? []).forEach(entry => {
                formData[entry.key] = entry.defaultValue ?? '';
            });
            form.setValues(formData);
            form.resetDirty(formData);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.selectedUuid]);



    
    return <>
        <form onSubmit={form.onSubmit((values) => {
            let updatedValues = {} as any
            Object.entries(values).forEach(e => {
                let key = e[0];
                let val = e[1];
                if (val === '') {
                    updatedValues[key] = null;
                } else {
                    updatedValues[key] = val;
                }
            });
            let func = data && props.update ? props.update : (!data && props.add ? props.add : null);
            if (func) {
                setSaving(true);
                func(updatedValues).then((res) => {
                    notifications.show(props.saveMessage ?? {
                        message: t('form.messages.saved'),
                        ...NotificationKeys.SuccessGenericSave
                    });
                    if (props.onSaveSucess) {
                        props.onSaveSucess();
                    }
                }).catch((err) => {
                    if (props.onSaveError) {
                        props.onSaveError(err);
                    } else {
                        notifications.show({
                            message: t('form.messages.saveError'),
                            ...NotificationKeys.ErrorGenericSave
                        });
                    }
                    setSaving(false);
                });
            }
        })}>
            <Grid grow>
                {(props.formMapping ?? []).map(entry => {
                    let key = entry.key;
                    let field;
                    if (key !== 'id') {
                        switch (entry.dataType) {
                            case 'string': field = <TextInput withAsterisk={entry.notNull} label={entry.label} {...form.getInputProps(key)} />; break;
                            case 'number': field = <NumberInput withAsterisk={entry.notNull} label={entry.label} {...form.getInputProps(key)} />; break;
                            case 'text': field = <Textarea withAsterisk={entry.notNull} label={entry.label} {... form.getInputProps(key)} />; break;
                            case 'boolean': field = <Checkbox label={entry.label} {...form.getInputProps(key, { type: 'checkbox' })} />; break;
                            case 'select': field = <FetchDataSelect lookupClient={props.lookupClient} lookupClass={entry.lookupClass!} label={entry.label} notNull={entry.notNull} form={form} formKey={entry.key} />; break;
                            default: field = undefined;
                        }
                    }
                    if (field !== undefined) {
                        return <Grid.Col md={entry?.span ?? 12} xs={12} key={entry.key}>
                            {field}
                        </Grid.Col>
                    }
                    return null
                })}
                <Grid.Col>
                    <Group position="right" mt="md">
                        <Button type="submit" disabled={!form.isValid()} loading={saving}>{t(saving ? 'buttons.saving' : 'buttons.save')}</Button>
                    </Group>
                </Grid.Col>
            </Grid>
        </form>
    </>
}