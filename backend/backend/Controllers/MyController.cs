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
    [Route("api/tanya_project")]
    public class MyController : Controller
    {
        //GET ALL BOOKS
        [HttpGet("{qty}/{start}")]
        public IActionResult RetrieveBooks(int qty, int start)
        {
            var bookcase = new BookStore().GetBooks(qty,start);
            return new ObjectResult(bookcase);
        }


        //GET ALL BOOKS
        [HttpGet]
        public IActionResult RetrieveBooks()
        {
            var bookcase = new BookStore().GetBooks();
            return new ObjectResult(bookcase);
        }

        //Add new book
        [HttpPost]
        public IActionResult AddABook([FromBody]Book newBook)
        {

            Console.WriteLine("Inserting book: {0}...");

            var store = new BookStore();

            Book bookObj = store.AddABook(newBook);

            if (null != bookObj)
            {
                return new ObjectResult(bookObj);
            }
            else
            {
                return new ObjectResult(new Book());
            }

        }

        // DELETE
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var store = new BookStore();

            store.RemoveBook(id);

            return Ok();
        }

        // Edit Book
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Book edited)
        {

            edited.id = (int)id;

            Console.WriteLine("Updating book: {0}...", edited.title);

            var store = new BookStore();

            return new ObjectResult(store.EditedBook(edited));
        }

    }//end controller

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

