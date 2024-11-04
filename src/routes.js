import { buildRoutePath } from "./build-route-path.js"
import { Database } from "./database.js"

const database = new Database()
await database.init()

export const routes = [
    {
        url: buildRoutePath('/tasks'),
        method: 'GET',
        handler: (req, res) => {
            let {title, description} = req.query
            title = decodeURIComponent(title)
            description = decodeURIComponent(description)
            
            const data = database.select('tasks', {title, description})

            return res.end(JSON.stringify(data))
        }
    },
    {
        url: buildRoutePath('/tasks'),
        method: 'POST',
        handler: async (req, res) => {
            const buffers = []
            for await (const chunck of req) {
                buffers.push(chunck)
            }
            const fullBodyParams = Buffer.concat(buffers).toString()
            const contentType = req.headers['content-type']

            if(contentType === "application/json"){
                const addedItem = database.insert('tasks', fullBodyParams)

                return res.writeHead(201).end(JSON.stringify(addedItem))
            }
            
            const lines = fullBodyParams.trim().split('\n').slice(5, -2)
            const linesToObj = lines.map(line => {
                const [title, description] = line.split(',')
                return {
                    title,
                    description
                }
            })

            linesToObj.forEach(line => {
                database.insert("tasks", JSON.stringify(line))
            })

            return res.writeHead(201).end()
        }
    },
    {
        url: buildRoutePath('/task/:id'),
        method: 'PUT',
        handler: async (req, res) => {
            const buffers = []
            for await (const chunck of req) {
                buffers.push(chunck)
            }
            const fullBodyParams = JSON.parse(Buffer.concat(buffers).toString())

            const taskId = req.params.id

            try {
                database.update('tasks', taskId, fullBodyParams)
                res.end()
            } catch (error) {
                res.writeHead(404).end(error.message)
            }
        }
    },
    {
        url: buildRoutePath('/task/:id'),
        method: 'PATCH',
        handler: async (req, res) => {
            const taskId = req.params.id
            try {
                database.update("tasks", taskId, { completed_at: new Date()})
                res.end()
            } catch (error) {
                res.writeHead(404).end(error.message)
            }
        }
    },
    {
        url: buildRoutePath('/task/:id'),
        method: 'DELETE',
        handler: async (req, res) => {
            const taskId = req.params.id
            database.delete("tasks", taskId)
            return res.end()
        }
    }
]