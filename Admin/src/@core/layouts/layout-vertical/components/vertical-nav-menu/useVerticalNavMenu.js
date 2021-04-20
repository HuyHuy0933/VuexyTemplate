import { ref, computed } from '@vue/composition-api';
import store from '../../../../../store';

export default function useVerticalNavMenu(props) {
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
  // collapseTogglerIcon
  // ------------------------------------------------
  const collapseTogglerIcon = computed(() => {
    if (props.isVerticalMenuActive) {
      return isVerticalMenuCollapsed.value ? 'unpinned' : 'pinned';
    }
    return 'close';
  });

  const isMouseHovered = ref(false);

  const updateMouseHovered = (val) => {
    isMouseHovered.value = val;
  };

  const toggleCollapsed = () => {
    isVerticalMenuCollapsed.value = !isVerticalMenuCollapsed.value;
  };

  return {
    isMouseHovered,
    isVerticalMenuCollapsed,
    collapseTogglerIcon,
    toggleCollapsed,
    updateMouseHovered
  };
}
