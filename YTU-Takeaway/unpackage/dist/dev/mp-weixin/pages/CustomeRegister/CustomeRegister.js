"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      NewAccount: "",
      NewAccountEmpty: false,
      NewNickName: "",
      NewNickNameEmpty: false,
      NewSecretQuestion: "",
      NewSecretQuestionEmpty: false,
      NewAnswer: "",
      NewSecretAnswerEmpty: false,
      NewPassword: "",
      NewPasswordEmpty: false,
      NewConfirmPsd: "",
      ConfirmPsaawordEmpty: false,
      PsdNotSame: false,
      PromptMsg: "",
      imageStyles: {
        width: 80,
        height: 80,
        border: {
          radius: "50%"
        }
      },
      MerchantUserAvater: "../../static/images/PersonalAvatar.jpg",
      timer: null
    };
  },
  onHide() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
  methods: {
    SendNewAccount() {
      if (this.NewAccount == "") {
        this.NewAccountEmpty = true;
      } else {
        this.NewAccountEmpty = false;
      }
    },
    SendNickName() {
      if (this.NewNickName == "") {
        this.NewNickNameEmpty = true;
      } else {
        this.NewNickNameEmpty = false;
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
        this.NewPasswordEmpty = true;
      } else {
        this.NewPasswordEmpty = false;
      }
    },
    CheckNewPsd() {
      if (this.NewConfirmPsd == "") {
        this.ConfirmPsaawordEmpty = true;
      } else {
        this.ConfirmPsaawordEmpty = false;
        if (this.NewPassword != this.NewConfirmPsd) {
          this.PsdNotSame = true;
        } else {
          this.PsdNotSame = false;
        }
      }
    },
    AvatarLoadScs(e) {
      console.log(e);
      this.MerchantUserAvater = e.tempFilePaths[0];
    },
    FailAvatarLoad() {
      this.PromptMsg = "头像上传失败，请重新上传";
      this.$refs.message.opne();
    },
    SubmitNewMCTUser() {
      if (this.NewAccountEmpty == false && this.NewNickNameEmpty == false && this.NewSecretQuestionEmpty == false && this.NewSecretAnswerEmpty == false && this.NewPasswordEmpty == false && this.ConfirmPsaawordEmpty == false && this.PsdNotSame == false) {
        common_vendor.Ds.callFunction({
          name: "GetAllCustomerUser"
        }).then((res) => {
          var k = 0;
          for (var i = 0; i < res.result.data.length; i++) {
            if (res.result.data[i].Account == this.NewAccount) {
              k++;
              this.PromptMsg = "该账号已存在";
              this.$refs.message.open();
              break;
            }
          }
          if (k == 0) {
            common_vendor.Ds.callFunction({
              name: "AddNewCustomerUser",
              data: {
                Avatar: this.MerchantUserAvater,
                Account: this.NewAccount,
                NickName: this.NewNickName,
                SecretQuestion: this.NewSecretQuestion,
                SecretAnswer: this.NewAnswer,
                PassWord: this.NewPassword,
                AccountState: 1,
                LoginState: 0
              }
            }).then((res2) => {
              console.log(res2);
              common_vendor.index.showToast({
                title: "增设成功",
                duration: 1500
              });
              this.timer = setTimeout(() => {
                console.log("定时器循环");
                common_vendor.index.navigateTo({
                  url: "/pages/CustomerLogin/CustomerLogin"
                });
              }, 1500);
            });
          }
        });
      } else {
        this.PromptMsg = "请先按要求填写内容";
        this.$refs.message.open();
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_file_picker2 + _easycom_uni_easyinput2 + _easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_file_picker + _easycom_uni_easyinput + _easycom_uni_popup_message + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.MerchantUserAvater,
    b: common_vendor.o($options.AvatarLoadScs),
    c: common_vendor.o($options.FailAvatarLoad),
    d: common_vendor.p({
      limit: "1",
      ["del-icon"]: false,
      ["disable-preview"]: "false",
      imageStyles: $data.imageStyles,
      ["file-mediatype"]: "image"
    }),
    e: common_vendor.o($options.SendNewAccount),
    f: common_vendor.o(($event) => $data.NewAccount = $event),
    g: common_vendor.p({
      placeholder: "请输入手机号",
      trim: "all",
      type: "number",
      modelValue: $data.NewAccount
    }),
    h: $data.NewAccountEmpty
  }, $data.NewAccountEmpty ? {} : {}, {
    i: common_vendor.o($options.SendNickName),
    j: common_vendor.o(($event) => $data.NewNickName = $event),
    k: common_vendor.p({
      placeholder: "请输入昵称",
      trim: "all",
      modelValue: $data.NewNickName
    }),
    l: $data.NewNickNameEmpty
  }, $data.NewNickNameEmpty ? {} : {}, {
    m: common_vendor.o($options.SendSecretQuestion),
    n: common_vendor.o(($event) => $data.NewSecretQuestion = $event),
    o: common_vendor.p({
      placeholder: "请输入您的密保问题",
      trim: "all",
      modelValue: $data.NewSecretQuestion
    }),
    p: $data.NewSecretQuestionEmpty
  }, $data.NewSecretQuestionEmpty ? {} : {}, {
    q: common_vendor.o($options.SendAnswer),
    r: common_vendor.o(($event) => $data.NewAnswer = $event),
    s: common_vendor.p({
      placeholder: "请输入密保问题的答案",
      trim: "all",
      modelValue: $data.NewAnswer
    }),
    t: $data.NewSecretAnswerEmpty
  }, $data.NewSecretAnswerEmpty ? {} : {}, {
    v: common_vendor.o($options.SendNewPsd),
    w: common_vendor.o(($event) => $data.NewPassword = $event),
    x: common_vendor.p({
      placeholder: "请输入新密码",
      trim: "all",
      type: "password",
      modelValue: $data.NewPassword
    }),
    y: $data.NewPasswordEmpty
  }, $data.NewPasswordEmpty ? {} : {}, {
    z: common_vendor.o($options.CheckNewPsd),
    A: common_vendor.o(($event) => $data.NewConfirmPsd = $event),
    B: common_vendor.p({
      placeholder: "请再次输入密码",
      trim: "all",
      type: "password",
      modelValue: $data.NewConfirmPsd
    }),
    C: $data.PsdNotSame
  }, $data.PsdNotSame ? {} : {}, {
    D: $data.ConfirmPsaawordEmpty
  }, $data.ConfirmPsaawordEmpty ? {} : {}, {
    E: common_vendor.o((...args) => $options.SubmitNewMCTUser && $options.SubmitNewMCTUser(...args)),
    F: common_vendor.p({
      type: "error",
      message: $data.PromptMsg,
      duration: 2e3
    }),
    G: common_vendor.sr("message", "4d84e473-7"),
    H: common_vendor.p({
      type: "message"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway/pages/CustomeRegister/CustomeRegister.vue"]]);
wx.createPage(MiniProgramPage);
