require('./crons/apiV1Data')
require('./crons/apiv2Data')
require('./crons/coronaGraphData')
require('./crons/rss2')
require('./scraper')
require('./crons/cronsForGraphs/graphjs')
require('./crons/cronsForGraphs/graphjson')
require('./crons/graphcdata')
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
const getCountryList = require('./utils/getCountryList')
const coronaAustralia = require('./utils/coronaAustralia')
const coronaUSA = require('./utils/coronaUSA')
const coronaEurope = require('./utils/coronaEurope')
const coronaCanada = require('./utils/coronaCanada')
const coronaChina = require('./utils/coronaChina')
const coronaLatinAmerica = require('./utils/coronaLatinAmerica')
const coronaAfrica = require('./utils/coronaAfrica')
const graphsD = require('./utils/graphcdata')
const rss = require('./utils/rss')
const sortedRSS = require('./utils/sortRawRssData')
const getTotalObj = require('./utils/getTotalObj')
const authAPIKeys = ['DMDWJ2LHn8hLRT1VfS9bEQqGGLaU1z7K56IDJUiH819wcRFzEk9fHQGTnfefOAYh07Hfwx']
app.use(express.urlencoded())
app.use(compression())
app.use(express.json())
app.use(express.static(publicPath))
hbs.registerPartials(partialsPath)
app.set('view engine', 'hbs')
app.set('views', viewPath)
    // app.set('json spaces', 2);
