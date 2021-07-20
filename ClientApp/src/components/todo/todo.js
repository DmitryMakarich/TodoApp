import React from 'react'
import './todo.css'

class Todo extends React.Component{

    render(){
        // console.log('render', this.props)
        return (
            <div className="Todo">
                <h1>Task {this.props.index + 1}:</h1>
                <p>{this.props.taskName}</p>
                <input 
                    type="text"
                    value={this.props.taskName}
                    style={{
                        width: '200',
                        margin: '10px'
                    }}
                    onChange={this.props.onChangeName}>
                </input>
                {/* <button onClick={this.props.onChangeTask}>Edit</button> */}
                <button 
                    className="ButtonDelete"
                    onClick={this.props.onDelete}>
                        Delete
                </button>
                <button 
                    className="ButtonEdit"
                    onClick={this.props.onEdit}>
                        Edit
                </button>
           </div>
          );
    }
}

export default Todo