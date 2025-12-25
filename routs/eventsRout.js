import express from "express";
import read from "../io/readFile.js";
import writeFile from "../io/writeFile.js";
import {eventCreationTest} from '../middlWher/check.js'


const  eventsRout = express()
const eventPath = './data/events.json'


eventsRout.use(eventCreationTest)
eventsRout.post('/creator/events' , async (req ,res)=>{
    if(!(req.body.ticketsforsale === Number)){return res.send("ticketsForSale  must be number")}
     
try{

  const data = await read(eventPath);
  
  
  
  data.push(req.body)
 
  
  writeFile(eventPath ,data)
  return res.status(200).json({"message": "Event created successfully"})}
  catch(err){
    console.error(err);
    res.status(400)
    
  }
});















export default eventsRout