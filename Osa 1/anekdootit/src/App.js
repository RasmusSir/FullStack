import { useState } from 'react'

// Button Komponentin tekeminen
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

// Display Komponentin tekeminen ("propsin" sisällä text property joka määritellään tarpeen mukaan)
const Display = (props) =>  {
    return(
      <div>
        <p>
          {props.text}
        </p>
      </div>
      )
  }

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  
  //tarvittavat "tilat"
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  //Tarvittava funktio anecdoteGenerator 
  const anecdoteGenerator = () => {
    const anecdoteNumber = Math.floor(Math.random() * anecdotes.length)
    return(anecdoteNumber)
  }

  //Tarvittava funktio handleAnecdoteClick 
  const handleAnecdoteClick = () => {
    setSelected(anecdoteGenerator())
  }

  //Tarvittava funktio handleVoteClick 
  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    let mostVotesIndex = copy.indexOf(Math.max(...copy))
    setMostVotes(mostVotesIndex)
    setVotes(copy)
  }

  //Appin palautettavat asiat
  return (
    <div>

      <h1>Anecdote of the day</h1>  
        <Display text = {anecdotes[selected]}/>
        <p>has {votes[selected]} votes</p>
        <Button handleClick={handleVoteClick} text='vote'/>
        <Button handleClick={handleAnecdoteClick} text='next anecdote'/>
      
      <h1>Anecdote with most votes</h1>
        <Display text = {anecdotes[mostVotes]}/>
    
    </div>
  )
}

export default App