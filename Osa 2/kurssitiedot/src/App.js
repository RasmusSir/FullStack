const Course = (props) => {
  console.log("Kurssitiedot:",props);
  return (
    <div>
      <Header course={props.course}/> 
      <Content parts={props.course.parts}/>
      <Total  parts={props.course.parts}/>
    </div>
  )
}


const Header = ({course}) => {
  console.log("Headerin tiedot:", course);
  return (
    <div>
      <h2>
        {course.name} 
      </h2>
    </div>
  )
}


const Part = ({name, exercises}) => {
  return (
    <div>
        <p>
          {name} {exercises}
        </p>
    </div>
  )
}


const Content = ({parts}) => {
  console.log("Mitä parts:n sisällä on", parts)
  return (
    <div>
        {parts.map((part) => <Part key={part.id} name={part.name} 
        exercises={part.exercises}/>)}
    </div>
  )
}


const Total = ({parts}) => {
  const total = parts.reduce( (accumulator, current) => 
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
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web Development Curriculum</h1>
      {courses.map (course =>
         <Course key={course.id} course={course}/>
        )}
    </div>
  )
}

export default App