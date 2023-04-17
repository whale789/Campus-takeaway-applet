"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      WorkingDays: 125,
      ProcessingNumber: 52,
      Logged: false,
      ManagerName: "",
      ManagerWorkNumber: "",
      Account: 0,
      SecretQuestion: "",
      SecretAnswer: ""
    };
  },
  onShow() {
    var Account = getApp().globalData.Account;
    console.log(Account);
    this.Account = Account;
    if (Account == 0) {
      this.Logged = false;
    } else {
      this.Logged = true;
      common_vendor.Ls.callFunction({
        name: "GetManagerMsg",
        data: {
          Account
        }
      }).then((res) => {
        console.log(res);
        let date2 = new Date();
        let date1 = new Date(Date.parse(res.result.data[0].RegistrationTime.replace(/-/g, "/")));
        let WorkDays = parseInt(Math.abs(date2.getTime() - date1.getTime()) / 1e3 / 60 / 60 / 24);
        this.ManagerName = res.result.data[0].name;
        this.ManagerWorkNumber = res.result.data[0].EmployeeNumber;
        this.WorkingDays = WorkDays + 1;
        this.ProcessingNumber = res.result.data[0].WorkWithHistory.length;
        this.SecretQuestion = res.result.data[0].SecretQuestion;
      });
    }
  },
  onReady() {
  },
  methods: {
    Login() {
      common_vendor.index.navigateTo({
        url: "/pages/ManagerLogin/ManagerLogin"
      });
    },
    LoginOut() {
      common_vendor.Ls.callFunction({
        name: "UpdateLoginState",
        data: {
          Account: this.Account,
          State: 0
        }
      }).then((res) => {
        this.Logged = false;
        getApp().globalData.Account = 0;
      });
    },
    CancelAccount() {
      this.$refs.cancellation.open();
    },
    SureCancel() {
      common_vendor.Ls.callFunction({
        name: "UpdateAccountState",
        data: {
          Account: this.Account,
          State: 0
        }
      }).then((res) => {
        common_vendor.index.showToast({
          title: "注销成功"
        });
        this.LoginOut();
      });
    },
    AddNewManager() {
      common_vendor.index.navigateTo({
        url: "/pages/AddManager/AddManager"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.Logged
  }, $data.Logged ? {
    b: common_vendor.t($data.ManagerName),
    c: common_vendor.t($data.ManagerWorkNumber),
    d: common_vendor.p({
      type: "download-filled",
      size: "50",
      color: "#a2a2a2"
    }),
    e: common_vendor.t($data.WorkingDays),
    f: common_vendor.t($data.ProcessingNumber),
    g: common_vendor.p({
      type: "forward",
      size: "15",
      color: "#9d9d9d"
    }),
    h: common_vendor.o((...args) => $options.AddNewManager && $options.AddNewManager(...args)),
    i: common_vendor.p({
      type: "forward",
      size: "15",
      color: "#9d9d9d"
    }),
    j: common_vendor.o((...args) => $options.CancelAccount && $options.CancelAccount(...args)),
    k: common_vendor.o((...args) => $options.LoginOut && $options.LoginOut(...args))
  } : {
    l: common_vendor.o((...args) => $options.Login && $options.Login(...args)),
    m: common_vendor.p({
      type: "download-filled",
      size: "50",
      color: "#a2a2a2"
    }),
    n: common_vendor.o((...args) => $options.Login && $options.Login(...args)),
    o: common_vendor.o((...args) => $options.Login && $options.Login(...args)),
    p: common_vendor.o((...args) => $options.Login && $options.Login(...args)),
    q: common_vendor.p({
      type: "forward",
      size: "15",
      color: "#9d9d9d"
    }),
    r: common_vendor.o((...args) => $options.Login && $options.Login(...args)),
    s: common_vendor.p({
      type: "forward",
      size: "15",
      color: "#9d9d9d"
    }),
    t: common_vendor.o((...args) => $options.Login && $options.Login(...args)),
    v: common_vendor.o((...args) => $options.Login && $options.Login(...args))
  }, {
    w: common_vendor.o($options.SureCancel),
    x: common_vendor.p({
      type: "error",
      cancelText: "关闭",
      confirmText: "确定",
      title: "警告",
      content: "您确定注销该账号吗"
    }),
    y: common_vendor.sr("cancellation", "72b4d76e-6"),
    z: common_vendor.p({
      type: "dialog"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway-Manage/pages/Personal/Personal.vue"]]);
wx.createPage(MiniProgramPage);
