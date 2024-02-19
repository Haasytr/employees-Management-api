import { PrismaEmployeesRepository } from '@/repositories/prisma/prisma-employees-repository'
import AuthenticateUseCase from '../authenticate'

export function makeAuthenticateEmployeeUseCase() {
    const employeesRepository = new PrismaEmployeesRepository()
    const useCase = new AuthenticateUseCase(employeesRepository)

    return useCase
}