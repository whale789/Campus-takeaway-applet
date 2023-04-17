"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      value: 1,
      ListMessgae: [
        {
          UserAvater: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
          UserChatName: "Imaginaries",
          LastMessage: "大约什么时候送到",
          ChatingTime: "16:15"
        },
        {
          UserAvater: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
          UserChatName: "Imaginarie",
          LastMessage: "餐以送达",
          ChatingTime: "17:55"
        }
      ]
    };
  },
  methods: {}
};
if (!Array) {
  const _easycom_uni_list_chat2 = common_vendor.resolveComponent("uni-list-chat");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_chat2 + _easycom_uni_list2)();
}
const _easycom_uni_list_chat = () => "../../uni_modules/uni-list/components/uni-list-chat/uni-list-chat.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_chat + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.ListMessgae, (item, index, i0) => {
      return {
        a: "5e6d123c-1-" + i0 + ",5e6d123c-0",
        b: common_vendor.p({
          ["avatar-circle"]: true,
          title: item.UserChatName,
          avatar: item.UserAvater,
          note: item.LastMessage,
          time: item.ChatingTime,
          ["badge-positon"]: "right",
          ["badge-text"]: "99",
          clickable: true
        }),
        c: index
      };
    }),
    b: common_vendor.p({
      border: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway-Merchant/pages/Message/Message.vue"]]);
wx.createPage(MiniProgramPage);
