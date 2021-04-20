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
  BImg
} from 'bootstrap-vue';
import { VueGoodTable } from 'vue-good-table';
import CategoryFormModal from '@/components/categories/CategoryFormModal.vue';
import CategoryFormModalClass from '@/components/categories/CategoryFormModal';
import { ListVue, listVueMixin } from '@/utility/pagination/list-vue.mixin';
import Pagination from '@/components/paginations/Pagination.vue';
import { CategoryListViewModel } from '@/api/api';
import {
  categoryListDispatcher,
  CategoryListInput,
  categoryListNamespace
} from './store/category-list.module';
import {
  ListGetter,
  ListGetterTypes
} from '@/utility/pagination/get-list.module-type';
import ApiClientFactory from '@/api/apiClientFactory';
import { DEFAULT_PAGE_SIZE } from '@/utility/pagination/pagination';
import {
  STATUS_OPTIONS,
  STATUS_ACTIVE,
  STATUS_INACTIVE
} from '@/@core/utils/constants';
import { StatusEnum } from '@/api/api';
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
    CategoryFormModal,
    BCardText,
    Pagination,
    BImg
  },
  mixins: [
    listVueMixin({
      initialInput: {
        itemsPerPage: DEFAULT_PAGE_SIZE,
        searchText: ''
      },
      dispatcher: categoryListDispatcher,
      debouncedWatchers: [(listInput) => listInput.searchText]
    })
  ]
})
export default class CategoryList
  extends Vue
  implements ListVue<CategoryListViewModel, CategoryListInput> {
  @categoryListNamespace.Getter(ListGetter.state)
  readonly listState!: ListGetterTypes<
    CategoryListViewModel,
    CategoryListInput
  >[ListGetter.state];

  VUE_APP_API_BASE_HOST = process.env.VUE_APP_API_BASE_HOST;
  STATUS_ACTIVE = STATUS_ACTIVE;
  STATUS_INACTIVE = STATUS_INACTIVE;
  statusOptions = STATUS_OPTIONS;
  StatusEnum = StatusEnum;
  $refs!: {
    categoryFormModal: InstanceType<typeof CategoryFormModalClass>;
  };

  mounted() {
    categoryListDispatcher.load();
  }

  edit(id: number) {
    this.$refs.categoryFormModal.openEditModal(id);
  }

  remove(id: number) {
    const client = new ApiClientFactory().categoryClient();
    client.delete(id).then(() => {
      categoryListDispatcher.load();
      // show toast
      this.$bvToast.toast('Category Deleted', {
        title: 'Category',
        toaster: 'b-toaster-bottom-right',
        variant: 'success'
      });
    });
  }

  onSortChange(params) {
    console.log(params);
  }

  headers = [
    {
      label: 'Image',
      field: 'image',
      sortable: false,
      width: '10%'
    },
    {
      label: 'Tên',
      field: 'name',
      width: '20%'
    },
    {
      label: 'Giá Decal/A4',
      field: 'priceUnit',
      width: '10%'
    },
    {
      label: 'Hoạt động',
      field: 'status',
      width: '10%'
    },
    {
      label: 'Mô tả',
      field: 'description',
      width: '30%'
    },
    {
      label: 'Chọn mẫu',
      field: 'url',
      width: '15%'
    },
    {
      label: '',
      field: '_action',
      sortable: false,
      width: '1%'
    }
  ];
}
