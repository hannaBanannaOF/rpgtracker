import { GiHarryPotterSkull, GiOctopus } from "react-icons/gi";

export function getContentTypeItem(system: string) {
    if(system === 'CALL_OF_CTHULHU') {
        return <GiOctopus size={25}/>;
    }
    if(system === 'hp') {
        return <GiHarryPotterSkull size={25} />;
    }
}

export function getContentTypeTooltip(system: string) {
    if(system === 'CALL_OF_CTHULHU') {
        return "Call of Cthulhu";
    }
    if(system === 'hp') {
        return "Harry Potter (Broomstix)";
    }
    return "";
}

export function getSystemPath(system: string) {
    if(system === 'CALL_OF_CTHULHU') {
        return "coc";
    }
    if(system === 'hp') {
        return "hp";
    }
    return "";
}