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

    [Route("api/search")]
    public class Search : Controller
    {

        //SEARCH FOR AUTHOR BOOKS
        [HttpGet("{thing}")]
        public IActionResult SearchBooks(string thing)
        {
            var found = new BookStore().SearchBooks(thing);

            return new ObjectResult(found);
        }


        //GET COUNT
        [HttpGet]
        public int CountingBooks()
        {

            var store = new BookStore();

            int countOf = store.GetCount();

            return countOf;
        }

    }

}
