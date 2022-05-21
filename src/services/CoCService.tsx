import { Rpgtrackerwebclient } from "../webclient/Rpgtrackerwebclient"

class CoCService {

    static getFicha = (idFicha: number) => {
        return Rpgtrackerwebclient.get('v1/coc/ficha/details/', {params :{pk: idFicha}});
    }

    static getMesa = (idMesa: number) => {
        return Rpgtrackerwebclient.get('v1/coc/mesa/details/', {params :{pk: idMesa}});
    }
}

export { CoCService }