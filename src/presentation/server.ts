import express from "express"
import path from "path"


interface Options {
    port: number;
    public_path: string
}

export class Server {

    private app = express()
    private readonly port: number
    private readonly publicPath: string

    constructor(options: Options){
        const { port, public_path } = options
        this.port = port
        this.publicPath = public_path
    }

    async start(){

        // Middlewares

        // Public Folder
        this.app.use(express.static(this.publicPath))


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