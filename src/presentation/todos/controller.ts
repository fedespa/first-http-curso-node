import { error } from "console"
import { Request, Response } from "express"

const TODOS = [
    { id: 1, text: "Buy Milk", createdAt: new Date() },
    { id: 2, text: "Buy Dog", createdAt: new Date() },
    { id: 3, text: "Buy Cat", createdAt: new Date() },
]

export class TodosController {
    constructor(

    ) { }

    public getTodos = (request: Request, response: Response) => {
        return response.json(TODOS)
    }

    public getTodoById = (request: Request, response: Response) => {
        const id = +request.params.id
        if (isNaN(id)) return response.status(400).json({ error: "El ID no es un numero" })

        const todo = TODOS.find(todo => todo.id === id)
        return (todo)
            ? response.json(todo)
            : response.status(404).json({ error: `Todo with ID ${id} not found` })
    }

    public createTodo = (request: Request, response: Response) => {
        const { text } = request.body

        if (!text) return response.status(400).json({ error: "Text Property is required" })

        const newTodo = {
            id: TODOS.length + 1,
            text,
            createdAt: new Date()
        }

        TODOS.push(newTodo)

        response.json(newTodo)
    }

    public updateTodo = (request: Request, response: Response) => {
        const id = +request.params.id

        if (!id) return response.status(400).json({ error: "ID Property is required" })
        if (isNaN(id)) return response.status(404).json({ error: "ID is not a number" })

        const todo = TODOS.find(todo => todo.id === id)

        if (!todo) return response.status(404).json({ error: "Todo Not Found!" })

        const { text, createdAt } = request.body

        if (!text && !createdAt) return response.status(400).json({ error: "Text Property is required" })

        if (text) todo.text = text
        if (createdAt || createdAt === null) todo.createdAt = createdAt

        return response.json(todo)
    }

    public deleteTodo = (request: Request, response: Response) => {
        const id = +request.params.id

        if (!id) return response.status(400).json({ error: "ID not sent" })
        if (isNaN(id)) return response.status(400).json({ error: "ID is not a number" })

        const todo = TODOS.find(todo => todo.id === id)
        if (!todo) return response.status(404).json({ error: "TODO does not exists" })

        TODOS.splice(TODOS.indexOf(todo), 1)

        return response.json({ message: "TODO deleted!" })
    }
}