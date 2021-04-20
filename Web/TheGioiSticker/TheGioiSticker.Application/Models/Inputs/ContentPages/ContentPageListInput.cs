using Infrastructure.ListUtil.Extensions.IQueryable;
using LinqKit;
using System.Collections.Generic;
using TheGioiSticker.Data.EntityExpressions;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.Application.Models.Inputs.ContentPages
{
    public class ContentPageListInput : BaseListInput
    {
    }

    public static class ContentPageListInputExtensions
    {
        private static readonly FilterPredicate<ContentPage, ContentPageListInput>[] FILTERS = new[] {
      new FilterPredicate<ContentPage, ContentPageListInput>(
        isApplicable: input => input.searchText != null,
        predicate: (p, input) =>
            EntityExpressions.HasValueAndMatches.Invoke(p.Title, input.searchText) ||
            EntityExpressions.HasValueAndMatches.Invoke(p.SeoUrl, input.searchText)
      )
    };

        private static readonly List<string> DEFAULT_SORT_CRITERIA = new List<string>() {
            "Id".AsAscendingSorter()
        };

        private static readonly OrderByString<ContentPage> ORDER_BY_STRING = new OrderByString<ContentPage>
        {
            ["Title"] = p => p.Title,
            ["SeoUrl"] = p => p.SeoUrl
        };

        public static IFilterSortPageConfig<ContentPage, ContentPageListInput, int> AsFilterSortPageConfig(this ContentPageListInput input) =>
          new FilterSortPageConfigBuilder<ContentPage, ContentPageListInput, int>(
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
