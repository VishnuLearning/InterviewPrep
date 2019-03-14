export class User {
    name : string;
    email: string;
    password: string;
    isloggedin: boolean;

    constructor(name: string, email:string, password: string){
        this.name = name;
        this.email = email;
        this.password = password;
        this.isloggedin = false;
    }
}