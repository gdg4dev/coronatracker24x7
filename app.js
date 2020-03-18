const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const handlebars = require('express-handlebars')
const port = process.env.PORT || 3000
const viewPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')
const publicPath = path.join(__dirname, './public')
app.use(express.static(publicPath))
hbs.registerPartials(partialsPath)
app.set('view engine', 'hbs')
app.set('views', viewPath)

app.get('', (req, res) => {
    res.render('index', {
        title: true
    })
})
app.get('*', (req, res) => {
    res.status(404).redirect('404.html')
})
app.listen(port, () => {
    console.log('Server started successfully')
})
