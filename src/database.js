import crypto from "node:crypto"
import fs from "node:fs/promises"
import { URL } from "node:url"

const dbUrl = new URL('database.json', import.meta.url)

export class Database{

    #db = {}

    async init(){
        try {
            const data = await fs.readFile(dbUrl, 'utf-8')
            this.#db = JSON.parse(data)
        } catch (error) {
            this.#persist()
        }
    }

    #persist(){
        fs.writeFile(dbUrl, JSON.stringify(this.#db))
    }

    insert(table, value){
        console.log(table, value);
        if(!this.#db[table]){
            this.#db[table] = []
        }
        const bodyToObject = JSON.parse(value)
        const task = {
            id: crypto.randomUUID(),
            ...bodyToObject,
            completed_at: null,
            created_at: new Date(),
            updated_at: null
        }
        this.#db[table].push(task)
        this.#persist()

        return task
    }

    select(table, {title, description}){
        let data = this.#db[table] ?? []
        if(title !== 'undefined' || description !== 'undefined'){
            data = data.filter(task => {
                return task.title === title || task.description === description
            })
        }

        return data
    }

    delete(table, taskId){
        const data = this.#db[table]
        const newData = data.filter((task) => {
            return task.id !== taskId
        })
        this.#db[table] = newData
        this.#persist()
    }

    update(table, taskId, updates){
        const data = this.#db[table]
        const taskIndex = data.findIndex(task => task.id === taskId)
        if( taskIndex === -1){
            throw Error(`Task com ID ${taskId} não encontrada.`)
        }
        const task = data[taskIndex]
        const updatedTask = {
            ...task,
            ...updates,
            updated_at: new Date()
        }

        this.#db[table][taskIndex] = updatedTask
    }

}