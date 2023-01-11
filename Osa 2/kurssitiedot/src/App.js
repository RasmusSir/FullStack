const Course = (props) => {
  console.log("jeba",props);
  return (
    <div>
      <Header course={props.course}/> 
      <Content parts={props.course.parts}/>
      <Total  parts={props.course.parts}/>
    </div>
  )
}


const Header = (props) => {
  console.log("Headerin tiedot:", props);
  console.log("headerin tiedot 2:", props.course.parts)
  return (
    <div>
      <h1>
        {props.course.name} 
      </h1>
    </div>
  )
}


const Part = (props) => {
  console.log("Part:n tiedot:",props)
  return (
    <div>
      <p>
        {props.name} {props.exercises}
      </p>
    </div>
  )
}


const Content = (props) => {
  console.log("Content:n tiedot", props)
  return (
    <div>
        <Part name = {props.parts[0].name} exercises={props.parts[0].exercises}/>
        <Part name = {props.parts[1].name} exercises={props.parts[1].exercises}/>
        <Part name = {props.parts[2].name} exercises={props.parts[2].exercises}/>
    </div>
  )
}


const Total = (props) => {
  
  const total = props.parts.reduce( (accumulator, current) => 
    console.log('what is happening', accumulator, current) ||
    accumulator + current.exercises,0)

  return (
    <div>
      <p> 
        <strong>Number of exercises {total}</strong>
      </p>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App