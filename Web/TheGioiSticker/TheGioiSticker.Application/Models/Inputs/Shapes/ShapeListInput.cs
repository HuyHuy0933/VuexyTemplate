using Infrastructure.ListUtil.Extensions.IQueryable;
using LinqKit;
using System;
using System.Collections.Generic;
using System.Text;
using TheGioiSticker.Data.EntityExpressions;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.Application.Models.Inputs.Shapes
{
	public class ShapeListInput : BaseListInput
	{
	}

    public static class ShapeListInputExtensions
    {
		private static readonly FilterPredicate<Shape, ShapeListInput>[] FILTERS = new[] {
      new FilterPredicate<Shape, ShapeListInput>(
        isApplicable: input => input.searchText != null,
        predicate: (p, input) =>
          EntityExpressions.HasValueAndMatches.Invoke(p.Name, input.searchText)
      )
    };

        private static readonly List<string> DEFAULT_SORT_CRITERIA = new List<string>() {
            "Id".AsAscendingSorter()
        };

        private static readonly OrderByString<Shape> ORDER_BY_STRING = new OrderByString<Shape>
        {
            ["Name"] = p => p.Name,
            ["Description"] = p => p.Description
        };

        private static readonly OrderByInt<Shape> ORDER_BY_INT = new OrderByInt<Shape>
        {
            ["Status"] = p => (int)p.Status,
        };

        public static IFilterSortPageConfig<Shape, ShapeListInput, int> AsFilterSortPageConfig(this ShapeListInput input) =>
          new FilterSortPageConfigBuilder<Shape, ShapeListInput, int>(
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
