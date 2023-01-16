import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/persons'

// Person komponentti
const Person = ({ person, number, deletePerson}) => {
  const confirmMessage = () => {
   if (window.confirm(`Delete ${person} ?`)){
    deletePerson(person.id)
   }
  } 

  return (
    <li>
      {person} {number} <button onClick={confirmMessage}>Delete</button>
    </li>

  )
}


// Filter komponentti
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
  

// App konstruktori
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
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
    // persons.some(person => person.name) "viilaa" kaikki personit persons listalta läpi ja 
    // tarkastaa onko yksittäinen person.name sana kuin newName. 
    // Jos yksikin person.name = newName -> Nimi on jo listalla ja looppi katkeaa, muuten
    // lisätään hyödyntämällä setPersonsia
    const willWeAdd = persons.some(person => person.name === newName || console.log("Viilataan kaikki personit läpi",person)) 
                        ? alert(`${newName} is already added`) 
                        :noteService
                        .create(nameObject)
                        .then(response => {
                          setPersons(persons.concat(response.data))
                          setNewName('')
                          setNewNumber('')
                        })
  }


  const deletePerson = (id) => {
    console.log('Removing' + id + 'permanently')
    axios.delete(`http://localhost:3001/persons/${id}`)
    .then(response => {
      setPersons(persons.filter(personsLeft => personsLeft.id !== id))
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

  const filterFunction = persons.filter((person) => 
  person.name.toLowerCase().includes(newFilter.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={newFilter} filterChange={handleFilterChange}/>
      <h2>add a new</h2>
        <PersonForm submit={addName} name={newName} nameChange={handleNameChange}
        number={newNumber} numberChange={handleNumberChange}/>

      <h2>Numbers</h2>
        {filterFunction.map(person => 
        <Person key={person.name} person={person.name} number={person.number} 
        deletePerson={()=> deletePerson(person.id)}/>
        )}

    </div>
  )
}

export default App