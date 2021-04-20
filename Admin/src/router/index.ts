import Vue from 'vue';
import VueRouter from 'vue-router';
// Routes
import { canNavigate } from '@/libs/acl/routeProtection';
import {
  isUserLoggedIn,
  getUserData,
  getHomeRouteForLoggedInUser
} from '@/auth/utils';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '',
      name: 'category-list',
      component: () => import('@/views/category/categoryList/CategoryList.vue')
    },
    {
      path: '/shape-list',
      name: 'shape-list',
      component: () => import('@/views/shape/shapeList/ShapeList.vue')
    },
    {
      path: '/product-category-list',
      name: 'product-category-list',
      component: () =>
        import(
          '@/views/productCategory/productCategoryList/ProductCategoryList.vue'
        )
    },
    {
      path: '/product-list',
      name: 'product',
      component: () => import('@/views/product/productList/ProductList.vue')
    },
    {
      path: '/product-form/:id?',
      name: 'product',
      component: () => import('@/views/product/productForm/ProductForm.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('@/views/setting/settingList/SettingList.vue')
    },
    {
      path: '/content-page-form/:id?',
      name: 'content-page',
      component: () =>
        import('@/views/contentPage/contentPageForm/ContentPageForm.vue')
    },
    {
      path: '/content-page-list',
      name: 'content-page',
      component: () =>
        import('@/views/contentPage/contentPageList/ContentPageList.vue')
    },
    {
      path: '/decal-price-list',
      name: 'decal-price',
      component: () =>
        import('@/views/decalPrice/decalPriceList/DecalPriceList.vue')
    },
    {
      path: '/blog-list',
      name: 'blog',
      component: () => import('@/views/blog/blogList/BlogList.vue')
    },
    {
      path: '/blog-form/:id?',
      name: 'blog',
      component: () => import('@/views/blog/blogForm/BlogForm.vue')
    },
    {
      path: '*',
      redirect: 'error-404'
    }
  ]
});

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn();

  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({ name: 'auth-login' });

    // If logged in => not authorized
    return next({ name: 'misc-not-authorized' });
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const userData = getUserData();
    next(getHomeRouteForLoggedInUser(userData ? userData.role : null));
  }

  return next();
});

export default router;
