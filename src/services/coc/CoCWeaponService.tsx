import { Rpgtrackerwebclient } from "../../webclient/Rpgtrackerwebclient";

class CoCWeaponService {
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
}

export { CoCWeaponService }