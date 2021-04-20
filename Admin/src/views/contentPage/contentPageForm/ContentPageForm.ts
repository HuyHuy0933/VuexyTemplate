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
  ContentPageNamespace,
  ContentPageGetter,
  ContentPageAction
} from '@/store/contentPage/content-page.module-types';
import { ContentPageViewModel, EditContentPageInput } from '@/api/api';
import { dispatchContentPageAction } from '@/store/contentPage/content-page.dispatch';
import { contentPageListDispatcher } from '../contentPageList/store/content-page-list.module';
import ApiClientFactory from '@/api/apiClientFactory';
import { quillEditor } from 'vue-quill-editor';
import { CreateContentPageInput } from '@/api/api';
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
export default class ContentPageForm extends Vue {
  @ContentPageNamespace.Getter(ContentPageGetter.contentPage)
  contentPage!: ContentPageViewModel;

  input:
    | CreateContentPageInput
    | EditContentPageInput = this.getDefaultInputValue();

  contentPageId = '';

  $refs!: {
    formRules: InstanceType<typeof ValidationProvider>;
  };

  mounted() {
    this.contentPageId = this.$route.params.id;
  }

  @Watch('contentPageId')
  getContentPageById(): void {
    if (this.contentPageId) {
      dispatchContentPageAction(
        ContentPageAction.loadContentPage,
        parseInt(this.contentPageId)
      );
    }
  }

  @Watch('contentPage')
  contentPageUpdated(): void {
    if (this.contentPage) {
      debugger;
      this.input = new EditContentPageInput({
        title: this.contentPage.title as string,
        content: this.contentPage.content as string,
        seoUrl: this.contentPage.seoUrl as string,
        metaTitle: this.contentPage.metaTitle as string,
        metaDescription: this.contentPage.metaDescription as string
      });
    } else {
      this.input = this.getDefaultInputValue();
    }
  }

  getDefaultInputValue() {
    return new CreateContentPageInput({
      title: '',
      content: '',
      seoUrl: '',
      metaTitle: '',
      metaDescription: ''
    });
  }

  add(): void {
    const client = new ApiClientFactory().contentPageClient();
    client.create(this.input).then(() => {
      contentPageListDispatcher.load();
      // show toast
      this.$bvToast.toast('Thêm mới thành công', {
        title: 'Sản phẩm in',
        toaster: 'b-toaster-bottom-right',
        variant: 'success'
      });

      router.push({ path: '/content-page-list' });
    });
  }

  edit() {
    const client = new ApiClientFactory().contentPageClient();

    client.edit(Number(this.contentPageId), this.input).then(() => {
      contentPageListDispatcher.load();
      // show toast
      this.$bvToast.toast('Chỉnh sửa thành công', {
        title: 'Trang thông tin',
        toaster: 'b-toaster-bottom-right',
        variant: 'success'
      });
    });
  }

  submit(): void {
    this.$refs.formRules.validate().then((success) => {
      if (success) {
        if (this.contentPage) {
          this.edit();
        } else {
          this.add();
        }
      }
    });
  }
}
