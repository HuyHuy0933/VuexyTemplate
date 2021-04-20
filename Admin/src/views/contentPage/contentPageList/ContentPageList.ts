import { Vue, Component } from 'vue-property-decorator';
import BCardCode from '@core/components/b-card-code/BCardCode.vue';
import {
  BAvatar,
  BPagination,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BRow,
  BCol,
  BDropdown,
  BDropdownItem,
  BCard,
  BCardHeader,
  BCardBody,
  BButton,
  BModal,
  BForm,
  BCardText,
  BImg,
  BBadge,
  BLink
} from 'bootstrap-vue';
import { VueGoodTable } from 'vue-good-table';
import { ListVue, listVueMixin } from '@/utility/pagination/list-vue.mixin';
import Pagination from '@/components/paginations/Pagination.vue';
import { ContentPageListViewModel } from '@/api/api';
import {
  contentPageListDispatcher,
  ContentPageListInput,
  contentPageListNamespace
} from './store/content-page-list.module';
import {
  ListGetter,
  ListGetterTypes
} from '@/utility/pagination/get-list.module-type';
import ApiClientFactory from '@/api/apiClientFactory';
import { DEFAULT_PAGE_SIZE } from '@/utility/pagination/pagination';
import router from '@/router';

@Component({
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BCardCode,
    VueGoodTable,
    BAvatar,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BRow,
    BCol,
    BDropdown,
    BDropdownItem,
    BButton,
    BModal,
    BForm,
    BCardText,
    Pagination,
    BImg,
    BBadge,
    BLink
  },
  mixins: [
    listVueMixin({
      initialInput: {
        itemsPerPage: DEFAULT_PAGE_SIZE,
        searchText: ''
      },
      dispatcher: contentPageListDispatcher,
      debouncedWatchers: [(listInput) => listInput.searchText]
    })
  ]
})
export default class ContentPageList
  extends Vue
  implements ListVue<ContentPageListViewModel, ContentPageListInput> {
  @contentPageListNamespace.Getter(ListGetter.state)
  readonly listState!: ListGetterTypes<
    ContentPageListViewModel,
    ContentPageListInput
  >[ListGetter.state];

  mounted() {
    contentPageListDispatcher.load();
  }

  edit(id: number) {
    router.push({ path: `content-page-form/${id}` });
  }

  remove(id: number) {
    const client = new ApiClientFactory().contentPageClient();
    client.delete(id).then(() => {
      contentPageListDispatcher.load();
      // show toast
      this.$bvToast.toast('Xóa thành công', {
        title: 'Trang thông tin',
        toaster: 'b-toaster-bottom-right',
        variant: 'success'
      });
    });
  }

  headers = [
    {
      label: 'Title',
      field: 'title'
    },
    {
      label: 'Seo Url',
      field: 'seoUrl'
    },
    {
      label: '',
      field: '_action',
      sortable: false,
      width: '1%'
    }
  ];
}
