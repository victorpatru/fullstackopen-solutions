const { response } = require('express')
const express = require('express')
const app = express()
const PORT = 3001

const people = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Use /api/persons to receive the desired information</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  response.send(`Phonebook has info for ${people.length} people <br> ${new Date()}`)
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`)
})