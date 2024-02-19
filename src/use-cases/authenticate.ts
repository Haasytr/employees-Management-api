import { EmployeesRepository } from "@/repositories/employees-repository"
import { Employee } from "@prisma/client"
import { EmployeeAuthenticationCredentialFailure } from "./errors/employee-authentication-fail-credentials"
import { compare } from "bcrypt"

interface AuthenticateUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateUseCaseResponse {
    employee: Employee
}

export default class AuthenticateUseCase {
    constructor(private employeesRepository: EmployeesRepository) {}

    async execute({
        email, password
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const employee = await this.employeesRepository.findByEmail(email)

        if(!employee) {
            throw new EmployeeAuthenticationCredentialFailure()
        }

        const doesPasswordMatch = await compare(password, employee.password)

        if(!doesPasswordMatch) {
            throw new EmployeeAuthenticationCredentialFailure()
        }

        return {
            employee
        }
        
    }
}