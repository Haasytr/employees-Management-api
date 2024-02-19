export class InvalidAuthorization extends Error {
    constructor() {
        super('Only Admins can add new employees')
    }
}