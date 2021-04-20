import { Vue, Component, Watch } from 'vue-property-decorator';
import {
  BButton,
  BModal,
  BForm,
  BFormInput,
  BFormGroup,
  BFormFile,
  BFormTextarea,
  BFormSelect
} from 'bootstrap-vue';
import {
  ValidationProvider,
  ValidationObserver
} from 'vee-validate/dist/vee-validate.full';
import { DecalPriceViewModel } from '@/api/api';
import ApiClientFactory from '@/api/apiClientFactory';
import {
  DecalPriceAction,
  DecalPriceGetter,
  decalPriceNamespace
} from '@/store/decalPrice/decal-price.module-types';
import { dispatchDecalPriceAction } from '@/store/decalPrice/decal-price.dispatch';
import { decalPriceListDispatcher } from '@/views/decalPrice/decalPriceList/store/decal-price-list.module';
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
    CustomLabel,
    ValidationProvider,
    ValidationObserver
  }
})
export default class DecalPriceFormModal extends Vue {
  @decalPriceNamespace.Getter(DecalPriceGetter.decalPrice)
  decalPrice!: DecalPriceViewModel;

  input = this.getDefaultInputValue();

  VUE_APP_API_BASE_HOST = process.env.VUE_APP_API_BASE_HOST;
  URL = URL;

  $refs!: {
    formRules: InstanceType<typeof ValidationProvider>;
    modal: InstanceType<typeof BModal>;
  };

  @Watch('decalPrice')
  decalPriceUpdated(): void {
    if (this.decalPrice) {
      this.input = {
        description: this.decalPrice.description as string,
        quantity: this.decalPrice.quantity,
        printPrice: this.decalPrice.printPrice,
        machiningPrice: this.decalPrice.machiningPrice,
        cutPrice: this.decalPrice.cutPrice
      };
    } else {
      this.input = this.getDefaultInputValue();
    }
  }

  async openEditModal(id: number): Promise<void> {
    dispatchDecalPriceAction(DecalPriceAction.loadDecalPrice, id);
    this.$refs.modal.show();
  }

  getDefaultInputValue() {
    return {
      description: '',
      quantity: 0,
      printPrice: 0,
      machiningPrice: 0,
      cutPrice: 0
    };
  }

  edit() {
    const client = new ApiClientFactory().decalPriceClient();

    client
      .edit(
        this.decalPrice.id,
        this.input.description,
        this.input.quantity,
        this.input.printPrice,
        this.input.cutPrice,
        this.input.machiningPrice
      )
      .then(() => {
        decalPriceListDispatcher.load();
        this.$refs.modal.hide();
        // show toast
        this.$bvToast.toast('Chỉnh sửa thành công', {
          title: 'Chi phí in, bế, gia công',
          toaster: 'b-toaster-bottom-right',
          variant: 'success'
        });
      });
  }

  submit(): void {
    this.$refs.formRules.validate().then((success) => {
      if (success) {
        if (this.decalPrice) {
          this.edit();
        }
      }
    });
  }
}
