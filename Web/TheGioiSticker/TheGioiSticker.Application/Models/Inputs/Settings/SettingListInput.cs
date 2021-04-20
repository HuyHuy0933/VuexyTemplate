using Infrastructure.ListUtil.Extensions.IQueryable;
using LinqKit;
using System;
using System.Collections.Generic;
using System.Text;
using TheGioiSticker.Data.EntityExpressions;
using TheGioiSticker.Data.Models;

namespace TheGioiSticker.Application.Models.Inputs.Settings
{
	public class SettingListInput : BaseListInput
	{
	}

	public static class SettingListInputExtensions
	{
		private static readonly FilterPredicate<Setting, SettingListInput>[] FILTERS = new[] {
	  new FilterPredicate<Setting, SettingListInput>(
		isApplicable: input => input.searchText != null,
		predicate: (p, input) =>
		  EntityExpressions.HasValueAndMatches.Invoke(p.Name, input.searchText)
	  )
	};

		private static readonly List<string> DEFAULT_SORT_CRITERIA = new List<string>() {
			"Id".AsAscendingSorter()
		};

		private static readonly OrderByString<Setting> ORDER_BY_STRING = new OrderByString<Setting>
		{
			["Name"] = p => p.Name,
			["SettingValue"] = p => p.SettingValue
		};

		public static IFilterSortPageConfig<Setting, SettingListInput, int> AsFilterSortPageConfig(this SettingListInput input) =>
		  new FilterSortPageConfigBuilder<Setting, SettingListInput, int>(
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
