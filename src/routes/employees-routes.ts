import { authenticate } from "@/controllers/employees/authenticate";
import { create } from "@/controllers/employees/create";
import { fetch } from "@/controllers/employees/fetch";
import { verifyJWT } from "@/middlewares/verify-jwt";
import { verifyUserRole } from "@/middlewares/verify-user-role";
import { FastifyInstance } from "fastify";

export async function EmployeesRoutes(app: FastifyInstance) {
    app.post("/employees", { onRequest: [verifyJWT] }, create)
    app.get("/employees", { onRequest: [verifyJWT, verifyUserRole("Admin")] }, fetch)
    app.post("/session", authenticate)
}