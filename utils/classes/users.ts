export default class Users {
    public role: string
    public pin?: number
    public username?: string 
    public public_key?: string 
    public private_key?: string

    constructor(role: string, pin?: number, username?: string, public_key?: string, private_key?: string ) {
        this.role = role;
        this.pin = pin;
        this.username = username;
        this.public_key = public_key;
        this.private_key = private_key;
    }
}