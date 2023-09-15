import { ReactNode, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { ActionIcon, Button, Card, Checkbox, Grid, Group, NumberInput, Stack, TextInput, Textarea } from "@mantine/core";
import { FormValidateInput } from "@mantine/form/lib/types";
import { NotificationProps, notifications } from "@mantine/notifications";
import { FetchDataSelect } from "./FetchDataSelect";
import { LookupClass, LookupClient } from "../services/LookupService";
import { useTranslation } from "react-i18next";
import { NotificationKeys } from "../Constants";
import { TitleDividerWithIcon } from "./TitleDividerWithIcon";
import { IconTrash } from "@tabler/icons-react";

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
    hasSubregister?: boolean;
}

export interface FormMapping {
    key: string;
    label?: string | ReactNode;
    dataType: 'string' | 'number' | 'text' | 'boolean' | 'select' | 'array';
    notNull?: boolean;
    span?: number;
    defaultValue?: any;
    lookupClass?: LookupClass;
    arrayMapping?: FormMapping[];
}

export interface FormProps extends InlineFormProps{
    selectedUuid: string;
    onCancel: () => void;
    title?: ReactNode;
}

export function Form(props: FormProps) {
    const [ saving, setSaving ] = useState(false);
    const [ data, setData ] = useState(undefined);

    const form = useForm<any>({
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
                form.setValues(formData);
                form.resetDirty(formData);
            });
        } else { 
            (props.formMapping ?? []).forEach(entry => {
                formData[entry.key] = entry.dataType !== 'array' ? entry.defaultValue ?? '' : [];
            });
            form.setValues(formData);
            form.resetDirty(formData);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.selectedUuid]);



    
    return <>
        {props.title}
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
                            case 'array': field = <Card>
                                {typeof entry.label === 'string' && <TitleDividerWithIcon label={entry.label} />}
                                {typeof entry.label !== 'string' && entry.label}
                                <Stack px={"lg"}>
                                    {(entry.arrayMapping ?? []).map((sub) => {
                                        let subK = sub.key;
                                        let item = form.values[entry.key] ?? [];
                                        console.log(item);
                                        return (item).map((itemI: any, index: any) => {
                                            let subF;
                                            if (subK !== 'id') {
                                                switch (sub.dataType) {
                                                    case 'string': subF = <TextInput withAsterisk={sub.notNull} label={sub.label} {...form.getInputProps(`${entry.key}.${index}.${subK}`)} />; break;
                                                    case 'number': subF = <NumberInput withAsterisk={sub.notNull} label={sub.label} {...form.getInputProps(`${entry.key}.${index}.${subK}`)} />; break;
                                                    case 'text': subF = <Textarea withAsterisk={sub.notNull} label={sub.label} {... form.getInputProps(`${entry.key}.${index}.${subK}`)} />; break;
                                                    case 'boolean': subF = <Checkbox label={sub.label} {...form.getInputProps(`${entry.key}.${index}.${subK}`, { type: 'checkbox' })} />; break;
                                                    case 'select': subF = <FetchDataSelect lookupClient={props.lookupClient} lookupClass={sub.lookupClass!} label={sub.label} notNull={sub.notNull} form={form} formKey={`${entry.key}.${index}.${subK}`} />; break;
                                                    default: field = undefined;
                                                }
                                            }
                                            if (subF !== undefined) {
                                                return <Grid grow align="center">
                                                    <Grid.Col sm={11} md={11} lg={11}>
                                                        {subF}
                                                    </Grid.Col>
                                                    <ActionIcon onClick={() => {
                                                        form.removeListItem(entry.key, index);
                                                    }}>
                                                        <IconTrash />
                                                    </ActionIcon>
                                                </Grid>
                                            }
                                            return undefined;
                                        });
                                    })}
                                    <Group position="right"> 
                                        <Button onClick={() => {
                                            form.insertListItem(entry.key, {});
                                        }}>{t('buttons.add')}</Button>
                                    </Group>
                                </Stack>
                            </Card>; break;
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
                        <Button color="red" disabled={saving} onClick={props.onCancel}>{t('buttons.cancel')}</Button>
                    </Group>
                </Grid.Col>
            </Grid>
        </form>
    </>
}