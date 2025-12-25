import {promises as  fs } from 'fs' 


async function writeFile( path ,db){
   await fs.writeFile(path ,JSON.stringify(db, null, 2) ,"utf-8")

}





export default  writeFile