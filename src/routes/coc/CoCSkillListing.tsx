import { IconList, IconPencil } from "@tabler/icons-react";
import { TitleDividerWithIcon } from "../../ui/TitleDividerWithIcon";
import { CoCService } from "../../services/CoCService";
import { ClickablePaper } from "../../ui/ClickablePaper";
import { Listing } from "../../ui/Listing";
import { isNotEmpty } from "@mantine/form";

export function CoCSkillListing() {

    return <Listing
        dataFetch={CoCService.getSkillListing}
        title={<TitleDividerWithIcon icon={<IconList /> } label="Call of Cthulhu - Perícias" />}
        dataMap={(item: any, onDelete, onClick) => {
            return <ClickablePaper key={item.id} onClick={() => {
                if (onClick) {
                    onClick();
                }
            }} title={item.fullName} trailingIcon={IconPencil} onDelete={() => {
                if (onDelete) {
                    onDelete!(item.id);
                }
            }}/>
        }}
        onDelete={CoCService.deleteSkill}
        modalTitleUpdate="Editar perícia"
        modalTitleAdd="Adicionar perícia"
        formProps={{
            dataFetch: CoCService.getSkill,
            update: CoCService.updateSkill,
            add: CoCService.addSkill,
            formMapping: [
                {
                    key: 'name',
                    label: 'Nome',
                    dataType: 'string',
                    notNull: true,
                    span: 8
                },
                {
                    key: 'baseValue',
                    label: 'Valor base',
                    dataType: 'number',
                    span: 4
                },
                {
                    key: 'usable',
                    label: 'Utilizável em ficha',
                    dataType: 'boolean',
                    span: 12,
                    defaultValue: true
                },
                {
                    key: 'rarity',
                    label: 'Raridade',
                    dataType: 'select',
                    notNull: true,
                    lookupClass: 'skillRarity',
                    span: 6
                },
                {
                    key: 'kind',
                    label: 'Tipo',
                    dataType: 'select',
                    notNull: true,
                    lookupClass: 'skillKind',
                    span: 6
                },
                {
                    key: 'parentSkillId',
                    label: 'Skill pai',
                    dataType: 'select',
                    lookupClass: 'notUsableSkill',
                    span: 12
                }
            ],
            validate: {
                name: isNotEmpty("Nome não pode ser vazio!"),
                rarity: isNotEmpty("Raridade não pode ser vazio!"),
                kind: isNotEmpty("Tipo não pode ser vazio!")
            },
            saveMessage: {
                message: "Perícia salva com sucesso!",
                id: "success_coc_skill_saved",
                color: 'green'
            }
        }}
    />
}