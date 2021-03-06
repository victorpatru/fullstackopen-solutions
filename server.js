const { response } = require('express')
const express = require('express')
const res = require('express/lib/response')
const app = express()
const morgan = require('morgan')
const PORT = 8000

// Middleware initialization
app.use(express.json())
app.use(morgan('tiny'))

morgan.token('info', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :info'))

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}


let persons = [
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

app.get('api/persons/:id', (request, response) => {
  // Holds the number of the person the user is trying to access
  const id = +request.params.id
  const person = persons.find(person => person.id == id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }

})

app.get('/info', (request, response) => {
  response.send(`Phonebook has info for ${people.length} people <br> ${new Date()}`)
})

app.delete('api/persons/:id', (request, response) => {
  const id = +request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request,response) => {
  const entry = {
    id: generateId(),
    name: request.body.name,
    number: request.body.number
  }
  // Check for empty body (both name and number)
  if (!request.body.name || !request.body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  } 
  // Check for duplicate name
  else if (persons.find(person => person.name == request.body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  persons.push(entry)
  response.json(entry)
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`)
})