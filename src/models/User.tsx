export interface User {
    isUser: boolean;
    name: String;
    uuid: String;
    permissions: Permissions;
}

interface Permissions {
    isCocDm?: boolean;
    hasCocSheet?: boolean;
}