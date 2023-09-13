import { IconList, IconPencil } from "@tabler/icons-react";
import { TitleDividerWithIcon } from "../../ui/TitleDividerWithIcon";
import { ClickablePaper } from "../../ui/ClickablePaper";
import { Listing } from "../../ui/Listing";
import { isNotEmpty } from "@mantine/form";
import { CoCPulpTalentService } from "../../services/coc/CoCPulpTalentService";
import { useTranslation } from "react-i18next";
import { NotificationKeys } from "../../Constants";

export function COCPulpTalentListing() {

    const { t } = useTranslation('listings', { keyPrefix: 'coc.pulpTalent' })

    return <Listing 
        dataFetch={CoCPulpTalentService.getPulpTalentsListing}
        dataMap={(item: any, onDelete, onClick) => {
            return <ClickablePaper key={item.id} onClick={() => {
                if (onClick) {
                    onClick!();
                }
            }} title={item.name} trailingIcon={IconPencil} onDelete={() => {
                if (onDelete) {
                    onDelete!(item.id);
                }
            }}/>
        }} 
        onDelete={CoCPulpTalentService.deletePulpTalent}
        title={<TitleDividerWithIcon icon={<IconList /> } label={t('title')} />} 
        modalTitleUpdate={t('form.edit')}
        modalTitleAdd={t('form.add')}
        formProps={{
            lookupClient: 'coc',
            dataFetch: CoCPulpTalentService.getPulpTalent,
            add: CoCPulpTalentService.addPulpTalent,
            update: CoCPulpTalentService.updatePulpTalent,
            formMapping: [
                {
                    key: 'name',
                    label: t('form.mappings.name.label'),
                    dataType: 'string',
                    notNull: true,
                },
                {
                    key: 'description',
                    label: t('form.mappings.description.label'),
                    dataType: 'text',
                    notNull: true,
                }
            ],
            validate: {
                name: isNotEmpty(t('form.mappings.name.notNullMessage')),
                description: isNotEmpty(t('form.mappings.description.notNullMessage'))
            },
            saveMessage: {
                message: t('form.saveMessage'),
                ...NotificationKeys.SuccessCoCPulpTalentSave
            }
        }}
    />
}