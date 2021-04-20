using System.Collections.Generic;

namespace TheGioiSticker.Application.Models.Inputs
{
    public class BaseListInput
    {
        public int pageNumber { get; set; } = 0;
        public int pageSize { get; set; } = 10;
        public string searchText { get; set; }
        public List<string> sortCriteria { get; set; }
    }
}
