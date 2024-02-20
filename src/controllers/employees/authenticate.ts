import { EmployeeAuthenticationCredentialFailure } from "@/use-cases/errors/employee-authentication-fail-credentials";
import { makeAuthenticateEmployeeUseCase } from "@/use-cases/factories/make-authenticate-employee-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import * as z from "zod"

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
    const createBodySchema = z.object({ 
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email, password } = createBodySchema.parse(req.body)

    console

    try {
        const createUseCase = makeAuthenticateEmployeeUseCase()

        const {employee} = await createUseCase.execute({
            email,
            password,
        })



       const token = await res.jwtSign(
        {
            role: employee.role
        },
        {
            sign: {
                sub: employee.id
            }
        }
       )

        return res.status(200).send(token)
    } catch(err) {
        if(err instanceof EmployeeAuthenticationCredentialFailure) {
            return res.status(400).send({
                message: err.message
            })
        }
    }
}