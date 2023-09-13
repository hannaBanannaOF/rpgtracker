import { Rpgtrackerwebclient } from "../../webclient/Rpgtrackerwebclient";

class CoCAmmoService {
    static getAmmoListing = (page: number) => {
        return Rpgtrackerwebclient.get(`/coc/api/v1/ammo?page=${page}`);
    }
    
    static getAmmo = (uuid: string) => {
        return Rpgtrackerwebclient.get(`/coc/api/v1/ammo/${uuid}`)
    }

    static addAmmo = (data: any) => {
        return Rpgtrackerwebclient.post(`/coc/api/v1/ammo`, data);
    }

    static updateAmmo = (data: any) => {
        return Rpgtrackerwebclient.put(`/coc/api/v1/ammo/${data.id}`, data);
    }

    static deleteAmmo = (uuid: string) => {
        return Rpgtrackerwebclient.delete(`/coc/api/v1/ammo/${uuid}`);
    }
}

export { CoCAmmoService }