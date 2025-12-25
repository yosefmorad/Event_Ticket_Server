import read from "../io/readFile.js";
const usersPath = "./data/users.json";
const pathEvent = './data/events.json'
const pathRec = './data/receipts.json'

//בדיקת הרשאות
export async function checkPrmissions(req, res, next) {
  const name = req.headers.username;

  const password = req.headers.password;
  
  const data = await read(usersPath);
  
  
  if (!data.length) {
    return res.send("Empty permission list");
  }

  for (let user of data) {
    
    
    
    
    
    if (user.username === name && user.password === password) {
      return next();
    }
  }
  return res.status(404).send("user not registered");
}

//בדיקת הוספת משתמש

export function checkAddUser(req, res, next) {
  const check = req.body;
  const len = Object.keys(check);

  if (!check.username || !check.password || len.length != 2) {
    return res.send("input not valide");
  }
  next();
}

//בדיקת שדות יצירת אירויע

export async function eventCreationTest(req, res, next) {
  const check = req.body;
  const len = Object.keys(check);
  if (
    !(
      check.eventname &&
      check.ticketsforsale && 
      
      check.username &&
      check.password &&
      len.length == 4
    )
  ) {
    return res.status(400).send("One or more of the fields is invalid.");
  }

  next();
}

// בדיקת שם בבקשת קבלות
export async function checkName(req ,res ,next){
    const name = req.params.username
    const data = await read(pathRec)
    for(let i of data){
        if(i.username === name){
            return next()
        }

    }
    return res.send("name not found")
}






//בדיקת קניית ברטיס האם האירוע קיים 
export async function eventExsist(req, res, next) {
    const data = await read(pathEvent)
        const event = req.body.eventname
        
        
        for(let r of data){
            if(r.eventname === event){
                return next()
            }
        }
return res.send("event not exsist")
}
