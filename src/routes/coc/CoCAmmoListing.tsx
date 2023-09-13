import { IconList, IconPencil } from "@tabler/icons-react";
import { TitleDividerWithIcon } from "../../ui/TitleDividerWithIcon";
import { ClickablePaper } from "../../ui/ClickablePaper";
import { Listing } from "../../ui/Listing";
import { isNotEmpty } from "@mantine/form";
import { CoCAmmoService } from "../../services/coc/CoCAmmoService";
import { useTranslation } from "react-i18next";
import { NotificationKeys } from "../../Constants";

export function CoCAmmoListing() {

    const { t } = useTranslation('listings', { keyPrefix: 'coc.ammo' });

    return<Listing
        dataFetch={CoCAmmoService.getAmmoListing}
        title={<TitleDividerWithIcon icon={<IconList /> } label={t('title')} />}
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
        onDelete={CoCAmmoService.deleteAmmo}
        modalTitleUpdate={t('form.edit')}
        modalTitleAdd={t('form.add')}
        formProps={{
            lookupClient: 'coc',
            dataFetch: CoCAmmoService.getAmmo,
            update: CoCAmmoService.updateAmmo,
            add: CoCAmmoService.addAmmo,
            formMapping: [
                {
                    key: 'name',
                    label: t('form.mappings.name.label'),
                    dataType: 'string',
                    notNull: true,
                    span: 7
                },
                {
                    key: 'roundsShotWithEach',
                    label: t('form.mappings.roundsShot.label'),
                    dataType: 'number',
                    notNull: true,
                    span: 5
                }
            ],
            validate: {
                name: isNotEmpty(t('form.mappings.name.notNullMessage')),
                roundsShotWithEach: isNotEmpty(t('form.mappings.roundsShot.notNullMessage'))
            },
            saveMessage: {
                message: t('form.saveMessage'),
                ...NotificationKeys.SuccessCoCAmmoSave
            }
        }}
    />
}