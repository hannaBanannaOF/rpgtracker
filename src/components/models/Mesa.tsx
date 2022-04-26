import { FichaType } from "./Ficha"

export interface MesaBase {
    id: number,
    name: string
    get_content_type: string,
    open_session: boolean,
    fichas_mesa: FichaType[]
}