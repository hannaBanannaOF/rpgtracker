export type CharacterSheetType = CharacterSheetBase | COCCharacterSheet;

export interface CharacterSheetBase {
    uuid: string,
    characterName: string,
    system: string,
    session: any;
}

export interface SkillCoC {
    skillID?: string | null,
    skillName: string,
    value: number,
    improvementCheck: boolean
}

export interface PulpTalents {
    id: number,
    name: string,
    description: string
}

interface Occupation {
    id: string,
    name: string,
    description?: string | null,
    suggestedContacts?: string| null
}

export interface CoCWeaponsInSheet {
    ammoLeft: number,
    roundsLeft: number,
    quantityCarry: number,
    nickname?: string,
    totalAmmoLeft: number,
    successValue: number,
    weapon: CoCWeapon
}

interface CoCWeapon {
    id: string,
    name: string,
    range: string,
    damage: string,
    attacksPerRound: number,
    malfunction: number,
    isMelee: boolean,
    isThrowable: boolean,
    isDualWield: boolean,
    ammo?: CoCAmmo | null,
    skillUsed: {
        id: string
    }
    
}

export interface CoCAmmo {
    id: string,
    name: string,
    roundsShotWithEach: number
}

interface FichaCOCBasicInfo {
    pulpCthulhu: boolean,
    age?: number | null,
    sex?: string | null,
    birthplace?: string | null,
    residence?: string | null,
    pulpArchetype?: string | null
}

interface FichaCOCBasicAttributes {
    strength: number,
    constitution: number,
    size: number,
    dexterity: number,
    appearance: number,
    intelligence: number,
    power: number,
    education: number,
    luck: number
}

interface FichaCOCCalculatedAttributes {
    moveRate: number,
    healthPoints: number,
    magicPoints: number,
    sanity: number,
    startingSanity: number,
    maximumHealthPoints: number,
    maximumMagicPoints: number,
    maximumSanity: number,
    build: number,
    bonusDamage: string,
    majorWounds: boolean,
    temporaryInsanity: boolean,
    indefiniteInsanity: boolean,
    occupationalSkillPoints: number,
    personalInterestSkillPoints: number,
    dodge: number
}

export interface COCCharacterSheet {
    id: string,
    coreId: string,
    basicInfo: FichaCOCBasicInfo,
    basicAttributes: FichaCOCBasicAttributes,
    calculatedAttributes: FichaCOCCalculatedAttributes,
    skills: SkillCoC[],
    pulpTalents: PulpTalents[],
    weapons: CoCWeaponsInSheet[],
    occupation?: Occupation | null
} 