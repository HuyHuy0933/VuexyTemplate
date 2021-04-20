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
import ShapeFormModal from '@/components/shapes/ShapeFormModal.vue';
import ShapeFormModalClass from '@/components/shapes/ShapeFormModal';
import { ListVue, listVueMixin } from '@/utility/pagination/list-vue.mixin';
import Pagination from '@/components/paginations/Pagination.vue';
import { ShapeListViewModel } from '@/api/api';
import {
  shapeListDispatcher,
  ShapeListInput,
  shapeListNamespace
} from './store/shape-list.module';
import {
  ListGetter,
  ListGetterTypes
} from '@/utility/pagination/get-list.module-type';
import ApiClientFactory from '@/api/apiClientFactory';
import { DEFAULT_PAGE_SIZE } from '@/utility/pagination/pagination';
import { ShapeStatus } from '@/api/api';
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
    ShapeFormModal,
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
      dispatcher: shapeListDispatcher,
      debouncedWatchers: [(listInput) => listInput.searchText]
    })
  ]
})
export default class ShapeList
  extends Vue
  implements ListVue<ShapeListViewModel, ShapeListInput> {
  @shapeListNamespace.Getter(ListGetter.state)
  readonly listState!: ListGetterTypes<
    ShapeListViewModel,
    ShapeListInput
  >[ListGetter.state];

  VUE_APP_API_BASE_HOST = process.env.VUE_APP_API_BASE_HOST;
  SHAPE_STATUS_ENUM = ShapeStatus;
  $refs!: {
    shapeFormModal: InstanceType<typeof ShapeFormModalClass>;
  };

  shapeStatusOptions: DropdownOption[] = enumToDropdownOptions(ShapeStatus);

  displayShapeStatus(value) {
    return this.shapeStatusOptions.find((x) => x.value === value)?.text;
  }

  mounted() {
    shapeListDispatcher.load();
  }

  edit(id: number) {
    this.$refs.shapeFormModal.openEditModal(id);
  }

  remove(id: number) {
    const client = new ApiClientFactory().shapeClient();
    client.delete(id).then(() => {
      shapeListDispatcher.load();
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
      label: 'Mô tả',
      field: 'description'
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
