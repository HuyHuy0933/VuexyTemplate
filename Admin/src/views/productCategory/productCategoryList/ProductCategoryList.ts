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
  BBadge
} from 'bootstrap-vue';
import { VueGoodTable } from 'vue-good-table';
import ProductCategoryFormModal from '@/components/productCategories/ProductCategoryFormModal.vue';
import ProductCategoryFormModalClass from '@/components/productCategories/ProductCategoryFormModal';
import { ListVue, listVueMixin } from '@/utility/pagination/list-vue.mixin';
import Pagination from '@/components/paginations/Pagination.vue';
import { ProductCategoryListViewModel } from '@/api/api';
import {
  productCategoryListDispatcher,
  ProductCategoryListInput,
  productCategoryListNamespace
} from './store/productCategory-list.module';
import {
  ListGetter,
  ListGetterTypes
} from '@/utility/pagination/get-list.module-type';
import ApiClientFactory from '@/api/apiClientFactory';
import { DEFAULT_PAGE_SIZE } from '@/utility/pagination/pagination';
import { ProductCategoryStatus } from '@/api/api';
import { DropdownOption } from '@/utility/dropdowns/dropdownOptions';
import { enumToDropdownOptions } from '@/utility/utils';
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
    ProductCategoryFormModal,
    BCardText,
    Pagination,
    BImg,
    BBadge
  },
  mixins: [
    listVueMixin({
      initialInput: {
        itemsPerPage: DEFAULT_PAGE_SIZE,
        searchText: ''
      },
      dispatcher: productCategoryListDispatcher,
      debouncedWatchers: [(listInput) => listInput.searchText]
    })
  ]
})
export default class ProductCategoryList
  extends Vue
  implements ListVue<ProductCategoryListViewModel, ProductCategoryListInput> {
  @productCategoryListNamespace.Getter(ListGetter.state)
  readonly listState!: ListGetterTypes<
    ProductCategoryListViewModel,
    ProductCategoryListInput
  >[ListGetter.state];

  VUE_APP_API_BASE_HOST = process.env.VUE_APP_API_BASE_HOST;
  PRODUCT_CATEGORY_STATUS_ENUM = ProductCategoryStatus;
  $refs!: {
    productCategoryFormModal: InstanceType<
      typeof ProductCategoryFormModalClass
    >;
  };

  productCategoryStatusOptions: DropdownOption[] = enumToDropdownOptions(
    ProductCategoryStatus
  );

  displayProductCategoryStatus(value) {
    return this.productCategoryStatusOptions.find((x) => x.value === value)
      ?.text;
  }

  mounted() {
    productCategoryListDispatcher.load();
  }

  edit(id: number) {
    this.$refs.productCategoryFormModal.openEditModal(id);
  }

  remove(id: number) {
    const client = new ApiClientFactory().productCategoryClient();
    client.delete(id).then(() => {
      productCategoryListDispatcher.load();
      // show toast
      this.$bvToast.toast('Xóa danh mục sản phẩm thành công', {
        title: 'Danh mục sản phẩm',
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
      label: 'Tên',
      field: 'name'
    },
    {
      label: 'Url',
      field: 'url'
    },
    {
      label: 'Hoạt động',
      field: 'status',
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
