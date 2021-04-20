using Infrastructure.ListUtil.Extensions.IQueryable;
using LinqKit;
using System.Collections.Generic;
using TheGioiSticker.Data.EntityExpressions;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.Application.Models.Inputs.Categories
{
    public class CategoryListInput : BaseListInput
    {
    }

    public static class CategoryListInputExtensions
    {
        private static readonly FilterPredicate<Category, CategoryListInput>[] FILTERS = new[] {
      new FilterPredicate<Category, CategoryListInput>(
        isApplicable: input => input.searchText != null,
        predicate: (p, input) =>
          EntityExpressions.HasValueAndMatches.Invoke(p.Name, input.searchText)
      )
    };

        private static readonly List<string> DEFAULT_SORT_CRITERIA = new List<string>() {
            "Id".AsAscendingSorter()
        };

        private static readonly OrderByString<Category> ORDER_BY_STRING = new OrderByString<Category>
        {
            ["Name"] = p => p.Name
        };

        public static IFilterSortPageConfig<Category, CategoryListInput, int> AsFilterSortPageConfig(this CategoryListInput input) =>
          new FilterSortPageConfigBuilder<Category, CategoryListInput, int>(
            primaryKeySelector: n => n.Id,
            pageSize: input.pageSize,
            pageNumber: input.pageNumber)
            .WithFiltering(FILTERS)
            .WithSorting(
                sortCriteria: input.sortCriteria ?? DEFAULT_SORT_CRITERIA,
                orderByStringKeySelectors: ORDER_BY_STRING
                )
            .Build();
    }
}
