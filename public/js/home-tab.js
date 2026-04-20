window.homeTab = function() {
  return {
    tab: "anyone",
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

    init: function() {
      var self = this;
      this.$nextTick(function() {
        self.resetLavalamp();
        self.snapActive();
        self.measurePanel();
        setTimeout(function() {
          self.resetLavalamp();
          self.snapActive();
          self.lavalampReady = true;
        }, 100);
      });
      window.addEventListener("resize", function() {
        self.measurePanel();
        self.snapActive();
        self.resetLavalamp();
      });
    },

    measurePanel: function() {
      var panel = this.$refs.panelContent
        && this.$refs.panelContent.querySelector("[role='tabpanel']:not([style*='display: none'])");
      if (panel) this.panelHeight = panel.scrollHeight;
    },

    moveLavalamp: function(el, id) {
      var bar = this.$refs.tabBar.getBoundingClientRect();
      var btn = el.getBoundingClientRect();
      this.lavalampLeft = btn.left - bar.left;
      this.lavalampWidth = btn.width;
      this.lavalampTop = btn.top - bar.top;
      this.lavalampHeight = btn.height;
      if (id) this.hoverTab = id;
    },

    findActive: function() {
      return this.$refs.tabBar.querySelector("[aria-selected='true']")
        || this.$refs.tabBar.querySelector(".tab-button");
    },

    resetLavalamp: function() {
      this.hoverTab = null;
      var active = this.findActive();
      if (active) {
        var bar = this.$refs.tabBar.getBoundingClientRect();
        var btn = active.getBoundingClientRect();
        this.lavalampLeft = btn.left - bar.left;
        this.lavalampWidth = btn.width;
        this.lavalampTop = btn.top - bar.top;
        this.lavalampHeight = btn.height;
      }
    },

    snapActive: function() {
      var active = this.findActive();
      if (active) {
        var bar = this.$refs.tabBar.getBoundingClientRect();
        var btn = active.getBoundingClientRect();
        this.activeLeft = btn.left - bar.left;
        this.activeWidth = btn.width;
        this.activeTop = btn.top - bar.top;
        this.activeHeight = btn.height;
      }
    },

    selectTab: function(id, el) {
      this.tab = id;
      var self = this;
      this.$nextTick(function() {
        self.moveLavalamp(el);
        self.snapActive();
        self.measurePanel();
      });
    }
  };
};
