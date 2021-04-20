import axios, { AxiosInstance } from 'axios';
import {
  CategoryClient,
  ContentPageClient,
  ProductCategoryClient,
  ProductClient,
  SettingClient,
  ShapeClient,
  DecalPriceClient,
  BlogClient
} from './api';

const API_URL = `${process.env.VUE_APP_API_BASE_HOST}`;

export default class ApiClientFactory {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create();
  }

  categoryClient = () => new CategoryClient(API_URL, this.axiosClient);
  productClient = () => new ProductClient(API_URL, this.axiosClient);
  settingClient = () => new SettingClient(API_URL, this.axiosClient);
  shapeClient = () => new ShapeClient(API_URL, this.axiosClient);
  productCategoryClient = () =>
    new ProductCategoryClient(API_URL, this.axiosClient);
  contentPageClient = () => new ContentPageClient(API_URL, this.axiosClient);
  decalPriceClient = () => new DecalPriceClient(API_URL, this.axiosClient);
  blogClient = () => new BlogClient(API_URL, this.axiosClient);
}
