"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      current: 0,
      items: ["学生", "商家"]
    };
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_list_chat2 = common_vendor.resolveComponent("uni-list-chat");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_segmented_control2 + _easycom_uni_list_chat2 + _easycom_uni_list2)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_list_chat = () => "../../uni_modules/uni-list/components/uni-list-chat/uni-list-chat.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_list_chat + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.onClickItem),
    b: common_vendor.p({
      current: $data.current,
      values: $data.items,
      ["style-type"]: "text",
      ["active-color"]: "#007aff"
    }),
    c: $data.current === 0
  }, $data.current === 0 ? {
    d: common_vendor.p({
      title: "uni-app",
      avatar: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
      note: "您收到一条新的消息",
      time: "2020-02-02 20:20"
    }),
    e: common_vendor.p({
      title: "uni-app",
      avatar: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
      note: "您收到一条新的消息",
      time: "2020-02-02 20:20"
    }),
    f: common_vendor.p({
      border: true
    })
  } : {}, {
    g: $data.current === 1
  }, $data.current === 1 ? {
    h: common_vendor.p({
      title: "uni-app",
      avatar: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
      note: "您收到一条新的消息",
      time: "2020-02-02 20:20"
    }),
    i: common_vendor.p({
      title: "uni-app",
      avatar: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
      note: "您收到一条新的消息",
      time: "2020-02-02 20:20"
    }),
    j: common_vendor.p({
      border: true
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway-Manage/pages/Users/Users.vue"]]);
wx.createPage(MiniProgramPage);
