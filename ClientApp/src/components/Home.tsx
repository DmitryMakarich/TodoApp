import { observer } from "mobx-react-lite";
import {inject} from "mobx-react";
import React, { useEffect, useState } from "react";
import Todo from "./todo/todo";
import "./todo/todo.css";


const Home: React.FC<any> = inject("todoStore")(observer(({todoStore}) => {
  const [currentTask, setTask] = useState("")

  useEffect(() => {
          fetch("/todo/todos", {
                  method: "GET",
                }).then((x) =>
                  x.json().then(y =>
                    todoStore.init(y)
                  )
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
          {todoStore.tasks.map((task, key) => {
            return (
              <Todo
                key={key}
                index={key}
                taskName={task["content"]}
                onChangeName={event =>
                  todoStore.onChangeName(event.target.value, task["id"])
                }
                onDelete={() => todoStore.removeTodo(task["id"])}
                onEdit={() => todoStore.editTodo(task["id"])}
              />
            );
          })}
        </h4>
      </div>
  )
}))



// const Home: React.FC<{}> = () => {
//     const [tasks, setTasks] = useState([]);
//     const [currentTask, setCurrentTask] = useState(null)

//     useEffect(() => {
//       fetch("/todo/todos", {
//               method: "GET",
//             }).then((x) =>
//               x.json().then(y =>
//                 setTasks(y)
//               )
//             );
//     }, [])

//     const OnAddtask = () => {
//       console.log("before add", tasks)
//       if (currentTask != null)
//       {
//         fetch(`/todo/addTodo?content=${currentTask}`, {
//           method: "POST",
//         })
    
//         let todos = tasks.concat();
        
//         // доделать с id
//         todos.push({
//           id: tasks[tasks.length - 1]["id"] + 1,
//           content: currentTask
//         });
    
//         setTasks(todos)
//       }
      

//       console.log("after add", tasks)
//     };

//     const onChangeName = (name, index) => {
//       const task = name;
//       let todos = [...tasks];
//       todos[index]["content"] = task;
//       setTasks(todos)
//     }

//   const editTask = (index, id) => {
//     const content = tasks[index]["content"]

//     fetch(`/todo/editTodo?id=${id}&content=${content}`, {
//       method: "PUT",
//     });
//   }

//   const onChangeTask = (newTask) =>  {
//     setCurrentTask(newTask)
//   }

//   const deleteHandler = (id, index) => {
//     const todos = tasks.concat();
//     todos.splice(index, 1);

//     setTasks(todos)

//     fetch(`/todo/deleteTodo?id=${id}`, {
//       method: "DELETE",
//     });
//   }

//     return (
//       <div
//         style={{
//           textAlign: "center",
//         }}
//       >
//         <h1>Todos</h1>
//         <p>Simple todo app</p>
//         <input
//           className="Input"
//           type="text"
//           onChange={(event) => onChangeTask(event.target.value)}
//         />
//         <button onClick={OnAddtask}>Add</button>

//         <h4 className="Todos">
//           {tasks.map((task, index) => {
//             // console.log('Task from map', task);
//             return (
//               <Todo
//                 index={index}
//                 taskName={task["content"]}
//                 onChangeName={(event) =>
//                   onChangeName(event.target.value, index)
//                 }
//                 onDelete={deleteHandler.bind(this, task["id"], index)}
//                 onEdit={editTask.bind(this, index, task["id"])}
//               />
//             );
//           })}
//         </h4>
//       </div>
//     )
// }

export default Home

// export class Home extends React.Component<any, any> {
//   static displayName = Home.name;

//   constructor(props) {
//     super(props);

//     this.state = {
//       tasks: [],
//       currentTask: null,
//     };
//   }

//   componentDidMount() {
//     fetch("/todo/todos", {
//       method: "GET",
//     }).then((x) =>
//       x.json().then((y) =>
//         this.setState({
//           tasks: y
//         })
//       )
//     );
//   }

//   OnAddtask = () => {
//     console.log("before add", this.state.tasks)
//     if (this.state.currentTask != null)
//     {
//       fetch(`/todo/addTodo?content=${this.state.currentTask}`, {
//         method: "POST",
//       })
  
//       let tasks = this.state.tasks.concat();
      
//       // доделать с id
//       tasks.push({
//         id: tasks[tasks.length - 1]["id"] + 1,
//         content: this.state.currentTask
//       });
  
//       this.setState(() => ({ tasks }));
//     }
    

//     console.log("after add", this.state.tasks)
//   };

//   onChangeName(name, index) {
//     const task = name;
//     let tasks = [...this.state.tasks];
//     tasks[index]["content"] = task;
//     this.setState({ tasks });
//   }

//   editTask(index, id){
//     const content = this.state.tasks[index]["content"]

//     fetch(`/todo/editTodo?id=${id}&content=${content}`, {
//       method: "PUT",
//     });

//     console.log("content from editTask", content)
//   }

//   onChangeTask(newTask) {
//     this.setState({
//       currentTask: newTask,
//     });
//   }

//   deleteHandler(id, index) {
//     const tasks = this.state.tasks.concat();
//     tasks.splice(index, 1);

//     this.setState({ tasks });

//     fetch(`/todo/deleteTodo?id=${id}`, {
//       method: "DELETE",
//     });
//   }

//   render() {
//     return (
//       <div
//         style={{
//           textAlign: "center",
//         }}
//       >
//         <h1>Todos</h1>
//         <p>Simple todo app</p>
//         <input
//           className="Input"
//           type="text"
//           onChange={(event) => this.onChangeTask(event.target.value)}
//         />
//         <button onClick={this.OnAddtask}>Add</button>

//         <h4 className="Todos">
//           {this.state.tasks.map((task, index) => {
//             // console.log('Task from map', task);
//             return (
//               <Todo
//                 taskName={task["content"]}
//                 index={index}
//                 onChangeName={(event) =>
//                   this.onChangeName(event.target.value, index)
//                 }
//                 onDelete={this.deleteHandler.bind(this, task["id"], index)}
//                 onEdit={this.editTask.bind(this, index, task["id"])}
//               />
//             );
//           })}
//         </h4>
//       </div>
//     );
//   }
// }
