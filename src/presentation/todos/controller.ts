import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto"
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto"

export class TodosController {
    constructor() { }

    public getTodos = async (request: Request, response: Response) => {
        const todos = await prisma.todo.findMany()

        return response.json(todos)
    }

    public getTodoById = async (request: Request, response: Response) => {
        const id = +request.params.id
        if (isNaN(id)) return response.status(400).json({ error: "El ID no es un numero" })

        const todo = await prisma.todo.findUnique({
            where: { id }
        })

        return (todo)
            ? response.json(todo)
            : response.status(404).json({ error: `Todo with ID ${id} not found` })
    }

    public createTodo = async (request: Request, response: Response) => {
        const [ error, createTodoDto] = CreateTodoDto.create(request.body)
        if (error) return response.status(400).json({ error })

        const newTodo = await prisma.todo.create({
            data: createTodoDto!
        })

        response.json(newTodo)
    }

    public updateTodo = async (request: Request, response: Response) => {
        const id = +request.params.id

        const [error, updateTodoDto] = UpdateTodoDto.create({...request.body, id})
        if (error) return response.status(400).json({ error });

        const todo = await prisma.todo.findUnique({
            where: { id }
        })

        if (!todo) return response.status(404).json({ error: "Todo Not Found!" })

        const updateTodo = await prisma.todo.update({
                where: { id },
                data: {
                    ...(updateTodoDto?.text && { text: updateTodoDto.text }),
                    ...(updateTodoDto?.completedAt && { completedAt: updateTodoDto.completedAt })
                }
            })


        return response.json(updateTodo)
    }

    public deleteTodo = async (request: Request, response: Response) => {
        const id = +request.params.id

        if (!id) return response.status(400).json({ error: "ID not sent" })
        if (isNaN(id)) return response.status(400).json({ error: "ID is not a number" })

        const todo = await prisma.todo.findUnique({
            where: { id }
        })

        if (!todo) return response.status(404).json({ error: "TODO does not exists" })

        const deleted = await prisma.todo.delete({
            where: { id }
        })

        return response.json({ deleted })
    }
}