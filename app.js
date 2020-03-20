const express = require('express')
const path = require('path')
const hbs = require('hbs')
const compression = require('compression')
const app = express()
const port = process.env.PORT || 3000
const viewPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')
const publicPath = path.join(__dirname, './public')
const convertDataIntoJsonAPI = require('./utils/coronaAPI1') //API1
const coronaAPI2 = require('./utils/coronaAPI2')
const authAPIKeys = ['DMDWJ2LHn8hLRT1VfS9bEQqGGLaU1z7K56IDJUiH819wcRFzEk9fHQGTnfefOAYh07Hfwx']
app.use(express.urlencoded())
app.use(compression())
app.use(express.json())
app.use(express.static(publicPath))
hbs.registerPartials(partialsPath)
app.set('view engine', 'hbs')
app.set('views', viewPath)
app.set('')
app.get('', (req, res) => {
    let finalData
    let totalData

    coronaAPI2(async (d) => {

        let a = await d;
        let firstArray = a[0]
        let countryList = firstArray.map((v) => {
            return v.countryName
        })
        // console.log(d)
        totalData = firstArray.filter(o => { return o.countryName == "Total:"; })[0]

        console.log(countryList)
        console.log(totalData)
        res.render('index', {
            countryList,
            title: true,
            totalData,
            totalRecovered: totalData.totalRecovered.replace(/,/g, ''),
            seriousCases: totalData.seriousCases.replace(/,/g, ''),
            totalDeaths: totalData.totalDeaths.replace(/,/g, ''),
            activeCases: totalData.activeCases.replace(/,/g, '')
        })
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
