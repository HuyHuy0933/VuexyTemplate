import { Vue, Component, Watch } from 'vue-property-decorator';
import { BButton, BModal, BForm, BFormInput, BFormGroup } from 'bootstrap-vue';
import {
  ValidationProvider,
  ValidationObserver
} from 'vee-validate/dist/vee-validate.full';
import { ProductViewModel } from '@/api/api';
import {
  ProductAction,
  ProductGetter,
  ProductMutation,
  ProductNamespace
} from '@/store/product/product.module-types';
import { dispatchProductAction } from '@/store/product/product.dispatch';
import { productListNamespace } from '@/views/product/productList/store/product-list.module';
import { ListAction } from '@/utility/pagination/get-list.module-type';
import { quillEditor } from 'vue-quill-editor';

@Component({
  components: {
    BFormGroup,
    BFormInput,
    BButton,
    BModal,
    BForm,
    quillEditor,
    ValidationProvider,
    ValidationObserver
  }
})
export default class ProductFormModal extends Vue {
  @ProductNamespace.Getter(ProductGetter.product)
  product!: ProductViewModel;
  @ProductNamespace.Mutation(ProductMutation.setProduct)
  setProduct!: (product: ProductViewModel | null) => void;

  @productListNamespace.Action(ListAction.load)
  loadProducts!: () => Promise<void>;

  input = this.getDefaultInputValue();

  $refs!: {
    formRules: InstanceType<typeof ValidationProvider>;
    modal: InstanceType<typeof BModal>;
  };

  @Watch('product')
  productUpdated(): void {
    if (this.product) {
      this.input = {
        name: this.product.name as string,
        description: this.product.description as string
      };
    } else {
      this.input = this.getDefaultInputValue();
    }
  }

  openCreateModal(): void {
    this.input = this.getDefaultInputValue();
    this.$refs.modal.show();
  }

  async openEditModal(id: number): Promise<void> {
    dispatchProductAction(ProductAction.loadProduct, id);
    this.$refs.modal.show();
  }

  getDefaultInputValue() {
    return {
      name: '',
      description: ''
    };
  }

  async add(name: string, description: string): Promise<void> {
    // const client = new ApiClientFactory().productClient();
    // client.create(name, description).then(async () => {
    //   this.$refs.modal.hide();
    //   // show toast
    //   this.$bvToast.toast('Product Created', {
    //     title: 'Product',
    //     toaster: 'b-toaster-bottom-right',
    //     variant: 'success'
    //   });
    //   await this.loadProducts();
    //   this.resetProduct();
    // });
  }

  // async edit(input: EditProductInput): Promise<void> {
  //   const payload = {
  //     id: this.product.id,
  //     product: input
  //   };

  //   await this.editProduct(payload);
  //   await this.loadProducts();
  //   this.$refs.modal.hide();
  //   // show toast
  //   this.$bvToast.toast('Product Edited', {
  //     title: 'Product',
  //     toaster: 'b-toaster-bottom-right',
  //     variant: 'success'
  //   });
  //   this.resetProduct();
  // }

  submit(): void {
    this.$refs.formRules.validate().then((success) => {
      if (success) {
        if (this.product) {
          // this.edit({ name: this.input.name } as EditProductInput);
        } else {
          this.add(this.input.name, this.input.description);
        }
      }
    });
  }

  resetProduct(): void {
    this.setProduct(null);
  }

  snowOption = {
    theme: 'snow'
  };
}
