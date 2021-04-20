import { Vue, Component, Watch } from 'vue-property-decorator';
import {
  BButton,
  BModal,
  BForm,
  BFormInput,
  BFormGroup,
  BFormTextarea
} from 'bootstrap-vue';
import {
  ValidationProvider,
  ValidationObserver
} from 'vee-validate/dist/vee-validate.full';
import { SettingViewModel, EditSettingInput } from '@/api/api';
import ApiClientFactory from '@/api/apiClientFactory';
import {
  SettingAction,
  SettingGetter,
  settingNamespace
} from '@/store/setting/setting.module-types';
import { dispatchSettingAction } from '@/store/setting/setting.dispatch';
import store from '@/store';
import { settingListDispatcher } from '@/views/setting/settingList/store/setting-list.module';
import CustomLabel from '@/components/labels/CustomLabel.vue';

@Component({
  components: {
    BFormGroup,
    BFormInput,
    BButton,
    BModal,
    BForm,
    BFormTextarea,
    ValidationProvider,
    ValidationObserver,
    CustomLabel
  }
})
export default class SettingFormModal extends Vue {
  @settingNamespace.Getter(SettingGetter.setting)
  setting!: SettingViewModel;

  input: EditSettingInput = this.getDefaultInputValue();

  $refs!: {
    formRules: InstanceType<typeof ValidationProvider>;
    modal: InstanceType<typeof BModal>;
  };

  @Watch('setting')
  settingUpdated(): void {
    if (this.setting) {
      this.input = new EditSettingInput({
        name: this.setting.name,
        settingValue: this.setting.settingValue
      });
    } else {
      this.input = this.getDefaultInputValue();
    }
  }

  async openEditModal(id: number): Promise<void> {
    dispatchSettingAction(SettingAction.loadSetting, id);
    this.$refs.modal.show();
  }

  getDefaultInputValue(): EditSettingInput {
    return new EditSettingInput({
      name: '',
      settingValue: ''
    });
  }

  edit(id: number, input: EditSettingInput) {
    const client = new ApiClientFactory().settingClient();
    client.edit(id, input).then(() => {
      settingListDispatcher.load();
      this.$refs.modal.hide();
      // show toast
      this.$bvToast.toast('Setting Edited', {
        title: 'Setting',
        toaster: 'b-toaster-bottom-right',
        variant: 'success'
      });
    });
  }

  submit(): void {
    this.$refs.formRules.validate().then((success) => {
      if (success) {
        if (this.setting) {
          this.edit(this.setting.id, this.input);
        }
      }
    });
  }
}
