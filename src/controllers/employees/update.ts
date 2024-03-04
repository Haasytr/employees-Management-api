import { EmployeeAlreadyExists } from "@/use-cases/errors/employee-already-exists";
import { makeUpdateEmployeeUseCase } from "@/use-cases/factories/make-update-employee-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod"

export async function update(req: FastifyRequest, res: FastifyReply) {
    const updateBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        role: z.enum(["Admin", "User"]),
        sector: z.string()
    })

    const updateEmployeesQuerySchema = z.object({
        id: z.string()
    })

    const { id } = updateEmployeesQuerySchema.parse(req.query)

    const { email,name,password,role,sector } = updateBodySchema.parse(req.body)

    try {
        const createUseCase = makeUpdateEmployeeUseCase()

        await createUseCase.execute({
            id,
            email,
            name,
            password,
            role,
            sector,
        })

        return res.status(201).send()
    } catch(err) {
       if (err instanceof EmployeeAlreadyExists) {
            return res.status(400).send({
                message: err.message
            })
       }
    }
}