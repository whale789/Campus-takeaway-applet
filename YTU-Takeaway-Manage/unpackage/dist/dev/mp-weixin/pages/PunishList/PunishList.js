"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      ListPunish: [],
      Account: 0
    };
  },
  onShow() {
    var Account = 2640055850001;
    this.Account = Account;
    common_vendor.Ds.callFunction({
      name: "GetPunishByAccount",
      data: {
        Account: this.Account
      }
    }).then((res) => {
      this.ListPunish = res.result.data;
      for (var i = 0; i < res.result.data.length; i++) {
        if (res.result.data[i].PunishState == 1) {
          this.ListPunish[i].PunishState = "处罚中";
          this.ListPunish[i].color = "color:red";
        } else {
          this.ListPunish[i].PunishState = "已解除";
          this.ListPunish[i].color = "color:green";
        }
      }
    });
  },
  methods: {
    GoToDetail(StoreId) {
      common_vendor.index.navigateTo({
        url: "/pages/MerchantDetail/MerchantDetail?StoreId=" + StoreId
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
    a: common_vendor.f($data.ListPunish, (item, index, i0) => {
      return {
        a: common_vendor.t(item.StoreName),
        b: common_vendor.t(item.PunishState),
        c: common_vendor.s(item.color),
        d: common_vendor.t(item._id),
        e: common_vendor.t(item.PunishReason),
        f: common_vendor.t(item.PunishTime),
        g: common_vendor.t(item.PunishName),
        h: "78cf69a9-0-" + i0,
        i: common_vendor.p({
          title: item.AuditType,
          extra: item.AuditState
        }),
        j: common_vendor.o(($event) => $options.GoToDetail(item.StoreId))
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway-Manage/pages/PunishList/PunishList.vue"]]);
wx.createPage(MiniProgramPage);
