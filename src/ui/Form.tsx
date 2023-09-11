import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Checkbox, Grid, Group, NumberInput, TextInput, Textarea } from "@mantine/core";
import { FormValidateInput } from "@mantine/form/lib/types";
import { NotificationProps, notifications } from "@mantine/notifications";
import { FetchDataSelect } from "./FetchDataSelect";

export interface InlineFormProps {
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
    lookupClass?: 'skillRarity' | 'skillKind' | 'notUsableSkill' | 'usableSkill' | 'ammo' | 'skillPointCalculationRule';
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
            console.log(updatedValues);
            if (data && props.update) {
                setSaving(true);
                console.log(values);
                props.update(updatedValues).then((res) => {
                    notifications.show(props.saveMessage ?? {
                        message: "Dados salvos com sucesso!",
                        id: "success_data_saved",
                        color: 'green'
                    });
                    if (props.onSaveSucess) {
                        props.onSaveSucess();
                    }
                }).catch((err) => {
                    if (props.onSaveError) {
                        props.onSaveError(err);
                    } else {
                        notifications.show({
                            message: "Erro ao salvar dados!",
                            id: "error_data_save_unexpected",
                            color: 'red'
                        });
                    }
                    setSaving(false);
                });
            } else if (!data && props.add) {
                setSaving(true);
                props.add(updatedValues).then((res) => {
                    notifications.show(props.saveMessage ?? {
                        message: "Dados salvos com sucesso!",
                        id: "success_data_saved",
                        color: 'green'
                    });
                    if (props.onSaveSucess) {
                        props.onSaveSucess();
                    }
                }).catch((err) => {
                    if (props.onSaveError) {
                        props.onSaveError(err);
                    } else {
                        notifications.show({
                            message: "Erro ao salvar dados!",
                            id: "error_data_save_unexpected",
                            color: 'red'
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
                            case 'select': field = <FetchDataSelect lookupClass={entry.lookupClass} label={entry.label} notNull={entry.notNull} form={form} formKey={entry.key} />; break;
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
                        <Button type="submit" disabled={!form.isValid()} loading={saving}>Salvar</Button>
                    </Group>
                </Grid.Col>
            </Grid>
        </form>
    </>
}