import { IconList, IconPencil } from "@tabler/icons-react";
import { TitleDividerWithIcon } from "../../ui/TitleDividerWithIcon";
import { CoCService } from "../../services/CoCService";
import { ClickablePaper } from "../../ui/ClickablePaper";
import { Listing } from "../../ui/Listing";
import { isNotEmpty } from "@mantine/form";

export function COCPulpTalentListing() {

    return <Listing 
        dataFetch={CoCService.getPulpTalentsListing}
        dataMap={(item: any, onDelete, onClick) => {
            return <ClickablePaper onClick={() => {
                if (onClick) {
                    onClick!();
                }
            }} title={item.name} trailingIcon={IconPencil} onDelete={() => {
                if (onDelete) {
                    onDelete!(item.id);
                }
            }}/>
        }} 
        onDelete={CoCService.deletePulpTalent}
        title={<TitleDividerWithIcon icon={<IconList /> } label="Call of Cthulhu - Talentos (PCoC)" />} 
        modalTitleUpdate="Editar talento (PCoC)"
        modalTitleAdd="Adicionar talento (PCoC)"
        formProps={{
            dataFetch: CoCService.getPulpTalent,
            add: CoCService.addPulpTalent,
            update: CoCService.updatePulpTalent,
            formMapping: [
                {
                    key: 'name',
                    label: 'Nome',
                    dataType: 'string',
                    notNull: true,
                },
                {
                    key: 'description',
                    label: 'Descrição',
                    dataType: 'text',
                    notNull: true,
                }
            ],
            validate: {
                name: isNotEmpty("Nome não pode ser vazio!"),
                description: isNotEmpty("Descrição não pode ser vazio!")
            },
            saveMessage: {
                message: "Talento salva com sucesso!",
                id: "success_coc_pulp_talent_saved",
                color: 'green'
            }
        }}
    />
}