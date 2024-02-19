import { EmployeeAlreadyExists } from "@/use-cases/errors/employee-already-exists";
import { makeCreateEmployeesUseCase } from "@/use-cases/factories/make-create-employee-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod"

export async function create(req: FastifyRequest, res: FastifyReply) {
    const createBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        role: z.enum(["Admin", "Intern", "Programmer"]),
        sector: z.string()
    })

    const { email,name,password,role,sector } = createBodySchema.parse(req.body)

    try {
        const createUseCase = makeCreateEmployeesUseCase()

        await createUseCase.execute({
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