import { observer } from 'mobx-react-lite';
import todoStore from "../store/TodoStore"
import React, { useState } from 'react'
import './todo.css'


const Todo: React.FC<any> = observer((props: any) => {
    const [todoName, setName] = useState("");

    return (
        <div className="Todo" style={{
            position: "relative"
        }}>
                <h1>Task {props.index + 1}:</h1>
                <p>{props.taskName}</p>
                <input type="checkbox" id={"box" + props.index} style={{
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                    width: "20px",
                    height: "20px",
                }}
                defaultChecked={props.isComplete}
                onClick={props.changeCompleted}
                />
                <input
                    style={{
                        width: '200',
                        margin: '10px',
                        borderRadius: "10px",
                    }}
                    type="text" 
                    onChange={event => setName(event.target.value)} 
                />
                <button 
                    className="ButtonEdit"
                    onClick={() => todoStore.editTodo(props.id, todoName)}>
                        Edit
                </button>
                <button 
                    className="ButtonDelete"
                    onClick={props.onDelete}>
                        Delete
                </button>
           </div>
    )
})

export default Todo
