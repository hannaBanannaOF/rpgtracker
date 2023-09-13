import { Rpgtrackerwebclient } from "../../webclient/Rpgtrackerwebclient";

class CoCPulpTalentService {
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
}

export { CoCPulpTalentService }