using System;
using MySql.Data.MySqlClient;
using backend.Model;
using System.Collections.Generic;

namespace backend.Store
{
    public class BookStore : StoreBase
    {

        //GET BOOKS // paging
        public IEnumerable<Book> GetBooks(int qty, int start)
        {
            List<Book> books = new List<Book>();

            var connection = GetConnection();

            connection.Open();

            MySqlCommand command = new MySqlCommand("SELECT * FROM tanya_project LIMIT @start, @qty", connection);
            command.Parameters.AddWithValue("@qty", qty);
            command.Parameters.AddWithValue("@start", start);

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
        }

        //GET BOOKS // UPDATE VIEW
        public IEnumerable<Book> GetNewView(int qty, int start)
        {
            List<Book> books = new List<Book>();

            var connection = GetConnection();

            connection.Open();

            MySqlCommand command = new MySqlCommand("SELECT * FROM tanya_project LIMIT @start, @limit", connection);
            command.Parameters.AddWithValue("@limit", qty);
            command.Parameters.AddWithValue("@start", start);

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
        }

        //SEARCH FUNCTION -- IN PROGRESS
        public IEnumerable<Book> SearchBooks(string term)
        {
            List<Book> results = new List<Book>();

            var connection = GetConnection();

            connection.Open();

            MySqlCommand command = new MySqlCommand("SELECT * FROM tanya_project WHERE author LIKE '@a", connection);

            command.Parameters.AddWithValue("@a", term);

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

            connection.Close();

            return results;
        }


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
                        "INSERT INTO tanya_project ( author, title, genre, year )VALUES(@ba, @bt, @bg, @by)", connection);

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









        //ADD MANY BOOKS
        public Book AddManyBooks(Model.Book book, int i)
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
        }


        //GET BOOKS
        public IEnumerable<Book> GetBooks()
        {
            List<Book> books = new List<Book>();

            var connection = GetConnection();

            connection.Open();

            MySqlCommand command = new MySqlCommand("SELECT * FROM tanya_project LIMIT 1, 10", connection);

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
        }



	}
}
