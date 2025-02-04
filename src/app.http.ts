import http from "http"
import fs from "fs"

const server = http.createServer((request, response) => {
    const { url } = request
    console.log(url)

    // response.writeHead(200, { "content-type": "text/html" })
    // response.write("<h1>Hola mundo</h1>")
    // response.end()

    if (url === "/") {
        const htmlFile = fs.readFileSync("./public/index.html", "utf-8")
        response.writeHead(200, { "content-type": "text/html" })
        response.end(htmlFile)
        return
    } 
    
    if (url?.endsWith(".js")) {
        response.writeHead(200, { "content-type": "application/javascript" })
    } else if (url?.endsWith(".css")) {
        response.writeHead(200, { "content-type": "text/css" })
    }

    const responseContent = fs.readFileSync(`./public${url}`, "utf-8")
    response.end(responseContent)
    

    // const data = { name: "Fede", age: 19 } 
    // response.writeHead(200, { "content-type": "application/json" })
    // response.end(JSON.stringify(data))
})

server.listen(8080, () => {
    console.log("Server Running in port 8080")
})