import { User } from "./user";
export class Team {
    id: number | undefined;
    name: string | undefined;
    description: string | undefined;
    users: User[] | undefined;
}
