import { MinhasFichas } from "./Ficha"

export interface Mesa {
    id: number,
    name: string
    get_content_type: string,
    open_session: boolean,
    fichas_mesa: MinhasFichas[]
}