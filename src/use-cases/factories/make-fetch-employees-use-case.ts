import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees-repository'
import { FetchEmployeesUseCase } from '../fetch-employees'

export function makeFetchEmployeesUseCase() {
    const employeesRepository = new PrismaEmployeesRepository()
    const useCase = new FetchEmployeesUseCase(employeesRepository)

    return useCase
}