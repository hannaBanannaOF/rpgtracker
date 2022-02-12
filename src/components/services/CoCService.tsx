import { Rpgtrackerwebclient } from "../webclient/Rpgtrackerwebclient"

class CoCService {

    static getFicha = (idFicha: number) => {
        return Rpgtrackerwebclient.get('v1/coc/ficha/'+idFicha);
    }
}

export { CoCService }