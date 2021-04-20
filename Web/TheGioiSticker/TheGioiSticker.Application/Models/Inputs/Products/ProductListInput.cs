using Infrastructure.ListUtil.Extensions.IQueryable;
using LinqKit;
using System;
using System.Collections.Generic;
using System.Text;
using TheGioiSticker.Data.EntityExpressions;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.Application.Models.Inputs.Products
{
	public class ProductListInput : BaseListInput
	{
	}

    public static class ProductListInputExtensions
    {
        private static readonly FilterPredicate<Product, ProductListInput>[] FILTERS = new[] {
      new FilterPredicate<Product, ProductListInput>(
        isApplicable: input => input.searchText != null,
        predicate: (p, input) =>
          EntityExpressions.HasValueAndMatches.Invoke(p.Name, input.searchText)
      )
    };

        private static readonly List<string> DEFAULT_SORT_CRITERIA = new List<string>() {
            "Id".AsAscendingSorter()
        };

        private static readonly OrderByString<Product> ORDER_BY_STRING = new OrderByString<Product>
        {
            ["Name"] = p => p.Name
        };

        private static readonly OrderByDecimal<Product> ORDER_BY_DECIMAL = new OrderByDecimal<Product>
        {
            ["Price"] = p => p.Price
        };

        private static readonly OrderByInt<Product> ORDER_BY_INT = new OrderByInt<Product>
        {
            ["Status"] = p => (int) p.Status
        };

        public static IFilterSortPageConfig<Product, ProductListInput, int> AsFilterSortPageConfig(this ProductListInput input) =>
          new FilterSortPageConfigBuilder<Product, ProductListInput, int>(
            primaryKeySelector: n => n.Id,
            pageSize: input.pageSize,
            pageNumber: input.pageNumber)
            .WithFiltering(FILTERS)
            .WithSorting(
                sortCriteria: input.sortCriteria ?? DEFAULT_SORT_CRITERIA,
                orderByStringKeySelectors: ORDER_BY_STRING,
                orderByDecimalKeySelectors: ORDER_BY_DECIMAL,
                orderByIntKeySelectors: ORDER_BY_INT
                )
            .Build();
    }
}
