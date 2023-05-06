"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      Account: "",
      PassWord: "",
      LoginAccountEmpty: false,
      LoginPasswordEmpty: false,
      LoginMessage: "",
      LoginState: -1,
      AccountState: -1,
      timer: null
    };
  },
  methods: {
    LAEmpty(e) {
      if (this.account == "") {
        this.LoginAccountEmpty = true;
      } else {
        this.LoginAccountEmpty = false;
      }
    },
    LPEmpty(e) {
      if (this.password == "") {
        this.LoginPasswordEmpty = true;
      } else {
        this.LoginPasswordEmpty = false;
      }
    },
    Login() {
      if (this.LoginAccountEmpty == false && this.LoginPasswordEmpty == false) {
        common_vendor.Ds.callFunction({
          name: "GetUserMsg",
          data: {
            Account: this.Account
          }
        }).then((res) => {
          if (res.result.data.length == 0) {
            this.LoginMessage = "账号不存在";
            this.$refs.message.open();
          } else {
            if (res.result.data[0].PassWord != this.PassWord) {
              this.LoginMessage = "密码错误";
              this.$refs.message.open();
            } else {
              this.LoginState = res.result.data[0].LoginState;
              if (this.LoginState == 1) {
                this.LoginMessage = "该账号已在其他设备登录";
                this.$refs.message.open();
              } else {
                this.AccountState = res.result.data[0].AccountState;
                if (this.AccountState == 0) {
                  this.LoginMessage = "该账号已被注销";
                  this.$refs.message.open();
                } else {
                  common_vendor.Ds.callFunction({
                    name: "UpdateUserLoginState",
                    data: {
                      Account: this.Account,
                      State: 1
                    }
                  }).then((res2) => {
                    getApp().globalData.Account = this.Account;
                    common_vendor.index.switchTab({
                      url: "/pages/Mine/Mine"
                    });
                  });
                }
              }
            }
          }
        });
      }
    },
    FindBackMPsd() {
      common_vendor.index.navigateTo({
        url: "/pages/RecoverPwd/RecoverPwd"
      });
    },
    Registered() {
      common_vendor.index.navigateTo({
        url: "/pages/CustomeRegister/CustomeRegister"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_easyinput2 + _easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_popup_message + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.LAEmpty),
    b: common_vendor.o(($event) => $data.Account = $event),
    c: common_vendor.p({
      trim: "all",
      type: "number",
      placeholder: "请输入账号",
      modelValue: $data.Account
    }),
    d: $data.LoginAccountEmpty
  }, $data.LoginAccountEmpty ? {} : {}, {
    e: common_vendor.o($options.LPEmpty),
    f: common_vendor.o(($event) => $data.PassWord = $event),
    g: common_vendor.p({
      trim: "all",
      type: "password",
      placeholder: "请输入密码",
      modelValue: $data.PassWord
    }),
    h: $data.LoginPasswordEmpty
  }, $data.LoginPasswordEmpty ? {} : {}, {
    i: common_vendor.o((...args) => $options.Registered && $options.Registered(...args)),
    j: common_vendor.o((...args) => $options.FindBackMPsd && $options.FindBackMPsd(...args)),
    k: common_vendor.o((...args) => $options.Login && $options.Login(...args)),
    l: common_vendor.p({
      type: "error",
      message: $data.LoginMessage,
      duration: 2e3
    }),
    m: common_vendor.sr("message", "b21e13ca-2"),
    n: common_vendor.p({
      type: "message"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway/pages/CustomerLogin/CustomerLogin.vue"]]);
wx.createPage(MiniProgramPage);
