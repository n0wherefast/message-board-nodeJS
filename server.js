const express = require('express')
const messages  = require('./message')


const app = express()



app.use(express.urlencoded({extended:true}))

app.get('/' ,(req,res)=>{
    res.send(`<h1>Message Board</h1> <a href="/new">add new</a> ${messages.map((msg)=>(
       `<span><br/><strong>user:</strong> ${msg.user} <strong>message:</strong> ${msg.text}</span>`
    ))}`)
    
})
app.get('/new' ,(req,res)=>{
    res.sendFile( __dirname+'/views/form.html')
})
app.post('/new',  (req,res)=>{
    const {mssg,username} = req.body
        messages.push({ text:mssg, user:username, added:new Date() })
        res.redirect("/")   
})

app.listen('3000')
