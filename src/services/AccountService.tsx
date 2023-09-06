import { Rpgtrackerwebclient } from "../webclient/Rpgtrackerwebclient"

class AccountService {

    static getCurrentUserFichas = () => {
        return Rpgtrackerwebclient.get('/core/api/v1/my-character-sheets');
    }

    static getCurrentUserMesasMestradas = () => {
        return Rpgtrackerwebclient.get('/core/api/v1/my-dm-sessions');
    }
}

export { AccountService }