import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEmployeesRepository } from '@/repositories/in-memory/in-memory-employees-repository'
import { compare, hash } from 'bcrypt'
import AuthenticateUseCase from './authenticate'
import { EmployeeAuthenticationCredentialFailure } from './errors/employee-authentication-fail-credentials'

let employeesRepository: InMemoryEmployeesRepository
let sut: AuthenticateUseCase
describe("Create employee Use Case", () => {
   beforeEach(() => {
    employeesRepository = new InMemoryEmployeesRepository()
    sut = new AuthenticateUseCase(employeesRepository)
   })

   it("should be able to authenticate an employee", async () => {
    await employeesRepository.create({
        name: 'Jonh cena',
        email: 'jonhcena@test.com',
        password: String(await hash('123321', 6)),
        role: 'Admin',
        sector: 'Development'
    })

    const { employee } = await sut.execute({
        email: 'jonhcena@test.com',
        password: '123321',
    })

    expect(employee.id).toEqual(expect.any(String))
    })

    it("should not be able to authenticate with wrong email", async () => {
        await employeesRepository.create({
            name: 'Jonh cena',
            email: 'jonhcena@test.com',
            password: '123321',
            role: 'Admin',
            sector: 'Development'
        })
    
        expect(async () => {
            await sut.execute({
                email: 'jonhcena@error.com',
                password: '123321',
            })
        }).rejects.toBeInstanceOf(EmployeeAuthenticationCredentialFailure)
    })

    it("should not be able to authenticate with wrong password", async () => {
        await employeesRepository.create({
            name: 'Jonh cena',
            email: 'jonhcena@test.com',
            password: '123321',
            role: 'Admin',
            sector: 'Development'
        })
    
        expect(async () => {
            await sut.execute({
                email: 'jonhcena@test.com',
                password: '321123',
            })
        }).rejects.toBeInstanceOf(EmployeeAuthenticationCredentialFailure)
    })
})