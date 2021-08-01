using System.Collections.Generic;
using my_app2.Models;


public interface ITodoRepository{
    IEnumerable<Todo> Get();

    Todo AddTodos(string content);

    void DeleteTodo(int id);

    void EditTodo(int id, string content);

    void EditComplete(int id, bool isComplete);
}