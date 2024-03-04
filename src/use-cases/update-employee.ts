import { Employee } from "@prisma/client";
import { EmployeesRepository } from "@/repositories/employees-repository";
import { EmployeeDoesntExists } from "./errors/employee-doesnt-exists";

interface UpdateEmployeeRequest {
    id: string,
    name: string,
    email: string,
    password: string,
    sector: string,
    role: 'Admin' | 'User'
}

interface UpdateEmployeeResponse {
    updatedEmployee: Employee
}

export class UpdateEmployeesUseCase {
    constructor(private employeesRepository: EmployeesRepository) {}

    async execute({ email, name,password, role, sector, id }:UpdateEmployeeRequest): 
    Promise<UpdateEmployeeResponse> {
        const employeeExists = await this.employeesRepository.findById(id)

        if(!employeeExists) {
            throw new EmployeeDoesntExists()
        }

        const updatedEmployee = await this.employeesRepository.update({
            email,
            name,
            password,
            role,
            sector,
            id,
            updated_at: new Date(),
        })

        return {updatedEmployee}
    }
}