import { CurrentUser } from './CurrentUser'

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
    get_skill_list_as_array: []
} 