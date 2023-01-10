import { useState } from 'react'

const StatisticLine = ({ text, value }) => <div>{text} {value}</div>

const Statistics = (props) =>  {
  console.log(props)
  if (props.all === 0){
    return(
      <div>No feedback given</div>
    )
  }
  return(
    <div>
      <StatisticLine text="good" value={props.good}/>
      <StatisticLine text="neutral" value={props.neutral}/>
      <StatisticLine text="bad" value={props.bad}/>
      <StatisticLine text="average" value={((props.good*1 + props.neutral*0 + props.bad*-1) / props.all)}/>
      <StatisticLine text="positive" value={props.good/props.all*100 + " %"}/>
    </div>
    )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setAll(all + 1)
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setAll(all + 1)
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setAll(all + 1)
    setBad(bad + 1)
  }

  return (
    <div>
      <div>
        <h1>
          give feedback
        </h1>
        <Button handleClick={handleGoodClick} text='good'/>
        <Button handleClick={handleNeutralClick} text='neutral'/>     
        <Button handleClick={handleBadClick} text='bad'/>
      </div>
      <div>
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  </div>
  )
}

export default App