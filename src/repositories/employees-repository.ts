import { Employee, Prisma } from "@prisma/client";

export interface EmployeesRepository {
    create(data: Prisma.EmployeeUncheckedCreateInput): Promise<Employee>
    findByEmail(email: string): Promise<Employee | null>
    searchMany(query: string): Promise<Employee[]>
}