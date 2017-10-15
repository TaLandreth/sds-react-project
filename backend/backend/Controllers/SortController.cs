using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Sort;
using backend.Store;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace backend.Controllers
{
    //SORT!
    [Route("api/tanya_project/sorting")]
    public class SortController : Controller
    {
        //Sort the books
        [HttpPost("{view}")]
        public IActionResult SortBooks(int view, [FromBody]SortedBooks sortObj)
        {
            Console.Write(sortObj);

            var sortResults = new BookStore().GetSort(view, sortObj);

            return new ObjectResult(sortResults);
        }
    }
}

