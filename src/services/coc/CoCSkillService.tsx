import { Rpgtrackerwebclient } from "../../webclient/Rpgtrackerwebclient";

class CoCSkillService {
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
}

export { CoCSkillService }