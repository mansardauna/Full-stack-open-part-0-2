import { useState, useEffect } from 'react';
import Notification from './Notification';
import content from './content';
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [search, searchBy] = useState('')
  const [sucess, setSucess] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();
    const finder = persons.filter((person) => person.name === newName.trim())
    finder.length ? (
      <>
        {window.confirm('This name already exists,replace the old numbers') === true
          ? content.update(finder[0].id, { name: newName, number: newNum }).then((value) => {
            setPersons(
              persons.map((person) =>
                person.id !== finder[0].id ? person : value
              )
            );
          }
          )
            .catch((err) => {
              setSucess('name has already be deleted from the server')
              setTimeout(() => {
                setSucess('')
              }, 2000);
            })
          : ''}
      </>
    ) : (
      content
        .create({ name: newName, number: newNum })
        .then(data => {
          setPersons(persons.concat(data))
          setSucess('added new name')
          setTimeout(() => {
            setSucess('')
          }, 5000);
        })
    )
  };
  const handleNoteChange = (e) => {
    setNewName(e.target.value)
  }
  const filterWith = (e) => {
    searchBy(e.target.value)
    setPersons(persons.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase())))
  }
  useEffect(() => {
    content
      .getAll()
      .then((initialNotes) => {
        console.log('promise fulfilled');
        setPersons(initialNotes)
      })
  }, [])
  // console.log('render', persons.length, 'persons')
  const toggleImportanceOf = ids => {
    content
      .deletePerson(ids)
      .then(returnedNote => {
        setPersons(persons.filter(({ id }) => id !== ids))
      })
      .catch(error => {
        console.error(error)
      })
  }
  return (
    <div>
      <h2>PhoneBook</h2>
      <Notification message={sucess} />
      <h2>add a new</h2>
      <div>filter shown with
        <input
          type='text'
          value={search}
          onChange={filterWith}
          required
        />
      </div>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div>name : <input
          type='text'
          value={newName}
          onChange={handleNoteChange}
          required
        /></div>
        {/* <br/>  */}
        <div>number : <input
          type='text'
          value={newNum}
          onChange={(e) => setNewNum(e.target.value)}
          required
        /></div>
        <br />
        <button>add</button>
        <br />
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          persons.map((person, personIndex) =>
            <li key={`list${personIndex}`}>{person.name} {person.number}  <button onClick={() => toggleImportanceOf(person.id)}>Delete</button></li>
          )}
      </ul>
    </div>
  );
};
export default App