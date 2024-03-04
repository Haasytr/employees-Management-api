import { $Enums, Employee, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { EmployeesRepository } from "../employees-repository";
import { EmployeeAuthenticationCredentialFailure } from "@/use-cases/errors/employee-authentication-fail-credentials";

export class InMemoryEmployeesRepository implements EmployeesRepository {
    
    public employees: Employee[] = []

    async create(data: Prisma.EmployeeUncheckedCreateInput) {
        const employee = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password: data.password,
            sector: data.sector,
            role: data.role,
            created_at: new Date(),
            updated_at: new Date()
        }
        
        this.employees.push(employee)

        return employee
    }

    async update(data: Prisma.EmployeeUncheckedCreateInput){
        const Editedemployee = {
            id: data.id,
            name: data.name,
            email: data.email,
            password: data.password,
            sector: data.sector,
            role: data.role,
            created_at: new Date(),
            updated_at: new Date()
        }

        const employeeIndex = this.employees.findIndex(employee => employee.id == data.id)
        this.employees[employeeIndex] = Editedemployee

        return Editedemployee

    }

    async findByEmail(email: string){
        const employee = this.employees.find((employee) => employee.email === email)

        if(!employee) {
            return null
        }

        return employee
    }
    async findById(id: string) {
        const employee = this.employees.find((employee) => employee.id === id)

        if(!employee) {
            return null
        }

        return employee
    }
    async searchMany(query: string){
        return this.employees
        .filter((employee) => employee.name.includes(query) ||  employee.sector.includes(query))
    }
}