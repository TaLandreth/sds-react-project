using System;
using MySql.Data.MySqlClient;

namespace backend.Store
{
    public class StoreBase
    {
        protected MySqlConnection GetConnection()
        {
            MySqlConnection connection = new MySqlConnection
            {
                ConnectionString = "server=sds-incubator.crzqpu8yygjb.us-east-1.rds.amazonaws.com;user id=admin;password=b849e2beafee4899b8aa032544570f4c;persistsecurityinfo=True;port=3306;database=incubator;SslMode=none;"
            };

            return connection;
        }
    }
}
