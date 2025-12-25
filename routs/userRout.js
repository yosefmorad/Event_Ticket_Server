import express from "express";
import read from "../io/readFile.js";
import writeFile from "../io/writeFile.js";
import {eventExsist} from '../middlWher/check.js'

import {checkAddUser} from '../middlWher/check.js'
import {checkName} from '../middlWher/check.js'

const userRout = express();
const pathUsets = "./data/users.json"
const pathEvent = './data/events.json'
const pathRec = './data/receipts.json'


userRout.post("/register",  checkAddUser,async (req, res) => {
  const userName = req.body.username;
  


 
  
  const data = await read(pathUsets);
  
  
  for (let u of data) {
    if (u.username === userName) {
      return res.status(400).send("Username already exists");
    }
  }
  data.push(req.body)
 
  
  writeFile(pathUsets ,data)
  return res.status(200).json({message: "User registered successfully"})
});




userRout.post('/tickets/buy' ,eventExsist , async (req ,res)=>{
    const rec = Number(req.body.quantity)
    const enentname = req.body.eventname
    
   
    
    const dataEvent  = await read(pathEvent)
    const dataRec = await read(pathRec)
    for(let e of dataEvent){
        if(e.eventname === enentname.toLowerCase())
            if(e.ticketsforsale < rec){
                return res.send("not  quantity")

            }

    }
    dataRec.push(req.body)
    writeFile(pathRec ,dataRec)

    for(let i of dataEvent){
        if(i.eventname === req.body.eventname){
            i.ticketsforsale -= rec 
        }
    }
writeFile(pathEvent ,dataEvent)

res.send("secssas")
   


})




userRout.get('/:username/summary' ,checkName ,async(req ,res)=>{
    const user = req.params.username
    
    
    const data = await read(pathRec)
    const list = []
    for(let i of data){
        if(i.username === user){
            list.push(i)
        }
    }
    let totalTickets = 0
    const events =[]
    for(let j of list){
        totalTickets += j.quantity
        events.push(j.eventname)
    }
const average = totalTickets / events.length
res.status(200).json({totalTicketsBought: totalTickets ,events:events ,averageTicketsPerEvent:average})
})


export default userRout;
