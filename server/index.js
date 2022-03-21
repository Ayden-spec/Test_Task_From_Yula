const express = require('express')
const authRouter = require('./routes/auth.routes')
const cors = require('./routes/cors')

const app = express();
const PORT = 5000;

app.use(cors)
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('', authRouter)

const start = () => {
    try {
        app.listen(PORT, ()=>{
            console.log('Server started on port', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}
start()