import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/persons'

// Person komponentti
const Person = (props) => {
  const confirmMessage = () => {
   if (window.confirm(`Delete ${props.person} ?`)){
    props.deletePerson({props})
   }
  } 

  return (
    <li>
      {props.person} {props.number} <button onClick={confirmMessage}>Delete</button>
    </li>

  )
}


// Filter komponentti.
const Filter = (props) => {
  return(
    <div>
      Filter shown with: 
      <input value = {props.filter}
      onChange = {props.filterChange}/>
    </div>
  )
} 


//PersonsForm komponentti
const PersonForm = (props) => {
  return(
    <form onSubmit={props.submit}>
      <div>
        name:
        <input value = {props.name} 
        onChange = {props.nameChange}/>
      </div>
      <div>
        number:
        <input value = {props.number} 
        onChange = {props.numberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>

    </form>
  )
  }

  const Notification = ({ message, error }) => {
    console.log('errormessage', error);
    
    if (message === null && error === null) {
      return null
    }
    
    if (message !== null && error === null){
      return (
        <div className="added">
          {message}
        </div>)
    } 
    if (error !== null){
      return(
        <div className="error">
          {error}
        </div>
      )
    }
  }
  

// App konstruktori
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [addedMessage, setAddedMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  // Funktio personin lisäämiseen
  const addName = (event) => {
    event.preventDefault()
    console.log('Add clicked', event.target);
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(person => person.name === newName)
    
    if (existingPerson) {      
      const changedNumber = {...existingPerson, number: newNumber}
      console.log('id', existingPerson.id);
      console.log('note', existingPerson);
      console.log('changedNote', changedNumber);
      if (window.confirm(`${newName} is already added, replace the old number with a new one?`)) {
        noteService
        .update(existingPerson.id, changedNumber)
          .then(returnedNumber => {
            setPersons(persons.map(person => person.id !== existingPerson.id  ? person : returnedNumber))
            console.log('returnedNote', returnedNumber);
            setAddedMessage(`Number Changed for ${nameObject.name}`)
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
            setAddedMessage(null)
          }, 5000)
          })
          .catch(error => {
            console.log('Tämmönen error', error);
            setErrorMessage(error.response.data.error
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== existingPerson.id))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      noteService
      .create(nameObject)
      .then(response => {
        setAddedMessage(`Added ${nameObject.name}`)
        setTimeout(() => {
          setAddedMessage(null)
        }, 5000)
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log('Tämmönen error1', error);
        setErrorMessage(error.response.data.error
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== existingPerson.id))
        setNewName('')
        setNewNumber('')
      })
  }
}


  const deletePerson = (props) => {
    console.log(props)
    const id = props.id
    noteService
    .deleting(id)
    .then(response => {
      setAddedMessage(`Deleted ${props.name}`)
      setTimeout(() => {
        setAddedMessage(null)
      }, 5000)
      setPersons(persons.filter(personsLeft => personsLeft.id !== props.id))
    })
  }

  // Funktio siihen, että newName päivittyy oikein jotta se voidaan lähettää addName funktioon oikein
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const filterFunction = persons.filter((person => 
    person.name.toLowerCase().includes(newFilter.toLowerCase())))


  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={newFilter} filterChange={handleFilterChange}/>
      <h2>add a new</h2>
        <PersonForm submit={addName} name={newName} nameChange={handleNameChange}
        number={newNumber} numberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <Notification message={addedMessage} error={errorMessage}/>
        {filterFunction.map(person => 
        <Person key={person.name} person={person.name} number={person.number} 
        deletePerson={()=> deletePerson(person)}/>
        )}

    </div>
  )
}

export default App