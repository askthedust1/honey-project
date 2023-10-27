import {Schema} from "mongoose";
export interface IUserApi {
    email: string;
    password: string;
    token: string;
    role: string;
    displayName: string;
    googleID?: string;
    image?: string | null;
}
