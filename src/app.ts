import { Server } from "./presentation/server"
import "dotenv/config"


(() => {
    main()
})()

function main() {
    const server = new Server({ port: +(process.env.PORT as string), public_path: process.env.PUBLIC_PATH as string })
    server.start()
} 