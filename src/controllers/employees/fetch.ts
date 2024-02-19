import { EmployeeAlreadyExists } from "@/use-cases/errors/employee-already-exists";
import { makeCreateEmployeesUseCase } from "@/use-cases/factories/make-create-employee-use-case";
import { makeFetchEmployeesUseCase } from "@/use-cases/factories/make-fetch-employees-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod"

export async function fetch(req: FastifyRequest, res: FastifyReply) {
    const fetchBodySchema = z.object({
        query: z.string()
    })

    const { query } = fetchBodySchema.parse(req.query)

    try {
        const createUseCase = makeFetchEmployeesUseCase()

        const {employees} = await createUseCase.execute({
          query
        })

       employees.forEach(employee => {
            delete employee.password
       });

        return res.status(200).send(employees)
    } catch(err) {
       if (err instanceof EmployeeAlreadyExists) {
            return res.status(400).send({
                message: err.message
            })
       }
    }
}