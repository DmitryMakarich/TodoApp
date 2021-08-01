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
    public class TodoController : Controller
    {
        private readonly ITodoService _todoService;

        public TodoController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        [HttpGet("todos")]
        public IEnumerable<Todo> Get()
        {
            return _todoService.Get();
        }

        [HttpPost("addTodo")]
        public JsonResult AddTodos(string content)
        {    
            return Json(_todoService.AddTodos(content));
        }

        [HttpDelete("deleteTodo")]
        public void DeleteTodo(int id)
        {
            _todoService.DeleteTodo(id);
        }

        [HttpPut("editTodo")]
        public void EditTodo(int id, string content)
        {
            _todoService.EditTodo(id, content);
        }

        [HttpPut("editComplete")]
        public void EditComplete(int id, bool isComplete)
        {
            _todoService.EditComplete(id, isComplete);
        }
    }
}
