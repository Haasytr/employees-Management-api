import { expect, describe, it, beforeEach } from 'vitest'
import { CreateEmployeeUseCase } from './create-employee'
import { InMemoryEmployeesRepository } from '@/repositories/in-memory/in-memory-employees-repository'
import { compare, hash } from 'bcrypt'
import { EmployeeAlreadyExists } from './errors/employee-already-exists'

let employeesRepository: InMemoryEmployeesRepository
let sut: CreateEmployeeUseCase
describe("Create employee Use Case", () => {
   beforeEach(() => {
    employeesRepository = new InMemoryEmployeesRepository()
    sut = new CreateEmployeeUseCase(employeesRepository)
   })

   it("should be able to create an employee",async  () => {
    const { employee } = await sut.execute({
        name: 'Jonh cena',
        email: 'jonhcena@test.com',
        password: '123321',
        role: 'User',
        sector: 'Development'
    })

    expect(employee.id).toEqual(expect.any(String))
   })
   it("should be able to encrypt the password",async  () => {
    const { employee } = await sut.execute({
        name: 'Jonh cena',
        email: 'jonhcena@test.com',
        password: '123',
        role: 'User',
        sector: 'Development'
    })


    const isPasswordHashed = await compare('123', employee.password)

    expect(isPasswordHashed).toBe(true)
   })
   it("should no be able to register the same email twice",async  () => {
    await sut.execute({
        name: 'Jonh cena',
        email: 'jonhcena@test.com',
        password: '123',
        role: 'User',
        sector: 'Development'
    })
   

    expect(async () => {
        await sut.execute({
            name: 'Jonh cena',
            email: 'jonhcena@test.com',
            password: '123',
            role: 'User',
            sector: 'Development'
        })
    }).rejects.toBeInstanceOf(EmployeeAlreadyExists)
   })
})