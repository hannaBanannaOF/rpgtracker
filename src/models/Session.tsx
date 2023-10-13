export interface SessionBase {
    uuid: string,
    coreId: string,
    sessionName: string
    system: string,
    inPlay: boolean,
    players: any[],
    pulpCthulhu?: boolean,
}

export interface SessionSheet {
    uuid: string,
    characterName: string
}

export interface SessionWithSheets extends SessionBase {
    sessionSheets: SessionSheet[]
}