app.use(express.json());
// app.set('')
try {
    app.get('', (req, res) => {
        let finalData
        getCountryList((countryList) => {
            getTotalObj((d2) => {
                finalData = countryList
                finalObj = d2
                console.log(d2)
                res.render('index', {
                    countryList,
                    title: true,
                    finalObj,
                    totalRecovered: finalObj.totalRecovered.replace(/,/g, ''),
                    seriousCases: finalObj.seriousCases.replace(/,/g, ''),
                    totalDeaths: finalObj.totalDeaths.replace(/,/g, ''),
                    activeCases: finalObj.activeCases.replace(/,/g, '')
                })
            })
        })
    })

    app.get('/global', (req, res) => {
            try {
                let isRequestingCountry = req.query.country || false
                    // console.log(country)
                getCountryList((country) => {
                    coronaAPI2((data) => {
                        coronaAustralia((auData, err) => {
                            coronaCanada((caData, err) => {
                                coronaChina((chData, err) => {
                                    coronaEurope((euData, err) => {
                                        coronaLatinAmerica((laData, err) => {
                                            coronaUSA((usData, err) => {
                                                coronaAfrica((afData, err) => {
                                                    let usRegions = usData.regions
                                                    let usRegionsTotal = usData.regionTotal
                                                    let laRegions = laData.regions
                                                    let laRegionsTotal = laData.regionTotal
                                                    let euRegions = euData.regions
                                                    let euRegionsTotal = euData.regionTotal
                                                    let chRegions = chData.regions
                                                    let chRegionsTotal = chData.regionTotal
                                                    let caRegions = caData.regions
                                                    let caRegionsTotal = caData.regionTotal
                                                    let auRegions = auData.regions
                                                    let auRegionsTotal = auData.regionTotal
                                                    let afRegions = afData.regions
                                                    let afRegionsTotal = afData.regionTotal
                                                    if (req.query.country) {
                                                        if (country.includes(req.query.country.charAt(0).toUpperCase() + req.query.country.slice(1))) {
                                                            let countryExists = true
                                                            res.render('tracker', {
                                                                data,
                                                                isRequestingCountry,
                                                                countryExists,
                                                                usRegions,
                                                                usRegionsTotal,
                                                                laRegions,
                                                                laRegionsTotal,
                                                                euRegions,
                                                                euRegionsTotal,
                                                                chRegions,
                                                                chRegionsTotal,
                                                                caRegions,
                                                                caRegionsTotal,
                                                                auRegions,
                                                                auRegionsTotal,
                                                                afRegions,
                                                                afRegionsTotal
                                                            })
                                                        } else {
                                                            let countryExists = false
                                                            res.render('tracker', {
                                                                data,
                                                                isRequestingCountry,
                                                                countryExists,
                                                                usRegions,
                                                                usRegionsTotal,
                                                                laRegions,
                                                                laRegionsTotal,
                                                                euRegions,
                                                                euRegionsTotal,
                                                                chRegions,
                                                                chRegionsTotal,
                                                                caRegions,
                                                                caRegionsTotal,
                                                                auRegions,
                                                                auRegionsTotal,
                                                                afRegions,
                                                                afRegionsTotal
                                                            })
                                                        }
                                                    } else {
                                                        res.render('tracker', {
                                                            data,
                                                            isRequestingCountry,
                                                            usRegions,
                                                            usRegionsTotal,
                                                            laRegions,
                                                            laRegionsTotal,
                                                            euRegions,
                                                            euRegionsTotal,
                                                            chRegions,
                                                            chRegionsTotal,
                                                            caRegions,
                                                            caRegionsTotal,
                                                            auRegions,
                                                            auRegionsTotal,
                                                            afRegions,
                                                            afRegionsTotal
                                                        })
                                                    }
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })

            } catch {
                res.send('We\'ve encountered an error')
            }
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

    app.get('/coronavirusdata/api/v2', async(req, res) => {
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
    app.get('/corona/rss/type/json', (req, res) => {
        l = parseInt(req.query.limit) || 1
        sortedRSS(l, (a) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(a);
        })
    })

    app.post('/corona/rss/type/json', (req, res) => {
        l = parseInt(req.query.limit) || 1
        sortedRSS(l, (a) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(a);
        })
    })

    app.get('/details', (req, res) => {
        res.render('tracker')
    })
    app.get('/tracker', (req, res) => {
        res.render('graphs')
    })
    app.get('/symptoms', (req, res) => {
        res.render('symptoms')
    })
    app.get('/prevention', (req, res) => {
        res.render('prevention')
    })

    app.get('/wiki', (req, res) => {
        res.render('wiki')
    })

    app.get('/news', (req, res) => {
        res.render('news')
    })


    app.get('/corona/usa', (req, res) => {
        try {
            const clientAuthID = req.query.key
            console.log(clientAuthID)
            if (authAPIKeys.includes(clientAuthID)) {

                coronaUSA((APIData, err) => {
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

    app.get('/corona/africa', (req, res) => {
        try {
            const clientAuthID = req.query.key
            console.log(clientAuthID)
            if (authAPIKeys.includes(clientAuthID)) {

                coronaAfrica((APIData, err) => {
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


    app.get('/corona/canada', (req, res) => {
        try {
            const clientAuthID = req.query.key
            console.log(clientAuthID)
            if (authAPIKeys.includes(clientAuthID)) {

                coronaCanada((APIData, err) => {
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

    app.get('/corona/china', (req, res) => {
        try {
            const clientAuthID = req.query.key
            console.log(clientAuthID)
            if (authAPIKeys.includes(clientAuthID)) {

                coronaChina((APIData, err) => {
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

    app.get('/corona/europe', (req, res) => {
        try {
            const clientAuthID = req.query.key
            console.log(clientAuthID)
            if (authAPIKeys.includes(clientAuthID)) {

                coronaEurope((APIData, err) => {
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
    app.get('/corona/graphData', (req, res) => {
        try {
            graphsD((APIData, err) => {
                res.send(APIData)
            })
        } catch (e) {
            res.status(500).send({ 'error': 'Some went wrong!' })
        }
    })
    app.get('/corona/latinamerica', (req, res) => {
        try {
            const clientAuthID = req.query.key
            console.log(clientAuthID)
            if (authAPIKeys.includes(clientAuthID)) {

                coronaLatinAmerica((APIData, err) => {
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

    app.get('/corona/australia', (req, res) => {
        try {
            const clientAuthID = req.query.key
            console.log(clientAuthID)
            if (authAPIKeys.includes(clientAuthID)) {

                coronaAustralia((APIData, err) => {
                    res.send(APIData)
                })
            } else {
                console.log('Invalid API Attempt')
                res.status(403).send({ 'error': 'Please Provide Valid API Key' })
            }
        } catch (e) {
            res.status(500).send({ 'error': 'Some went wrong!' })
        }
    });

    app.get('/graphs', (req, res) => {
        res.render('analytics')
    })

    //DEFAULT 404
    app.get('*', (req, res) => {
        res.status(404).render('404')
    })

    //START
    app.listen(port, () => {
        console.log('Server started successfully')
    })
} catch (e) {
    console.log("Some Error Occurred! Restarting server")
}