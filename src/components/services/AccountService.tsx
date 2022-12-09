import { Rpgtrackerwebclient } from "../webclient/Rpgtrackerwebclient"

class AccountService {

    static getCurrentUserFichas = () => {
        return Rpgtrackerwebclient.get('/my-character-sheets');
    }

    static getCurrentUserMesasMestradas = () => {
        return Rpgtrackerwebclient.get('v1/accounts/current-user/mesas-mestradas');
    }
}

export { AccountService }