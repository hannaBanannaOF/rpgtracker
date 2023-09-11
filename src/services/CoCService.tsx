import { CoCAmmo } from "../models/CharacterSheet";
import { Rpgtrackerwebclient } from "../webclient/Rpgtrackerwebclient"

export type Lookupsearch = {
   lookupClass: 'skillRarity' | 'skillKind' | 'notUsableSkill' | 'usableSkill' | 'ammo' | 'skillPointCalculationRule'
};

class CoCService {

    static getFicha = (idFicha: string) => {
        return Rpgtrackerwebclient.get(`/coc/api/v1/character-sheets/${idFicha}`);
    }

    static getMesa = (idMesa: string) => {
        return Rpgtrackerwebclient.get(`/coc/api/v1/sessions/${idMesa}`);
    }

    // Ocupation
    static getOccupationsListing = (page: number) => {
        return Rpgtrackerwebclient.get(`/coc/api/v1/occupations?page=${page}`);
    }

    static getOccupation = (uuid: string) => {
        return Rpgtrackerwebclient.get(`/coc/api/v1/occupations/${uuid}`)
    }

    static addOccupation = (data: any) => {
        return Rpgtrackerwebclient.post(`/coc/api/v1/occupations`, data);
    }

    static updateOccupation = (data: CoCAmmo) => {
        return Rpgtrackerwebclient.put(`/coc/api/v1/occupations/${data.id}`, data);
    }

    static deleteOccupation = (uuid: string) => {
        return Rpgtrackerwebclient.delete(`/coc/api/v1/occupations/${uuid}`);
    }

    // Pulp talents
    static getPulpTalentsListing = (page: number) => {
        return Rpgtrackerwebclient.get(`/coc/api/v1/pulp-talents?page=${page}`);
    }

    static getPulpTalent = (uuid: string) => {
        return Rpgtrackerwebclient.get(`/coc/api/v1/pulp-talents/${uuid}`)
    }

    static addPulpTalent = (data: any) => {
        return Rpgtrackerwebclient.post(`/coc/api/v1/pulp-talents`, data);
    }

    static updatePulpTalent = (data: any) => {
        return Rpgtrackerwebclient.put(`/coc/api/v1/pulp-talents/${data.id}`, data);
    }

    static deletePulpTalent = (uuid: string) => {
        return Rpgtrackerwebclient.delete(`/coc/api/v1/pulp-talents/${uuid}`);
    }

    // Skill
    static getSkillListing = (page: number) => {
        return Rpgtrackerwebclient.get(`/coc/api/v1/skills?page=${page}`);
    }

    static getSkill = (uuid: string) => {
        return Rpgtrackerwebclient.get(`/coc/api/v1/skills/${uuid}`)
    }

    static addSkill = (data: any) => {
        return Rpgtrackerwebclient.post(`/coc/api/v1/skills`, data);
    }

    static updateSkill = (data: any) => {
        return Rpgtrackerwebclient.put(`/coc/api/v1/skills/${data.id}`, data);
    }

    static deleteSkill = (uuid: string) => {
        return Rpgtrackerwebclient.delete(`/coc/api/v1/skills/${uuid}`);
    }

    // Weapon
    static getWeaponsListing = (page: number) => {
        return Rpgtrackerwebclient.get(`/coc/api/v1/weapons?page=${page}`);
    }

    static getWeapon = (uuid: string) => {
        return Rpgtrackerwebclient.get(`/coc/api/v1/weapons/${uuid}`)
    }

    static addWeapon = (data: any) => {
        return Rpgtrackerwebclient.post(`/coc/api/v1/weapons`, data);
    }

    static updateWeapon = (data: any) => {
        return Rpgtrackerwebclient.put(`/coc/api/v1/weapons/${data.id}`, data);
    }

    static deleteWeapon = (uuid: string) => {
        return Rpgtrackerwebclient.delete(`/coc/api/v1/weapons/${uuid}`);
    }

    // Ammo
    static getAmmoListing = (page: number) => {
        return Rpgtrackerwebclient.get(`/coc/api/v1/ammo?page=${page}`);
    }
    
    static getAmmo = (uuid: string) => {
        return Rpgtrackerwebclient.get(`/coc/api/v1/ammo/${uuid}`)
    }

    static addAmmo = (data: any) => {
        return Rpgtrackerwebclient.post(`/coc/api/v1/ammo`, data);
    }

    static updateAmmo = (data: CoCAmmo) => {
        return Rpgtrackerwebclient.put(`/coc/api/v1/ammo/${data.id}`, data);
    }

    static deleteAmmo = (uuid: string) => {
        return Rpgtrackerwebclient.delete(`/coc/api/v1/ammo/${uuid}`);
    }

    // Lookup

    static lookupData = (lookupclass?: 'skillRarity' | 'skillKind' | 'notUsableSkill' | 'usableSkill' | 'ammo' | 'skillPointCalculationRule', initialValue?: string) => {
        return Rpgtrackerwebclient.get(`/coc/api/v1/lookup?lookupClass=${lookupclass}&initialValue=${initialValue}`);
    }
}

export { CoCService }