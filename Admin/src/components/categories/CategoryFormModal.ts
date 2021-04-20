import { Vue, Component, Watch } from 'vue-property-decorator';
import {
  BButton,
  BModal,
  BForm,
  BFormInput,
  BFormGroup,
  BFormFile,
  BFormTextarea,
  BFormSelect,
  BImg
} from 'bootstrap-vue';
import {
  ValidationProvider,
  ValidationObserver
} from 'vee-validate/dist/vee-validate.full';
import { CategoryViewModel, FileParameter, StatusEnum } from '@/api/api';
import ApiClientFactory from '@/api/apiClientFactory';
import {
  CategoryAction,
  CategoryGetter,
  categoryNamespace
} from '@/store/category/category.module-types';
import { dispatchCategoryAction } from '@/store/category/category.dispatch';
import store from '@/store';
import { categoryListDispatcher } from '@/views/category/categoryList/store/category-list.module';
import { STATUS_OPTIONS } from '@/@core/utils/constants';

@Component({
  components: {
    BFormGroup,
    BFormInput,
    BButton,
    BModal,
    BForm,
    BFormFile,
    BFormTextarea,
    BFormSelect,
    BImg,
    ValidationProvider,
    ValidationObserver
  }
})
export default class CategoryFormModal extends Vue {
  @categoryNamespace.Getter(CategoryGetter.category)
  category!: CategoryViewModel;

  input = this.getDefaultInputValue();

  VUE_APP_API_BASE_HOST = process.env.VUE_APP_API_BASE_HOST;
  URL = URL;
  statusOptions = STATUS_OPTIONS;

  $refs!: {
    formRules: InstanceType<typeof ValidationProvider>;
    modal: InstanceType<typeof BModal>;
  };

  @Watch('category')
  categoryUpdated(): void {
    if (this.category) {
      this.input = {
        image: null,
        name: this.category.name as string,
        url: this.category.url as string,
        priceUnit: this.category.priceUnit as number,
        status: this.category.status as StatusEnum,
        description: this.category.description as string
      };
    } else {
      this.input = this.getDefaultInputValue();
    }
  }

  openCreateModal(): void {
    dispatchCategoryAction(CategoryAction.clearCategory);
    this.input = this.getDefaultInputValue();
    this.$refs.modal.show();
  }

  async openEditModal(id: number): Promise<void> {
    dispatchCategoryAction(CategoryAction.loadCategory, id);
    this.$refs.modal.show();
    console.log(store.getters['CategoryState/category']);
  }

  getDefaultInputValue() {
    return {
      name: '',
      url: '',
      image: null,
      priceUnit: 0,
      status: StatusEnum.Active,
      description: ''
    };
  }

  add(): void {
    const client = new ApiClientFactory().categoryClient();
    const image: FileParameter = {
      data: this.input.image,
      fileName: (this.input.image as any).name
    };

    client
      .create(
        this.input.name,
        this.input.priceUnit,
        this.input.status,
        this.input.description,
        this.input.url,
        image
      )
      .then(() => {
        categoryListDispatcher.load();
        this.$refs.modal.hide();
        // show toast
        this.$bvToast.toast('Category Created', {
          title: 'Category',
          toaster: 'b-toaster-bottom-right',
          variant: 'success'
        });
      });
  }

  edit() {
    const client = new ApiClientFactory().categoryClient();
    const image: FileParameter | null = this.input.image
      ? {
          data: this.input.image,
          fileName: (this.input.image as any).name
        }
      : null;

    client
      .edit(
        this.category.id,
        this.input.name,
        this.input.priceUnit,
        this.input.status,
        this.input.description,
        this.input.url,
        image
      )
      .then(() => {
        categoryListDispatcher.load();
        this.$refs.modal.hide();
        // show toast
        this.$bvToast.toast('Category Edited', {
          title: 'Category',
          toaster: 'b-toaster-bottom-right',
          variant: 'success'
        });
      });
  }

  imageChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.input.image = event.target.files[0];
    }
  }
  submit(): void {
    this.$refs.formRules.validate().then((success) => {
      if (success) {
        if (this.category) {
          this.edit();
        } else {
          this.add();
        }
      }
    });
  }
}
