"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      NewMerchantPicture: "",
      imageStyles: {
        width: 120,
        height: 120,
        border: {
          color: "#a8a8a8"
        }
      },
      NewMerchantName: "",
      NewMerchantPicture: "../../static/images/DefaultFile.png",
      NewMerchantName: "",
      NewMerchantAddress: "",
      NewPossessor: "",
      NewPossessorPhone: "",
      NewBusinessContent: "",
      NewLicensePicture: "../../static/images/DefaultFile.png",
      NewSanitaryPermit: "../../static/images/DefaultFile.png",
      NewIdentityCardZ: "../../static/images/DefaultFile.png",
      NewIdentityCardF: "../../static/images/DefaultFile.png",
      NewMerchantNameEmpty: false,
      NewMerchantAddressEmpty: false,
      NewPossessorEmpty: false,
      NewBusinessContentEmpty: false,
      AuditListId: "",
      timer: null
    };
  },
  onShow() {
    this.NewPossessorPhone = getApp().globalData.Account;
  },
  onHide() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
  methods: {
    IFNewMerchantNameEmpty() {
      if (this.NewMerchantName == "") {
        this.NewMerchantNameEmpty = true;
      } else {
        this.NewMerchantNameEmpty = false;
      }
    },
    IFMerchantAddressEmpty() {
      if (this.NewMerchantAddress == "") {
        this.NewMerchantAddressEmpty = true;
      } else {
        this.NewMerchantAddressEmpty = false;
      }
    },
    IFPossessorEmpty() {
      if (this.NewPossessor == "") {
        this.NewPossessorEmpty = true;
      } else {
        this.NewPossessorEmpty = false;
      }
    },
    IFNewBusinessContentEmpty() {
      if (this.NewBusinessContent == "") {
        this.NewBusinessContentEmpty = true;
      } else {
        this.NewBusinessContentEmpty = false;
      }
    },
    NewMerPictureLoadScs(e) {
      this.NewMerchantPicture = e.tempFilePaths[0];
    },
    NewLicensePictureScs(e) {
      this.NewLicensePicture = e.tempFilePaths[0];
    },
    NewSanitaryPermitScs(e) {
      this.NewSanitaryPermit = e.tempFilePaths[0];
    },
    NewIdentityCardZScs(e) {
      this.NewIdentityCardZ = e.tempFilePaths[0];
    },
    NewIdentityCardFScs(e) {
      this.NewIdentityCardF = e.tempFilePaths[0];
    },
    SubmitForReview() {
      if (this.NewMerchantNameEmpty == false && this.NewMerchantAddressEmpty == false && this.NewPossessorEmpty == false && this.NewBusinessContentEmpty == false) {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        month >= 1 && month <= 9 ? month = "0" + month : "";
        day >= 0 && day <= 9 ? day = "0" + day : "";
        var time = year + "-" + month + "-" + day;
        common_vendor.Ls.callFunction({
          name: "AddToAuditList",
          data: {
            AuditType: "商家入驻",
            AuditState: "未处理",
            AuditMain: this.NewBusinessContent,
            Applicant: this.NewPossessor,
            ApplicantPhone: this.NewPossessorPhone,
            ApplicationTime: time
          }
        }).then((res) => {
          console.log(res.result.id);
          this.AuditListId = res.result.id;
          common_vendor.Ls.callFunction({
            name: "AddToMerchantSettleAudit",
            data: {
              MerchantPicture: this.NewMerchantPicture,
              MerchantName: this.NewMerchantName,
              MerchantAddress: this.NewMerchantAddress,
              MerChantPossessor: this.NewPossessor,
              PossessorPhone: this.NewPossessorPhone,
              LicensePicture: this.NewLicensePicture,
              SanitaryPermit: this.NewSanitaryPermit,
              IdentityCardZ: this.NewIdentityCardZ,
              IdentityCardF: this.NewIdentityCardF,
              BusinessContent: this.NewBusinessContent,
              AuditListId: this.AuditListId,
              AuditState: "处理中",
              Handlers: "",
              HandlersPhone: "",
              Feedback: ""
            }
          }).then((ress) => {
            common_vendor.index.showToast({
              title: "提交成功",
              duration: 1500
            });
            this.timer = setTimeout(() => {
              console.log("11");
              common_vendor.index.switchTab({
                url: "/pages/Conditions/Conditions"
              });
            }, 1500);
          });
        });
      } else {
        this.$refs.message.open();
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_file_picker2 + _easycom_uni_easyinput2 + _easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_file_picker + _easycom_uni_easyinput + _easycom_uni_popup_message + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.NewMerchantPicture,
    b: common_vendor.o($options.NewMerPictureLoadScs),
    c: common_vendor.p({
      limit: "1",
      ["del-icon"]: false,
      ["disable-preview"]: "false",
      imageStyles: $data.imageStyles,
      ["file-mediatype"]: "image"
    }),
    d: common_vendor.o($options.IFNewMerchantNameEmpty),
    e: common_vendor.o(($event) => $data.NewMerchantName = $event),
    f: common_vendor.p({
      trim: "all",
      placeholder: "请输入店铺名称",
      modelValue: $data.NewMerchantName
    }),
    g: $data.NewMerchantNameEmpty
  }, $data.NewMerchantNameEmpty ? {} : {}, {
    h: common_vendor.o($options.IFMerchantAddressEmpty),
    i: common_vendor.o(($event) => $data.NewMerchantAddress = $event),
    j: common_vendor.p({
      trim: "all",
      placeholder: "例:七餐三楼",
      modelValue: $data.NewMerchantAddress
    }),
    k: $data.NewMerchantAddressEmpty
  }, $data.NewMerchantAddressEmpty ? {} : {}, {
    l: common_vendor.o($options.IFPossessorEmpty),
    m: common_vendor.o(($event) => $data.NewPossessor = $event),
    n: common_vendor.p({
      trim: "all",
      placeholder: "请输入店铺持有人",
      modelValue: $data.NewPossessor
    }),
    o: $data.NewPossessorEmpty
  }, $data.NewPossessorEmpty ? {} : {}, {
    p: common_vendor.t($data.NewPossessorPhone),
    q: $data.NewLicensePicture,
    r: common_vendor.o($options.NewLicensePictureScs),
    s: common_vendor.p({
      limit: "1",
      ["del-icon"]: false,
      ["disable-preview"]: "false",
      imageStyles: $data.imageStyles,
      ["file-mediatype"]: "image"
    }),
    t: $data.NewSanitaryPermit,
    v: common_vendor.o($options.NewSanitaryPermitScs),
    w: common_vendor.p({
      limit: "1",
      ["del-icon"]: false,
      ["disable-preview"]: "false",
      imageStyles: $data.imageStyles,
      ["file-mediatype"]: "image"
    }),
    x: $data.NewIdentityCardZ,
    y: common_vendor.o($options.NewIdentityCardZScs),
    z: common_vendor.p({
      limit: "1",
      ["del-icon"]: false,
      ["disable-preview"]: "false",
      imageStyles: $data.imageStyles,
      ["file-mediatype"]: "image"
    }),
    A: $data.NewIdentityCardF,
    B: common_vendor.o($options.NewIdentityCardFScs),
    C: common_vendor.p({
      limit: "1",
      ["del-icon"]: false,
      ["disable-preview"]: "false",
      imageStyles: $data.imageStyles,
      ["file-mediatype"]: "image"
    }),
    D: common_vendor.o($options.IFNewBusinessContentEmpty),
    E: common_vendor.o(($event) => $data.NewBusinessContent = $event),
    F: common_vendor.p({
      type: "textarea",
      placeholder: "请输入主要经营内容",
      modelValue: $data.NewBusinessContent
    }),
    G: $data.NewBusinessContentEmpty
  }, $data.NewBusinessContentEmpty ? {} : {}, {
    H: common_vendor.o((...args) => $options.SubmitForReview && $options.SubmitForReview(...args)),
    I: common_vendor.p({
      type: "error",
      message: "请先按要求填写内容",
      duration: 2e3
    }),
    J: common_vendor.sr("message", "3894114c-9"),
    K: common_vendor.p({
      type: "message"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway-Merchant/pages/MerchantSettle/MerchantSettle.vue"]]);
wx.createPage(MiniProgramPage);
