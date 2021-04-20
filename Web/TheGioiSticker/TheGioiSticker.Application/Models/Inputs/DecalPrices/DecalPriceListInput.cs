using Infrastructure.ListUtil.Extensions.IQueryable;
using LinqKit;
using System;
using System.Collections.Generic;
using System.Text;
using TheGioiSticker.Data.EntityExpressions;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.Application.Models.Inputs.DecalPrices
{
	public class DecalPriceListInput : BaseListInput
	{
	}

    public static class DecalPriceListInputExtensions
    {
        private static readonly FilterPredicate<DecalPrice, DecalPriceListInput>[] FILTERS = new[] {
      new FilterPredicate<DecalPrice, DecalPriceListInput>(
        isApplicable: input => input.searchText != null,
        predicate: (p, input) =>
          EntityExpressions.HasValueAndMatches.Invoke(p.Description, input.searchText)
      )
    };

        private static readonly List<string> DEFAULT_SORT_CRITERIA = new List<string>() {
            "Id".AsAscendingSorter()
        };

        private static readonly OrderByString<DecalPrice> ORDER_BY_STRING = new OrderByString<DecalPrice>
        {
            ["Description"] = p => p.Description,
        };

        private static readonly OrderByDecimal<DecalPrice> ORDER_BY_DECIMAl = new OrderByDecimal<DecalPrice>
        {
            ["PrintPrice"] = d => d.PrintPrice,
            ["MachiningPrice"] = d => d.MachiningPrice,
            ["CutPrint"] = d => d.CutPrint
        };

        private static readonly OrderByInt<DecalPrice> ORDER_BY_INT = new OrderByInt<DecalPrice>
        {
            ["Quantity"] = d => d.Quantity
        };

        public static IFilterSortPageConfig<DecalPrice, DecalPriceListInput, int> AsFilterSortPageConfig(this DecalPriceListInput input) =>
          new FilterSortPageConfigBuilder<DecalPrice, DecalPriceListInput, int>(
            primaryKeySelector: n => n.Id,
            pageSize: input.pageSize,
            pageNumber: input.pageNumber)
            .WithFiltering(FILTERS)
            .WithSorting(
                sortCriteria: input.sortCriteria ?? DEFAULT_SORT_CRITERIA,
                orderByStringKeySelectors: ORDER_BY_STRING,
                orderByDecimalKeySelectors: ORDER_BY_DECIMAl,
                orderByIntKeySelectors: ORDER_BY_INT
                )
            .Build();
    }
}
