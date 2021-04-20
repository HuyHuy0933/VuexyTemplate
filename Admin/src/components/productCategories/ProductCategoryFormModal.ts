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
import {
  ProductCategoryViewModel,
  FileParameter,
  ProductCategoryStatus
} from '@/api/api';
import ApiClientFactory from '@/api/apiClientFactory';
import {
  ProductCategoryAction,
  ProductCategoryGetter,
  productCategoryNamespace
} from '@/store/productCategory/productCategory.module-types';
import { dispatchProductCategoryAction } from '@/store/productCategory/productCategory.dispatch';
import { productCategoryListDispatcher } from '@/views/productCategory/productCategoryList/store/productCategory-list.module';
import { DropdownOption } from '@/utility/dropdowns/dropdownOptions';
import { enumToDropdownOptions } from '@/utility/utils';
import CustomLabel from '@/components/labels/CustomLabel.vue';

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
    ValidationObserver,
    CustomLabel
  }
})
export default class ProductCategoryFormModal extends Vue {
  @productCategoryNamespace.Getter(ProductCategoryGetter.productCategory)
  productCategory!: ProductCategoryViewModel;

  input = this.getDefaultInputValue();

  VUE_APP_API_BASE_HOST = process.env.VUE_APP_API_BASE_HOST;
  URL = URL;
  productCategoryStatus: DropdownOption[] = enumToDropdownOptions(
    ProductCategoryStatus
  );

  $refs!: {
    formRules: InstanceType<typeof ValidationProvider>;
    modal: InstanceType<typeof BModal>;
  };

  @Watch('productCategory')
  productCategoryUpdated(): void {
    if (this.productCategory) {
      this.input = {
        image: null,
        name: this.productCategory.name as string,
        status: this.productCategory.status as ProductCategoryStatus,
        url: this.productCategory.url as string
      };
    } else {
      this.input = this.getDefaultInputValue();
    }
  }

  openCreateModal(): void {
    dispatchProductCategoryAction(ProductCategoryAction.clearProductCategory);
    this.input = this.getDefaultInputValue();
    this.$refs.modal.show();
  }

  async openEditModal(id: number): Promise<void> {
    dispatchProductCategoryAction(
      ProductCategoryAction.loadProductCategory,
      id
    );
    this.$refs.modal.show();
  }

  getDefaultInputValue() {
    return {
      name: '',
      image: null,
      status: ProductCategoryStatus.Active,
      url: ''
    };
  }

  add(): void {
    const client = new ApiClientFactory().productCategoryClient();
    const image: FileParameter = {
      data: this.input.image,
      fileName: (this.input.image as any).name
    };

    client
      .create(this.input.name, this.input.status, this.input.url, image)
      .then(() => {
        productCategoryListDispatcher.load();
        this.$refs.modal.hide();
        // show toast
        this.$bvToast.toast('Thêm mới danh mục sản phẩm thành công', {
          title: 'Danh mục sản phẩm',
          toaster: 'b-toaster-bottom-right',
          variant: 'success'
        });
      });
  }

  edit() {
    const client = new ApiClientFactory().productCategoryClient();
    const image: FileParameter | null = this.input.image
      ? {
          data: this.input.image,
          fileName: (this.input.image as any).name
        }
      : null;

    client
      .edit(
        this.productCategory.id,
        this.input.name,
        this.input.status,
        this.input.url,
        image
      )
      .then(() => {
        productCategoryListDispatcher.load();
        this.$refs.modal.hide();
        // show toast
        this.$bvToast.toast('Chỉnh sửa danh mục sản phẩm thành công', {
          title: 'Danh mục sản phẩm',
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
        if (this.productCategory) {
          this.edit();
        } else {
          this.add();
        }
      }
    });
  }
}
