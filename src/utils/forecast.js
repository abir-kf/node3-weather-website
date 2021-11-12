const request = require('request')



const forecast = (latitude, longitude, callback ) => {//somme hna hia la fonction( c est un argument aussi) li definina lteht bla smia 
    

    const url = 'http://api.weatherstack.com/current?access_key=4f095e33ef05164aa978da37db4a2dea&query='+ latitude + ',' + longitude + '&units=s'

    request({ url, json: true}, (erreur, {body} ={}/*response it s a object fiha body o 7na bghina ghir body donc andiro body bo7dha see playground :5 */) =>{ // cause url =url see the difference mae ster li apres hada :c'est la meme chose see 5-es6-objects
   // request({ url: url, json: true}, (erreur, response) =>{

         // const data = JSON.parse(response.body)//convertir de string a json
         // console.log(response.body.current)
         if(erreur){
              callback('Unable to connect to weather service', undefined)
         }else if(body.error){//si kant item error homa li kishowi erreur chnahia donc si kan m affichi rah kayna erreur 
              callback('Unable to find location' , undefined)
         }else{
              callback(undefined, body.current.weather_descriptions+ ". It's currently " + body.current.temperature + " (kelvin) degress out. It feels like " +body.current.feelslike + " (kelvin) degress out")
                  
                   /*description: response.body.current.weather_descriptions,
                   temperature: response.body.current.temperature,
                   feelslike: response.body.current.feelslike*/
         
      }
   
    
})
}



module.exports = forecast