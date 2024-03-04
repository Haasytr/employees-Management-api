export class EmployeeDoesntExists extends Error {
    constructor() {
        super("Employee  doesn't exists")
    }
}