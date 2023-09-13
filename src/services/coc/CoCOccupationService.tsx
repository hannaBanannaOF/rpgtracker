import { Rpgtrackerwebclient } from "../../webclient/Rpgtrackerwebclient";

class CoCOccupationService {

    static getOccupationsListing = (page: number) => {
        return Rpgtrackerwebclient.get(`/coc/api/v1/occupations?page=${page}`);
    }

    static getOccupation = (uuid: string) => {
        return Rpgtrackerwebclient.get(`/coc/api/v1/occupations/${uuid}`)
    }

    static addOccupation = (data: any) => {
        return Rpgtrackerwebclient.post(`/coc/api/v1/occupations`, data);
    }

    static updateOccupation = (data: any) => {
        return Rpgtrackerwebclient.put(`/coc/api/v1/occupations/${data.id}`, data);
    }

    static deleteOccupation = (uuid: string) => {
        return Rpgtrackerwebclient.delete(`/coc/api/v1/occupations/${uuid}`);
    }

}

export { CoCOccupationService }