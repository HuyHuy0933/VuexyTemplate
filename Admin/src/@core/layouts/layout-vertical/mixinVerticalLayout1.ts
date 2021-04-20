import { $themeBreakpoints } from '@/core/theme-config';
import { AppState } from '@/store/app/app.module-types';
import store from '@/store';

const mixinVerticalLayout = {
  watch: {
    $route() {
      if (store.state[AppState.windowWidth] < $themeBreakpoints.xl) {
        this.isVerticalMenuActive = false;
      }
    }
  }
};

export default mixinVerticalLayout;
