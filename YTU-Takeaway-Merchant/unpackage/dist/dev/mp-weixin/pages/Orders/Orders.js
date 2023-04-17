"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      xian: false,
      foldText: "展开",
      OrdersNumber: "20190909103109582536",
      OrdersState: "未接单",
      CustomerName: "张乾",
      CustomerPhoneNumber: "18309346278",
      CustomerAddress: "烟台大学北校区12号楼",
      OrdersTime: "2023年4月5日13:12:32",
      CustomerNote: "不要辣，需要两双筷子，外卖放到楼下时打电话通知一下，给几张餐巾纸，帮忙带一瓶可乐",
      max: 3,
      isOpen: false,
      ListGoods: [
        {
          GoodsName: "油泼面",
          GoodsPrice: 9.99,
          GoodsNum: 2,
          GoodsImage: "../../static/images/conditions.png"
        },
        {
          GoodsName: "卤蛋",
          GoodsPrice: 1.5,
          GoodsNum: 1,
          GoodsImage: "../../static/images/conditions-active.png"
        },
        {
          GoodsName: "狮子头",
          GoodsPrice: 1,
          GoodsNum: 2,
          GoodsImage: "../../static/images/conditions.png"
        },
        {
          GoodsName: "醋",
          GoodsPrice: 0,
          GoodsNum: 1,
          GoodsImage: "../../static/images/conditions-active.png"
        },
        {
          GoodsName: "葱花",
          GoodsPrice: 0,
          GoodsNum: 1,
          GoodsImage: "../../static/images/conditions.png"
        },
        {
          GoodsName: "香菜",
          GoodsPrice: 0,
          GoodsNum: 1,
          GoodsImage: "../../static/images/conditions-active.png"
        }
      ]
    };
  },
  methods: {
    change() {
      this.xian = !this.xian;
      if (this.xian == false) {
        this.foldText = "展开";
      } else {
        this.foldText = "收起";
      }
    },
    CallToCustomer(CustomerPhoneNumber) {
      common_vendor.index.makePhoneCall({
        phoneNumber: CustomerPhoneNumber
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.OrdersNumber),
    b: common_vendor.t($data.OrdersState),
    c: common_vendor.f($data.ListGoods, (item, index, i0) => {
      return common_vendor.e({
        a: $data.isOpen || index < $data.max
      }, $data.isOpen || index < $data.max ? {
        b: item.GoodsImage,
        c: common_vendor.t(item.GoodsName),
        d: common_vendor.t(item.GoodsPrice),
        e: common_vendor.t(item.GoodsNum)
      } : {}, {
        f: index
      });
    }),
    d: !$data.isOpen && $data.ListGoods.length > $data.max,
    e: common_vendor.o(($event) => $data.isOpen = !$data.isOpen),
    f: $data.isOpen && $data.ListGoods.length > $data.max,
    g: common_vendor.o(($event) => $data.isOpen = !$data.isOpen),
    h: common_vendor.t($data.CustomerName),
    i: common_vendor.t($data.CustomerPhoneNumber),
    j: common_vendor.t($data.CustomerAddress),
    k: common_vendor.t($data.OrdersTime),
    l: common_vendor.t($data.CustomerNote),
    m: $data.xian ? 1 : "",
    n: common_vendor.t($data.foldText),
    o: common_vendor.o(($event) => $options.change()),
    p: common_vendor.o(($event) => $options.CallToCustomer($data.CustomerPhoneNumber)),
    q: common_vendor.p({
      title: "基础卡片",
      ["sub-title"]: "副标题",
      extra: "额外信息",
      padding: "10px 0"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway-Merchant/pages/Orders/Orders.vue"]]);
wx.createPage(MiniProgramPage);
