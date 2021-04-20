import { computed, watch } from '@vue/composition-api';
import store from '@/store';

export default function usAppConfig() {
  // ------------------------------------------------
  // isVerticalMenuCollapsed
  // ------------------------------------------------
  const isVerticalMenuCollapsed = computed({
    get: () => store.state.VerticalMenuState.isVerticalMenuCollapsed,
    set: (val) => {
      store.commit('VerticalMenuState/updateVerticalMenuCollapse', val);
    }
  });

  // ------------------------------------------------
  // RTL
  // ------------------------------------------------
  const isRTL = computed({
    get: () => store.state.AppConfigState.layout.isRTL,
    set: (val) => {
      store.commit('AppConfigState/toggleRTL', val);
    }
  });

  // ------------------------------------------------
  // Skin
  // ------------------------------------------------
  const skin = computed({
    get: () => store.state.AppConfigState.layout.skin,
    set: (val) => {
      store.commit('AppConfigState/updateSkin', val);
    }
  });

  const skinClasses = computed(() => {
    if (skin.value === 'bordered') return 'bordered-layout';
    if (skin.value === 'semi-dark') return 'semi-dark-layout';

    // Do not return any class for dark layout because dark layout updates class in body
    // Do not return any class for light layout as that is default layout
    return null;
  });

  // ------------------------------------------------
  // routerTransition
  // ------------------------------------------------
  const routerTransition = computed({
    get: () => store.state.AppConfigState.layout.routerTransition,
    set: (val) => {
      store.commit('AppConfigState/updateRouteTransition', val);
    }
  });

  // *===============================================---*
  // *--------- LAYOUT ---------------------------------------*
  // *===============================================---*

  // ------------------------------------------------
  // layoutType
  // ------------------------------------------------

  const layoutType = computed({
    get: () => store.state.AppConfigState.layout.type,
    set: (val) => {
      store.commit('AppConfigState/updateLayoutType', val);
    }
  });

  // Reset skin if skin is semi-dark and move to horizontal layout
  watch(layoutType, (val) => {
    if (val === 'horizontal' && skin.value === 'semi-dark')
      skin.value = 'light';
  });

  // ------------------------------------------------
  // Content Width (Full/Boxed)
  // ------------------------------------------------
  const contentWidth = computed({
    get: () => store.state.AppConfigState.layout.contentWidth,
    set: (val) => {
      store.commit('AppConfigState/updateContentWidth', val);
    }
  });

  // ------------------------------------------------
  // isNavMenuHidden
  // ------------------------------------------------
  const isNavMenuHidden = computed({
    get: () => store.state.AppConfigState.layout.menu.hidden,
    set: (val) => {
      store.commit('AppConfigState/updateNavMenuHidden', val);
    }
  });

  // *===============================================---*
  // *--------- NAVBAR ---------------------------------------*
  // *===============================================---*

  const navbarBackgroundColor = computed({
    get: () => store.state.AppConfigState.layout.navbar.backgroundColor,
    set: (val) => {
      store.commit('AppConfigState/updateNavBarConfig', {
        backgroundColor: val
      });
    }
  });

  const navbarType = computed({
    get: () => store.state.AppConfigState.layout.navbar.type,
    set: (val) => {
      store.commit('AppConfigState/updateNavBarConfig', { type: val });
    }
  });

  // *===============================================---*
  // *--------- FOOTER ---------------------------------------*
  // *===============================================---*

  const footerType = computed({
    get: () => store.state.AppConfigState.layout.footer.type,
    set: (val) => {
      store.commit('AppConfigState/updateFooterConfig', { type: val });
    }
  });

  return {
    isVerticalMenuCollapsed,
    isRTL,
    skin,
    skinClasses,
    routerTransition,

    // Navbar
    navbarBackgroundColor,
    navbarType,

    // Footer
    footerType,

    // Layout
    layoutType,
    contentWidth,
    isNavMenuHidden
  };
}
