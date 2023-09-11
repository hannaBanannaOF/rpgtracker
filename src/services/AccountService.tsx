import { Rpgtrackerwebclient } from "../webclient/Rpgtrackerwebclient"

class AccountService {

    static getCurrentUserFichas = (page: number) => {
        return Rpgtrackerwebclient.get(`/core/api/v1/my-character-sheets?page=${page}`);
    }

    static getCurrentUserMesasMestradas = (page: number) => {
        return Rpgtrackerwebclient.get(`/core/api/v1/my-dm-sessions?page=${page}`);
    }

    static getMesaViewPermission = (mesaId: string) => {
        return Rpgtrackerwebclient.get(`/core/api/v1/session/${mesaId}`);
    }

    static getFichaViewPermission = (fichaId: string) => {
        return Rpgtrackerwebclient.get(`/core/api/v1/character-sheet/${fichaId}`);
    }
}

export { AccountService }