import { Employee } from "@prisma/client";
import { EmployeesRepository } from "@/repositories/employees-repository";

interface FetchEmployeesRequest {
    query: string
}

interface FetchEmployeesResponse {
    employees: Employee[]
}

export class FetchEmployeesUseCase {
    constructor(private employeesRepository: EmployeesRepository) {}

    async execute({ query }:FetchEmployeesRequest): 
    Promise<FetchEmployeesResponse> {
        const employees = await this.employeesRepository.searchMany(query)

        return {employees}
    }
}