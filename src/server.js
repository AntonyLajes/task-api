import http from "node:http"
import { extractQueryParams } from "./extract-query-params.js"
import { middleware } from "./middleware.js"
import { routes } from "./routes.js"



const server = http.createServer(async (req, res) => {
    const { url, method } = req

    middleware(req, res)

    // const buffers = []
    // for await (const chunck of req){
    //     buffers.push(chunck)
    // }

    // const fullBodyFile = Buffer.concat(buffers).toString()

    // console.log(fullBodyFile)

    // return res.end()
    
    const route = routes.find(route => {
        const routeParams = url.match(route.url)
        if(routeParams){
            const { query, ...params} = routeParams.groups
            req.params = params
            req.query = query ? extractQueryParams(query) : {}
        }

        return method === route.method && route.url.test(url)
    })

    if(route){
        return route.handler(req, res)
    }

    res.writeHead(404).end(`URL não encontrada: ${req.url}`)
})

server.listen(3333)