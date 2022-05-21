import { Rpgtrackerwebclient } from "../webclient/Rpgtrackerwebclient"

class FeatureToggleService {

    static getFeatureActive = (feature: string) => {
        return Rpgtrackerwebclient.get('v1/feature-toggle/active/', {params: {feature: feature}});
    }
}

export { FeatureToggleService }