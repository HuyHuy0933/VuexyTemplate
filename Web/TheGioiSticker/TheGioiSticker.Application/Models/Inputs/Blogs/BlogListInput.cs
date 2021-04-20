using Infrastructure.ListUtil.Extensions.IQueryable;
using LinqKit;
using System;
using System.Collections.Generic;
using System.Text;
using TheGioiSticker.Data.EntityExpressions;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.Application.Models.Inputs.Blogs
{
	public class BlogListInput : BaseListInput
	{
	}

    public static class ShapeListInputExtensions
    {
        private static readonly FilterPredicate<Blog, BlogListInput>[] FILTERS = new[] {
      new FilterPredicate<Blog, BlogListInput>(
        isApplicable: input => input.searchText != null,
        predicate: (p, input) =>
          EntityExpressions.HasValueAndMatches.Invoke(p.Title, input.searchText)
      )
    };

        private static readonly List<string> DEFAULT_SORT_CRITERIA = new List<string>() {
            "Id".AsAscendingSorter()
        };

        private static readonly OrderByString<Blog> ORDER_BY_STRING = new OrderByString<Blog>
        {
            ["Title"] = p => p.Title,
            ["Description"] = p => p.Description
        };

        public static IFilterSortPageConfig<Blog, BlogListInput, int> AsFilterSortPageConfig(this BlogListInput input) =>
          new FilterSortPageConfigBuilder<Blog, BlogListInput, int>(
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
