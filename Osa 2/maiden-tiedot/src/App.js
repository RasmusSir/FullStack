import { useState, useEffect } from 'react'
import axios from 'axios'

// Filter komponentti
const Filter = (props) => {
  return(
    <div>
      find countries: 
      <input value = {props.filter}
      onChange = {props.filterChange}/>
    </div>
  )
} 

const CountrySpecs = (props) => {
  console.log(props.country);
  return(
    <div>

      <h1>{props.country.name.common}</h1>
      <p>capital {props.country.capital[0]}</p>
      <p>area {props.country.area}</p>

      <h2>languages:</h2>
      <ul>
        {Object.entries(props.country.languages).map(([code, name]) => 
        <li key={code}> {`${name}`} </li>)}
      </ul>
      <img src={props.country.flags.png}></img>
    </div>
  )
}


const Countries = (props) => {
  return (
    <div>
      {props.country}
    </div>

  )
}

const filterFunction = (countries, filter) => {
  return countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))
}

// App komponentti
const App = () => {
  const [countries, setCountries] = useState([]) 
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')
  //console.log(countries.map(country => country.name.common))


const handleFilterChange = (event) => {
  console.log(event.target.value)
  setNewFilter(event.target.value)
}


const filteredCountries = filterFunction(countries,newFilter)

return (
  <div>
    <h2>Country here</h2>
      <Filter filter={newFilter} filterChange={handleFilterChange}/>
      
      {filteredCountries.length === 1 
        ? <CountrySpecs country = {filteredCountries[0]} />
        : filteredCountries.length > 10
          ? <p>Too many matches</p>
          : filteredCountries.map(country => 
        <Countries key={country.name.common} country={country.name.common}/>)
          }
        
  </div>
)
}


export default App
