import { Vue, Component, Watch } from 'vue-property-decorator';
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
  BForm,
  BCardText,
  BImg,
  BBadge,
  BFormTextarea,
  BFormFile,
  BLink
} from 'bootstrap-vue';
import {
  ValidationProvider,
  ValidationObserver
} from 'vee-validate/dist/vee-validate.full';
import {
  ProductNamespace,
  ProductGetter,
  ProductAction
} from '@/store/product/product.module-types';
import { ProductViewModel, ProductStatus, FileParameter } from '@/api/api';
import { enumToDropdownOptions } from '@/utility/utils';
import { DropdownOption } from '@/utility/dropdowns/dropdownOptions';
import { dispatchProductAction } from '@/store/product/product.dispatch';
import { productListDispatcher } from '../productList/store/product-list.module';
import ApiClientFactory from '@/api/apiClientFactory';
import { quillEditor } from 'vue-quill-editor';
import router from '@/router';
import CustomLabel from '@/components/labels/CustomLabel.vue';

@Component({
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BCardCode,
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
    BForm,
    BCardText,
    BImg,
    BBadge,
    BFormTextarea,
    BFormFile,
    BLink,
    quillEditor,
    ValidationProvider,
    ValidationObserver,
    CustomLabel
  }
})
export default class ProductForm extends Vue {
  @ProductNamespace.Getter(ProductGetter.product)
  product!: ProductViewModel;

  input = this.getDefaultInputValue();
  productId = '';

  VUE_APP_API_BASE_HOST = process.env.VUE_APP_API_BASE_HOST;
  URL = URL;
  productStatus: DropdownOption[] = enumToDropdownOptions(ProductStatus);

  $refs!: {
    formRules: InstanceType<typeof ValidationProvider>;
  };

  mounted() {
    this.productId = this.$route.params.id;
  }

  @Watch('productId')
  getProductById(): void {
    if (this.productId) {
      dispatchProductAction(
        ProductAction.loadProduct,
        parseInt(this.productId)
      );
    } else {
      dispatchProductAction(ProductAction.clearProduct);
    }
  }

  @Watch('product')
  productUpdated(): void {
    if (this.product) {
      this.input = {
        name: this.product.name as string,
        price: this.product.price,
        imageLinks: this.product.imageLinks as string[],
        imageFiles: [] as any[],
        status: this.product.status as ProductStatus,
        seoUrl: this.product.seoUrl as string,
        metaTitle: this.product.metaTitle as string,
        metaDescription: this.product.metaDescription as string,
        description: this.product.description as string
      };
    } else {
      this.input = this.getDefaultInputValue();
    }
  }

  getDefaultInputValue() {
    return {
      name: '',
      price: 0,
      imageLinks: [] as string[],
      imageFiles: [] as any[],
      status: ProductStatus.Active,
      seoUrl: '',
      metaTitle: '',
      metaDescription: '',
      description: ''
    };
  }

  add(): void {
    const client = new ApiClientFactory().productClient();

    const images: FileParameter[] = this.input.imageFiles.map((img) => {
      return {
        data: img,
        fileName: (img as any).name
      };
    });

    client
      .create(
        this.input.name,
        this.input.description,
        this.input.price,
        images,
        this.input.status,
        this.input.seoUrl,
        this.input.metaDescription,
        this.input.metaTitle
      )
      .then(() => {
        productListDispatcher.load();
        // show toast
        this.$bvToast.toast('Thêm mới thành công', {
          title: 'Sản phẩm',
          toaster: 'b-toaster-bottom-right',
          variant: 'success'
        });

        router.push({ path: '/product-list' });
      });
  }

  edit() {
    const client = new ApiClientFactory().productClient();
    const imageFiles: FileParameter[] = this.input.imageFiles.map((img) => {
      return {
        data: img,
        fileName: (img as any).name
      };
    });

    client
      .edit(
        this.product.id,
        this.input.name,
        this.input.description,
        this.input.price,
        imageFiles,
        this.input.imageLinks,
        this.input.status,
        this.input.seoUrl,
        this.input.metaDescription,
        this.input.metaTitle
      )
      .then(() => {
        productListDispatcher.load();
        // show toast
        this.$bvToast.toast('Chỉnh sửa thành công', {
          title: 'Sản phẩm',
          toaster: 'b-toaster-bottom-right',
          variant: 'success'
        });

        router.push({ path: '/product-list' });
      });
  }

  deleteImgLink(img: string) {
    const index = this.input.imageLinks.findIndex((x) => x === img);
    this.input.imageLinks.splice(index, 1);
  }

  deleteImgFile(img: any) {
    const index = this.input.imageFiles.findIndex(
      (x: any) => x.name === img.name
    );
    this.input.imageFiles.splice(index, 1);
  }

  imageChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.input.imageFiles.push(event.target.files[0]);
      console.log(this.input.imageFiles);
    }
  }

  submit(): void {
    this.$refs.formRules.validate().then((success) => {
      if (success) {
        if (this.product) {
          this.edit();
        } else {
          this.add();
        }
      }
    });
  }
}
