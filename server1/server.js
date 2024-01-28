const express=require('express')
const cors = require('cors')
const db = require('./models')
const musicRouter = require('./routers/MusicCds')
const userRouter=require('./routers/Users')

const app=express()

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    console.log('Server is running.')
})

app.use('/users',userRouter)
app.use('/MusicCds',musicRouter)

const PORT  = 5000
db.sequelize.sync().then(() => {
    app.listen(PORT , () => {
        console.log(`Server is running on port: ${PORT}`)
    })
})