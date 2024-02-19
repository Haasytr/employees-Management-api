import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEmployeesRepository } from '@/repositories/in-memory/in-memory-employees-repository'
import { FetchEmployeesUseCase } from './fetch-employees'

let employeesRepository: InMemoryEmployeesRepository
let sut: FetchEmployeesUseCase
describe("Fetch employees use case", () => {
   beforeEach(() => {
    employeesRepository = new InMemoryEmployeesRepository()
    sut = new FetchEmployeesUseCase(employeesRepository)
   })

   it("should be able to fetch users",async  () => {
    await employeesRepository.create({
        name: 'Jonh cena',
        email: 'jonhcena@test.com',
        password: '123321',
        role: 'Intern',
        sector: 'Development'
    })
    await employeesRepository.create({
        name: 'Jonh team',
        email: 'jonhdoe@test.com',
        password: '123321',
        role: 'Intern',
        sector: 'Development'
    })
    const { employees } = await sut.execute({
        query: "Development"
    })

    expect(employees).toHaveLength(2)
    expect(employees).toEqual([
        expect.objectContaining({ sector: 'Development' }),
        expect.objectContaining({ sector: 'Development' })
    ])
   })
})