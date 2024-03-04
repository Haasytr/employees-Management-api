import { Prisma, $Enums, } from "@prisma/client";
import { EmployeesRepository } from "../employees-repository";
import { prisma } from "@/lib/prisma";

export class PrismaEmployeesRepository implements EmployeesRepository {
    async create(data: Prisma.EmployeeUncheckedCreateInput) {
        const employee = await prisma.employee.create({ data })

        return employee
    }
    async findByEmail(email: string) {
        const employee = await prisma.employee.findUnique({
            where: {
                email
            }
        })

        if(!employee) {
            return null
        }

        return employee
    }
    async searchMany(query: string){
        const employees = await prisma.employee.findMany({
           where: {
            OR: [
                { name: {
                    contains: query
                } },
                { sector:  {
                    contains: query
                } },
            ]
           }
        })

        return employees 
    }
    async update(data: Prisma.EmployeeUncheckedCreateInput) {
        const employee = await prisma.employee.update({
            where: {
                id: data.id,
            },
            data
        })

        return employee
    }
    async findById(id: string): Promise<{ id: string; name: string; email: string; password: string; sector: string; role: $Enums.ROLE; created_at: Date; updated_at: Date; }> {
        const employee = await prisma.employee.findUnique({
            where: {
                id
            }
        })

        if(!employee) {
            return null
        }

        return employee
    }
}