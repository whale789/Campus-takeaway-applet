"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      imageStyles: {
        width: 80,
        height: 80,
        border: {
          radius: "50%"
        }
      }
    };
  }
};
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_file_picker2 + _easycom_uni_icons2)();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_file_picker + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      limit: "1",
      ["del-icon"]: false,
      ["disable-preview"]: "false",
      imageStyles: $data.imageStyles,
      ["file-mediatype"]: "image"
    }),
    b: common_vendor.p({
      type: "compose"
    }),
    c: common_vendor.p({
      type: "location",
      size: "20"
    }),
    d: common_vendor.p({
      type: "forward"
    }),
    e: common_vendor.p({
      type: "star",
      size: "20"
    }),
    f: common_vendor.p({
      type: "forward"
    }),
    g: common_vendor.p({
      type: "list",
      size: "20"
    }),
    h: common_vendor.p({
      type: "forward"
    }),
    i: common_vendor.p({
      type: "chat",
      size: "20"
    }),
    j: common_vendor.p({
      type: "forward"
    }),
    k: common_vendor.p({
      type: "headphones",
      size: "20"
    }),
    l: common_vendor.p({
      type: "forward"
    }),
    m: common_vendor.p({
      type: "shop",
      size: "20"
    }),
    n: common_vendor.p({
      type: "forward"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway/pages/Mine/Mine.vue"]]);
wx.createPage(MiniProgramPage);
