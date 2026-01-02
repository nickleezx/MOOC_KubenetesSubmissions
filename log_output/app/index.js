import { v4 as uuidv4 } from 'uuid';

setInterval(() => {
    console.log(`${new Date().toISOString()}: ${uuidv4()}`)
}, 5000)