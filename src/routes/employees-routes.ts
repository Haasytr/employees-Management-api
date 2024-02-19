import { create } from "@/controllers/employees/create";
import { fetch } from "@/controllers/employees/fetch";
import { FastifyInstance } from "fastify";

export async function EmployeesRoutes(app: FastifyInstance) {
    app.post("/employees", create)
    app.get("/employees", fetch)
}