"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      AuditListId: "",
      MerchantPicture: "",
      MerchantName: "",
      MerchantAddress: "",
      MerChantPossessor: "",
      PossessorPhone: "",
      LicensePicture: "",
      SanitaryPermit: "",
      IdentityCardZ: "",
      IdentityCardF: "",
      BusinessContent: "",
      ImageList: [],
      color: "",
      AuditState: "",
      Handlers: "",
      HandlersPhone: "",
      Feedback: "",
      FeedbackEmpty: false
    };
  },
  onLoad(option) {
    this.AuditListId = option.AuditId;
    common_vendor.Ls.callFunction({
      name: "GetAuditByListId",
      data: {
        AuditListId: this.AuditListId
      }
    }).then((res) => {
      this.MerchantPicture = res.result.data[0].MerchantPicture;
      this.MerchantName = res.result.data[0].MerchantName;
      this.MerchantAddress = res.result.data[0].MerchantAddress;
      this.MerChantPossessor = res.result.data[0].MerChantPossessor;
      this.PossessorPhone = res.result.data[0].PossessorPhone;
      this.LicensePicture = res.result.data[0].LicensePicture;
      this.SanitaryPermit = res.result.data[0].SanitaryPermit;
      this.IdentityCardZ = res.result.data[0].IdentityCardZ;
      this.IdentityCardF = res.result.data[0].IdentityCardF;
      this.BusinessContent = res.result.data[0].BusinessContent;
      this.Handlers = res.result.data[0].Handlers;
      this.HandlersPhone = res.result.data[0].HandlersPhone;
      this.AuditState = res.result.data[0].AuditState;
      this.ImageList.push(this.MerchantPicture);
      this.ImageList.push(this.LicensePicture);
      this.ImageList.push(this.SanitaryPermit);
      this.ImageList.push(this.IdentityCardZ);
      this.ImageList.push(this.IdentityCardF);
      if (res.result.data[0].AuditState == "未处理") {
        this.color = "color:#1296db";
      }
      if (res.result.data[0].AuditState == "处理中") {
        this.color = "color:#ffaa00";
      }
      if (res.result.data[0].AuditState == "已通过") {
        this.color = "color:#00aa00";
      }
      if (res.result.data[0].AuditState == "已驳回") {
        this.color = "color:#ff0000";
      }
    });
  },
  methods: {
    ImagePlus(e) {
      common_vendor.index.previewImage({
        urls: this.ImageList,
        current: e,
        indicator: "default",
        loop: true
      });
    },
    IFFeedbackEmpty() {
      if (this.Feedback == "") {
        this.FeedbackEmpty = true;
      } else {
        this.FeedbackEmpty = false;
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
    a: common_vendor.o(($event) => $options.ImagePlus(0)),
    b: $data.MerchantPicture,
    c: common_vendor.t($data.MerchantName),
    d: common_vendor.t($data.MerchantAddress),
    e: common_vendor.t($data.MerChantPossessor),
    f: common_vendor.t($data.PossessorPhone),
    g: common_vendor.o(($event) => $options.ImagePlus(1)),
    h: $data.LicensePicture,
    i: common_vendor.o(($event) => $options.ImagePlus(2)),
    j: $data.SanitaryPermit,
    k: common_vendor.o(($event) => $options.ImagePlus(3)),
    l: $data.IdentityCardZ,
    m: common_vendor.o(($event) => $options.ImagePlus(4)),
    n: $data.IdentityCardF,
    o: common_vendor.t($data.BusinessContent),
    p: common_vendor.t($data.Handlers),
    q: common_vendor.t($data.HandlersPhone),
    r: common_vendor.t($data.AuditState),
    s: common_vendor.s($data.color),
    t: common_vendor.o($options.IFFeedbackEmpty),
    v: common_vendor.o(($event) => $data.Feedback = $event),
    w: common_vendor.p({
      type: "textarea",
      placeholder: "请输入处理结果",
      modelValue: $data.Feedback
    }),
    x: $data.FeedbackEmpty
  }, $data.FeedbackEmpty ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway-Manage/pages/AuditDetail/AuditDetail.vue"]]);
wx.createPage(MiniProgramPage);
