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
import { ShapeViewModel, FileParameter, ShapeStatus } from '@/api/api';
import ApiClientFactory from '@/api/apiClientFactory';
import {
  ShapeAction,
  ShapeGetter,
  shapeNamespace
} from '@/store/shape/shape.module-types';
import { dispatchShapeAction } from '@/store/shape/shape.dispatch';
import { shapeListDispatcher } from '@/views/shape/shapeList/store/shape-list.module';
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
export default class ShapeFormModal extends Vue {
  @shapeNamespace.Getter(ShapeGetter.shape)
  shape!: ShapeViewModel;

  input = this.getDefaultInputValue();

  VUE_APP_API_BASE_HOST = process.env.VUE_APP_API_BASE_HOST;
  URL = URL;
  shapeStatus: DropdownOption[] = enumToDropdownOptions(ShapeStatus);

  $refs!: {
    formRules: InstanceType<typeof ValidationProvider>;
    modal: InstanceType<typeof BModal>;
  };

  @Watch('shape')
  shapeUpdated(): void {
    if (this.shape) {
      this.input = {
        image: null,
        name: this.shape.name as string,
        status: this.shape.status as ShapeStatus,
        description: this.shape.description as string
      };
    } else {
      this.input = this.getDefaultInputValue();
    }
  }

  openCreateModal(): void {
    console.log(this.shapeStatus);
    dispatchShapeAction(ShapeAction.clearShape);
    this.input = this.getDefaultInputValue();
    this.$refs.modal.show();
  }

  async openEditModal(id: number): Promise<void> {
    dispatchShapeAction(ShapeAction.loadShape, id);
    this.$refs.modal.show();
  }

  getDefaultInputValue() {
    return {
      name: '',
      image: null,
      status: ShapeStatus.Active,
      description: ''
    };
  }

  add(): void {
    const client = new ApiClientFactory().shapeClient();
    const image: FileParameter = {
      data: this.input.image,
      fileName: (this.input.image as any).name
    };

    client
      .create(this.input.name, this.input.status, this.input.description, image)
      .then(() => {
        shapeListDispatcher.load();
        this.$refs.modal.hide();
        // show toast
        this.$bvToast.toast('Thêm mới thành công', {
          title: 'Mẫu khuôn bế',
          toaster: 'b-toaster-bottom-right',
          variant: 'success'
        });
      });
  }

  edit() {
    const client = new ApiClientFactory().shapeClient();
    const image: FileParameter | null = this.input.image
      ? {
          data: this.input.image,
          fileName: (this.input.image as any).name
        }
      : null;

    client
      .edit(
        this.shape.id,
        this.input.name,
        this.input.status,
        this.input.description,
        image
      )
      .then(() => {
        shapeListDispatcher.load();
        this.$refs.modal.hide();
        // show toast
        this.$bvToast.toast('Chỉnh sửa thành công', {
          title: 'Mẫu khuôn bế',
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
        if (this.shape) {
          this.edit();
        } else {
          this.add();
        }
      }
    });
  }
}
