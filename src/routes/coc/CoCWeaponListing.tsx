import { IconList, IconPencil } from "@tabler/icons-react";
import { TitleDividerWithIcon } from "../../ui/TitleDividerWithIcon";
import { ClickablePaper } from "../../ui/ClickablePaper";
import { Listing } from "../../ui/Listing";
import { isNotEmpty } from "@mantine/form";
import { CoCWeaponService } from "../../services/coc/CoCWeaponService";
import { useTranslation } from "react-i18next";
import { NotificationKeys } from "../../Constants";

export function CoCWeaponListing() {

    const { t } = useTranslation('listings', { keyPrefix: 'coc.weapon' });

    return <Listing 
        dataFetch={CoCWeaponService.getWeaponsListing}
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
        onDelete={CoCWeaponService.deleteWeapon}
        modalTitleUpdate={t('form.edit')}
        modalTitleAdd={t('form.add')}
        formProps={{
            lookupClient: 'coc',
            dataFetch: CoCWeaponService.getWeapon,
            update: CoCWeaponService.updateWeapon,
            add: CoCWeaponService.addWeapon,
            formMapping: [
                {
                    key: 'name',
                    label: t('form.mappings.name.label'),
                    dataType: 'string',
                    notNull: true,
                    span: 8
                },
                {
                    key: 'range',
                    label: t('form.mappings.range.label'),
                    dataType: 'string',
                    span: 4
                },
                {
                    key: 'damage',
                    label: t('form.mappings.damage.label'),
                    dataType: 'string',
                    notNull: true,
                    span: 4
                },
                {
                    key: 'attacksPerRound',
                    label: t('form.mappings.attacksPerRound.label'),
                    dataType: 'number',
                    notNull: true,
                    defaultValue: 1,
                    span: 4
                },
                {
                    key: 'malfunction',
                    label: t('form.mappings.malfunction.label'),
                    dataType: 'number',
                    span: 4
                },
                {
                    key: 'isMelee',
                    label: t('form.mappings.isMelee.label'),
                    dataType: 'boolean',
                    notNull: true,
                    defaultValue: false,
                    span: 4
                },
                {
                    key: 'isThrowable',
                    label: t('form.mappings.isThrowable.label'),
                    dataType: 'boolean',
                    notNull: true,
                    defaultValue: false,
                    span: 4
                },
                {
                    key: 'isDualWield',
                    label: t('form.mappings.isDualWield.label'),
                    dataType: 'boolean',
                    notNull: true,
                    defaultValue: false,
                    span: 4
                },
                {
                    key: 'skillUsedId',
                    label: t('form.mappings.skillUsedId.label'),
                    dataType: 'select',
                    lookupClass: 'usableSkill',
                    notNull: true,
                    span: 6
                },
                {
                    key: 'ammoId',
                    label: t('form.mappings.ammoId.label'),
                    dataType: 'select',
                    lookupClass: 'ammo',
                    span: 6
                }
            ],
            validate: {
                name: isNotEmpty(t('form.mappings.name.notNullMessage')),
                damage: isNotEmpty(t('form.mappings.damage.notNullMessage')),
                attacksPerRound: isNotEmpty(t('form.mappings.attacksPerRound.notNullMessage')),
                skillUsedId: isNotEmpty(t('form.mappings.skillUsedId.notNullMessage')),
            },
            saveMessage: {
                message: t('form.saveMessage'),
                ...NotificationKeys.SuccessCoCWeaponSave
            }
        }} 
    />
}