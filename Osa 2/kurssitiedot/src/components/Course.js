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

  export default Course