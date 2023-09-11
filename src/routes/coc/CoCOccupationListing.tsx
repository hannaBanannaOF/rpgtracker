import { IconList, IconPencil } from "@tabler/icons-react";
import { TitleDividerWithIcon } from "../../ui/TitleDividerWithIcon";
import { CoCService } from "../../services/CoCService";
import { ClickablePaper } from "../../ui/ClickablePaper";
import { Listing } from "../../ui/Listing";
import { isNotEmpty } from "@mantine/form";

export function CoCOccupationListing() {

    return <Listing 
        dataFetch={CoCService.getOccupationsListing}
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
        title={<TitleDividerWithIcon icon={<IconList /> } label="Call of Cthulhu - Ocupações" />}
        onDelete={CoCService.deleteOccupation}
        modalTitleUpdate="Editar arma"
        modalTitleAdd="Adicionar arma"
        formProps={{
            dataFetch: CoCService.getOccupation,
            update: CoCService.updateOccupation,
            add: CoCService.addOccupation,
            formMapping: [
                {
                    key: 'name',
                    label: 'Nome',
                    dataType: 'string',
                    notNull: true,
                    span: 12
                },
                {
                    key: 'description',
                    label: 'Descrição',
                    dataType: 'text',
                    notNull: true,
                    span: 12
                },
                {
                    key: 'skillPointCalculationRule',
                    label: 'Regra de cálculo de pontos de ocupação',
                    dataType: 'select',
                    lookupClass: 'skillPointCalculationRule',
                    notNull: true,
                    span: 12
                },
                {
                    key: 'minimumCreditRating',
                    label: 'Rank de crédito mínimo',
                    dataType: 'number',
                    notNull: true,
                    span: 6
                },
                {
                    key: 'maximumCreditRating',
                    label: 'Rank de crédito máximo',
                    dataType: 'number',
                    notNull: true,
                    span: 6
                },
                {
                    key: 'suggestedContacts',
                    label: 'Contatos sugeridos',
                    dataType: 'text',
                    span: 12
                },
                {
                    key: 'epochPersonalSkillChoices',
                    label: 'Escolha de skills - Época ou Pessoal',
                    dataType: 'number',
                    span: 12
                },
                {
                    key: 'typedSkillChoices',
                    label: 'Escolha de skills - Por tipo',
                    dataType: 'number',
                    span: 6
                },
                {
                    key: 'typedSkillChoicesKind',
                    label: 'Tipo da skill',
                    dataType: 'select',
                    lookupClass: 'skillKind',
                    span: 6
                },
            ],
            validate: {
                name: isNotEmpty("Nome não pode ser vazio!"),
                description: isNotEmpty("Descrição não pode ser vazio!"),
                skillPointCalculationRule: isNotEmpty("Regra de cálculo de pontos de ocupação não pode ser vazio!"),
                minimumCreditRating: isNotEmpty("Rank de crédito mínimo não pode ser vazio!"),
                maximumCreditRating: isNotEmpty("Rank de crédito máximo não pode ser vazio!"),
            },
            saveMessage: {
                message: "Arma salva com sucesso!",
                id: "success_coc_weapon_saved",
                color: 'green'
            }
        }}  
    />
}