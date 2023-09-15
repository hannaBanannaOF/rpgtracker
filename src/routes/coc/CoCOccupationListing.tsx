import { IconList, IconPencil } from "@tabler/icons-react";
import { TitleDividerWithIcon } from "../../ui/TitleDividerWithIcon";
import { ClickablePaper } from "../../ui/ClickablePaper";
import { Listing } from "../../ui/Listing";
import { isNotEmpty } from "@mantine/form";
import { CoCOccupationService } from "../../services/coc/CoCOccupationService";
import { useTranslation } from "react-i18next";
import { NotificationKeys } from "../../Constants";

export function CoCOccupationListing() {

    const { t } = useTranslation('listings', { keyPrefix: 'coc.occupation' });

    return <Listing
        dataFetch={CoCOccupationService.getOccupationsListing}
        dataMap={(item: any, onDelete, onClick) => {
            return <ClickablePaper key={item.id} onClick={() => {
                if (onClick) {
                    onClick!();
                }
            }} title={item.name} trailingIcon={IconPencil} onDelete={() => {
                if (onDelete) {
                    onDelete!(item.id);
                }
            }} />
        }}
        title={<TitleDividerWithIcon icon={<IconList /> } label={t('title')} />}
        onDelete={CoCOccupationService.deleteOccupation}
        modalTitleUpdate={t('form.edit')}
        modalTitleAdd={t('form.add')}
        formProps={{
            hasSubregister: true,
            lookupClient: 'coc',
            dataFetch: CoCOccupationService.getOccupation,
            update: CoCOccupationService.updateOccupation,
            add: CoCOccupationService.addOccupation,
            formMapping: [
                {
                    key: 'name',
                    label: t('form.mappings.name.label'),
                    dataType: 'string',
                    notNull: true,
                    span: 12
                },
                {
                    key: 'description',
                    label: t('form.mappings.description.label'),
                    dataType: 'text',
                    notNull: true,
                    span: 12
                },
                {
                    key: 'skillPointCalculationRule',
                    label: t('form.mappings.skillPointCalculationRule.label'),
                    dataType: 'select',
                    lookupClass: 'skillPointCalculationRule',
                    notNull: true,
                    span: 12
                },
                {
                    key: 'minimumCreditRating',
                    label: t('form.mappings.minimumCreditRating.label'),
                    dataType: 'number',
                    notNull: true,
                    span: 6
                },
                {
                    key: 'maximumCreditRating',
                    label: t('form.mappings.maximumCreditRating.label'),
                    dataType: 'number',
                    notNull: true,
                    span: 6
                },
                {
                    key: 'suggestedContacts',
                    label: t('form.mappings.suggestedContacts.label'),
                    dataType: 'text',
                    span: 12
                },
                {
                    key: 'epochPersonalSkillChoices',
                    label: t('form.mappings.epochPersonalSkillChoices.label'),
                    dataType: 'number',
                    span: 12
                },
                {
                    key: 'typedSkillChoices',
                    label: t('form.mappings.typedSkillChoices.label'),
                    dataType: 'number',
                    span: 6
                },
                {
                    key: 'typedSkillChoicesKind',
                    label: t('form.mappings.typedSkillChoicesKind.label'),
                    dataType: 'select',
                    lookupClass: 'skillKind',
                    span: 6
                },
                {
                    key: 'skills',
                    label: t('form.mappings.skills.label'),
                    dataType: 'array',
                    arrayMapping: [
                        {
                            key: 'skillId',
                            dataType: 'select',
                            lookupClass: 'usableSkill'
                        }
                    ]
                }
            ],
            validate: {
                name: isNotEmpty(t('form.mappings.name.notNullMessage')),
                description: isNotEmpty(t('form.mappings.description.notNullMessage')),
                skillPointCalculationRule: isNotEmpty(t('form.mappings.skillPointCalculationRule.notNullMessage')),
                minimumCreditRating: isNotEmpty(t('form.mappings.minimumCreditRating.notNullMessage')),
                maximumCreditRating: isNotEmpty(t('form.mappings.maximumCreditRating.label')),
            },
            saveMessage: {
                message: t('form.saveMessage'),
                ...NotificationKeys.SuccessCoCOccupationSave
            }
        }}  
    />
}