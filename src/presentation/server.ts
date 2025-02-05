import express, { Router } from "express"
import path from "path"


interface Options {
    port: number;
    routes: Router;
    public_path: string;
}

export class Server {

    private app = express()
    private readonly port: number
    private readonly publicPath: string
    private readonly routes: Router

    constructor(options: Options){
        const { port, public_path, routes } = options
        this.port = port
        this.publicPath = public_path
        this.routes = routes
    }

    async start(){

        // Middlewares
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true })) // Permite el formato de body x-www-form-urlencoded

        // Public Folder
        this.app.use(express.static(this.publicPath))

        // Routes
        this.app.use(this.routes)


        //* SPA
        this.app.get('*', (request,response) => {
            const indexPath = path.join(__dirname + "../../../public/index.html")
            response.sendFile(indexPath)
            return
        })

        this.app.listen(this.port, () => {
            console.log("Server Running in port 3000")
        })
    }
}