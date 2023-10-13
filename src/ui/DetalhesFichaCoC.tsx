import { CoCWeaponsInSheet, COCCharacterSheet, SkillCoC, PulpTalents, CoCSpellInSheet } from '../models/CharacterSheet';
import { DefaultEmpty } from './DefaultEmpty';
import { CoCStats } from './StatsCOC';
import { ModalListItem } from './ModalListItem';
import { ActionIcon, Badge, Card, Center, Checkbox, Grid, Group, Image, Modal, Skeleton, Space, Stack, Text, Title } from '@mantine/core';
import { IconAddressBook, IconBookmark, IconBrain, IconCards, IconClock, IconClover2, IconConfucius, IconCornerDownRight, IconHeart, IconInfoCircle, IconSword, IconSwordOff, IconSwords, IconUser, IconWand, IconWandOff } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { SliderWithCaption } from './SliderWithCaption';
import { TitleDividerWithIcon } from './TitleDividerWithIcon';
import { useSubscription } from 'react-stomp-hooks';
import { useAuth } from '../providers/AuthProvider';
import { useState } from 'react';
import { GoBack } from './GoBack';
import { useTranslation } from 'react-i18next';

export interface DetalhesFichaCoCProps {
    ficha?: COCCharacterSheet | null;
    fromSession?: boolean;
    playerName?: string;
    characterName?: string;
}

