import { Vue, Component, Prop } from 'vue-property-decorator';
import { BPagination, BFormSelect } from 'bootstrap-vue';
@Component({
  components: {
    BFormSelect,
    BPagination
  }
})
export default class Pagination extends Vue {
  @Prop({ required: true })
  itemsPerPageOptions!: number[];

  @Prop({ required: true })
  itemsPerPage!: number[];

  @Prop({ required: true })
  page!: number[];

  @Prop({ required: true })
  totalRows!: number[];

  itemPerPageChange(value: number) {
    this.$emit('items-per-page-change', value);
  }

  pageChange(value: number) {
    this.$emit('page-change', value);
  }
}
