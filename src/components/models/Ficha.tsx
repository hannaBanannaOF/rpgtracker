import { CurrentUser } from "./CurrentUser";
import { Mesa } from "./Mesa";

export interface MinhasFichas {
    id: number,
    nome_personagem: string,
    get_content_type: string,
    mesa? : Mesa,
    jogador: CurrentUser
}