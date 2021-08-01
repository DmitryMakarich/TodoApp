using my_app2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


public class TodoService : ITodoService
{
    private readonly ITodoRepository _todoRepository;

    public TodoService(ITodoRepository todoRepository)
    {
        _todoRepository = todoRepository;
    }

    public IEnumerable<Todo> Get()
    {
        return _todoRepository.Get();
    }

    public Todo AddTodos(string content)
    {
        return _todoRepository.AddTodos(content);
    }

    public void DeleteTodo(int id)
    {
        _todoRepository.DeleteTodo(id);
    }

    public void EditComplete(int id, bool isComplete)
    {
        _todoRepository.EditComplete(id, isComplete);
    }

    public void EditTodo(int id, string content)
    {
        _todoRepository.EditTodo(id, content);
    }
}

