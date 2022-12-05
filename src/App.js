import React from 'react';
import './App.css';
import {nanoid} from "nanoid";
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import Todo from './components/Todo';

const FILTER_MAP ={
  All:()=>true,
  Active:task => !task.completed,
  completed:task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {

  const [tasks,setTasks] = React.useState(props.tasks);
  const [filter,setFilter] = React.useState('All');

  function addTask(newName){
    const newTask={id:"todo"+nanoid(),name:newName,completed:false}
    setTasks([...tasks,newTask])
  }

  const filterList = FILTER_NAMES.map(name=>(
    <FilterButton 
      id={name}
      name={name}
      isPressed = {name === filter}
      setFilter ={setFilter}
    />
  ))

  const tasksList = tasks.filter(FILTER_MAP[filter])
  .map(task=>(
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ))
  

  function toggleTaskCompleted(id){
    const updatedTasks = tasks.map(task=>{
      if(task.id === id){
          return {...task,completed:!task.completed}
      }
      return task;
    })
    setTasks(updatedTasks)
  }

  function deleteTask(id){
    const updatedTasks = tasks.filter(task => task.id!==id)
    setTasks(updatedTasks)
  }
  
  function editTask(id,newName){
    const editedTaskList = tasks.map(task =>{
      if(task.id === id){
        return {...task,name:newName}
      }
      return task;
    })
    setTasks(editedTaskList)
  }

  const taskNoun = tasksList.length <=1 ? 'task' : 'tasks';
  const headingText = `${tasksList.length} ${taskNoun} remaining`;
  return(
    <div>
      <Form addTask={addTask}/>
      <div>{filterList}</div>
      <div>{headingText}</div>
      <ul>{tasksList}</ul>
    </div>

  )
}

export default App;
