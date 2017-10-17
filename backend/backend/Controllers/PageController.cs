using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Model;
using backend.Store;
using backend.Sort;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace backend.Controllers
{
    [Route("api/tanya_project/pg")] //--- this should accept ALL OF THE RECENT OBJECT CHANGES
    public class PagingController : Controller
    {
        //GET ALL BOOKS  ---- 
        [HttpPost]
        public IActionResult RetrieveBooks([FromBody]SortedBooks sortObj)
        {
            var bookcase = new BookStore().GetBooks(sortObj);
            return new ObjectResult(bookcase);
        }
    }
}


//TO UPDATE VIEW, AND PAGES & PAGES --- MAY NOT NEED THIS ANY LONGER
/*[Route("api/tanya_project/view")]
public class ViewController : Controller
{
    //GET ALL BOOKS
    [HttpGet("{qty}/{start}")]
    public IActionResult RetrieveBooks(int qty, int start)
    {
        var bookcase = new BookStore().GetNewView(qty, start);
        return new ObjectResult(bookcase);
    }
}*/
