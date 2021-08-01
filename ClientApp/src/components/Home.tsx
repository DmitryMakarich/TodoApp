import { observer } from "mobx-react-lite";
import {inject} from "mobx-react";
import React, { useEffect, useState } from "react";
import "./todo/todo.css";
import TodoWrapper from "./Wrappers/Wrapper";


const Home: React.FC<any> = inject("todoStore")(observer(({todoStore}) => {
  const [currentTask, setTask] = useState("")

  const todos = todoStore.searchTask !== "" 
    ? todoStore.tasks.filter(task => task["content"].includes(todoStore.searchTask)) 
    : todoStore.tasks

  useEffect(() => {
    fetch("/todo/todos", {
      method: "GET",
    }).then((x) =>
      x.json().then((y) => {
        todoStore.init(y);
        todoStore.setReady()
      }).then(() => {
        todoStore.getReady()
      })
    );

  }, [])

  return (
      <div
        style={{
          textAlign: "center",
         
        }}
      >
        <h1>Todos</h1>
        <p>Simple todo app</p>
        <input
          className="Input"
          type="text"
          onChange={(event) => setTask(event.target.value)}
        />
        <button onClick={() => todoStore.addTodo(currentTask)}>Add</button>
        
        <h4 className="Todos">
          {
              (todoStore.isComleted ? todos.filter(todo => todo["isComplete"]) : todos).map((task, key) => {
                  return (
                    <TodoWrapper
                        key={key}
                        index={key}
                        id={task["id"]}
                        taskName={task["content"]}
                        isComplete={task["isComplete"]}
                        changeCompleted={() => todoStore.editCompletedTodo(task["id"], !task["isComplete"])}
                        onChangeName={event =>
                          todoStore.onChangeName(event.target.value)
                        }
                        onDelete={() => todoStore.removeTodo(task["id"])}
                        onEdit={() => todoStore.editTodo(task["id"])}
                    />)
              })
          }
        </h4>
      </div>
  )
}))

export default Home