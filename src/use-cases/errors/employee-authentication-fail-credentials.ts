export class EmployeeAuthenticationCredentialFailure extends Error {
    constructor() {
        super('Email or password incorrect')
    }
}