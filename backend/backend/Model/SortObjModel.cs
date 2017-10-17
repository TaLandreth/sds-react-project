using System;
using System.Collections.Generic;

namespace backend.Sort
{
	public class SortedBooks
	{
        public int startVal { get; set; }
        public int viewAmt { get; set; }
        public string sortVal { get; set; }
        public string sortOrder { get; set; }
        public string filterAuthorStart { get; set; }
        public string filterAuthorEnd { get; set; }
        public string filterGenre { get; set; }
        public int filterYearStart { get; set; }
        public int filterYearEnd { get; set; }
	}
}