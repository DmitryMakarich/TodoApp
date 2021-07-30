import {makeAutoObservable} from "mobx"

class TodoStore{
    tasks = []
    searchTask = ""
    isComleted = false

    constructor(){
        makeAutoObservable(this)
        this.tasks = []
    }

    showCompleted(){
        this.isComleted = !this.isComleted
    }

    setReady(){
        this.tasks.map(task => {
            task.isReady = false
            return task
        })
        
    }

    getReady(){
        this.tasks.map(task => {
            
            setTimeout(() => {
                task.isReady = true
            }, 1000)
            
            return task
        })
    }

    init(todos){
        this.tasks = todos.concat()
    }

    addTodo(content: string){

        if (content !== "")
        {
            fetch(`/todo/addTodo?content=${content}`, {
                method: "POST",
            }).then(resp => resp.json()).then(x => {
                x.isReady = false
                this.tasks.push(x)
            }).then(() => {
                setTimeout(() => {
                    this.tasks[this.tasks.length - 1].isReady = true
                }, 1000)
            })
        }


    }    

    onChangeName(content: string, id: number){
        this.tasks.map(task => {
            if (task["id"] === id){
                task["content"] = content
            }

            return task
        })
    }

    editTodo(id: number){
        let content = ""

        this.tasks.map(task => {
            if (task["id"] === id){
                content = task["content"]
            }

            return task
        })

        fetch(`/todo/editTodo?id=${id}&content=${content}`, {
            method: "PUT",
        });
    }

    editCompletedTodo(id: number, complete: boolean){

        console.log(complete)

        this.tasks.map(task => {
            if (task["id"] === id){
                task["isComplete"] = complete
            }

            return task;
        })

        fetch(`/todo/editComplete?id=${id}&isComplete=${complete}`, {
            method: "PUT",
        })
    }

    removeTodo(id: number){
        fetch(`/todo/deleteTodo?id=${id}`, {
            method: "DELETE",
        }).then(() => {
            this.tasks.map((task, index) => {
                if (task["id"] === id){
                    task.isReady = false
                }

                return task
            })
        }).then(() => {
            setTimeout(() => {
                this.tasks = this.tasks.filter(todo => todo["id"] !== id)
            }, 1000)
        });
    }

    setSearchValue(value: string){
        this.searchTask = value
    }
}

export default new TodoStore()