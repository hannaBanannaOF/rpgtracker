import { CurrentUser } from "./CurrentUser";
import { MesaBase } from "./Mesa";

export type FichaType = FichaBase | FichaCOC;

export interface FichaBase {
    id: number,
    nome_personagem: string,
    get_content_type: string,
    mesa? : MesaBase,
    jogador: CurrentUser
}

interface Skill {
    id: number,
    name: string,
    value: number,
    improv: boolean
}

interface Talentos {
    id: number,
    name: string,
    desc: string
}

interface Arma {
    id: number,
    name: string,
    range?: string,
    attacks: number,
    malfunction: number,
    is_melee: boolean,
    damage: string
}

interface Ocupacao {
    id: number,
    name: string
}

export interface ArmasEmFicha {
    id: number,
    ammo_left?: number,
    rounds_left?: number,
    nickname?: string,
    normal_success_value: number,
    total_ammo_left?: number
    weapon: Arma
}

export interface FichaCOC extends FichaBase {
    age: number,
    birthplace: string,
    residence: string,
    sex: string,
    pulp_cthulhu: boolean,
    pulp_archetype?: string,
    strength: number,
    constitution: number,
    size: number, 
    dexterity: number, 
    appearence: number, 
    inteligence: number,
    power: number,
    education: number,
    move_rate: number,
    ocupation: Ocupacao,
    skill_list: Skill[],
    hp: number,
    max_hp: number,
    major_wound: boolean,
    san: number,
    max_san: number,
    start_san: number,
    temporary_insanity: boolean,
    indefinity_insanity: boolean,
    luck: number,
    max_mp: number,
    mp: number,
    dodge: number,
    build: number,
    bonus_dmg: string,
    weapons: ArmasEmFicha[],
    pulp_talents: Talentos[]
} 