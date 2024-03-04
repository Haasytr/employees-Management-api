import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEmployeesRepository } from '@/repositories/in-memory/in-memory-employees-repository'
import { UpdateEmployeesUseCase } from './update-employee'

let employeesRepository: InMemoryEmployeesRepository
let sut: UpdateEmployeesUseCase
describe("Update users use case", () => {
   beforeEach(() => {
    employeesRepository = new InMemoryEmployeesRepository()
    sut = new UpdateEmployeesUseCase(employeesRepository)
   })

   it("should be able to update users",async  () => {
    const employee = await employeesRepository.create({
        name: 'Jonh cena',
        email: 'jonhcena@test.com',
        password: '123321',
        role: 'Admin',
        sector: 'Development'
    })

    const { updatedEmployee } = await sut.execute({
        id: employee.id,
        name: 'Ratinho',
        email: 'jonhcena@test.com',
        password: '123321',
        role: 'Admin',
        sector: 'Development'
    })

    expect(updatedEmployee.name).toEqual("Ratinho")

   })
})