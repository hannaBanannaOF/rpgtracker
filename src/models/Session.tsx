export interface SessionBase {
    uuid: string,
    sessionName: string
    system: string,
    inPlay: boolean,
    players: any[]
}

export interface SessionSheet {
    uuid: string,
    characterName: string
}

export interface SessionWithSheets extends SessionBase {
    sessionSheets: SessionSheet[]
}