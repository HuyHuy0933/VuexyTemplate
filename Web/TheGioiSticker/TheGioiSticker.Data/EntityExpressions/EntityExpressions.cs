using System;
using System.Linq.Expressions;

namespace TheGioiSticker.Data.EntityExpressions
{
    public static class EntityExpressions
    {
        public static Expression<Func<string, string, bool>> HasValueAndMatches = (string dbString, string inputString) =>
            dbString != null ? dbString.ToLower().Contains(inputString.ToLower()) : false;
    }
}
