

console.log("app running")

/*fetch('http://puzzle.mead.io/puzzle').then((response) =>{//when we fetch data ( recuperer data) then ndirp l response traitement li jay f les lignes apres

    response.json().then((data) =>{//when we recieve json data we parse it to an js object = data o nprintiwha
        console.log(data)
    })
})*/


/*---------------get data from url entrer f browser and print it f console---------
fetch('http://localhost:3000/weather?address=calais').then((response) =>{//when we fetch data ( recuperer data) then ndirp l response traitement li jay f les lignes apres

    response.json().then((data) =>{//when we recieve json data we parse it to an java script object = data o nprintiwha
        if(data.error)
        {
            console.log(data.error)
        }
        else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})*/

const weatherForm = document.querySelector('form')//knchedo form li endna f index cause this script kaml kn3iyto lih findex.hbs
const search = document.querySelector('input') //knchedo dak input kaml
const messageOne = document.querySelector('#message-1')//messageOne hia <p> li fiha id = message-1
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e)=>{//when kndiro submit we grab event li tra  e = evenement  o kndiro lih hadshi li lteht
   e.preventDefault()//cause fash kndiro submit kitra hadhsi li lteht mais kt3awed tcharga la page donc kimchi so we dont need to refresh page bghina ghir resultat li lteht so kndiro hadi ktmn3 refresh
    //console.log('abir')
   const location = search.value //knakhdo value dial input
   //console.log(location)


   messageOne.textContent = 'Loading...'
   messageTwo.textContent = ''
   
   fetch('/weather?address='+location).then((response) =>{//when we fetch data ( recuperer data) then ndirp l response traitement li jay f les lignes apres


    response.json().then((data) =>{//when we recieve json data we parse it to an java script object = data o nprintiwha
        if(data.error)
        {
            console.log(data.error)
            messageOne.textContent = data.error  // <p> li fiha id = message-1 li sminaha qbl ligne 30 messageOne ktwli fiha data.error
            
        }
        else {
            console.log(data.location)
            console.log(data.forecast)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})

})