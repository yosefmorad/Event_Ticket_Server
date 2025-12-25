import { promises as fs  } from 'fs'


export default async function read(path){
    const data = await fs.readFile(path,"utf-8")
    return JSON.parse(data)
}