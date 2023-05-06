"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      Avatar: "",
      Account: "",
      NickName: "",
      State: "",
      AccState: true,
      OrdersNum: 0,
      AppraiseNum: 0,
      styles: "color:green"
    };
  },
  onLoad(option) {
    this.Account = option.Account;
    console.log(this.Account);
    common_vendor.Ds.callFunction({
      name: "GetCustomerByAccount",
      data: {
        Account: this.Account
      }
    }).then((res) => {
      this.Avatar = res.result.data[0].Avatar;
      this.NickName = res.result.data[0].NickName;
      if (res.result.data[0].AccountState == 1) {
        this.State = "正常";
        this.styles = "color:green";
        this.AccState = true;
      } else {
        this.State = "禁用";
        this.styles = "color:red";
        this.AccState = false;
      }
    });
    common_vendor.Ds.callFunction({
      name: "GetOrdersByAccount",
      data: {
        Account: this.Account
      }
    }).then((res) => {
      this.OrdersNum = res.result.data.length;
    });
    common_vendor.Ds.callFunction({
      name: "GetAppraiseByUserPhone",
      data: {
        CustomerPhone: this.Account
      }
    }).then((res) => {
      this.AppraiseNum = res.result.data.length;
    });
  },
  methods: {
    ChangeState(e) {
      var State = 0;
      if (this.State == "正常") {
        this.State = "禁用";
        State = 0;
        this.AccState = false;
        this.styles = "color:red;";
      } else {
        this.State = "正常";
        State = 1;
        this.AccState = true;
        this.styles = "color:green;";
      }
      common_vendor.Ds.callFunction({
        name: "UpdateCustomerAccountState",
        data: {
          Account: this.Account,
          State
        }
      }).then((res) => {
        let pages = getCurrentPages();
        let page = pages[pages.length - 1];
        common_vendor.index.redirectTo({ url: page.$page.fullPath });
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.Avatar,
    b: common_vendor.t($data.NickName),
    c: common_vendor.t($data.Account),
    d: common_vendor.t($data.State),
    e: common_vendor.s($data.styles),
    f: $data.AccState
  }, $data.AccState ? {
    g: common_vendor.o((...args) => $options.ChangeState && $options.ChangeState(...args))
  } : {
    h: common_vendor.o((...args) => $options.ChangeState && $options.ChangeState(...args))
  }, {
    i: common_vendor.t($data.OrdersNum),
    j: common_vendor.t($data.AppraiseNum)
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway-Manage/pages/UserDetail/UserDetail.vue"]]);
wx.createPage(MiniProgramPage);
