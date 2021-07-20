using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using my_app2.Models;

namespace my_app2.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private Data.ApplicationDbContext _appContext;

        private readonly ILogger<TodoController> _logger;

        public TodoController(ILogger<TodoController> logger, Data.ApplicationDbContext appContext)
        {
            _logger = logger;

            _appContext = appContext;
        }

        [HttpGet("todos")]
        public IEnumerable<Todo> Get()
        {
            return _appContext.Todos.ToList();
        }

        [HttpPost("addTodo")]
        public void AddTodos(string content)
        {
            _appContext.Todos.Add(new Todo { Content = content });
            _appContext.SaveChanges();
        }

        [HttpDelete("deleteTodo")]
        public void DeleteTodo(int id)
        {
            Todo todo = _appContext.Todos.Find(id);

            if (todo != null)
            {
                _appContext.Todos.Remove(todo);
                _appContext.SaveChanges();
            }
        }

        [HttpPut("editTodo")]
        public void EditTodo(int id, string content)
        {
            Todo todo = _appContext.Todos.Find(id);
            todo.Content = content;
            _appContext.Entry(todo).State = EntityState.Modified;
            
            _appContext.SaveChanges();
        }
    }
}
