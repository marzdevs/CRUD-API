// create express application
const express = require('express')
const app = express()

// declare route
// client requests, crud app responds
app.get('/', (req, res) =>{
    res.send('Hello NODE API')
})
app.listen(3000, () => {
    console.log(`Node API app is running on port 3000`)
})