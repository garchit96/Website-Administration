import { UserGroups } from "./usergroups";

export interface Users{
    lock?: boolean;
    user_id?: number;
    name:string;
    email:string;
    address:string;
    group_id?:number;
    usergroup:UserGroups;
    // group:string;
}