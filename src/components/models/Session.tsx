export interface SessionBase {
    uuid: string,
    sessionName: string
    system: string,
    inPlay: boolean,
    players: string[]
}

export interface SessionSheet {
    uuid: string,
    characterName: string
}

export interface SessionWithSheets extends SessionBase {
    characterSheets: SessionSheet[]
}