using System;
using System.Collections.Generic;

namespace backend.Model
{
	public class Book
	{
        public int id { get; set; }
		public string author { get; set; }
		public string title { get; set; }
        public string genre { get; set; }
		public int year { get; set; }

	}
}