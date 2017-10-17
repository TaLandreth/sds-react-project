using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Model;
using backend.Store;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    /*[Route("api/add_many")]
    public class NewController : Controller
    {
        //Add new book
        [HttpPost]
        public IActionResult AddMany([FromBody]Book newBook)
        {

            Console.WriteLine("Inserting many books: {0}...");

            var store = new BookStore();

            Book bookObj = store.AddABook(newBook);

            //Testing to insert multiple records
            for (int i = 0; i < 1000; i++)
            {
                bookObj = store.AddManyBooks(newBook, i);

            }

            if (null != bookObj)
            {
                    return new ObjectResult(bookObj);
            }
            else
            {
                return new ObjectResult(new Book());
            }

        }
    }//end controller*/
}

