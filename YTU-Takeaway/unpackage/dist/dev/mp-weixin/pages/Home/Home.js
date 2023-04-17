"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      info: [
        { content: "内容 A" },
        { content: "内容 B" },
        { content: "内容 C" }
      ],
      current: 0,
      mode: "round",
      dotsStyles: {
        backgroundColor: "rgba(83, 200, 249,0.3)",
        border: "1px rgba(83, 200, 249,0.3) solid",
        color: "#fff",
        selectedBackgroundColor: "rgba(83, 200, 249,0.9)",
        selectedBorder: "1px rgba(83, 200, 249,0.9) solid"
      },
      avatar: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
      title: "山西刀削面"
    };
  },
  methods: {
    change(e) {
      this.current = e.detail.current;
    }
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_search_bar2 + _easycom_uni_swiper_dot2 + _easycom_uni_icons2 + _easycom_uni_card2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_swiper_dot = () => "../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_swiper_dot + _easycom_uni_icons + _easycom_uni_card)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(_ctx.search),
    b: common_vendor.p({
      placeholder: "请输入商家或者产品名称",
      bgColor: "#ffffff"
    }),
    c: common_vendor.f($data.info, (item, index, i0) => {
      return {
        a: common_vendor.t(item.content),
        b: index
      };
    }),
    d: common_vendor.o((...args) => $options.change && $options.change(...args)),
    e: common_vendor.p({
      info: $data.info,
      current: $data.current,
      field: "content",
      mode: $data.mode,
      ["dots-styles"]: $data.dotsStyles
    }),
    f: common_vendor.p({
      type: "star-filled",
      size: "15",
      color: "#ffaa00"
    }),
    g: common_vendor.o(_ctx.onClick),
    h: common_vendor.p({
      ["is-shadow"]: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway/pages/Home/Home.vue"]]);
wx.createPage(MiniProgramPage);
