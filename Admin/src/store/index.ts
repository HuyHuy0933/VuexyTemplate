import Vue from 'vue';
import Vuex from 'vuex';
import { categoryModule } from './category/category.module';
import { CATEGORY_STATE_NAMESPACE } from './category/category.module-types';
// Modules
import { appModule } from './app/app.module';
import { APP_STATE_NAMESPACE } from './app/app.module-types';
import { appConfigModule } from './app-config/app-config.module';
import { APP_CONFIG_STATE_NAMESPACE } from './app-config/app-config.module-types';
import { verticalMenuModule } from './vertical-menu/vertical-menu.module';
import { VERTICAL_MENU_STATE_NAMESPACE } from './vertical-menu/vertical-menu.module-types';
import {
  categoryListModule,
  CATEGORY_LIST_STATE_NAMESPACE
} from '@/views/category/categoryList/store/category-list.module';
import {
  productListModule,
  PRODUCT_LIST_STATE_NAMESPACE
} from '@/views/product/productList/store/product-list.module';
import { productModule } from './product/product.module';
import { PRODUCT_STATE_NAMESPACE } from './product/product.module-types';
import {
  settingListModule,
  SETTING_LIST_STATE_NAMESPACE
} from '@/views/setting/settingList/store/setting-list.module';
import { settingModule } from './setting/setting.module';
import { SETTING_STATE_NAMESPACE } from './setting/setting.module-types';
import {
  shapeListModule,
  SHAPE_LIST_STATE_NAMESPACE
} from '@/views/shape/shapeList/store/shape-list.module';
import { shapeModule } from './shape/shape.module';
import { SHAPE_STATE_NAMESPACE } from './shape/shape.module-types';
import {
  productCategoryListModule,
  PRODUCT_CATEGORY_LIST_STATE_NAMESPACE
} from '@/views/productCategory/productCategoryList/store/productCategory-list.module';
import { productCategoryModule } from './productCategory/productCategory.module';
import { PRODUCT_CATEGORY_STATE_NAMESPACE } from './productCategory/productCategory.module-types';
import {
  contentPageListModule,
  CONTENT_PAGE_LIST_STATE_NAMESPACE
} from '@/views/contentPage/contentPageList/store/content-page-list.module';
import { CONTENT_PAGE_STATE_NAMESPACE } from './contentPage/content-page.module-types';
import { contentPageModule } from './contentPage/content-page.module';
import {
  decalPriceListModule,
  DECAL_PRICE_LIST_STATE_NAMESPACE
} from '@/views/decalPrice/decalPriceList/store/decal-price-list.module';
import { DECAL_PRICE_STATE_NAMESPACE } from './decalPrice/decal-price.module-types';
import { decalPriceModule } from './decalPrice/decal-price.module';
import {
  blogListModule,
  BLOG_LIST_STATE_NAMESPACE
} from '@/views/blog/blogList/store/blog-list.module';
import { BLOG_STATE_NAMESPACE } from './blog/blog.module-types';
import { blogModule } from './blog/blog.module';
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    [CATEGORY_STATE_NAMESPACE]: categoryModule,
    [CATEGORY_LIST_STATE_NAMESPACE]: categoryListModule,
    [PRODUCT_LIST_STATE_NAMESPACE]: productListModule,
    [PRODUCT_STATE_NAMESPACE]: productModule,
    [SETTING_LIST_STATE_NAMESPACE]: settingListModule,
    [SETTING_STATE_NAMESPACE]: settingModule,
    [SHAPE_LIST_STATE_NAMESPACE]: shapeListModule,
    [SHAPE_STATE_NAMESPACE]: shapeModule,
    [PRODUCT_CATEGORY_LIST_STATE_NAMESPACE]: productCategoryListModule,
    [PRODUCT_CATEGORY_STATE_NAMESPACE]: productCategoryModule,
    [DECAL_PRICE_LIST_STATE_NAMESPACE]: decalPriceListModule,
    [DECAL_PRICE_STATE_NAMESPACE]: decalPriceModule,
    [BLOG_LIST_STATE_NAMESPACE]: blogListModule,
    [BLOG_STATE_NAMESPACE]: blogModule,
    [APP_STATE_NAMESPACE]: appModule,
    [APP_CONFIG_STATE_NAMESPACE]: appConfigModule,
    [VERTICAL_MENU_STATE_NAMESPACE]: verticalMenuModule,
    [CONTENT_PAGE_STATE_NAMESPACE]: contentPageModule,
    [CONTENT_PAGE_LIST_STATE_NAMESPACE]: contentPageListModule
  }
});

export default store;
