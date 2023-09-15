import { IconList, IconPencil } from "@tabler/icons-react";
import { TitleDividerWithIcon } from "../../ui/TitleDividerWithIcon";
import { ClickablePaper } from "../../ui/ClickablePaper";
import { Listing } from "../../ui/Listing";
import { isNotEmpty } from "@mantine/form";
import { CoCSpellService } from "../../services/coc/CoCSpellService";
import { useTranslation } from "react-i18next";
import { NotificationKeys } from "../../Constants";

export function CoCSpellListing() {

    const { t } = useTranslation('listings', { keyPrefix: 'coc.spell' });

    return<Listing
        dataFetch={CoCSpellService.getSpellListing}
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
        onDelete={CoCSpellService.deleteSpell}
        modalTitleUpdate={t('form.edit')}
        modalTitleAdd={t('form.add')}
        formProps={{
            hasSubregister: true,
            lookupClient: 'coc',
            dataFetch: CoCSpellService.getSpell,
            update: CoCSpellService.updateSpell,
            add: CoCSpellService.addSpell,
            formMapping: [
                {
                    key: 'name',
                    label: t('form.mappings.name.label'),
                    dataType: 'string',
                    notNull: true,
                    span: 12
                },
                {
                    key: 'cost',
                    label: t('form.mappings.cost.label'),
                    dataType: 'string',
                    notNull: true,
                    span: 6
                },
                {
                    key: 'conjuringTime',
                    label: t('form.mappings.conjuringTime.label'),
                    dataType: 'string',
                    notNull: true,
                    span: 6
                },
                {
                    key: 'description',
                    label: t('form.mappings.description.label'),
                    dataType: 'text',
                    notNull: true,
                    span: 12
                },
                {
                    key: 'visceralForm',
                    label: t('form.mappings.visceralForm.label'),
                    dataType: 'text',
                    span: 12
                },
                {
                    key: 'monsterKnowledge',
                    label: t('form.mappings.monsterKnowledge.label'),
                    dataType: 'string',
                    span: 12
                },
                {
                    key: 'alternativeNames',
                    label: t('form.mappings.alternativeNames.label'),
                    dataType: 'string',
                    span: 12
                },
                {
                    key: 'categories',
                    label: t('form.mappings.categories.label'),
                    dataType: 'array',
                    arrayMapping: [
                        {
                            key: 'category',
                            dataType: 'select',
                            lookupClass: 'spellCategory'
                        }
                    ]
                }
            ],
            validate: {
                name: isNotEmpty(t('form.mappings.name.notNullMessage')),
                cost: isNotEmpty(t('form.mappings.cost.notNullMessage')),
                conjuringTime: isNotEmpty(t('form.mappings.conjuringTime.notNullMessage')),
                description: isNotEmpty(t('form.mappings.description.notNullMessage'))
            },
            saveMessage: {
                message: t('form.saveMessage'),
                ...NotificationKeys.SuccessCoCSpellSave
            }
        }}
    />
}