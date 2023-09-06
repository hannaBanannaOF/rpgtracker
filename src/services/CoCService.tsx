import { Rpgtrackerwebclient } from "../webclient/Rpgtrackerwebclient"

class CoCService {

    static getFicha = (idFicha: string) => {
        return Rpgtrackerwebclient.get(`/coc/api/v1/character-sheets/${idFicha}`);
    }

    static getMesa = (idMesa: string) => {
        return Rpgtrackerwebclient.get(`/coc/api/v1/sessions/${idMesa}`);
    }
}

export { CoCService }