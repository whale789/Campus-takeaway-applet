"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      Address: "烟台大学北校区12号楼",
      Doorplate: "A516",
      Contact: "张乾乾",
      gender: "先生",
      Phone: "15130380905",
      Account: "",
      AddressList: []
    };
  },
  onShow() {
    let Account = getApp().globalData.Account;
    this.Account = Account;
    common_vendor.Ds.callFunction({
      name: "GetAddressByAccount",
      data: {
        Account
      }
    }).then((res) => {
      this.AddressList = res.result.data;
      for (var i = 0; i < res.result.data.length; i++) {
        let number = res.result.data[i].Phone;
        let mphone = number.substring(0, 3) + "****" + number.substring(7);
        this.AddressList[i].Phone = mphone;
      }
    });
  },
  methods: {
    AddressDetail(AddressId) {
      common_vendor.index.navigateTo({
        url: "/pages/AddressDetail/AddressDetail?Type=0&AddressId=" + AddressId
      });
    },
    CreateAddress() {
      common_vendor.index.navigateTo({
        url: "/pages/AddressDetail/AddressDetail?Type=1&AddressId=0"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.AddressList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.Address),
        b: common_vendor.t(item.Doorplate),
        c: "3777a056-0-" + i0,
        d: common_vendor.o(($event) => $options.AddressDetail(item._id), index),
        e: common_vendor.t(item.Contact),
        f: common_vendor.t(item.gender),
        g: common_vendor.t(item.Phone),
        h: index
      };
    }),
    b: common_vendor.p({
      type: "compose",
      size: "28",
      color: "#6c6c6c"
    }),
    c: common_vendor.p({
      type: "plusempty",
      size: "30",
      color: "#00aaff"
    }),
    d: common_vendor.o((...args) => $options.CreateAddress && $options.CreateAddress(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway/pages/MyAddress/MyAddress.vue"]]);
wx.createPage(MiniProgramPage);
