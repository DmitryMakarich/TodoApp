import React, { Component } from "react";
import Todo from "./todo/todo";
import "./todo/todo.css";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      currentTask: null,
    };
  }

  componentDidMount() {
    fetch("/todo/todos", {
      method: "GET",
    }).then((x) =>
      x.json().then((y) =>
        this.setState({
          tasks: y
        })
      )
    );
  }

  OnAddtask = () => {
    console.log("before add", this.state.tasks)
    if (this.state.currentTask != null)
    {
      fetch(`/todo/addTodo?content=${this.state.currentTask}`, {
        method: "POST",
      });
  
      let tasks = this.state.tasks.concat();
      
      // доделать с id
      tasks.push({
        id: tasks[tasks.length - 1]["id"] + 1,
        content: this.state.currentTask
      });
  
      this.setState(() => ({ tasks }));
    }
    

    console.log("after add", this.state.tasks)
  };

  onChangeName(name, index) {
    const task = name;
    let tasks = [...this.state.tasks];
    tasks[index]["content"] = task;
    this.setState({ tasks });
  }

  editTask(index, id){
    const content = this.state.tasks[index]["content"]

    fetch(`/todo/editTodo?id=${id}&content=${content}`, {
      method: "PUT",
    });

    console.log("content from editTask", content)
  }

  onChangeTask(newTask) {
    this.setState({
      currentTask: newTask,
    });
  }

  deleteHandler(id, index) {
    const tasks = this.state.tasks.concat();
    tasks.splice(index, 1);

    this.setState({ tasks });

    fetch(`/todo/deleteTodo?id=${id}`, {
      method: "DELETE",
    });
  }

  render() {
    return (
      <div
        style={{
          textAlign: "center",
          // margin: '20px'
        }}
      >
        <h1>Todos</h1>
        <p>Simple todo app</p>
        <input
          className="Input"
          type="text"
          onChange={(event) => this.onChangeTask(event.target.value)}
        />
        <button onClick={this.OnAddtask}>Add</button>

        <h4 className="Todos">
          {this.state.tasks.map((task, index) => {
            // console.log('Task from map', task);
            return (
              <Todo
                taskName={task["content"]}
                index={index}
                onChangeName={(event) =>
                  this.onChangeName(event.target.value, index)
                }
                onDelete={this.deleteHandler.bind(this, task["id"], index)}
                onEdit={this.editTask.bind(this, index, task["id"])}
              />
            );
          })}
        </h4>
      </div>
    );
  }
}
