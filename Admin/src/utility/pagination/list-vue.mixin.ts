/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import { Route } from 'vue-router';
import { debounce } from 'lodash';
import { DEFAULT_PAGE_SIZE_OPTIONS, Pagination } from './pagination';
import { ListStateTypes } from './get-list.module-type';

export interface ListDispatcher<TGetInput> {
  updateInput(updates: Partial<TGetInput>): Promise<void>;
  load(gotoFirstPage?: boolean): Promise<void>;
  unload(): Promise<void>;
}

export interface ListVue<TModel, TGetInput extends Pagination> extends Vue {
  listState: ListStateTypes<TModel, TGetInput>;
}

export function listVueMixin<TModel, TGetInput extends Pagination>({
  initialInput,
  dispatcher,
  mutateInitialInput,
  watchers,
  debouncedWatchers
}: {
  initialInput: TGetInput;
  dispatcher: ListDispatcher<TGetInput>;
  mutateInitialInput?: (
    to: Route
  ) => Partial<TGetInput> | Promise<Partial<TGetInput>>;
  watchers?: Array<(listInput: Partial<TGetInput>) => any>;
  debouncedWatchers?: Array<(listInput: Partial<TGetInput>) => any>;
}) {
  const INITIAL_INPUT = { ...initialInput };
  const loadImmediately = debounce(dispatcher.load, 0);
  const loadFirstPageImmediately = debounce(() => dispatcher.load(true), 0);
  const loadFirstPageDebounced = debounce(() => dispatcher.load(true), 250);
  const beforeRoute = async (to: Route, from: Route, next: () => void) => {
    dispatcher.updateInput(INITIAL_INPUT);
    if (mutateInitialInput) {
      dispatcher.updateInput(await Promise.resolve(mutateInitialInput(to)));
    }
    loadImmediately();
    next();
  };
  return {
    beforeRouteEnter: beforeRoute,
    beforeRouteUpdate: beforeRoute,
    mounted() {
      const listVue = (this as unknown) as ListVue<TModel, TGetInput>;
      (watchers || [])
        .map((getFromListInput) => () =>
          getFromListInput(listVue.listState.input)
        )
        .forEach((exp) => listVue.$watch<any>(exp, loadFirstPageImmediately));

      (debouncedWatchers || []).forEach((getFromListInput) =>
        listVue.$watch(
          () => getFromListInput(listVue.listState.input),
          loadFirstPageDebounced
        )
      );
    },
    destroyed() {
      dispatcher.unload();
    },
    data: () => {
      return {
        itemsPerPageOptions: DEFAULT_PAGE_SIZE_OPTIONS
      };
    },
    methods: {
      async sortChanges(field: string, sortType: string) {
        if (!sortType || !field) return;
        if (sortType.toLowerCase() == 'asc') {
          await this.updatePagination({
            sortBy: [field],
            sortDesc: [false]
          } as any);
        } else if (sortType.toLowerCase() == 'desc') {
          await this.updatePagination({
            sortBy: [field],
            sortDesc: [true]
          } as any);
        }
      },
      async updatePagination(input: Partial<TGetInput>) {
        const listVue = (this as unknown) as ListVue<TModel, TGetInput>;
        if (
          listVue.listState.input.itemsPerPage === input.itemsPerPage &&
          listVue.listState.input.page === input.page &&
          listVue.listState.input.sortBy === input.sortBy &&
          listVue.listState.input.sortDesc === input.sortDesc &&
          listVue.listState.input.totalItems === input.totalItems
        ) {
          return;
        }
        await dispatcher.updateInput(input);
        await loadImmediately();
      }
    }
  };
}
