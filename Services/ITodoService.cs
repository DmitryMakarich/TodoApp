using my_app2.Models;
using System.Collections.Generic;

public interface ITodoService
{
    IEnumerable<Todo> Get();

    Todo AddTodos(string content);

    void DeleteTodo(int id);

    void EditTodo(int id, string content);

    void EditComplete(int id, bool isComplete);
}
