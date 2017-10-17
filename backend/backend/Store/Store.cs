using System;
using MySql.Data.MySqlClient;
using backend.Model;
using backend.Sort;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace backend.Store
{
    public class BookStore : StoreBase
    {
      //GET BOOKS - initial load --------------------------------------------
        public IEnumerable<Book> GetBooks()
        {
            List<Book> books = new List<Book>();

            var connection = GetConnection();

            connection.Open();

            MySqlCommand command = new MySqlCommand("SELECT * FROM tanya_project ORDER BY id LIMIT 10", connection);

            using (MySqlDataReader reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    books.Add(new Book
                    {
                        id = (int)reader["id"],
                        author = (string)reader["author"],
                        title = (string)reader["title"],
                        genre = (string)reader["genre"],
                        year = (int)reader["year"]
                    });
                }
            }

            connection.Close();

            return books;
        }//---------------------------------------------------

        //GET COUNT
        public int GetCount()
        {
            var connection = GetConnection();

            connection.Open();

            MySqlCommand command = new MySqlCommand("SELECT COUNT(id) FROM tanya_project", connection);

            int countOf = Convert.ToInt32(command.ExecuteScalar());

            connection.Close();

            return countOf;
        }

        //GET BOOKS // paging efforts INCLUDING sorting
        public IEnumerable<Book> GetBooks(SortedBooks sortObj)
        {
            List<Book> books = new List<Book>();

            var connection = GetConnection();

            var startVal = sortObj.GetType().GetProperty("startVal");
            int starting = Convert.ToInt32(startVal.GetValue(sortObj, null));

            var viewAmt = sortObj.GetType().GetProperty("viewAmt");
            int viewing = Convert.ToInt32(viewAmt.GetValue(sortObj, null));

            var columnSort = sortObj.GetType().GetProperty("sortVal");
            string col = columnSort.GetValue(sortObj, null) as string;

            var directionSort = sortObj.GetType().GetProperty("sortOrder");
            string dir = directionSort.GetValue(sortObj, null) as string;

            var filterAuthorStart = sortObj.GetType().GetProperty("filterAuthorStart");
            string filterAStart = filterAuthorStart.GetValue(sortObj, null) as string;

            var filterAuthorEnd = sortObj.GetType().GetProperty("filterAuthorEnd");
            string filterAEnd = filterAuthorEnd.GetValue(sortObj, null) as string;

            var filterGenre = sortObj.GetType().GetProperty("filterGenre");
            string filterG = filterGenre.GetValue(sortObj, null) as string;

            var filterYearStart = sortObj.GetType().GetProperty("filterYearStart");
            int filterYStart = Convert.ToInt32(filterYearStart.GetValue(sortObj, null));

            var filterYearEnd = sortObj.GetType().GetProperty("filterYearEnd");
            int filterYEnd = Convert.ToInt32(filterYearEnd.GetValue(sortObj, null));

            Console.WriteLine(starting);
            Console.WriteLine(viewing);
            Console.WriteLine(col);
            Console.WriteLine(dir);
            Console.WriteLine(filterAStart);
            Console.WriteLine(filterAEnd);
            Console.WriteLine(filterGenre);
            Console.WriteLine(filterYStart);
            Console.WriteLine(filterYEnd);

            using (connection)
            {
                string sql = "tanya";
                using (MySqlCommand command = new MySqlCommand(sql, connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@startVal", starting);
                    command.Parameters.AddWithValue("@viewAmt", viewing);
                    command.Parameters.AddWithValue("@sortVal", col);
                    command.Parameters.AddWithValue("@sortOrder", dir);
                    command.Parameters.AddWithValue("@filterAuthorStart", filterAStart);
                    command.Parameters.AddWithValue("@filterAuthorEnd", filterAEnd);
                    command.Parameters.AddWithValue("@filterGenre", filterG);
                    command.Parameters.AddWithValue("@filterYearStart", filterYStart);
                    command.Parameters.AddWithValue("@filterYearEnd", filterYEnd);

                    connection.Open();
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            books.Add(new Book
                            {
                                id = (int)reader["id"],
                                author = (string)reader["author"],
                                title = (string)reader["title"],
                                genre = (string)reader["genre"],
                                year = (int)reader["year"]
                            });
                        }
                    }
                }
            }

            connection.Close();
            return books;
        }

        //GET BOOKS // UPDATE VIEW
       /* public IEnumerable<Book> GetNewView(int qty, int start)
        {
            List<Book> books = new List<Book>();

            var connection = GetConnection();

            using (connection)
            {
                string sql = "tanya";
                using (MySqlCommand command = new MySqlCommand(sql, connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@startVal", start);
                    command.Parameters.AddWithValue("@viewAmt", qty);

                    connection.Open();
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            books.Add(new Book
                            {
                                id = (int)reader["id"],
                                author = (string)reader["author"],
                                title = (string)reader["title"],
                                genre = (string)reader["genre"],
                                year = (int)reader["year"]
                            });
                        }
                    }
                }
            }

            connection.Close();
            return books;
        } */

        //ADD BOOK
        public Book AddABook(Model.Book book)
        {
            bool exists = false;
            using (var connection = GetConnection())
            {
                connection.Open();

                //double check if already exists; if it does, return null 
                //** WILL NEED TO HANDLE**
                MySqlCommand check_command = new MySqlCommand(
                    "select id from tanya_project where author = @a and title = @t", connection);
                check_command.Parameters.AddWithValue("@a", book.author);
                check_command.Parameters.AddWithValue("@t", book.title);


                using (MySqlDataReader reader = check_command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        exists = true;
                    }
                }
                if (exists)
                {
                    return null;
                }
                else
                {
                    MySqlCommand command = new MySqlCommand(
                        "INSERT INTO tanya_project ( author, title, genre, year ) VALUES(@ba, @bt, @bg, @by)", connection);

                    //retrieve & handle new id
                    MySqlCommand id_command = new MySqlCommand("SELECT LAST_INSERT_ID()", connection);

                    command.Parameters.AddWithValue("@ba", book.author);
                    command.Parameters.AddWithValue("@bt", book.title);
                    command.Parameters.AddWithValue("@bg", book.genre);
                    command.Parameters.AddWithValue("@by", book.year);

                    var numInserted = command.ExecuteNonQuery();

                    if (numInserted > 0)
                    {
                        ulong id = (System.UInt64)id_command.ExecuteScalar();
                        book.id = Convert.ToInt32(id);
                    }


                    Console.WriteLine("Inserted {0} records!", numInserted);

                    return book;
                }

            }
        }

        //DELETE BOOK
        internal int RemoveBook(int id)
        {
            BookStore bookstore = new BookStore();
            using (var connection = GetConnection())
            {
                connection.Open();

                MySqlCommand removeBook = new MySqlCommand("DELETE FROM tanya_project WHERE id = @id", connection);
                removeBook.Parameters.AddWithValue("@id", id);
                removeBook.ExecuteNonQuery();

                var numDeleted = removeBook.ExecuteNonQuery();

                Console.WriteLine("Deleted {0} records!", numDeleted);

                return numDeleted;
            }
        }

        //EDIT BOOK
        public Book EditedBook(Model.Book edited)
        {
            using (var connection = GetConnection())
            {
                connection.Open();

                MySqlCommand command = new MySqlCommand(
                    "UPDATE tanya_project SET author = @a, title = @t, genre = @g, year=@y WHERE id = @id", connection);

                command.Parameters.AddWithValue("@a", edited.author);
                command.Parameters.AddWithValue("@t", edited.title);
                command.Parameters.AddWithValue("@g", edited.genre);
                command.Parameters.AddWithValue("@y", edited.year);
                command.Parameters.AddWithValue("@id", edited.id);

                var numUpdated = command.ExecuteNonQuery();

                Console.WriteLine("Updated {0} user records!", numUpdated);

                return edited;
            }
        }

        //SEARCH FUNCTION
        public IEnumerable<Book> SearchBooks(string term)
        {
            List<Book> results = new List<Book>();

            var connection = GetConnection();

            using (connection)
            {
                string sql = "tanyasearch";
                using (MySqlCommand command = new MySqlCommand(sql, connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@searchVal", term);

                    connection.Open();
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            results.Add(new Book
                            {
                                id = (int)reader["id"],
                                author = (string)reader["author"],
                                title = (string)reader["title"],
                                genre = (string)reader["genre"],
                                year = (int)reader["year"]
                            });
                        }
                    }
                }
            }

            connection.Close();

            return results;
        }//end search

        //SORTING ATTEMPTS -----------------------------------------------------
        /*
        public IEnumerable<Book> GetSort(SortedBooks sortObj)
        {
            List<Book> results = new List<Book>();

            var connection = GetConnection();

            var startVal = sortObj.GetType().GetProperty("startVal");
            string starting = startVal.GetValue(sortObj, null) as string;

            var viewAmt = sortObj.GetType().GetProperty("viewAmt");
            string viewing = viewAmt.GetValue(sortObj, null) as string;

            var columnSort = sortObj.GetType().GetProperty("column");
            string col = columnSort.GetValue(sortObj, null) as string;

            var directionSort = sortObj.GetType().GetProperty("direction");
            string dir = directionSort.GetValue(sortObj, null) as string;

            var filterAuthor = sortObj.GetType().GetProperty("filterAuthor");
            string filterA = filterAuthor.GetValue(sortObj, null) as string;

            var filterTitle = sortObj.GetType().GetProperty("filterTitle");
            string filterT = filterTitle.GetValue(sortObj, null) as string;

            var filterGenre = sortObj.GetType().GetProperty("filterGenre");
            string filterG = filterGenre.GetValue(sortObj, null) as string;

            var filterYear = sortObj.GetType().GetProperty("filterYear");
            string filterY = filterYear.GetValue(sortObj, null) as string;

            using (connection)
            {
                string sql = "tanya";
                using (MySqlCommand command = new MySqlCommand(sql, connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@startVal", starting);
                    command.Parameters.AddWithValue("@viewAmt", viewing);
                    command.Parameters.AddWithValue("@sortVal", col);
                    command.Parameters.AddWithValue("@sortOrder", dir);
                    command.Parameters.AddWithValue("@filterAuthor", filterA);
                    command.Parameters.AddWithValue("@filterTitle", filterT);
                    command.Parameters.AddWithValue("@filterGenre", filterG);
                    command.Parameters.AddWithValue("@filterYear", filterY);

                    connection.Open();
                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            results.Add(new Book
                            {
                                id = (int)reader["id"],
                                author = (string)reader["author"],
                                title = (string)reader["title"],
                                genre = (string)reader["genre"],
                                year = (int)reader["year"]
                            });
                        }
                    }
                }
            }

            connection.Close();

            return results;
        }*/



        //---------------- onetime use ----------------------------------
        //ADD MANY BOOKS
        /*public Book AddManyBooks(Model.Book book, int i)
        {
            bool exists = false;
            using (var connection = GetConnection())
            {
                connection.Open();

                //double check if already exists; if it does, return null 
                //** WILL NEED TO HANDLE**
                MySqlCommand check_command = new MySqlCommand(
                    "select id from tanya_project where author = @z and title = @t", connection);
                check_command.Parameters.AddWithValue("@a", book.author);
                check_command.Parameters.AddWithValue("@t", book.title);
                check_command.Parameters.AddWithValue("@z", i);

                using (MySqlDataReader reader = check_command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        exists = true;
                    }
                }
                if (exists)
                {
                    return null;
                }
                else
                {
                    MySqlCommand command = new MySqlCommand(
                        "INSERT INTO tanya_project ( author, title, genre, year )VALUES(@bz, @bt, @bg, @by)", connection);

                    //retrieve & handle new id
                    MySqlCommand id_command = new MySqlCommand("SELECT LAST_INSERT_ID()", connection);

                    command.Parameters.AddWithValue("@ba", book.author);
                    command.Parameters.AddWithValue("@bt", book.title);
                    command.Parameters.AddWithValue("@bg", book.genre);
                    command.Parameters.AddWithValue("@by", book.year);
                    command.Parameters.AddWithValue("@bz", i);

                    var numInserted = command.ExecuteNonQuery();

                    if (numInserted > 0)
                    {

                        ulong id = (System.UInt64)id_command.ExecuteScalar();
                        book.id = Convert.ToInt32(id);
                    }


                    Console.WriteLine("Inserted {0} records!", numInserted);

                    return book;
                }

            }
        }*/

	}//end bookstore
}//end namespace
