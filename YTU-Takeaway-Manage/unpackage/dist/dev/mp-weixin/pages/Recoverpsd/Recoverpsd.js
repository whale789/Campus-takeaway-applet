"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      FindAccount: "",
      FindWorkNumber: "",
      FindName: "",
      FindAnswer: "",
      FindNewPsd: "",
      FindConfirmPsd: "",
      SecretQuestion: "",
      IFAccount: false,
      IFAccountEmpty: false,
      IFWorkNumber: false,
      IFWorkNumberEmpty: false,
      IFName: false,
      IFNameEmpty: false,
      IFSecretAnswer: false,
      IFSecretAnswerEmpty: false,
      IFNewPasswordEmpty: false,
      IFConfirmPsaawordEmpty: false,
      IFPsdNotSame: false,
      timer: null
    };
  },
  onUnload() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    SendAccount(e) {
      if (this.FindAccount == "") {
        this.IFAccountEmpty = true;
      } else {
        this.IFAccountEmpty = false;
        common_vendor.Ls.callFunction({
          name: "GetManagerMsg",
          data: {
            Account: this.FindAccount
          }
        }).then((res) => {
          if (res.result.data.length == 0) {
            this.IFAccount = true;
          } else {
            this.IFAccount = false;
          }
        });
      }
    },
    SendWorkNumber(e) {
      if (this.FindWorkNumber == "") {
        this.IFWorkNumberEmpty = true;
      } else {
        this.IFWorkNumberEmpty = false;
        common_vendor.Ls.callFunction({
          name: "GetManagerMsg",
          data: {
            Account: this.FindAccount
          }
        }).then((res) => {
          if (res.result.data[0].EmployeeNumber == this.FindWorkNumber) {
            this.IFWorkNumber = false;
          } else {
            this.IFWorkNumber = true;
          }
        });
      }
    },
    SendName(e) {
      if (this.FindName == "") {
        this.IFNameEmpty = true;
      } else {
        this.IFNameEmpty = false;
        common_vendor.Ls.callFunction({
          name: "GetManagerMsg",
          data: {
            Account: this.FindAccount
          }
        }).then((res) => {
          if (res.result.data[0].name == this.FindName) {
            this.IFName = false;
            this.SecretQuestion = res.result.data[0].SecretQuestion;
          } else {
            this.IFName = true;
          }
        });
      }
    },
    SendAnswer(e) {
      if (this.FindAnswer == "") {
        this.IFSecretAnswerEmpty = true;
      } else {
        this.IFSecretAnswerEmpty = false;
        common_vendor.Ls.callFunction({
          name: "GetManagerMsg",
          data: {
            Account: this.FindAccount
          }
        }).then((res) => {
          console.log(res.result);
          if (res.result.data[0].SecretAnswer == this.FindAnswer) {
            this.IFSecretAnswer = false;
          } else {
            this.IFSecretAnswer = true;
          }
        });
      }
    },
    SendNewPsd(e) {
      if (this.FindNewPsd == "") {
        this.IFNewPasswordEmpty = true;
      } else {
        this.IFNewPasswordEmpty = false;
      }
    },
    CheckNewPsd(e) {
      if (this.FindConfirmPsd == "") {
        this.IFConfirmPsaawordEmpty = true;
      } else {
        this.IFConfirmPsaawordEmpty = false;
        if (this.FindNewPsd != this.FindConfirmPsd) {
          this.IFPsdNotSame = true;
        } else {
          this.IFPsdNotSame = false;
        }
      }
    },
    UpdatePsd(e) {
      if (this.IFAccount == false && this.IFAccountEmpty == false && this.IFWorkNumber == false && this.IFWorkNumberEmpty == false && this.IFName == false && this.IFNameEmpty == false && this.IFSecretAnswer == false && this.IFSecretAnswerEmpty == false && this.IFNewPasswordEmpty == false && this.IFConfirmPsaawordEmpty == false && this.IFPsdNotSame == false) {
        common_vendor.Ls.callFunction({
          name: "UpdateManagerPsd",
          data: {
            Account: this.FindAccount,
            Password: this.FindNewPsd
          }
        }).then((res) => {
          common_vendor.index.showToast({
            title: "修改成功",
            duration: 1500
          });
          this.timer = setInterval(function() {
            console.log("11");
            common_vendor.index.navigateTo({
              url: "/pages/ManagerLogin/ManagerLogin"
            });
          }, 1500);
        });
      } else {
        this.$refs.message.open();
      }
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
    a: common_vendor.o($options.SendAccount),
    b: common_vendor.o(common_vendor.m(($event) => $data.FindAccount = $event, {
      number: true
    }, true)),
    c: common_vendor.p({
      placeholder: "请输入账号",
      trim: "all",
      type: "number",
      modelValue: $data.FindAccount
    }),
    d: $data.IFAccount
  }, $data.IFAccount ? {} : {}, {
    e: $data.IFAccountEmpty
  }, $data.IFAccountEmpty ? {} : {}, {
    f: common_vendor.o($options.SendWorkNumber),
    g: common_vendor.o(($event) => $data.FindWorkNumber = $event),
    h: common_vendor.p({
      placeholder: "请输入职工号",
      trim: "all",
      type: "number",
      modelValue: $data.FindWorkNumber
    }),
    i: $data.IFWorkNumber
  }, $data.IFWorkNumber ? {} : {}, {
    j: $data.IFWorkNumberEmpty
  }, $data.IFWorkNumberEmpty ? {} : {}, {
    k: common_vendor.o($options.SendName),
    l: common_vendor.o(($event) => $data.FindName = $event),
    m: common_vendor.p({
      placeholder: "请输入您的真实姓名",
      trim: "all",
      modelValue: $data.FindName
    }),
    n: $data.IFName
  }, $data.IFName ? {} : {}, {
    o: $data.IFNameEmpty
  }, $data.IFNameEmpty ? {} : {}, {
    p: common_vendor.t($data.SecretQuestion),
    q: common_vendor.o($options.SendAnswer),
    r: common_vendor.o(($event) => $data.FindAnswer = $event),
    s: common_vendor.p({
      placeholder: "请输入密保问题的答案",
      trim: "all",
      modelValue: $data.FindAnswer
    }),
    t: $data.IFSecretAnswer
  }, $data.IFSecretAnswer ? {} : {}, {
    v: $data.IFSecretAnswerEmpty
  }, $data.IFSecretAnswerEmpty ? {} : {}, {
    w: common_vendor.o($options.SendNewPsd),
    x: common_vendor.o(($event) => $data.FindNewPsd = $event),
    y: common_vendor.p({
      placeholder: "请输入新密码",
      trim: "all",
      type: "password",
      modelValue: $data.FindNewPsd
    }),
    z: $data.IFNewPasswordEmpty
  }, $data.IFNewPasswordEmpty ? {} : {}, {
    A: common_vendor.o($options.CheckNewPsd),
    B: common_vendor.o(($event) => $data.FindConfirmPsd = $event),
    C: common_vendor.p({
      placeholder: "请再次输入密码",
      trim: "all",
      type: "password",
      modelValue: $data.FindConfirmPsd
    }),
    D: $data.IFPsdNotSame
  }, $data.IFPsdNotSame ? {} : {}, {
    E: $data.IFConfirmPsaawordEmpty
  }, $data.IFConfirmPsaawordEmpty ? {} : {}, {
    F: common_vendor.o((...args) => $options.UpdatePsd && $options.UpdatePsd(...args)),
    G: common_vendor.p({
      type: "error",
      message: "请先按要求填写内容",
      duration: 2e3
    }),
    H: common_vendor.sr("message", "135bb12e-6"),
    I: common_vendor.p({
      type: "message"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway-Manage/pages/Recoverpsd/Recoverpsd.vue"]]);
wx.createPage(MiniProgramPage);
