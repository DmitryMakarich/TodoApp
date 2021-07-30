import React from 'react'
import './todo.css'

const Todo: React.FC<any> = (props: any) => {
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
                    height: "20px"
                }}
                defaultChecked={props.isComplete}
                onClick={props.changeCompleted}
                />
                 <input 
                    type="text"
                    value={props.taskName}
                    style={{
                        width: '200',
                        margin: '10px'
                    }}
                    onChange={props.onChangeName}>
                </input>
                <button 
                    className="ButtonDelete"
                    onClick={props.onDelete}>
                        Delete
                </button>
                <button 
                    className="ButtonEdit"
                    onClick={props.onEdit}>
                        Edit
                </button>
           </div>
    )
}

export default Todo
