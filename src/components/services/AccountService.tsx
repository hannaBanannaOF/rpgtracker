import { Rpgtrackerwebclient } from "../webclient/Rpgtrackerwebclient"

class AccountService {

    static getCurrentUserObj = () => {
        return Rpgtrackerwebclient.get('v1/accounts/current-user');
    }

    static getCurrentUserFichas = () => {
        return Rpgtrackerwebclient.get('v1/accounts/current-user/fichas');
    }

    static getCurrentUserMesasMestradas = () => {
        return Rpgtrackerwebclient.get('v1/accounts/current-user/mesas-mestradas');
    }
}

export { AccountService }