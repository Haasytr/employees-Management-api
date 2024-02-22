import fastify from "fastify";
import { EmployeesRoutes } from "./routes/employees-routes";
import fastifyJwt from '@fastify/jwt'
import { env } from "./env";
import cors from '@fastify/cors'

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
})

app.register(cors, {})

app.register(EmployeesRoutes)