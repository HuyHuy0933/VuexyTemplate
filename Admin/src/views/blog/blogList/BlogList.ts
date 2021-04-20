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
import { BlogListViewModel } from '@/api/api';
import {
  blogListDispatcher,
  BlogListInput,
  blogListNamespace
} from './store/blog-list.module';
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
      dispatcher: blogListDispatcher,
      debouncedWatchers: [(listInput) => listInput.searchText]
    })
  ]
})
export default class BlogList
  extends Vue
  implements ListVue<BlogListViewModel, BlogListInput> {
  @blogListNamespace.Getter(ListGetter.state)
  readonly listState!: ListGetterTypes<
    BlogListViewModel,
    BlogListInput
  >[ListGetter.state];

  VUE_APP_API_BASE_HOST = process.env.VUE_APP_API_BASE_HOST;

  mounted() {
    blogListDispatcher.load();
  }

  add() {
    router.push({ path: 'blog-form' });
  }

  edit(id: number) {
    router.push({ path: `blog-form/${id}` });
  }

  remove(id: number) {
    const client = new ApiClientFactory().blogClient();
    client.delete(id).then(() => {
      blogListDispatcher.load();
      // show toast
      this.$bvToast.toast('Xóa sản phẩm in thành công', {
        title: 'Sản phẩm in',
        toaster: 'b-toaster-bottom-right',
        variant: 'success'
      });
    });
  }

  headers = [
    {
      label: 'Hình',
      field: 'image',
      sortable: false,
      width: '10%'
    },
    {
      label: 'Tiêu đề',
      field: 'title',
      width: '20%'
    },
    {
      label: 'Mô tả',
      field: 'description'
    },
    {
      label: 'Nội dụng',
      field: 'content',
      sortable: false,
      width: '20%'
    },
    {
      label: '',
      field: '_action',
      sortable: false,
      width: '1%'
    }
  ];
}
