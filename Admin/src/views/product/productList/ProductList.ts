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
import { ProductListViewModel } from '@/api/api';
import {
  productListDispatcher,
  ProductListInput,
  productListNamespace
} from './store/product-list.module';
import {
  ListGetter,
  ListGetterTypes
} from '@/utility/pagination/get-list.module-type';
import ApiClientFactory from '@/api/apiClientFactory';
import { DEFAULT_PAGE_SIZE } from '@/utility/pagination/pagination';
import { ProductStatus } from '@/api/api';
import { DropdownOption } from '@/utility/dropdowns/dropdownOptions';
import { enumToDropdownOptions } from '@/utility/utils';
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
      dispatcher: productListDispatcher,
      debouncedWatchers: [(listInput) => listInput.searchText]
    })
  ]
})
export default class ProductList
  extends Vue
  implements ListVue<ProductListViewModel, ProductListInput> {
  @productListNamespace.Getter(ListGetter.state)
  readonly listState!: ListGetterTypes<
    ProductListViewModel,
    ProductListInput
  >[ListGetter.state];

  VUE_APP_API_BASE_HOST = process.env.VUE_APP_API_BASE_HOST;
  PRODUCT_STATUS_ENUM = ProductStatus;

  productStatusOptions: DropdownOption[] = enumToDropdownOptions(ProductStatus);

  displayProductStatus(value) {
    return this.productStatusOptions.find((x) => x.value === value)?.text;
  }

  mounted() {
    productListDispatcher.load();
  }

  add() {
    router.push({ path: 'product-form' });
  }

  edit(id: number) {
    router.push({ path: `product-form/${id}` });
  }

  remove(id: number) {
    const client = new ApiClientFactory().productClient();
    client.delete(id).then(() => {
      productListDispatcher.load();
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
      label: 'Tên',
      field: 'name'
    },
    {
      label: 'Giá Decal/A4',
      field: 'price',
      width: '15%'
    },
    {
      label: 'Hoạt động',
      field: 'status',
      width: '15%'
    },
    {
      label: 'Mô tả',
      field: 'description',
      width: '20%',
      sortable: false
    },
    {
      label: 'Chọn mẫu',
      field: 'seoUrl',
      width: '15%',
      sortable: false
    },
    {
      label: '',
      field: '_action',
      sortable: false,
      width: '1%'
    }
  ];
}