export function DetalhesFichaCoC(props: DetalhesFichaCoCProps) {

    const [ocupationOpened, { open, close }] = useDisclosure(false);
    const { t } = useTranslation('characterSheet', { keyPrefix: "coc" });

    const _getHpEndBadge = () => {
        if ((props.ficha?.calculatedAttributes.healthPoints ?? 0) === 0/* && majorWound*/) {
            return <Badge color='red'>{t('healthPoints.dying')}</Badge>
        } else if ((props.ficha?.calculatedAttributes.healthPoints ?? 0) === 0) {
            return <Badge color='grey'>{t('healthPoints.unconscious')}</Badge>
        }
        return null;
    }

    const _getSpellTitle = (item: CoCSpellInSheet) => {
        return `${item.spellChosenName}${item.onlyOniricLandscape ? ` (${t('spells.oniric')})` : ''}${item.folk ? ` (${t('spells.folk')})` : ''}${item.monsterKnowledge ? ` (${item.monsterKnowledge})` : ''}`
    }

    return <Grid grow>
        {!props.fromSession && <Grid.Col>
            <GoBack />   
        </Grid.Col>}
        {/* Basic info */}
        <Grid.Col sm={10} md={8} lg={3} order={1} orderLg={1} orderSm={2}>
            <Card padding="lg">
                <TitleDividerWithIcon icon={<IconUser />} label={t((props.ficha?.basicInfo.pulpCthulhu ?? false) ? "hero" : "investigator")} />
                <Skeleton visible={props.characterName == null}>
                    <Group position='left'>
                        <Text td="underline">{t('characterName')}:</Text>
                        {props.characterName}
                    </Group>
                </Skeleton>
                <Skeleton visible={props.playerName == null}>
                    <Group position='left'>
                        <Text td="underline" display="inline">{t('playerName')}:</Text>
                        {props.playerName}
                    </Group>
                </Skeleton>
                <Group position='left'>
                    <Text td="underline" display="inline">{t('age')}:</Text>
                    {props.ficha?.basicInfo.age ?? 0}
                </Group>
                <Group position='left'>
                    <Text td="underline" display="inline">{t('residency')}:</Text>
                    {props.ficha?.basicInfo.residence ?? ""}
                </Group>
                <Group position='left'>
                    <Text td="underline" display="inline">{t('birthplace')}:</Text>
                    {props.ficha?.basicInfo.birthplace ?? ""}
                </Group>
                <Group position='apart'>
                    <Group position='left'>
                        <Text td="underline" display="inline">{t('occupation.title')}:</Text>
                        {props.ficha?.occupation?.name ?? t('occupation.unoccupied')}
                    </Group>
                    {props.ficha?.occupation && props.ficha?.occupation!.description && 
                    <>
                            <ActionIcon onClick={open}>
                                <IconInfoCircle />
                            </ActionIcon>
                            <Modal opened={ocupationOpened} onClose={close} title={props.ficha?.occupation?.name}>
                            <TitleDividerWithIcon icon={<IconInfoCircle />} label={t('occupation.description')} />
                            {props.ficha?.occupation?.description ?? ""}
                            <TitleDividerWithIcon icon={<IconAddressBook />} label={t('occupation.suggestedContacts')} />
                            {props.ficha?.occupation?.suggestedContacts ?? ""}
                            </Modal>
                        </>}
                </Group>
                {(props.ficha?.basicInfo.pulpCthulhu ?? false) &&<Group position='left'><Text td="underline" display="inline">{t('archetype')}:</Text>{props.ficha?.basicInfo.pulpArchetype ?? ""}</Group>}
            </Card>
        </Grid.Col>
        {/* Basic characteristics */}
        <Grid.Col sm={12} md={12} lg={7} order={3} orderLg={2} orderSm={3}>
            <Card padding={"lg"}>
                <TitleDividerWithIcon icon={<IconInfoCircle />} label={t('characteristics.title')} />
                <Grid align='center' justify='center'>
                    <CoCStats span={{ xl: 4, lg: 4, md: 4, sm: 6, xs: 6 }} value={props.ficha?.basicAttributes.strength ?? "0"} stat={t('characteristics.str')} />
                    <CoCStats span={{ xl: 4, lg: 4, md: 4, sm: 6, xs: 6 }} value={props.ficha?.basicAttributes.dexterity ?? "0"} stat={t('characteristics.dex')} />
                    <CoCStats span={{ xl: 4, lg: 4, md: 4, sm: 6, xs: 6 }} value={props.ficha?.basicAttributes.power ?? "0"} stat={t('characteristics.pow')} />
                    <CoCStats span={{ xl: 4, lg: 4, md: 4, sm: 6, xs: 6 }} value={props.ficha?.basicAttributes.constitution ?? "0"} stat={t('characteristics.con')} />
                    <CoCStats span={{ xl: 4, lg: 4, md: 4, sm: 6, xs: 6 }} value={props.ficha?.basicAttributes.appearance ?? "0"} stat={t('characteristics.app')} />
                    <CoCStats span={{ xl: 4, lg: 4, md: 4, sm: 6, xs: 6 }} value={props.ficha?.basicAttributes.education ?? "0"} stat={t('characteristics.edu')} />
                    <CoCStats span={{ xl: 4, lg: 4, md: 4, sm: 6, xs: 6 }} value={props.ficha?.basicAttributes.size ?? "0"} stat={t('characteristics.siz')} />
                    <CoCStats span={{ xl: 4, lg: 4, md: 4, sm: 6, xs: 6 }} value={props.ficha?.basicAttributes.intelligence ?? "0"} stat={t('characteristics.int')} />
                    <CoCStats span={{ xl: 4, lg: 4, md: 4, sm: 6, xs: 6 }} fullRounded noShowFifth value={props.ficha?.calculatedAttributes.moveRate ?? "0"} stat={t('characteristics.moveRate')} />
                </Grid>
            </Card>
        </Grid.Col>
        {/* Avatar */}
        <Grid.Col sm={2} md={2} lg={2} order={2} orderLg={2} orderSm={1}>
            <Card padding={"lg"}>
                <Center>
                    <Image
                        height={120}
                        src={null}
                        withPlaceholder />
                </Center>
            </Card>
        </Grid.Col>
        {/* Lifepoints */}
        <Grid.Col sm={12} md={4} lg={4} order={4}>
            <Card padding={"lg"}>
                <TitleDividerWithIcon icon={<IconHeart />} label={t('healthPoints.title')} />
                <SliderWithCaption 
                    color="red"
                    value={props.ficha?.calculatedAttributes.healthPoints ?? 0}
                    max={props.ficha?.calculatedAttributes.maximumHealthPoints ?? 0} 
                    thumbChildren={<IconHeart size="1rem" />}
                    disabled
                    endBadge={_getHpEndBadge()}
                />
                <Space h={"md"} />
                <Group>
                    <Title order={5}>{t('healthPoints.maxHp')}:</Title>
                    <Text>{props.ficha?.calculatedAttributes.maximumHealthPoints ?? "0"}</Text>
                </Group>
                <Space h={"md"}/>
                <Checkbox
                    label={t('healthPoints.majorWound')}
                    disabled
                />
            </Card>
        </Grid.Col>
        {/* Sanity */}
        <Grid.Col sm={12} md={8} lg={8} order={5}>
            <Card padding={"lg"}>
                <TitleDividerWithIcon icon={<IconBrain />} label={t('sanity.title')} />
                <SliderWithCaption 
                    color="blue"
                    value={props.ficha?.calculatedAttributes.sanity ?? 0} 
                    thumbChildren={<IconBrain size="1rem" />}
                    max={props.ficha?.calculatedAttributes.maximumSanity ?? 0}
                    disabled
                    endBadge={(props.ficha?.calculatedAttributes.sanity ?? 0) === 0 ? <Badge color='grey'>{t('sanity.insane')}</Badge> : null}
                />
                <Space h={"md"} />
                <Group>
                    <Title order={5}>{t('sanity.maxSan')}:</Title>
                    <Text>{props.ficha?.calculatedAttributes.maximumSanity ?? "0"}</Text>
                </Group>
                <Group>
                    <Title order={5}>{t('sanity.initialSan')}:</Title>
                    <Text>{props.ficha?.calculatedAttributes.startingSanity ?? "0"}</Text>
                </Group>
                <Space h={"md"} />
                <>
                    <Checkbox
                        label={t('sanity.tempInsanity')}
                        disabled
                    />
                    <Checkbox
                        label={t('sanity.indefInsanity')}
                        disabled
                    />
                </>
            </Card>
        </Grid.Col>
        {/* Luck */}
        <Grid.Col sm={12} md={8} lg={8} order={6}>
            <Card padding={"lg"}>
                <TitleDividerWithIcon icon={<IconClover2 />} label={t('luck.title')} />
                <SliderWithCaption 
                    value={props.ficha?.basicAttributes.luck ?? 0} 
                    thumbChildren={<IconClover2 size="1rem" />}
                    disabled
                    endBadge={(props.ficha?.basicAttributes.luck ?? 0) === 0 ? <Badge color='grey'>{t('luck.outOfLuck')}</Badge> : null}
                />
            </Card>
        </Grid.Col>
        {/* Magic points */}
        <Grid.Col sm={12} md={4} lg={4} order={7}>
            <Card padding={"lg"}>
                <TitleDividerWithIcon icon={<IconWand />} label={t('magicPoints.title')} />
                <SliderWithCaption 
                    color="grape"
                    value={props.ficha?.calculatedAttributes.magicPoints ?? 0}
                    max={props.ficha?.calculatedAttributes.maximumMagicPoints ?? 0} 
                    thumbChildren={<IconWand size="1rem" />}
                    disabled
                />
                <Space h={"md"} />
                <Group>
                    <Title order={5}>{t('magicPoints.maxMp')}:</Title>
                    <Text>{props.ficha?.calculatedAttributes.maximumMagicPoints ?? "0"}</Text>
                </Group>
            </Card>
        </Grid.Col>
        {/* Skills */}
        <Grid.Col sm={12} md={12} lg={12} order={8}>
            <Card>
                <TitleDividerWithIcon icon={<IconBookmark />} label={t('skills')} />
                <Grid>
                    {(props.ficha?.skills ?? []).map((skill: SkillCoC) => {
                        return <CoCStats key={skill.skillID ?? skill.skillName} span={{ xl: 3, lg: 3, md: 4, sm: 6, xs: 12 }} value={skill.value} stat={skill.skillName} improvcheck improvedCheck={skill.improvementCheck}/>
                    })}
                </Grid>
            </Card>
        </Grid.Col>
        {/* Weapons */}
        <Grid.Col sm={12} md={12} lg={9} order={9}>
            <Card>
                <TitleDividerWithIcon icon={<IconSwords />} label={t('weapons.title')} />
                <DefaultEmpty visible={(props.ficha?.weapons.length ?? 0) === 0} emptyIcon={<IconSwordOff />}>
                    <Stack>
                    {(props.ficha?.weapons ?? []).map((item: CoCWeaponsInSheet) => {
                        return <ModalListItem key={item.weapon.id} listItemText={item.nickname ?? item.weapon.name} dialogTitle={item.nickname ?? item.weapon.name}>
                            <>
                                <TitleDividerWithIcon icon={<IconInfoCircle />} label={t('weapons.basicInfo.title')} />
                                <Stack spacing={"xs"}>
                                    <Text>{t('weapons.basicInfo.damage')}: {item.weapon.damage}</Text>
                                    <Text>{t('weapons.basicInfo.attacks')}: {item.weapon.attacksPerRound > 1 ? `1(${item.weapon.attacksPerRound})` : 1}</Text>
                                </Stack>
                                <TitleDividerWithIcon icon={<IconCornerDownRight />} label={t('weapons.advancedInfo.title')} />
                                <Group position='apart' align='flex-start'>
                                    <Stack spacing={"xs"}>
                                        <Text>{t('weapons.advancedInfo.normalSuccess')}: {item.successValue}</Text>
                                        <Text>{t('weapons.advancedInfo.goodSuccess')}: {Math.floor(item.successValue/2)}</Text>
                                        <Text>{t('weapons.advancedInfo.extremeSuccess')}: {Math.floor(item.successValue/5)}</Text>
                                        {!item.weapon.isMelee && <Text>{t('weapons.advancedInfo.availableAmmo')}: {`${item.roundsLeft} (${item.totalAmmoLeft})`}</Text>}
                                    </Stack>
                                    {item.weapon.isMelee &&<Badge>{t('weapons.advancedInfo.meleeWeapon')}</Badge>}
                                </Group>
                            </>
                        </ModalListItem>
                    })}
                    </Stack>
                </DefaultEmpty>
            </Card>
        </Grid.Col>
        {/* Combat */}
        <Grid.Col sm={12} md={12} lg={3} order={10}>
            <Card>
                <TitleDividerWithIcon icon={<IconSword />} label={t('combat.title')} />
                <Grid>
                    <CoCStats fullRounded noShowFifth value={props.ficha?.calculatedAttributes.bonusDamage ?? "0"} stat={t('combat.bonusDamage')} />
                    <CoCStats fullRounded noShowFifth value={props.ficha?.calculatedAttributes.build ?? "0"} stat={t('combat.build')} />
                    <CoCStats value={props.ficha?.calculatedAttributes.dodge ?? "0"} stat={t('combat.dodge')} />
                </Grid>
            </Card>
        </Grid.Col>
        {/* Spells */}
        <Grid.Col order={11} sm={12} md={props.ficha?.basicInfo.pulpCthulhu ? 6 : 12} lg={props.ficha?.basicInfo.pulpCthulhu ? 6 : 12}>
            <Card>
                <TitleDividerWithIcon icon={<IconWand />} label={t('spells.title')} />
                <DefaultEmpty visible={(props.ficha?.spells?.length ?? 0) === 0} emptyIcon={<IconWandOff />}>
                    <Stack>
                        {(props.ficha?.spells ?? []).map((item: CoCSpellInSheet) => {
                            return <ModalListItem key={item.spellID} listItemText={_getSpellTitle(item)} dialogTitle={_getSpellTitle(item)}>
                                <TitleDividerWithIcon icon={<IconConfucius />} label={t('spells.cost')} />
                                {item.cost}
                                <TitleDividerWithIcon icon={<IconClock />} label={t('spells.castingTime')} />
                                {item.conjuringTime}
                                <TitleDividerWithIcon icon={<IconInfoCircle />} label={t('spells.description')} />
                                {item.spellDescription}
                            </ModalListItem>
                        })}
                    </Stack>
                </DefaultEmpty>
            </Card>
        </Grid.Col>
        {/* Pulp Talents */}
        {props.ficha?.basicInfo.pulpCthulhu && <Grid.Col order={12} sm={12} md={6} lg={6}>
            <Card>
                <TitleDividerWithIcon icon={<IconCards />} label={t('pulpTalent.title')} />
                <DefaultEmpty visible={(props.ficha?.pulpTalents?.length ?? 0) === 0} emptyIcon={<IconCards />}>
                    <Stack>
                        {(props.ficha?.pulpTalents ?? []).map((item: PulpTalents) => {
                            return <ModalListItem key={item.id} listItemText={item.name} dialogTitle={item.name}>
                                <TitleDividerWithIcon icon={<IconInfoCircle />} label={t('pulpTalent.description')} />
                                {item.description}
                            </ModalListItem>
                        })}
                    </Stack>
                </DefaultEmpty>
            </Card>
        </Grid.Col>}
    </Grid>
}

export function DetalhesFichaCoCWithSubscription(props: DetalhesFichaCoCProps) {
    const auth = useAuth();
    const [characterName, setCharacterName] = useState(undefined);
    const [playerName, setPlayerName] = useState(undefined);

    useSubscription(`/topic/${auth.currentUser?.uuid}/character-sheet/${props.ficha?.coreId}/infos`, (message) => {
        let data = JSON.parse(message.body);
        if (data['infos']) {
            let first = data.infos[0];
            if (first['characterName']) {
                setCharacterName(first.characterName);
            }
        }
        if (data['users']) {
            let first = data.users[0];
            if (first['displayName']) {
                setPlayerName(first.displayName);
            }
        }
    });

    return <DetalhesFichaCoC ficha={props.ficha} fromSession={props.fromSession} playerName={playerName} characterName={characterName} />
}