import fastify from "fastify";
import { EmployeesRoutes } from "./routes/employees-routes";

export const app = fastify()

app.register(EmployeesRoutes)