import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [showAll, setShowALl] = useState(true)

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
  const filters = showAll
    ? persons
    : persons.filter(person => person.name === true)
  // setPersons(persons.concat(personObject))
  // setNewName('')


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          filter:
          {/* <input type="text" value={filters} /> */}
        </div>
        <div>
          name: <input type='text' value={newName} onChange={handleNameChange} required />
          <br />
          nunber: <input type='text' value={newNum} onChange={(e) => setNewNum(e.target.value)} required />
        </div>
        <div>
          <button onClick={() => setShowALl(!showAll)}>
            show {showAll ? 'important' : 'all'}
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filters.map((person, personIndex) => (
          <li key={`person-${personIndex}`}>{person.name} {person.number}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
