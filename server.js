import express from 'express'
import userRout from './routs/userRout.js'
import {checkPrmissions} from './middlWher/check.js'
import eventsRout from './routs/eventsRout.js'



const app = express()
const port = 8080
app.use(express.json())
app.use(checkPrmissions)
app.use('/users' ,userRout)
app.use('/events' ,eventsRout)

















app.listen(port  ,()=>{
    console.log("server run on port" ,port);
    
})