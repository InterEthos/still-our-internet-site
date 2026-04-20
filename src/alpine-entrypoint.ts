import type { Alpine } from 'alpinejs';

export default (Alpine: Alpine) => {
  const validTabs = ['anyone', 'engineers', 'thinkers', 'creators', 'supporters', 'humans'];
  const urlTab = new URLSearchParams(window.location.search).get('for');
  const initialTab = urlTab && validTabs.includes(urlTab) ? urlTab : 'anyone';

  Alpine.data('homeTab', () => ({
    tab: initialTab,
    hoverTab: null,
    panelHeight: 0,
    activeLeft: 0,
    activeWidth: 0,
    activeTop: 0,
    activeHeight: 0,
    lavalampLeft: 0,
    lavalampWidth: 0,
    lavalampTop: 0,
    lavalampHeight: 0,
    lavalampReady: false,

    init() {
      this.$nextTick(() => {
        this.resetLavalamp();
        this.snapActive();
        this.measurePanel();
        setTimeout(() => {
          this.resetLavalamp();
          this.snapActive();
          this.lavalampReady = true;
        }, 100);
      });
      window.addEventListener('resize', () => {
        this.measurePanel();
        this.snapActive();
        this.resetLavalamp();
      });
    },

    measurePanel() {
      const panel = this.$refs.panelContent
        ?.querySelector("[role='tabpanel']:not([style*='display: none'])");
      if (panel) this.panelHeight = panel.scrollHeight;
    },

    moveLavalamp(el: HTMLElement, id?: string) {
      const bar = this.$refs.tabBar.getBoundingClientRect();
      const btn = el.getBoundingClientRect();
      this.lavalampLeft = btn.left - bar.left;
      this.lavalampWidth = btn.width;
      this.lavalampTop = btn.top - bar.top;
      this.lavalampHeight = btn.height;
      if (id) this.hoverTab = id;
    },

    findActive() {
      return this.$refs.tabBar.querySelector("[aria-selected='true']")
        || this.$refs.tabBar.querySelector('.tab-button');
    },

    resetLavalamp() {
      this.hoverTab = null;
      const active = this.findActive();
      if (active) {
        const bar = this.$refs.tabBar.getBoundingClientRect();
        const btn = active.getBoundingClientRect();
        this.lavalampLeft = btn.left - bar.left;
        this.lavalampWidth = btn.width;
        this.lavalampTop = btn.top - bar.top;
        this.lavalampHeight = btn.height;
      }
    },

    snapActive() {
      const active = this.findActive();
      if (active) {
        const bar = this.$refs.tabBar.getBoundingClientRect();
        const btn = active.getBoundingClientRect();
        this.activeLeft = btn.left - bar.left;
        this.activeWidth = btn.width;
        this.activeTop = btn.top - bar.top;
        this.activeHeight = btn.height;
      }
    },

    selectTab(id: string, el: HTMLElement) {
      this.tab = id;
      const url = new URL(window.location.href);
      if (id === 'anyone') {
        url.searchParams.delete('for');
      } else {
        url.searchParams.set('for', id);
      }
      history.replaceState(null, '', url.toString());
      this.$nextTick(() => {
        this.moveLavalamp(el);
        this.snapActive();
        this.measurePanel();
      });
    },
  }));
};
