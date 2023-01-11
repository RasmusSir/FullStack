import { useState } from 'react'


// Person konstruktori
const Person = ({ person }) => {
  return (
    <p>{person}</p>
  )
}

// App konstruktori
const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' } ]) 
  const [newName, setNewName] = useState('')

  // Funktio nimen lisäämiseen
  const addName = (event) => {
    event.preventDefault()
    console.log('Add clicked', event.target);
    const nameObject = {
      name: newName
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  // Funktio siihen, että newName päivittyy oikein jotta se voidaan lähettää addName funktioon oikein
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  //SEURAAVAKSI PITÄÄ KATSASTAA SE "True ? True : False" -SETTI tähän tehtävässä 2.7 step2

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: 
          <input value = {newName}
          onChange = {handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => 
        <Person key={person.name} person={person.name}/>
        )}

    </div>
  )

}

export default App