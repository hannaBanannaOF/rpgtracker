import { Rpgtrackerwebclient } from "../../webclient/Rpgtrackerwebclient";

class CoCSpellService {
    static getSpellListing = (page: number) => {
        return Rpgtrackerwebclient.get(`/coc/api/v1/spells?page=${page}`);
    }
    
    static getSpell = (uuid: string) => {
        return Rpgtrackerwebclient.get(`/coc/api/v1/spells/${uuid}`)
    }

    static addSpell = (data: any) => {
        return Rpgtrackerwebclient.post(`/coc/api/v1/spells`, data);
    }

    static updateSpell = (data: any) => {
        return Rpgtrackerwebclient.put(`/coc/api/v1/spells/${data.id}`, data);
    }

    static deleteSpell = (uuid: string) => {
        return Rpgtrackerwebclient.delete(`/coc/api/v1/spells/${uuid}`);
    }
}

export { CoCSpellService }