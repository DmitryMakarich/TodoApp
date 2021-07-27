import React from 'react'
import './todo.css'


const Todo: React.FC<{}> = (props: any) => {
    return (
        <div className="Todo">
                <h1>Task {props.index + 1}:</h1>
                <p>{props.taskName}</p>
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


// class Todo extends React.Component<any, any>{

//     render(){
//         return (
//             <div className="Todo">
//                 <h1>Task {this.props.index + 1}:</h1>
//                 <p>{this.props.taskName}</p>
//                 <input 
//                     type="text"
//                     value={this.props.taskName}
//                     style={{
//                         width: '200',
//                         margin: '10px'
//                     }}
//                     onChange={this.props.onChangeName}>
//                 </input>
//                 <button 
//                     className="ButtonDelete"
//                     onClick={this.props.onDelete}>
//                         Delete
//                 </button>
//                 <button 
//                     className="ButtonEdit"
//                     onClick={this.props.onEdit}>
//                         Edit
//                 </button>
//            </div>
//           );
//     }
// }

export default Todo