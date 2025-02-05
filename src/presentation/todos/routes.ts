import { Router } from "express"
import { TodosController } from "./controller"

export class TodoRoutes {

    static get routes(): Router {
        const router = Router()

        const todoControler = new TodosController()

        router.get("/", (request, response) => todoControler.getTodos(request, response))
        router.get("/:id", (request, response) => todoControler.getTodoById(request, response))

        router.post("/", (request, response) => todoControler.createTodo(request, response))
        
        router.put("/:id", (request, response) => todoControler.updateTodo(request, response)) 

        router.delete("/:id", (request, response) => todoControler.deleteTodo(request, response))

        return router
    }

}