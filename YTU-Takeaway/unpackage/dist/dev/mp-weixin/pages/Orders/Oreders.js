"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      Account: "",
      OrdersList: [],
      StorePicture: "",
      StoreName: "",
      OrderState: "",
      NumberInCart: 0,
      GoodsName: "",
      GoodsTotal: 0,
      TotalMoney: 0,
      max: 3,
      isOpen: false,
      Logged: false
    };
  },
  onShow() {
    let Account = getApp().globalData.Account;
    this.Account = Account;
    if (this.Account == "0") {
      this.Logged = false;
    } else {
      this.Logged = true;
      common_vendor.Ds.callFunction({
        name: "GetOrdersByAccount",
        data: {
          Account: this.Account
        }
      }).then((res) => {
        var len = res.result.data.length;
        var k = len - 1;
        for (var i = 0; i < len; i++) {
          this.OrdersList[k] = res.result.data[i];
          k--;
        }
        for (var i = 0; i < len; i++) {
          if (this.OrdersList[i].OrderState == "未接单" || this.OrdersList[i].OrderState == "已接单") {
            this.$set(this.OrdersList[i], "NotFinish", true);
            this.$set(this.OrdersList[i], "NotAppraise", false);
            this.$set(this.OrdersList[i], "Finish", false);
          }
          if (this.OrdersList[i].OrderState == "已完成") {
            this.$set(this.OrdersList[i], "NotFinish", false);
            this.$set(this.OrdersList[i], "NotAppraise", true);
            this.$set(this.OrdersList[i], "Finish", false);
          }
          if (this.OrdersList[i].OrderState == "已评价") {
            this.$set(this.OrdersList[i], "NotFinish", false);
            this.$set(this.OrdersList[i], "NotAppraise", false);
            this.$set(this.OrdersList[i], "Finish", true);
          }
        }
      });
    }
  },
  methods: {
    CallToMerchant(StoreId) {
      common_vendor.Ds.callFunction({
        name: "GetRTTMsgById",
        data: {
          StoreId
        }
      }).then((res) => {
        common_vendor.index.makePhoneCall({
          phoneNumber: res.result.data[0].PossessorPhone
        });
      });
    },
    ViewOrders(Orderid) {
      common_vendor.index.navigateTo({
        url: "/pages/ViewOrders/ViewOrders?OrderId=" + Orderid
      });
    },
    GoToMerchant(StoreId) {
      common_vendor.index.navigateTo({
        url: "/pages/MerchantDetail/MerchantDetail?id=" + StoreId
      });
    },
    GoToAppraise(StoreId, OrderId) {
      common_vendor.index.navigateTo({
        url: "/pages/Appraise/Appraise?OrderId=" + OrderId
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
  return common_vendor.e({
    a: $data.Logged
  }, $data.Logged ? {
    b: common_vendor.f($data.OrdersList, (item, index, i0) => {
      return common_vendor.e({
        a: item.StorePicture,
        b: common_vendor.t(item.StoreName),
        c: "14f40156-0-" + i0,
        d: common_vendor.o(($event) => $options.GoToMerchant(item.StoreId), index),
        e: common_vendor.t(item.OrderState),
        f: common_vendor.f(item.GoodsList, (item0, index0, i1) => {
          return common_vendor.e({
            a: item.isOpen || index0 < $data.max
          }, item.isOpen || index0 < $data.max ? {
            b: common_vendor.t(item0.GoodsName),
            c: common_vendor.t(item0.NumberInCart)
          } : {}, {
            d: common_vendor.o(($event) => $options.ViewOrders(item._id), index0),
            e: index0
          });
        }),
        g: !item.isOpen && item.GoodsList.length > $data.max,
        h: common_vendor.o(($event) => item.isOpen = !item.isOpen, index),
        i: item.isOpen && item.GoodsList.length > $data.max,
        j: common_vendor.o(($event) => item.isOpen = !item.isOpen, index),
        k: common_vendor.t(item.GoodsTotal),
        l: common_vendor.t(item.TotalMoney.toFixed(2)),
        m: item.NotFinish
      }, item.NotFinish ? {
        n: common_vendor.o(($event) => $options.CallToMerchant(item.StoreId), index)
      } : {}, {
        o: item.NotAppraise
      }, item.NotAppraise ? {
        p: common_vendor.o(($event) => $options.GoToAppraise(item.StoreId, item._id), index)
      } : {}, {
        q: item.Finish
      }, item.Finish ? {
        r: common_vendor.o(($event) => $options.GoToMerchant(item.StoreId), index)
      } : {}, {
        s: index
      });
    }),
    c: common_vendor.p({
      type: "forward",
      size: "22",
      color: "#c5c5c5"
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway/pages/Orders/Oreders.vue"]]);
wx.createPage(MiniProgramPage);
