import { CurrentUser } from './CurrentUser'

interface Talentos {
    id: number,
    name: string,
    desc: string
}

export interface FichaCOC {
    age: number,
    birthplace: string,
    residence: string,
    sex: string,
    nome_personagem: string,
    jogador: CurrentUser,
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
    get_skill_list_as_array: [],
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
    bonus_dmg: number,
    weapons: [],
    pulp_talents: Talentos[]
} 