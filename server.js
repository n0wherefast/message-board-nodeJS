const express = require('express')
const messages  = require('./messages.json')
const  {writeFile,writeFileSync} = require('fs')


const app = express()

app.use(express.urlencoded({extended:true}))

app.get('/' ,(req,res)=>{
    res.send(`<h1>Message Board</h1> <a href="/new">add new</a> ${messages.map((msg)=>(
       `<span><br/><strong>user:</strong> ${msg.user} <strong>message:</strong> ${msg.text}</span>`
    ))}`)
    req.redirect('/')
    
    
})
app.get('/new' ,(req,res)=>{
    res.sendFile( __dirname+'/views/form.html')
})
app.post('/new',  (req,res)=>{
    const {mssg,username} = req.body
    const msg = [...messages,{ text:mssg, user:username, added:new Date() }]
    
    //    const msg = messages.push({ text:mssg, user:username, added:new Date() })
        writeFileSync('./messages.json',JSON.stringify(msg,null,2),'utf8')
        res.redirect("/")   
})

app.listen('3000')
