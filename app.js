const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
const viewPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')
const publicPath = path.join(__dirname, './public')
const convertDataIntoJsonAPI = require('./utils/coronaAPI1') //API1
const coronaAPI2 = require('./utils/coronaAPI2')
const authAPIKeys = ['DMDWJ2LHn8hLRT1VfS9bEQqGGLaU1z7K56IDJUiH819wcRFzEk9fHQGTnfefOAYh07Hfwx']
app.use(express.static(publicPath))
hbs.registerPartials(partialsPath)
app.set('view engine', 'hbs')
app.set('views', viewPath)
app.set('')
app.get('', (req, res) => {
    res.render('index', {
        title: true
    })
})


// API ENDPOINTS
app.get('/coronavirusdata/api/v1', (req, res) => {
    try {
        const clientAuthID = req.query.key
        console.log(clientAuthID)
        if (authAPIKeys.includes(clientAuthID)) {

            convertDataIntoJsonAPI((APIData, err) => {
                res.send(APIData)
            })
        } else {
            console.log('Invalid API Attempt')
            res.status(403).send({ 'error': 'Please Provide Valid API Key' })
        }
    } catch (e) {
        res.status(500).send({ 'error': 'Some went wrong!' })
    }
})

app.get('/coronavirusdata/api/v2', async (req, res) => {
    try {
        const clientAuthID = req.query.key
        console.log(clientAuthID)
        if (authAPIKeys.includes(clientAuthID)) {
            coronaAPI2((d) => {
                res.send(d)
            })
        } else {
            console.log('Invalid API Attempt')
            res.status(403).send({ 'error': 'Please Provide Valid API Key' })
        }
    } catch (e) {
        res.status(500).send({ 'error': 'Some went wrong!' })
    }
})

//DEFAULT 404
app.get('*', (req, res) => {
    res.status(404).redirect('404.html')
})

//START SERVER
app.listen(port, () => {
    console.log('Server started successfully')
})
