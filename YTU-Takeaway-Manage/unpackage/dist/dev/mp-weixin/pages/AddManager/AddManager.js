"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      NewAccount: 0,
      NewName: "",
      NewWorkNumber: "",
      NewSecretQuestion: "",
      NewAnswer: "",
      NewPassword: "",
      NewConfirmPsd: "",
      NewNameEmpty: false,
      NewWorkNumberEmpty: false,
      NewSecretQuestionEmpty: false,
      NewSecretAnswerEmpty: false,
      IFNewPasswordEmpty: false,
      IFConfirmPsaawordEmpty: false,
      IFPsdNotSame: false,
      timer: null
    };
  },
  onLoad() {
    common_vendor.Ls.callFunction({
      name: "GetAllManagers"
    }).then((res) => {
      console.log(res);
      var i;
      for (i = 0; i < res.result.data.length; i++) {
        if (res.result.data[i].Account > this.NewAccount) {
          this.NewAccount = res.result.data[i].Account;
        }
      }
      this.NewAccount = this.NewAccount + 1;
    });
  },
  onHide() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    SendWorkNumber() {
      if (this.NewWorkNumber == "") {
        this.NewWorkNumberEmpty = true;
      } else {
        this.NewWorkNumberEmpty = false;
      }
    },
    SendName() {
      if (this.NewName == "") {
        this.NewNameEmpty = true;
      } else {
        this.NewNameEmpty = false;
      }
    },
    SendSecretQuestion() {
      if (this.NewSecretQuestion == "") {
        this.NewSecretQuestionEmpty = true;
      } else {
        this.NewSecretQuestionEmpty = false;
      }
    },
    SendAnswer() {
      if (this.NewAnswer == "") {
        this.NewSecretAnswerEmpty = true;
      } else {
        this.NewSecretAnswerEmpty = false;
      }
    },
    SendNewPsd() {
      if (this.NewPassword == "") {
        this.IFNewPasswordEmpty = true;
      } else {
        this.IFNewPasswordEmpty = false;
      }
    },
    CheckNewPsd() {
      if (this.NewConfirmPsd == "") {
        this.IFConfirmPsaawordEmpty = true;
      } else {
        this.IFConfirmPsaawordEmpty = false;
        if (this.NewPassword != this.NewConfirmPsd) {
          this.IFPsdNotSame = true;
        } else {
          this.IFPsdNotSame = false;
        }
      }
    },
    SubmitNewMag() {
      if (this.NewNameEmpty == false && this.NewWorkNumberEmpty == false && this.NewSecretQuestionEmpty == false && this.NewSecretAnswerEmpty == false && this.IFNewPasswordEmpty == false && this.IFConfirmPsaawordEmpty == false && this.IFPsdNotSame == false) {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        month >= 1 && month <= 9 ? month = "0" + month : "";
        day >= 0 && day <= 9 ? day = "0" + day : "";
        var time = year + "-" + month + "-" + day;
        common_vendor.Ls.callFunction({
          name: "AddNewManager",
          data: {
            Account: this.NewAccount,
            PassWord: this.NewPassword,
            name: this.NewName,
            EmployeeNumber: this.NewWorkNumber,
            WorkWithHistory: [],
            AccountState: 1,
            LoginState: 0,
            SecretQuestion: this.NewSecretQuestion,
            SecretAnswer: this.NewAnswer,
            RegistrationTime: time
          }
        }).then((res) => {
          common_vendor.index.showToast({
            title: "增设成功",
            duration: 1500
          });
          this.timer = setInterval(function() {
            common_vendor.index.switchTab({
              url: "/pages/Personal/Personal"
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
    a: common_vendor.t($data.NewAccount),
    b: common_vendor.o($options.SendWorkNumber),
    c: common_vendor.o(($event) => $data.NewWorkNumber = $event),
    d: common_vendor.p({
      placeholder: "请输入职工号",
      trim: "all",
      type: "number",
      modelValue: $data.NewWorkNumber
    }),
    e: $data.NewWorkNumberEmpty
  }, $data.NewWorkNumberEmpty ? {} : {}, {
    f: common_vendor.o($options.SendName),
    g: common_vendor.o(($event) => $data.NewName = $event),
    h: common_vendor.p({
      placeholder: "请输入您的真实姓名",
      trim: "all",
      modelValue: $data.NewName
    }),
    i: $data.NewNameEmpty
  }, $data.NewNameEmpty ? {} : {}, {
    j: common_vendor.o($options.SendSecretQuestion),
    k: common_vendor.o(($event) => $data.NewSecretQuestion = $event),
    l: common_vendor.p({
      placeholder: "请输入您的密保问题",
      trim: "all",
      modelValue: $data.NewSecretQuestion
    }),
    m: $data.NewSecretQuestionEmpty
  }, $data.NewSecretQuestionEmpty ? {} : {}, {
    n: common_vendor.o($options.SendAnswer),
    o: common_vendor.o(($event) => $data.NewAnswer = $event),
    p: common_vendor.p({
      placeholder: "请输入密保问题的答案",
      trim: "all",
      modelValue: $data.NewAnswer
    }),
    q: $data.NewSecretAnswerEmpty
  }, $data.NewSecretAnswerEmpty ? {} : {}, {
    r: common_vendor.o($options.SendNewPsd),
    s: common_vendor.o(($event) => $data.NewPassword = $event),
    t: common_vendor.p({
      placeholder: "请输入新密码",
      trim: "all",
      type: "password",
      modelValue: $data.NewPassword
    }),
    v: $data.IFNewPasswordEmpty
  }, $data.IFNewPasswordEmpty ? {} : {}, {
    w: common_vendor.o($options.CheckNewPsd),
    x: common_vendor.o(($event) => $data.NewConfirmPsd = $event),
    y: common_vendor.p({
      placeholder: "请再次输入密码",
      trim: "all",
      type: "password",
      modelValue: $data.NewConfirmPsd
    }),
    z: $data.IFPsdNotSame
  }, $data.IFPsdNotSame ? {} : {}, {
    A: $data.IFConfirmPsaawordEmpty
  }, $data.IFConfirmPsaawordEmpty ? {} : {}, {
    B: common_vendor.o((...args) => $options.SubmitNewMag && $options.SubmitNewMag(...args)),
    C: common_vendor.p({
      type: "error",
      message: "请先按要求填写内容",
      duration: 2e3
    }),
    D: common_vendor.sr("message", "858e87ee-6"),
    E: common_vendor.p({
      type: "message"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway-Manage/pages/AddManager/AddManager.vue"]]);
wx.createPage(MiniProgramPage);
