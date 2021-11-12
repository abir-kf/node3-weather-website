//----------first try to access to an api from node
const request = require('request')

/*----------EXEMPLE sans creer la fonction -----------
const url = 'http://api.weatherstack.com/current?access_key=4f095e33ef05164aa978da37db4a2dea&query=37.8267,-122.4233&units=s'

//*---------first version--------
request({ url: url}, (erreur, response) =>{
    const data = JSON.parse(response.body)//convertir de string a json
    console.log(data.current)
})//*

//---------better version--------
request({ url: url, json: true}, (error, response) =>{
   // const data = JSON.parse(response.body)//convertir de string a json
   // console.log(response.body.current)
   if(error){
        console.log('Unable to connect to weather service')
   }else if(response.body.error){//si kant item error homa li kishowi erreur chnahia donc si kan m affichi rah kayna erreur 
        console.log('Unable to find location')
   }else{
        console.log(response.body.current.weather_descriptions+ ". It's currently " + response.body.current.temperature + " degress out. It feels like " +response.body.current.feelslike + " degress out")
   }
})*/

/*----------EXEMPLE-------------
const url_place = 'https://api.mapbox.com/geocoding/v5/mapbox.places/abir.json?access_token=pk.eyJ1IjoiYWtmaWZhdCIsImEiOiJja3Y0Y3hxNHIwZHIzMm5xdm1jbHpmeHJiIn0.98xeJ-BKtPh9DaokO4bVvQ&limit=1'
request({ url: url_place, json: true}, (erreur, response) =>{
    // const data = JSON.parse(response.body)//convertir de string a json
    // console.log(response.body.current)
    if(erreur){
        console.log('Unable to connect to location service')
   }else if(response.body.features.length===0){//si kant feature khawya donc erreur puisque features is an array khasna nchofo length
        console.log('Unable to find location, Try another search')
   }else{
    const latitude = response.body.features[0]/*it s an array so mm si fiha ghir one item mais comme we need to call it like that it s an array feature[0]*/
    /*--------------------------(khas thiyed had comment)----------------.center[1]
    const longitude = response.body.features[0].center[0]
    console.log( latitude+ ", and  " + longitude  )
   }
 })*/


const getWeather = (latitude, longitude, callback ) => {//somme hna hia la fonction( c est un argument aussi) li definina lteht bla smia 
    

     const url = 'http://api.weatherstack.com/current?access_key=4f095e33ef05164aa978da37db4a2dea&query='+ latitude + ',' + longitude + '&units=s'
     
     request({ url: url, json: true}, (erreur, response) =>{
          // const data = JSON.parse(response.body)//convertir de string a json
          // console.log(response.body.current)
          if(erreur){
               callback('Unable to connect to weather service', undefined)
          }else if(response.body.error){//si kant item error homa li kishowi erreur chnahia donc si kan m affichi rah kayna erreur 
               callback('Unable to find location' , undefined)
          }else{
               callback(undefined, {
                   
                    description: response.body.current.weather_descriptions,
                    temperature: response.body.current.temperature,
                    feelslike: response.body.current.feelslike
          })
       }
    
     
 })
}

 const getLocation = (city, callback ) => {//somme hna hia la fonction( c est un argument aussi) li definina lteht bla smia 
     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(city) +'.json?access_token=pk.eyJ1IjoiYWtmaWZhdCIsImEiOiJja3Y0Y3hxNHIwZHIzMm5xdm1jbHpmeHJiIn0.98xeJ-BKtPh9DaokO4bVvQ&limit=1'

     request({ url, json: true}, (erreur, {body} = {}) =>{//see forecast to understand the changes and see video 40
          // const data = JSON.parse(response.body)//convertir de string a json
          // console.log(response.body.current)
          //console.log(body.features[0].center[1])

          if(erreur){
              callback('Unable to connect to location service', undefined)
         }else if(body.features.length===0){//si kant feature khawya donc erreur puisque features is an array khasna nchofo length
          callback('Unable to find location, Try another search', undefined)
          }else{
               
           callback(undefined, {
               latitude: body.features[0].center[1],
               longitude: body.features[0].center[0],
               location: body.features[0].place_name

          }  )  

 

     }
       })
    
   
 } 



/*----------------------start---------------

//non blocking asychrone ( hta laeba maktsna hta tsali l execution dial dakshi li qbl )
//
that s why Starting
Stopping      
0 second timer
2 second timer

but why stopping dart qbl mn 0 second timer we ll know about it f video 30
//
console.log('Starting')

setTimeout(() => {
    console.log('2 second timer')
},2000) //run and after 2sec show dakshi li fiha ldakhl ( t run dakchi l dakhl)


setTimeout(() => {
    console.log('0 second timer')
},0)

console.log('Stopping')
*/

module.exports = { 
    getWeather: getWeather,
    getLocation: getLocation
}