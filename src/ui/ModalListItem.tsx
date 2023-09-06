import { useDisclosure } from '@mantine/hooks';
import { Group, Modal, Paper, Text, UnstyledButton } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

interface ModalListItemProps {
    listItemText: string,
    dialogTitle: string,
    children: any
}

export function ModalListItem(props: ModalListItemProps) {

    const [opened, { open, close }] = useDisclosure(false);

    return <>
        <UnstyledButton onClick={open}>
            <Paper p={12} shadow="sm" sx={(theme) => ({
                padding: theme.spacing.md,
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.white
            })}>
                <Group position='apart'>
                    <Text>{props.listItemText}</Text>
                    <IconInfoCircle />
                </Group>
            </Paper>
        </UnstyledButton>
        <Modal opened={opened} onClose={close} title={props.dialogTitle}>
            {props.children}
        </Modal>
    </>;

}