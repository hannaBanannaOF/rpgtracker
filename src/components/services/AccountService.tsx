import { Rpgtrackerwebclient } from "../webclient/Rpgtrackerwebclient"

class AccountService {

    static getCurrentUserFichas = () => {
        return Rpgtrackerwebclient.get('/my-character-sheets');
    }

    static getCurrentUserMesasMestradas = () => {
        return Rpgtrackerwebclient.get('/my-dm-sessions');
    }
}

export { AccountService }