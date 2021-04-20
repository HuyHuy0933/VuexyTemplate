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
import DecalPriceFormModal from '@/components/decalPrices/DecalPriceFormModal.vue';
import DecalPriceFormModalClass from '@/components/decalPrices/DecalPriceFormModal';
import { ListVue, listVueMixin } from '@/utility/pagination/list-vue.mixin';
import Pagination from '@/components/paginations/Pagination.vue';
import { DecalPriceListViewModel } from '@/api/api';
import {
  decalPriceListDispatcher,
  DecalPriceListInput,
  decalPriceListNamespace
} from './store/decal-price-list.module';
import {
  ListGetter,
  ListGetterTypes
} from '@/utility/pagination/get-list.module-type';
import ApiClientFactory from '@/api/apiClientFactory';
import { DEFAULT_PAGE_SIZE } from '@/utility/pagination/pagination';
import { formatCurrency } from '@/utility/utils';

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
    DecalPriceFormModal,
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
      dispatcher: decalPriceListDispatcher,
      debouncedWatchers: [(listInput) => listInput.searchText]
    })
  ]
})
export default class DecalPriceList
  extends Vue
  implements ListVue<DecalPriceListViewModel, DecalPriceListInput> {
  @decalPriceListNamespace.Getter(ListGetter.state)
  readonly listState!: ListGetterTypes<
    DecalPriceListViewModel,
    DecalPriceListInput
  >[ListGetter.state];

  VUE_APP_API_BASE_HOST = process.env.VUE_APP_API_BASE_HOST;
  formatCurrency = formatCurrency;
  $refs!: {
    decalPriceFormModal: InstanceType<typeof DecalPriceFormModalClass>;
  };

  mounted() {
    decalPriceListDispatcher.load();
  }

  edit(id: number) {
    this.$refs.decalPriceFormModal.openEditModal(id);
  }

  remove(id: number) {
    const client = new ApiClientFactory().decalPriceClient();
    client.delete(id).then(() => {
      decalPriceListDispatcher.load();
      // show toast
      this.$bvToast.toast('Xóa mẫu khuôn bế thành công', {
        title: 'Mẫu khuôn bế',
        toaster: 'b-toaster-bottom-right',
        variant: 'success'
      });
    });
  }

  headers = [
    {
      label: 'Mô tả',
      field: 'description',
      width: '20%'
    },
    {
      label: 'Số tờ A4',
      field: 'quantity'
    },
    {
      label: 'Giá in',
      field: 'printPrice'
    },
    {
      label: 'Giá bế',
      field: 'cutPrice'
    },
    {
      label: 'Giá cán màng',
      field: 'machiningPrice'
    },
    {
      label: '',
      field: '_action',
      sortable: false,
      width: '1%'
    }
  ];
}
