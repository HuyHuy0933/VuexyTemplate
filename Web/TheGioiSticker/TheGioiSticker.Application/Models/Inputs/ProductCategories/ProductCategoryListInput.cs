using Infrastructure.ListUtil.Extensions.IQueryable;
using LinqKit;
using System;
using System.Collections.Generic;
using System.Text;
using TheGioiSticker.Data.EntityExpressions;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.Application.Models.Inputs.ProductCategories
{
	public class ProductCategoryListInput : BaseListInput
	{
	}

    public static class ProductCategoryListInputExtensions
    {
        private static readonly FilterPredicate<ProductCategory, ProductCategoryListInput>[] FILTERS = new[] {
      new FilterPredicate<ProductCategory, ProductCategoryListInput>(
        isApplicable: input => input.searchText != null,
        predicate: (p, input) =>
          EntityExpressions.HasValueAndMatches.Invoke(p.Name, input.searchText)
      )
    };

        private static readonly List<string> DEFAULT_SORT_CRITERIA = new List<string>() {
            "Id".AsAscendingSorter()
        };

        private static readonly OrderByString<ProductCategory> ORDER_BY_STRING = new OrderByString<ProductCategory>
        {
            ["Name"] = p => p.Name,
            ["Url"] = p => p.Url
        };

        private static readonly OrderByInt<ProductCategory> ORDER_BY_INT = new OrderByInt<ProductCategory>
        {
            ["Status"] = p => (int) p.Status,
        };

        public static IFilterSortPageConfig<ProductCategory, ProductCategoryListInput, int> AsFilterSortPageConfig(this ProductCategoryListInput input) =>
          new FilterSortPageConfigBuilder<ProductCategory, ProductCategoryListInput, int>(
            primaryKeySelector: n => n.Id,
            pageSize: input.pageSize,
            pageNumber: input.pageNumber)
            .WithFiltering(FILTERS)
            .WithSorting(
                sortCriteria: input.sortCriteria ?? DEFAULT_SORT_CRITERIA,
                orderByStringKeySelectors: ORDER_BY_STRING,
                orderByIntKeySelectors: ORDER_BY_INT
                )
            .Build();
    }
}
