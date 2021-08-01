using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using my_app2.Data;
using my_app2.Models;
using System.Collections.Generic;
using System.Linq;

public class TodoRepository : ITodoRepository
{
    private readonly ApplicationDbContext _appDbContext;

    public TodoRepository(ApplicationDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public IEnumerable<Todo> Get()
    {
        return _appDbContext.Todos.ToList();
    }

    public Todo AddTodos(string content)
    {
        var context = _appDbContext.Todos.Add(new Todo { Content = content, isComplete = false });
        _appDbContext.SaveChanges();

        return context.Entity;
    }

    public void DeleteTodo(int id)
    {
        Todo todo = _appDbContext.Todos.Find(id);

        if (todo != null)
        {
            _appDbContext.Todos.Remove(todo);
            _appDbContext.SaveChanges();
        }
    }

    public void EditTodo(int id, string content)
    {
        Todo todo = _appDbContext.Todos.Find(id);
        todo.Content = content;
        _appDbContext.Entry(todo).State = EntityState.Modified;

        _appDbContext.SaveChanges();
    }

    public void EditComplete(int id, bool isComplete)
    {
        Todo todo = _appDbContext.Todos.Find(id);
        todo.isComplete = isComplete;
        _appDbContext.Entry(todo).State = EntityState.Modified;

        _appDbContext.SaveChanges();
    }
}