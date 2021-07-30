import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [showAll, setShowALl] = useState(true)
  const [search, setSearch] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    if (!newName.trim()) return;
    if (persons.find((person) => person.name === newName.trim()))
      return alert(`${newName} is already added to phonebook `)

    setPersons(persons.concat({ name: newName, number: newNum }))
    setNewName('')
    setNewNum('')
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const sort = persons.filter(person => {
    return person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  })


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          filter:
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div>
          name: <input type='text' value={newName} onChange={(e) => setNewName(e.target.value)} required />
          <br />
          nunber: <input type='text' value={newNum} onChange={(e) => setNewNum(e.target.value)} required />
        </div>
        <div>
          <button onClick={() => setShowALl(!showAll)}>
            show
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {sort.map((person, personIndex) => (
          <li key={`person-${personIndex}`}>{person.name} {person.number}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
