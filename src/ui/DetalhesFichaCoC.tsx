import { CoCWeaponsInSheet, COCCharacterSheet, SkillCoC, PulpTalents } from '../models/CharacterSheet';
import { DefaultEmpty } from './DefaultEmpty';
import { CoCStats } from './StatsCOC';
import { ModalListItem } from './ModalListItem';
import { ActionIcon, Avatar, Badge, Card, Center, Checkbox, Grid, Group, Modal, Skeleton, Space, Stack, Text, Title } from '@mantine/core';
import { IconAddressBook, IconBookmark, IconBrain, IconCards, IconClover2, IconCornerDownRight, IconHeart, IconInfoCircle, IconSword, IconSwordOff, IconSwords, IconUser, IconWand } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import SliderWithCaption from './SliderWithCaption';
import TitleDividerWithIcon from './TitleDividerWithIcon';
import { useSubscription } from 'react-stomp-hooks';
import { useAuth } from '../providers/AuthProvider';
import { useState } from 'react';
import { GoBack } from './GoBack';

export interface DetalhesFichaCoCProps {
    ficha?: COCCharacterSheet | null;
    fromSession?: boolean;
    playerName?: string;
    characterName?: string;
}

export function DetalhesFichaCoC(props: DetalhesFichaCoCProps) {

    const [ocupationOpened, { open, close }] = useDisclosure(false);

    const _getHpEndBadge = () => {
        if ((props.ficha?.calculatedAttributes.healthPoints ?? 0) === 0/* && majorWound*/) {
            return <Badge color='red'>Morrendo</Badge>
        } else if ((props.ficha?.calculatedAttributes.healthPoints ?? 0) === 0) {
            return <Badge color='grey'>Inconsciente</Badge>
        }
        return null;
    }

    return <Grid grow>
        {!props.fromSession && <Grid.Col>
            <GoBack />   
        </Grid.Col>}
        {/* Basic info */}
        <Grid.Col sm={10} md={8} lg={3} order={1} orderLg={1} orderSm={2}>
            <Card padding="lg">
                <TitleDividerWithIcon icon={<IconUser />} label={(props.ficha?.basicInfo.pulpCthulhu ?? false) ? "Herói (PCoC)" : "Investigador"} />
                <Skeleton visible={props.characterName == null}>
                    <Group position='left'>
                        <Text td="underline">Nome:</Text>
                        {props.characterName}
                    </Group>
                </Skeleton>
                <Skeleton visible={props.playerName == null}>
                    <Group position='left'>
                        <Text td="underline" display="inline">Jogador:</Text>
                        {props.playerName}
                    </Group>
                </Skeleton>
                <Group position='left'>
                    <Text td="underline" display="inline">Idade:</Text>
                    {props.ficha?.basicInfo.age ?? 0}
                </Group>
                <Group position='left'>
                    <Text td="underline" display="inline">Residência:</Text>
                    {props.ficha?.basicInfo.residence ?? ""}
                </Group>
                <Group position='left'>
                    <Text td="underline" display="inline">Naturalidade:</Text>
                    {props.ficha?.basicInfo.birthplace ?? ""}
                </Group>
                <Group position='apart'>
                    <Group position='left'>
                        <Text td="underline" display="inline">Ocupação:</Text>
                        {props.ficha?.occupation?.name ?? "Unoccupied"}
                    </Group>
                    {props.ficha?.occupation && props.ficha?.occupation!.description && 
                    <>
                            <ActionIcon onClick={open}>
                                <IconInfoCircle />
                            </ActionIcon>
                            <Modal opened={ocupationOpened} onClose={close} title={props.ficha?.occupation?.name}>
                            <TitleDividerWithIcon icon={<IconInfoCircle />} label='Descrição' />
                            {props.ficha?.occupation?.description ?? ""}
                            <TitleDividerWithIcon icon={<IconAddressBook />} label='Contatos sugeridos' />
                            {props.ficha?.occupation?.suggestedContacts ?? ""}
                            </Modal>
                        </>}
                </Group>
                {(props.ficha?.basicInfo.pulpCthulhu ?? false) &&<Group position='left'><Text td="underline" display="inline">Arquétipo:</Text>{props.ficha?.basicInfo.pulpArchetype ?? ""}</Group>}
            </Card>
        </Grid.Col>
        {/* Basic characteristics */}
        <Grid.Col sm={12} md={12} lg={7} order={3} orderLg={2} orderSm={3}>
            <Card padding={"lg"}>
                <TitleDividerWithIcon icon={<IconInfoCircle />} label='Características' />
                <Grid align='center' justify='center'>
                    <CoCStats span={{ xl: 4, lg: 4, md: 4, sm: 6, xs: 6 }} value={props.ficha?.basicAttributes.strength ?? "0"} stat="STR"/>
                    <CoCStats span={{ xl: 4, lg: 4, md: 4, sm: 6, xs: 6 }} value={props.ficha?.basicAttributes.dexterity ?? "0"} stat="DEX"/>
                    <CoCStats span={{ xl: 4, lg: 4, md: 4, sm: 6, xs: 6 }} value={props.ficha?.basicAttributes.power ?? "0"} stat="POW"/>
                    <CoCStats span={{ xl: 4, lg: 4, md: 4, sm: 6, xs: 6 }} value={props.ficha?.basicAttributes.constitution ?? "0"} stat="CON"/>
                    <CoCStats span={{ xl: 4, lg: 4, md: 4, sm: 6, xs: 6 }} value={props.ficha?.basicAttributes.appearance ?? "0"} stat="APP"/>
                    <CoCStats span={{ xl: 4, lg: 4, md: 4, sm: 6, xs: 6 }} value={props.ficha?.basicAttributes.education ?? "0"} stat="EDU"/>
                    <CoCStats span={{ xl: 4, lg: 4, md: 4, sm: 6, xs: 6 }} value={props.ficha?.basicAttributes.size ?? "0"} stat="SIZ"/>
                    <CoCStats span={{ xl: 4, lg: 4, md: 4, sm: 6, xs: 6 }} value={props.ficha?.basicAttributes.intelligence ?? "0"} stat="INT"/>
                    <CoCStats span={{ xl: 4, lg: 4, md: 4, sm: 6, xs: 6 }} fullRounded noShowFifth value={props.ficha?.calculatedAttributes.moveRate ?? "0"} stat="Move Rate"/>
                </Grid>
            </Card>
        </Grid.Col>
        {/* Avatar */}
        <Grid.Col sm={2} md={2} lg={2} order={2} orderLg={2} orderSm={1}>
            <Card padding={"lg"}>
                <Center>
                    <Avatar radius="xl"/>
                </Center>
            </Card>
        </Grid.Col>
        {/* Lifepoints */}
        <Grid.Col sm={12} md={4} lg={4} order={4}>
            <Card padding={"lg"}>
                <TitleDividerWithIcon icon={<IconHeart />} label='Pontos de Vida' />
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
                    <Title order={5}>Max HP:</Title>
                    <Text>{props.ficha?.calculatedAttributes.maximumHealthPoints ?? "0"}</Text>
                </Group>
                <Space h={"md"}/>
                <Checkbox
                    label="Major wound"
                    disabled
                />
            </Card>
        </Grid.Col>
        {/* Sanity */}
        <Grid.Col sm={12} md={8} lg={8} order={5}>
            <Card padding={"lg"}>
                <TitleDividerWithIcon icon={<IconBrain />} label='Sanidade' />
                <SliderWithCaption 
                    color="blue"
                    value={props.ficha?.calculatedAttributes.sanity ?? 0} 
                    thumbChildren={<IconBrain size="1rem" />}
                    max={props.ficha?.calculatedAttributes.maximumSanity ?? 0}
                    disabled
                    endBadge={(props.ficha?.calculatedAttributes.sanity ?? 0) === 0 ? <Badge color='grey'>Insano</Badge> : null}
                />
                <Space h={"md"} />
                <Group>
                    <Title order={5}>Max SAN:</Title>
                    <Text>{props.ficha?.calculatedAttributes.maximumSanity ?? "0"}</Text>
                </Group>
                <Group>
                    <Title order={5}>SAN inicial:</Title>
                    <Text>{props.ficha?.calculatedAttributes.startingSanity ?? "0"}</Text>
                </Group>
                <Space h={"md"} />
                <>
                    <Checkbox
                        label="Insanidade temporária"
                        disabled
                    />
                    <Checkbox
                        label="Insanidade indefinida"
                        disabled
                    />
                </>
            </Card>
        </Grid.Col>
        {/* Luck */}
        <Grid.Col sm={12} md={8} lg={8} order={6}>
            <Card padding={"lg"}>
                <TitleDividerWithIcon icon={<IconClover2 />} label='Sorte' />
                <SliderWithCaption 
                    value={props.ficha?.basicAttributes.luck ?? 0} 
                    thumbChildren={<IconClover2 size="1rem" />}
                    disabled
                    endBadge={(props.ficha?.basicAttributes.luck ?? 0) === 0 ? <Badge color='grey'>Sem sorte</Badge> : null}
                />
            </Card>
        </Grid.Col>
        <Grid.Col sm={12} md={4} lg={4} order={7}>
            <Card padding={"lg"}>
                <TitleDividerWithIcon icon={<IconWand />} label="Pontos de magia" />
                <SliderWithCaption 
                    color="grape"
                    value={props.ficha?.calculatedAttributes.magicPoints ?? 0}
                    max={props.ficha?.calculatedAttributes.maximumMagicPoints ?? 0} 
                    thumbChildren={<IconWand size="1rem" />}
                    disabled
                />
                <Space h={"md"} />
                <Group>
                    <Title order={5}>Max MP:</Title>
                    <Text>{props.ficha?.calculatedAttributes.maximumMagicPoints ?? "0"}</Text>
                </Group>
            </Card>
        </Grid.Col>
        <Grid.Col sm={12} md={12} lg={12} order={8}>
            <Card>
                <TitleDividerWithIcon icon={<IconBookmark />} label='Perícias' />
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
                <TitleDividerWithIcon icon={<IconSwords />} label='Armas' />
                <DefaultEmpty visible={(props.ficha?.weapons.length ?? 0) === 0} emptyIcon={<IconSwordOff />}>
                    <Stack>
                    {(props.ficha?.weapons ?? []).map((item: CoCWeaponsInSheet) => {
                        return <ModalListItem key={item.nickname} listItemText={item.nickname ?? item.weapon.name} dialogTitle={item.nickname ?? item.weapon.name}>
                            <>
                                <TitleDividerWithIcon icon={<IconInfoCircle />} label='Informações básicas'/>
                                <Stack spacing={"xs"}>
                                    <Text>Dano: {item.weapon.damage}</Text>
                                    <Text>Ataques: {item.weapon.attacksPerRound > 1 ? `1(${item.weapon.attacksPerRound})` : 1}</Text>
                                </Stack>
                                <TitleDividerWithIcon icon={<IconCornerDownRight />} label='Informações avançadas' />
                                <Stack spacing={"xs"}>
                                    {item.weapon.isMelee && <>
                                        <Text>Arma mano-a-mano</Text>
                                        {/* <Typography>Acerto normal: {item.normal_success_value}</Typography>
                                        <Typography>Acerto bom: {Math.floor(item.normal_success_value/2)}</Typography>
                                    <Typography>Acerto extremo: {Math.floor(item.normal_success_value/5)}</Typography> */}
                                    </>}
                                    {!item.weapon.isMelee && <>
                                        {/* <Typography>Acerto normal: {item.normal_success_value}</Typography>
                                        <Typography>Acerto bom: {Math.floor(item.normal_success_value/2)}</Typography>
                                        <Typography>Acerto extremo: {Math.floor(item.normal_success_value/5)}</Typography>
                                        <Typography>Tiros restantes: {item.ammoLeft}</Typography>
                                    <Typography>Munição disponível: {`${item.roundsLeft} (${item.totalAmmoLeft})`}</Typography> */}
                                    </>}
                                </Stack>
                            </>
                        </ModalListItem>
                    })}
                    </Stack>
                </DefaultEmpty>
            </Card>
        </Grid.Col>
        <Grid.Col sm={12} md={12} lg={3} order={10}>
            <Card>
                <TitleDividerWithIcon icon={<IconSword />} label='Combate' />
                <Grid>
                    <CoCStats fullRounded noShowFifth value={props.ficha?.calculatedAttributes.bonusDamage ?? "0"} stat="Bonus Damage"/>
                    <CoCStats fullRounded noShowFifth value={props.ficha?.calculatedAttributes.build ?? "0"} stat="Build"/>
                    <CoCStats value={props.ficha?.calculatedAttributes.dodge ?? "0"} stat="Dodge"/>
                </Grid>
            </Card>
        </Grid.Col>
        {/* Pulp Talents */}
        <Grid.Col order={11}>
            <Card>
                <TitleDividerWithIcon icon={<IconCards />} label='Talentos (PCoC)' />
                <DefaultEmpty visible={(props.ficha?.pulpTalents?.length ?? 0) === 0} emptyIcon={<IconCards />}>
                    <Stack>
                        {(props.ficha?.pulpTalents ?? []).map((item: PulpTalents) => {
                            return <ModalListItem key={item.id} listItemText={item.name} dialogTitle={item.name}>
                                <TitleDividerWithIcon icon={<IconInfoCircle />} label='Descrição' />
                                {item.description}
                            </ModalListItem>
                        })}
                    </Stack>
                </DefaultEmpty>
            </Card>
        </Grid.Col>
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