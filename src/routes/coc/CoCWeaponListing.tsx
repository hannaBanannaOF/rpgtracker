import { IconList, IconPencil } from "@tabler/icons-react";
import { TitleDividerWithIcon } from "../../ui/TitleDividerWithIcon";
import { CoCService } from "../../services/CoCService";
import { ClickablePaper } from "../../ui/ClickablePaper";
import { Listing } from "../../ui/Listing";
import { isNotEmpty } from "@mantine/form";

export function CoCWeaponListing() {

    return <Listing 
        dataFetch={CoCService.getWeaponsListing}
        dataMap={(item: any, onDelete, onClick) => {
            return <ClickablePaper onClick={() => {
                if (onClick) {
                    onClick!();
                }
            }} title={item.name} trailingIcon={IconPencil} onDelete={() => {
                if (onDelete) {
                    onDelete!(item.id);
                }
            }} />
        }}
        title={<TitleDividerWithIcon icon={<IconList /> } label="Call of Cthulhu - Armas" />}
        onDelete={CoCService.deleteWeapon}
        modalTitleUpdate="Editar arma"
        modalTitleAdd="Adicionar arma"
        formProps={{
            dataFetch: CoCService.getWeapon,
            update: CoCService.updateWeapon,
            add: CoCService.addWeapon,
            formMapping: [
                {
                    key: 'name',
                    label: 'Nome',
                    dataType: 'string',
                    notNull: true,
                    span: 8
                },
                {
                    key: 'range',
                    label: 'Alcance',
                    dataType: 'string',
                    span: 4
                },
                {
                    key: 'damage',
                    label: 'Dano',
                    dataType: 'string',
                    notNull: true,
                    span: 4
                },
                {
                    key: 'attacksPerRound',
                    label: 'Ataques',
                    dataType: 'number',
                    notNull: true,
                    defaultValue: 1,
                    span: 4
                },
                {
                    key: 'malfunction',
                    label: 'Defeito',
                    dataType: 'number',
                    span: 4
                },
                {
                    key: 'isMelee',
                    label: 'Arma mano-a-mano',
                    dataType: 'boolean',
                    notNull: true,
                    defaultValue: false,
                    span: 4
                },
                {
                    key: 'isThrowable',
                    label: 'Arremessável',
                    dataType: 'boolean',
                    notNull: true,
                    defaultValue: false,
                    span: 4
                },
                {
                    key: 'isDualWield',
                    label: 'Dual wielding',
                    dataType: 'boolean',
                    notNull: true,
                    defaultValue: false,
                    span: 4
                },
                {
                    key: 'skillUsedId',
                    label: 'Skill utilizada',
                    dataType: 'select',
                    lookupClass: 'usableSkill',
                    notNull: true,
                    span: 6
                },
                {
                    key: 'ammoId',
                    label: 'Munição utilizada',
                    dataType: 'select',
                    lookupClass: 'ammo',
                    span: 6
                }
            ],
            validate: {
                name: isNotEmpty("Nome não pode ser vazio!"),
                damage: isNotEmpty("Dano não pode ser vazio!"),
                attacksPerRound: isNotEmpty("Ataques não pode ser vazio!"),
                skillUsedId: isNotEmpty("Skill utilizada não pode ser vazio!"),
            },
            saveMessage: {
                message: "Arma salva com sucesso!",
                id: "success_coc_weapon_saved",
                color: 'green'
            }
        }} 
    />
}