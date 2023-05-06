"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      OrderId: "",
      StoreId: "",
      ListGoods: [],
      isOpen: false,
      max: 3,
      MerchantName: "",
      DeliveryFees: 0,
      TotalMoney: 0,
      StorePicture: "",
      OrderState: "",
      Contact: "",
      gender: "",
      Phone: "",
      Address: "",
      Doorplate: "",
      TimeOfOrder: "",
      Cutlery: ""
    };
  },
  onLoad(option) {
    this.OrderId = option.OrderId;
    common_vendor.Ds.callFunction({
      name: "GetOrderById",
      data: {
        OrderId: this.OrderId
      }
    }).then((res) => {
      this.MerchantName = res.result.data[0].StoreName;
      this.TotalMoney = res.result.data[0].TotalMoney;
      this.ListGoods = res.result.data[0].GoodsList;
      this.StorePicture = res.result.data[0].StorePicture;
      this.StoreId = res.result.data[0].StoreId;
      this.OrderState = res.result.data[0].OrderState;
      this.Contact = res.result.data[0].Contact;
      this.gender = res.result.data[0].gender;
      this.Phone = res.result.data[0].Phone;
      this.Address = res.result.data[0].Address;
      this.Doorplate = res.result.data[0].Doorplate;
      this.TimeOfOrder = res.result.data[0].TimeOfOrder;
      this.Cutlery = res.result.data[0].Cutlery;
      common_vendor.Ds.callFunction({
        name: "GetRTTMsgById",
        data: {
          StoreId: this.StoreId
        }
      }).then((ress) => {
        this.DeliveryFees = ress.result.data[0].DeliveryFees;
      });
    });
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.OrderState),
    b: $data.StorePicture,
    c: common_vendor.t($data.MerchantName),
    d: common_vendor.f($data.ListGoods, (item, index, i0) => {
      return common_vendor.e({
        a: $data.isOpen || index < $data.max
      }, $data.isOpen || index < $data.max ? {
        b: item.GoodsPicture,
        c: common_vendor.t(item.GoodsName),
        d: common_vendor.t(item.GoodsPrice),
        e: common_vendor.t(item.NumberInCart)
      } : {}, {
        f: index
      });
    }),
    e: !$data.isOpen && $data.ListGoods.length > $data.max,
    f: common_vendor.o(($event) => $data.isOpen = !$data.isOpen),
    g: $data.isOpen && $data.ListGoods.length > $data.max,
    h: common_vendor.o(($event) => $data.isOpen = !$data.isOpen),
    i: common_vendor.t($data.DeliveryFees),
    j: common_vendor.t($data.TotalMoney.toFixed(2)),
    k: common_vendor.t($data.Contact),
    l: common_vendor.t($data.gender),
    m: common_vendor.t($data.Phone),
    n: common_vendor.t($data.Address),
    o: common_vendor.t($data.Doorplate),
    p: common_vendor.t($data.OrderId),
    q: common_vendor.t($data.TimeOfOrder),
    r: common_vendor.t($data.Cutlery)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway/pages/ViewOrders/ViewOrders.vue"]]);
wx.createPage(MiniProgramPage);
