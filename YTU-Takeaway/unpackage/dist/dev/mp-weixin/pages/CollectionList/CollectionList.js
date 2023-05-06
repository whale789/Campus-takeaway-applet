"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      StorePicture: "https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/dc678af8-928b-42bd-b4dc-babf7e970091.jpg",
      StoreName: "土豆粉",
      Address: "七餐三楼",
      DeliveryFees: 1,
      DropOffee: 5,
      Account: "",
      ColllectionList: []
    };
  },
  onShow() {
    let Account = getApp().globalData.Account;
    this.Account = Account;
    common_vendor.Ds.callFunction({
      name: "GetCollectionByPhone",
      data: {
        Account: this.Account
      }
    }).then((res) => {
      this.ColllectionList = res.result.data;
    });
  },
  methods: {
    GoToMerchant(StoreId) {
      common_vendor.index.navigateTo({
        url: "/pages/MerchantDetail/MerchantDetail?id=" + StoreId
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
    a: common_vendor.f($data.ColllectionList, (item, index, i0) => {
      return {
        a: item.StorePicture,
        b: common_vendor.t(item.StoreName),
        c: "01948483-0-" + i0,
        d: common_vendor.o(($event) => $options.GoToMerchant(item.StoreId)),
        e: common_vendor.t(item.Address),
        f: common_vendor.t(item.DropOffee),
        g: common_vendor.t(item.DeliveryFees)
      };
    }),
    b: common_vendor.p({
      type: "forward",
      size: "20"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway/pages/CollectionList/CollectionList.vue"]]);
wx.createPage(MiniProgramPage);
