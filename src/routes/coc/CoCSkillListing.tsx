import { IconList, IconPencil } from "@tabler/icons-react";
import { TitleDividerWithIcon } from "../../ui/TitleDividerWithIcon";
import { ClickablePaper } from "../../ui/ClickablePaper";
import { Listing } from "../../ui/Listing";
import { isNotEmpty } from "@mantine/form";
import { CoCSkillService } from "../../services/coc/CoCSkillService";
import { useTranslation } from "react-i18next";
import { NotificationKeys } from "../../Constants";

export function CoCSkillListing() {

    const { t } = useTranslation('listings', { keyPrefix: 'coc.skill' })

    return <Listing
        dataFetch={CoCSkillService.getSkillListing}
        title={<TitleDividerWithIcon icon={<IconList /> } label={t('title')} />}
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
        onDelete={CoCSkillService.deleteSkill}
        modalTitleUpdate={t('form.edit')}
        modalTitleAdd={t('form.add')}
        formProps={{
            lookupClient: 'coc',
            dataFetch: CoCSkillService.getSkill,
            update: CoCSkillService.updateSkill,
            add: CoCSkillService.addSkill,
            formMapping: [
                {
                    key: 'name',
                    label: t('form.mappings.name.label'),
                    dataType: 'string',
                    notNull: true,
                    span: 8
                },
                {
                    key: 'baseValue',
                    label: t('form.mappings.baseValue.label'),
                    dataType: 'number',
                    span: 4
                },
                {
                    key: 'usable',
                    label: t('form.mappings.usable.label'),
                    dataType: 'boolean',
                    span: 12,
                    defaultValue: true
                },
                {
                    key: 'rarity',
                    label: t('form.mappings.rarity.label'),
                    dataType: 'select',
                    notNull: true,
                    lookupClass: 'skillRarity',
                    span: 6
                },
                {
                    key: 'kind',
                    label: t('form.mappings.kind.label'),
                    dataType: 'select',
                    notNull: true,
                    lookupClass: 'skillKind',
                    span: 6
                },
                {
                    key: 'parentSkillId',
                    label: t('form.mappings.parentSkillId.label'),
                    dataType: 'select',
                    lookupClass: 'notUsableSkill',
                    span: 12
                }
            ],
            validate: {
                name: isNotEmpty(t('form.mappings.name.notNullMessage')),
                rarity: isNotEmpty(t('form.mappings.rarity.notNullMessage')),
                kind: isNotEmpty(t('form.mappings.kind.notNullMessage'))
            },
            saveMessage: {
                message: t('form.saveMessage'),
                ...NotificationKeys.SuccessCoCSkillSave
            }
        }}
    />
}