import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees-repository'
import { UpdateEmployeesUseCase } from '../update-employee'

export function makeUpdateEmployeeUseCase() {
    const employeesRepository = new PrismaEmployeesRepository()
    const useCase = new UpdateEmployeesUseCase(employeesRepository)

    return useCase
}