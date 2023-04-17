"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      ExitPossessorPhone: "15130380905",
      ExitPossessor: "",
      ExitCause: "",
      ExitPossessorEmpty: false,
      ExitPossessorNotSame: false,
      ExitCauseEmpty: false
    };
  },
  methods: {
    IFExitPossess() {
      if (this.ExitPossessor == "") {
        this.ExitPossessorEmpty = true;
      } else {
        this.ExitPossessorEmpty = false;
        common_vendor.Ls.callFunction({
          name: "GetRTTAllInUser",
          data: {
            PossessorPhone: this.ExitPossessorPhone
          }
        }).then((res) => {
          console.log(res);
          if (res.result.data[0].Possessor != this.ExitPossessor) {
            this.ExitPossessorNotSame = true;
          } else {
            this.ExitPossessorNotSame = false;
          }
        });
      }
    },
    IFExitCause() {
      if (this.ExitCause == "") {
        this.ExitCauseEmpty = true;
      } else {
        this.ExitCauseEmpty = false;
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.ExitPossessorPhone),
    b: common_vendor.o($options.IFExitPossess),
    c: common_vendor.o(($event) => $data.ExitPossessor = $event),
    d: common_vendor.p({
      trim: "all",
      placeholder: "请输入持有人姓名",
      modelValue: $data.ExitPossessor
    }),
    e: $data.ExitPossessorEmpty
  }, $data.ExitPossessorEmpty ? {} : {}, {
    f: $data.ExitPossessorNotSame
  }, $data.ExitPossessorNotSame ? {} : {}, {
    g: common_vendor.o($options.IFExitCause),
    h: common_vendor.o(($event) => $data.ExitCause = $event),
    i: common_vendor.p({
      trim: "all",
      type: "textarea",
      placeholder: "请输入退出原因",
      modelValue: $data.ExitCause
    }),
    j: $data.ExitCauseEmpty
  }, $data.ExitCauseEmpty ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway-Merchant/pages/MerchantExit/MerchantExit.vue"]]);
wx.createPage(MiniProgramPage);
