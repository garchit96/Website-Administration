import { UserGroups } from "./usergroups";

export class userModel {
    user_id?: number;
    name: string = '';
    email: string = '';
    address: string = '';
    // group_id?:number;
    usergroup: {
        group_id?: number
    };

}