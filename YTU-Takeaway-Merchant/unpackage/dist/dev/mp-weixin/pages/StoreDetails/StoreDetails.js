"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      PossessorPhone: "",
      imageStyles: {
        width: 120,
        height: 120
      },
      MerchantPicture: "",
      MerchantName: "山西刀削面",
      MerchantAddress: "七餐三楼",
      Possessor: "张三",
      PossessorPhone: "15130380905",
      SettledDate: "2023-04-14",
      BusinessContent: "主要经营山西特色刀削面",
      AllOrders: 999,
      AllMoney: 1e6,
      MerchantAddressEmpty: false,
      MerchantNameEmpty: false,
      BusinessContentEmpty: false
    };
  },
  onShow() {
    this.PossessorPhone = "15130380905";
    common_vendor.Ls.callFunction({
      name: "GetRTTAllInUser",
      data: {
        PossessorPhone: this.PossessorPhone
      }
    }).then((res) => {
      this.MerchantPicture = res.result.data[0].StorePicture;
      this.MerchantName = res.result.data[0].StoreName;
      this.Possessor = res.result.data[0].Possessor;
      this.PossessorPhone = res.result.data[0].PossessorPhone;
      this.SettledDate = res.result.data[0].SettledDate;
      this.AllOrders = res.result.data[0].AllOrders;
      this.AllMoney = res.result.data[0].AllMoney;
    });
  },
  methods: {
    IFMerchantNameEmpty() {
      if (this.MerchantName == "") {
        this.MerchantNameEmpty = true;
      } else {
        this.MerchantNameEmpty = false;
      }
    },
    IFMerchantAddressEmpty() {
      if (this.MerchantAddress == "") {
        this.MerchantAddressEmpty = true;
      } else {
        this.MerchantAddressEmpty = false;
      }
    },
    IFBusinessContentEmpty() {
      if (this.BusinessContent == "") {
        this.BusinessContentEmpty = true;
      } else {
        this.BusinessContentEmpty = false;
      }
    },
    MerPictureLoadScs(e) {
      console.log(e.tempFilePaths[0]);
    },
    SubmitUpdate() {
    }
  }
};
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  (_easycom_uni_file_picker2 + _easycom_uni_easyinput2)();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_uni_file_picker + _easycom_uni_easyinput)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.MerchantPicture,
    b: common_vendor.o($options.MerPictureLoadScs),
    c: common_vendor.p({
      limit: "1",
      ["del-icon"]: false,
      ["disable-preview"]: "false",
      imageStyles: $data.imageStyles,
      ["file-mediatype"]: "image"
    }),
    d: common_vendor.o($options.IFMerchantNameEmpty),
    e: common_vendor.o(($event) => $data.MerchantName = $event),
    f: common_vendor.p({
      trim: "all",
      placeholder: "请输入店铺名称",
      modelValue: $data.MerchantName
    }),
    g: $data.MerchantNameEmpty
  }, $data.MerchantNameEmpty ? {} : {}, {
    h: common_vendor.o($options.IFMerchantAddressEmpty),
    i: common_vendor.o(($event) => $data.MerchantAddress = $event),
    j: common_vendor.p({
      trim: "all",
      placeholder: "请输入店铺地址,例七餐1楼",
      modelValue: $data.MerchantAddress
    }),
    k: $data.MerchantAddressEmpty
  }, $data.MerchantAddressEmpty ? {} : {}, {
    l: common_vendor.t($data.Possessor),
    m: common_vendor.t($data.PossessorPhone),
    n: common_vendor.t($data.SettledDate),
    o: common_vendor.t($data.AllOrders),
    p: common_vendor.t($data.AllMoney),
    q: common_vendor.o($options.IFBusinessContentEmpty),
    r: common_vendor.o(($event) => $data.BusinessContent = $event),
    s: common_vendor.p({
      type: "textarea",
      placeholder: "请输入主要经营内容",
      modelValue: $data.BusinessContent
    }),
    t: $data.BusinessContentEmpty
  }, $data.BusinessContentEmpty ? {} : {}, {
    v: common_vendor.o((...args) => $options.SubmitUpdate && $options.SubmitUpdate(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway-Merchant/pages/StoreDetails/StoreDetails.vue"]]);
wx.createPage(MiniProgramPage);
