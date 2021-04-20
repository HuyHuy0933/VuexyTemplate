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
  BlogNamespace,
  BlogGetter,
  BlogAction
} from '@/store/blog/blog.module-types';
import { BlogViewModel, FileParameter } from '@/api/api';
import { dispatchBlogAction } from '@/store/blog/blog.dispatch';
import { blogListDispatcher } from '../blogList/store/blog-list.module';
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
export default class BlogForm extends Vue {
  @BlogNamespace.Getter(BlogGetter.blog)
  blog!: BlogViewModel;

  input = this.getDefaultInputValue();

  blogId = '';
  VUE_APP_API_BASE_HOST = process.env.VUE_APP_API_BASE_HOST;
  URL = URL;
  $refs!: {
    formRules: InstanceType<typeof ValidationProvider>;
  };

  mounted() {
    this.blogId = this.$route.params.id;
  }

  @Watch('blogId')
  getBlogById(): void {
    if (this.blogId) {
      dispatchBlogAction(BlogAction.loadBlog, parseInt(this.blogId));
    }
  }

  @Watch('blog')
  blogUpdated(): void {
    if (this.blog) {
      this.input = {
        title: this.blog.title as string,
        image: null,
        description: this.blog.description as string,
        content: this.blog.content as string,
        seoUrl: this.blog.seoUrl as string,
        metaTitle: this.blog.metaTitle as string,
        metaDescription: this.blog.metaDescription as string
      };
    } else {
      this.input = this.getDefaultInputValue();
    }
  }

  getDefaultInputValue() {
    return {
      title: '',
      content: '',
      image: null,
      description: '',
      seoUrl: '',
      metaTitle: '',
      metaDescription: ''
    };
  }

  add(): void {
    const client = new ApiClientFactory().blogClient();
    const image: FileParameter = {
      data: this.input.image,
      fileName: (this.input.image as any).name
    };

    client
      .create(
        this.input.title,
        this.input.description,
        image,
        this.input.content,
        this.input.seoUrl,
        this.input.metaDescription,
        this.input.metaTitle
      )
      .then(() => {
        blogListDispatcher.load();
        // show toast
        this.$bvToast.toast('Thêm mới thành công', {
          title: 'Quản lý tin tức',
          toaster: 'b-toaster-bottom-right',
          variant: 'success'
        });

        router.push({ path: '/blog-list' });
      });
  }

  edit() {
    const client = new ApiClientFactory().blogClient();
    const image: FileParameter | null = this.input.image
      ? {
          data: this.input.image,
          fileName: (this.input.image as any).name
        }
      : null;

    client
      .edit(
        this.blog.id,
        this.input.title,
        this.input.description,
        image,
        this.input.content,
        this.input.seoUrl,
        this.input.metaDescription,
        this.input.metaTitle
      )
      .then(() => {
        blogListDispatcher.load();
        // show toast
        this.$bvToast.toast('Chỉnh sửa thành công', {
          title: 'Quản lý tin tức',
          toaster: 'b-toaster-bottom-right',
          variant: 'success'
        });

        router.push({ path: '/blog-list' });
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
        if (this.blog) {
          this.edit();
        } else {
          this.add();
        }
      }
    });
  }
}
