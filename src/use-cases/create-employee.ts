import { Employee } from "@prisma/client";
import { EmployeeAlreadyExists } from "./errors/employee-already-exists";
import { EmployeesRepository } from "@/repositories/employees-repository";

import { hash } from 'bcrypt'

interface CreateEmployeeRequest {
   name: string
   email: string
   password: string
   role: 'Admin' | 'User'
   sector: string
}

interface CreateEmployeeResponse {
    employee: Employee
}

export class CreateEmployeeUseCase {
    constructor(private employeesRepository: EmployeesRepository) {}

    async execute({ email, name, password, role, sector }:CreateEmployeeRequest): 
    Promise<CreateEmployeeResponse> {
        const emailAlreadyExists = await this.employeesRepository.findByEmail(email)

        if(emailAlreadyExists) {
            throw new EmployeeAlreadyExists()
        }

        const cryptedPassword = await hash(password, 6)
        
        const employee = await this.employeesRepository.create({name, email, password: cryptedPassword, role, sector})

        return {employee}
    }
}