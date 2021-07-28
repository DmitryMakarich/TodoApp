import {makeAutoObservable} from "mobx"

class TodoStore{
    tasks = []
    searchTask = ""

    constructor(){
        makeAutoObservable(this)
        this.tasks = []
    }

    init(todos){
        this.tasks = todos.concat()
    }

    addTodo(content: string){
        if (content !== "")
        {
            fetch(`/todo/addTodo?content=${content}`, {
                method: "POST",
            }).then(resp => resp.json()).then(x => this.tasks.push(x))
        }
    }    

    onChangeName(content: string, id: number){
        this.tasks.map(task => {
            if (task["id"] === id){
                task["content"] = content
            }
        })
    }

    editTodo(id: number){
        let content = ""

        this.tasks.map(task => {
            if (task["id"] === id){
                content = task["content"]
            }
        })

        fetch(`/todo/editTodo?id=${id}&content=${content}`, {
            method: "PUT",
        });
    }

    removeTodo(id: number){
        fetch(`/todo/deleteTodo?id=${id}`, {
            method: "DELETE",
        }).then(() => {this.tasks = this.tasks.filter(todo => todo["id"] !== id)});
    }

    setSearchValue(value: string){
        this.searchTask = value
    }

    searchValue(){
        
    }
}

export default new TodoStore()