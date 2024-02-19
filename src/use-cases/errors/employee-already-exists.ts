export class EmployeeAlreadyExists extends Error {
    constructor() {
        super('Email already exists')
    }
}