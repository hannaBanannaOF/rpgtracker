import { ReactNode, useEffect, useState } from "react";
import { useQuery } from "../hooks/useQuery";
import { Button, Center, Group, Modal, Pagination, ScrollArea, Skeleton, Stack } from "@mantine/core";
import { TitleDividerWithIcon } from "./TitleDividerWithIcon";
import { IconList } from "@tabler/icons-react";
import { DefaultEmpty } from "./DefaultEmpty";
import { useLocation, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { Form, InlineFormProps } from "./Form";
import { useDisclosure } from "@mantine/hooks";

export interface ListingProps {
    title?: string | ReactNode;
    dataFetch: (page: number) => Promise<any>;
    dataFetchError?: (err?: any) => void;
    dataMap: (e: any, onDelete?: (uuid: string) => void, onClick?: () => void) => ReactNode;
    onDelete?: (uuid: string) => Promise<any>;
    formProps?: InlineFormProps;
    modalTitleUpdate?: string,
    modalTitleAdd?: string,
}

export function Listing(props: ListingProps) {
    const query = useQuery();
    const page = Number(query.get("page"));

    const [ loading, setLoading ] = useState(true);
    const [ data, setData ] = useState<any[]>([]);
    const [ totalPages, setTotalPages ] = useState(0);
    const [ selected, setSelected ] = useState();
    const [ adding, setAdding ] = useState(false);

    const [ opened, { open, close } ] = useDisclosure();

    let navigate = useNavigate();
    let location = useLocation();

    const getItems = () => {
        setLoading(true);
        props.dataFetch(page).then((res) => {
            // Padrão Spring pagination
            setData(res.data.content);
            setTotalPages(res.data.totalPages)
            setLoading(false);
        }).catch((err) => {
            if (props.dataFetchError) {
                props.dataFetchError();
            } else {
                notifications.show({
                    message: "Erro ao buscar dados!",
                    id: "error_data_unexpected",
                    color: 'red'
                  });
            }
        });
    }

    useEffect(() => {
        getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return <>
        {(typeof props.title === 'string') && <TitleDividerWithIcon icon={<IconList />} label={props.title}/>}
        {(typeof props.title !== 'string') && props.title}
        <Skeleton visible={loading}>
            {props.formProps?.add && (data.length ?? 0) > 0 && <Group position={"right"}>
                <Button onClick={() => {
                    setAdding(true);
                    open();
                }}>Adicionar</Button>
            </Group>}
            <DefaultEmpty visible={(data.length ?? 0) === 0} add={() => {
                setAdding(true);
                open();
            }}>
                <Stack mt={25} mb={totalPages > 1 ? 10 : 0}>
                    {data.map((i) => {
                        return props.dataMap(i, props.onDelete ? (uuid: string) => {
                            props.onDelete!(uuid).then((_) => {
                                notifications.show({
                                    message: "Excluído com sucesso!",
                                    id: 'success_delete_item',
                                    color: 'green'
                                });
                                getItems();
                            }).catch((err) => {
                                notifications.show({
                                    message: "Não foi possível excluír item!",
                                    id: 'error_delete_item',
                                    color: 'red'
                                });
                            })
                        } : undefined, () => {
                            setSelected(i);
                            open();
                        });
                    })}
                </Stack>
                {totalPages > 1 && <Center>
                    <Pagination value={page+1} total={totalPages ?? 0} onChange={(newPage) => {
                        navigate(`${location.pathname}?page=${newPage-1}`)
                    }}/>
                </Center>}
            </DefaultEmpty>
            {props.formProps &&
            <Modal opened={opened} onClose={() => {
                close();
                setSelected(undefined);
                setAdding(false);
            }} title={adding ? props.modalTitleAdd : props.modalTitleUpdate} scrollAreaComponent={ScrollArea.Autosize}>
                <Form
                    selectedUuid={(selected ?? {id: ''}).id}
                    dataFetch={props.formProps.dataFetch}
                    update={props.formProps.update}
                    add={props.formProps.add}
                    formMapping={props.formProps.formMapping}
                    validate={props.formProps.validate}
                    saveMessage={props.formProps.saveMessage}
                    onSaveError={props.formProps.onSaveError}
                    onSaveSucess={() => {
                        getItems();
                        close();
                        setSelected(undefined);
                        setAdding(false);
                    }}
                />
            </Modal>}
        </Skeleton>
    </>
}