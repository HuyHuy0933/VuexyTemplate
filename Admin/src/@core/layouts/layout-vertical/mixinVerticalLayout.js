import { $themeBreakpoints } from '@themeConfig';

export default {
  watch: {
    $route() {
      if (this.$store.state.AppState.windowWidth < $themeBreakpoints.xl) {
        this.isVerticalMenuActive = false;
      }
    }
  }
};
