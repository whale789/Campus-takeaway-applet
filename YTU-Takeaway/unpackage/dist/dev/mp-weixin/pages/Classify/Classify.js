"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      viewclass: null
    };
  },
  // components:{
  // 	componentA
  // },
  onLoad(opt) {
    this.viewclass = common_vendor.index.getSystemInfoSync().windowHeight;
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s("height:" + this.viewclass + "px")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway/pages/Classify/Classify.vue"]]);
wx.createPage(MiniProgramPage);
