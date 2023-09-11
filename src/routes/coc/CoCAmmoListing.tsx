import { IconList, IconPencil } from "@tabler/icons-react";
import { TitleDividerWithIcon } from "../../ui/TitleDividerWithIcon";
import { CoCService } from "../../services/CoCService";
import { ClickablePaper } from "../../ui/ClickablePaper";
import { Listing } from "../../ui/Listing";
import { isNotEmpty } from "@mantine/form";

export function CoCAmmoListing() {
    return<Listing
        dataFetch={CoCService.getAmmoListing}
        title={<TitleDividerWithIcon icon={<IconList /> } label="Call of Cthulhu - Munição" />}
        dataMap={(item: any, onDelete, onClick) => {
            return <ClickablePaper key={item.id} onClick={() => {
                if (onClick) {
                    onClick();
                }
            }} title={item.name} trailingIcon={IconPencil} onDelete={() => {
                if (onDelete) {
                    onDelete!(item.id);
                }
            }}/>
        }}
        onDelete={CoCService.deleteAmmo}
        modalTitleUpdate="Editar munição"
        modalTitleAdd="Adicionar munição"
        formProps={{
            dataFetch: CoCService.getAmmo,
            update: CoCService.updateAmmo,
            add: CoCService.addAmmo,
            formMapping: [
                {
                    key: 'name',
                    label: 'Nome',
                    dataType: 'string',
                    notNull: true,
                    span: 8
                },
                {
                    key: 'roundsShotWithEach',
                    label: 'Tiros dados',
                    dataType: 'number',
                    notNull: true,
                    span: 4
                }
            ],
            validate: {
                name: isNotEmpty("Nome não pode ser vazio!"),
                roundsShotWithEach: isNotEmpty("Tiros dados não pode ser vazio!")
            },
            saveMessage: {
                message: "Munição salva com sucesso!",
                id: "success_coc_ammo_saved",
                color: 'green'
            }
        }}
    />
}