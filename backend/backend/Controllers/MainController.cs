﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Model;
using backend.Store;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace backend.Controllers
{
    [Route("api/tanya_project")]
    public class MyController : Controller
    {
        //GET ALL BOOKS -- retrieve all, initial load
        [HttpGet]
        public IActionResult RetrieveBooks()
        {
            var bookcase = new BookStore().GetBooks();
            return new ObjectResult(bookcase);
        }


        //ADD BOOK
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

        // DELETE BOOK
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var store = new BookStore();

            store.RemoveBook(id);

            return Ok();
        }

        // EDIT BOOK
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Book edited)
        {

            edited.id = (int)id;

            Console.WriteLine("Updating book: {0}...", edited.title);

            var store = new BookStore();

            return new ObjectResult(store.EditedBook(edited));
        }

    }//end controller

}

