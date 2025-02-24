export type TTokenAccess = 'admin' | 'user';

export type TToken = {
    name: string;
    access: TTokenAccess;
    token: string;
    exp: Date;

    createdAt: Date;
    updatedAt: Date;
}