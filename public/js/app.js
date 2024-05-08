console.log("Client side javascript file is loaded!")

// Specify the form and input elements
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

// Specifying the message variables
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

// Adding a listening event to the form
weatherForm.addEventListener('submit', (e) => {
    // Prevent the default behavior of the form
    e.preventDefault()

    // Get the value of the input element
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = `Getting the weather for ${location}...`

    // Fetch the data from the server
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            }
            else{
                messageOne.textContent = data.location
                messageTwo.textContent = `Weather is ${data.forecast}`
            }
        })
    })
})