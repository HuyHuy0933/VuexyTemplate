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
  BCardText
} from 'bootstrap-vue';
import { VueGoodTable } from 'vue-good-table';
import SettingFormModal from '@/components/settings/SettingFormModal.vue';
import SettingFormModalClass from '@/components/settings/SettingFormModal';
import { ListVue, listVueMixin } from '@/utility/pagination/list-vue.mixin';
import Pagination from '@/components/paginations/Pagination.vue';
import { SettingListViewModel } from '@/api/api';
import {
  settingListDispatcher,
  SettingListInput,
  settingListNamespace
} from './store/setting-list.module';
import {
  ListGetter,
  ListGetterTypes
} from '@/utility/pagination/get-list.module-type';
import ApiClientFactory from '@/api/apiClientFactory';
import { DEFAULT_PAGE_SIZE } from '@/utility/pagination/pagination';
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
    SettingFormModal,
    BCardText,
    Pagination
  },
  mixins: [
    listVueMixin({
      initialInput: {
        itemsPerPage: DEFAULT_PAGE_SIZE,
        searchText: ''
      },
      dispatcher: settingListDispatcher,
      debouncedWatchers: [(listInput) => listInput.searchText]
    })
  ]
})
export default class SettingList
  extends Vue
  implements ListVue<SettingListViewModel, SettingListInput> {
  @settingListNamespace.Getter(ListGetter.state)
  readonly listState!: ListGetterTypes<
    SettingListViewModel,
    SettingListInput
  >[ListGetter.state];

  $refs!: {
    settingFormModal: InstanceType<typeof SettingFormModalClass>;
  };

  mounted() {
    settingListDispatcher.load();
  }

  edit(id: number) {
    this.$refs.settingFormModal.openEditModal(id);
  }

  onSortChange(params) {
    console.log(params);
  }

  headers = [
    {
      label: 'Name',
      field: 'name'
    },
    {
      label: 'Value',
      field: 'settingValue'
    },
    {
      label: 'Action',
      field: '_action',
      sortable: false,
      width: '10%'
    }
  ];
}
