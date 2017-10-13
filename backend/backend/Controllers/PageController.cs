using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Model;
using backend.Store;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace backend.Controllers
{
    //UPDATE VIEW & PAGES
    [Route("api/tanya_project/view")]
    public class ViewController : Controller
    {
        //GET ALL BOOKS
        [HttpGet("{qty}/{start}")]
        public IActionResult RetrieveBooks(int qty, int start)
        {
            var bookcase = new BookStore().GetNewView(qty, start);
            return new ObjectResult(bookcase);
        }
    }

    [Route("api/tanya_project/pg")]
    public class PagingController : Controller
    {
        //GET ALL BOOKS
        [HttpGet("{qty}/{start}")]
        public IActionResult RetrieveBooks(int qty, int start)
        {
            var bookcase = new BookStore().GetBooks(qty, start);
            return new ObjectResult(bookcase);
        }
    }
}
