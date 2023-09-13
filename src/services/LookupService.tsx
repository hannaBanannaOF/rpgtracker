import { Rpgtrackerwebclient } from "../webclient/Rpgtrackerwebclient";

export type LookupClass = 'skillRarity' | 'skillKind' | 'notUsableSkill' | 'usableSkill' | 'ammo' | 'skillPointCalculationRule';
export type LookupClient = 'coc';

class LookupService {
    static lookupData = (lookupClient: LookupClient, lookupclass: LookupClass, initialValue?: string, searchTerm?: string) => {
        return Rpgtrackerwebclient.get(`/${lookupClient}/api/v1/lookup?lookupClass=${lookupclass}
            ${initialValue !== undefined ? `&initialValue=${initialValue}` : ''}
            ${searchTerm !== undefined ? `&search=${searchTerm}` : ''}`
        );
    }
}

export { LookupService }