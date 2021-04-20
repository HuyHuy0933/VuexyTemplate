import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class CustomLabel extends Vue {
  @Prop()
  public required!: boolean;
  @Prop({ required: true })
  public text!: string;
  @Prop()
  public forLabel!: string;
}
