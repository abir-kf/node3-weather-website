//expressjs.com for documentation video 48
const path = require('path')
const express = require('express')
const hbs = require('hbs')

//call functions
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname)//affiche route du folder ou on est.
console.log(__filename)//affiche route du file ou on est.

console.log(path.join(__dirname, '../public'))


const app = express()
const port = process.env.PORT || 3000 // port = port that heroku use bash show site f browser mashi static had number d port but if we run application localy it will maghatkhdmsh that s why andiro OR || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')//path join ktjoin routes and dirname ktjib route dial folder li fih hna but hna bghina dial templates( li drna fiha a folder views jdid dont mind the name wkha nfso) donc ghadi nkhrjo mn hada using 2 points o nmchiw l templates folder
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and view locations
app.set('view engine', 'hbs')//to use handelbars
app.set('views', viewsPath)//views hia default one mli knbdlo smia d folder it doesn't work that s why we need to set that views wla viewsPath
hbs.registerPartials(partialsPath)//take the path i guess video 49 min 3 


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))//important so we can call the css in hbs files li drna bhal index.hbs kiaerfhom (css / js)deja kaynin f public folder

//--------DEFAULT Page---------------

//-methode 1 using handelbars
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abir Kfifat'
    })//search for index.hbs et les arguments d'entree 
})


//-methode 2
/*const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))//affiche in the browser index.html qu'on a f public fash kn3iyto ela http://localhost:3000/ no need l index.html nzidoha cause deja hadi endna a special meaning f webserver so hadi li lteht n' a pas de sense
*/
//-methode 3 
//app.get('' /*route */, (req, res) => {
 //   res.send('<h1> weather<h1>')//res = reponse li ghadi nsifto lih soit http li drna qbl dial api soit f browser ansfto lih hadshi ghadi t afficha
//})

//--------------------------------


//--------HELP Page-----------
//methode finale pour les pages dynamique : video 47


// using handelbars
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Alae Kfifat',
        website: "www.help.com"
    })//search for index.hbs et les arguments d'entree 
})

/*video 46 i guess or qbl mno
const publicDirectoryPathHelp = path.join(__dirname, '../public/Help.html')
app.use(express.static(publicDirectoryPathHelp))*/

//app.get('/help' /*route */, (req, res) => {
 //   res.send(
        /*{
        name: 'Abir',
        age: 23
    }*/
 /*   [
        {
        name: "Abir"
    },
    {
        name: "Chaimae"
    }
]
    
    )//res = reponse li ghadi nsifto lih soit http li drna qbl dial api soit f browser ansfto lih hadshi ghadi t afficha
})*/
//--------------------------------

//--------ABOUT Page-----------

//-methode 1 using handelbars
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Abir Kfifat'
    })//search for index.hbs et les arguments d'entree 
})

//-methode 2
const publicDirectoryPathAbout = path.join(__dirname, '../public/About.html')
app.use(express.static(publicDirectoryPathAbout))

//app.get('/about' /*route */, (req, res) => {
  /*  res.send(
        
            {
                forecast: "It s snowing",
                location: "Calais"
            }
    )//res = reponse li ghadi nsifto lih soit http li drna qbl dial api soit f browser ansfto lih hadshi ghadi t afficha
})*/

//--------------------------------


//--------------------Test--------------
app.get('/test' /*route */, (req, res) => {
    res.send('affiche test!')//res = reponse li ghadi nsifto lih soit http li drna qbl dial api soit f browser ansfto lih hadshi ghadi t afficha
})



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    ///--------------------IMPORTANT voir video 40 mins : 5 -----------------why drna ={ f ster li apres hada cause we can distruct of undefined si hadi {latitude, longitude, location} kan endna erreur est c est une erreur we only can distruct an object}
    geocode.getLocation(req.query.address, (erreur, {latitude, longitude, location} = {} /*hna see (5-es6-pbjects.js exple de fct and video 40) ki3iyet ela fct dial callback fiha object body and hna f definition de fct khdina li bghina mn dak object*/
    ) =>{// sum est l argument ( it s just a result) de la fonction li kdir console.log(sum)
        if(erreur){
        return res.send({error: erreur}) //return stops la fonction kamla(getlocation) and ktsali
        }
    
        forecast( latitude, longitude, (erreur, forecastData) =>{// sum est l argument ( it s just a result) de la fonction li kdir console.log(sum)
           if(erreur){
            return res.send({error: erreur})
           }
    
            console.log('Location : ' , location)
            console.log('Weather : ' , forecastData)

            res.send({
                forecast: forecastData,
                location:location,
                address: req.query.address
        
            })
        
        })
    })


  
})


app.get('/products', (req, res) => {
    if (!req.query.search) {//had search hia li knzido l url : ?search=games
        return res.send({//we add the return so it doesn t send res 2 fois dial if o dial products cause he can send it just one time so une fois dar return kikhrj mn app get
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


//------ERROR page : incase drna an url that we dont want(express provide us b * )

app.get('/help/*' /*route */, (req, res) => {
    res.render('error', {
        title: 'Error page',
        name: 'Abir Kfifat',
        error_message: 'Help article not found'
    })
})

//IMPORTANT : it needs to come last after all the routes are set up ( cause flwl kiqlb f public folder ichof wash route li aetinah kayn match dialha f had ligne app.use(express.static(publicDirectoryPath)) apres kichof route suivante dial default apres li moraha...hta ilqa lmatch mli flkher makilqash match o kiwsl l * mean that ay leaba matches maeha that s why kikhdm biha)
app.get('*' /*route */, (req, res) => {
    res.render('error', {
        title: 'Error page',
        name: 'Abir Kfifat',
        error_message: 'Page not found'
    })
})
//-------------------------------------------------

app.listen(port, () => {// it starts the server and function ( to run when the server is up and running)kibqa kistnt l port 3000 howa li ghadi nkhdmo bih browser
    console.log('Server is up on port:' + port)
})