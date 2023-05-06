"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      sex: [{
        text: "先生",
        value: 0
      }, {
        text: "女士",
        value: 1
      }],
      value: 0,
      Address: "烟台大学北校区12号楼",
      Doorplate: "A516",
      Contact: "张乾",
      Phone: "15130380905",
      gender: "",
      styles: {
        borderColor: "#FFFFFF"
      },
      AddressId: "",
      AddressChoose: [
        {
          text: "烟台大学北校区",
          value: "1-0",
          children: [
            {
              text: "1号楼",
              value: "1-1"
            },
            {
              text: "2号楼",
              value: "1-2"
            },
            {
              text: "3号楼",
              value: "1-3"
            },
            {
              text: "4号楼",
              value: "1-4"
            },
            {
              text: "5号楼",
              value: "1-5"
            },
            {
              text: "6号楼",
              value: "1-6"
            },
            {
              text: "7号楼",
              value: "1-7"
            },
            {
              text: "8号楼",
              value: "1-8"
            }
          ]
        },
        {
          text: "烟台大学南校区",
          value: "2-0",
          children: [
            {
              text: "1号楼",
              value: "2-1"
            },
            {
              text: "2号楼",
              value: "2-2"
            },
            {
              text: "3号楼",
              value: "2-3"
            },
            {
              text: "4号楼",
              value: "2-4"
            },
            {
              text: "5号楼",
              value: "2-5"
            },
            {
              text: "6号楼",
              value: "2-6"
            },
            {
              text: "7号楼",
              value: "2-7"
            },
            {
              text: "8号楼",
              value: "2-8"
            }
          ]
        }
      ],
      NotChoose: true,
      ErrorMessage: "",
      UpdataOrCreate: true,
      Account: "",
      Type: 0
    };
  },
  onLoad(option) {
    let Account = getApp().globalData.Account;
    this.Account = Account;
    this.Type = option.Type;
    if (option.Type == 0) {
      this.AddressId = option.AddressId;
      this.UpdataOrCreate = true;
      common_vendor.Ds.callFunction({
        name: "GetAddressDetailById",
        data: {
          AddressId: this.AddressId
        }
      }).then((res) => {
        this.Address = res.result.data[0].Address;
        this.Doorplate = res.result.data[0].Doorplate;
        this.Contact = res.result.data[0].Contact;
        this.Phone = res.result.data[0].Phone;
        if (res.result.data[0].gender == "先生") {
          this.value = 0;
          this.gender = "先生";
        } else {
          this.value = 1;
          this.gender = "女士";
        }
      });
    } else {
      this.UpdataOrCreate = false;
      this.Address = "烟台大学北校区1号楼";
      this.Doorplate = "";
      this.Contact = "";
      this.Phone = "";
      this.value = 0;
      this.gender = "先生";
    }
  },
  methods: {
    OpenChoose() {
      this.NotChoose = false;
    },
    SelectInOrder(e) {
      var first = e.detail.value[0].text;
      var second = e.detail.value[1].text;
      this.Address = first + second;
    },
    ChooseSex(e) {
      console.log(e.detail.data.text);
      this.gender = e.detail.data.text;
    },
    SaveAddress() {
      if (this.Contact == "") {
        this.ErrorMessage = "联系人不能为空";
        this.$refs.message.open("center");
      } else {
        if (this.Phone == "") {
          this.ErrorMessage = "手机号不能为空";
          this.$refs.message.open("center");
        } else {
          common_vendor.Ds.callFunction({
            name: "UpdateAddressById",
            data: {
              AddressId: this.AddressId,
              Address: this.Address,
              Doorplate: this.Doorplate,
              Contact: this.Contact,
              Phone: this.Phone,
              gender: this.gender
            }
          }).then((res) => {
            common_vendor.index.navigateBack({
              delta: 1
              //返回层数，2则上上页
            });
          });
        }
      }
    },
    DeleteAddress() {
      this.$refs.alertDialog.open();
    },
    dialogConfirm() {
      common_vendor.Ds.callFunction({
        name: "DeleteAddressById",
        data: {
          AddressId: this.AddressId
        }
      }).then((res) => {
        common_vendor.index.navigateBack({
          delta: 1
          //返回层数，2则上上页
        });
      });
    },
    CreateAddress() {
      if (this.Contact == "") {
        this.ErrorMessage = "联系人不能为空";
        this.$refs.message.open("center");
      } else {
        if (this.Phone == "") {
          this.ErrorMessage = "手机号不能为空";
          this.$refs.message.open("center");
        } else {
          common_vendor.Ds.callFunction({
            name: "AddNewAddress",
            data: {
              Address: this.Address,
              Doorplate: this.Doorplate,
              Contact: this.Contact,
              Phone: this.Phone,
              Possessor: this.Account,
              gender: this.gender
            }
          }).then((res) => {
            common_vendor.index.navigateBack({
              delta: 1
              //返回层数，2则上上页
            });
          });
        }
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  (_easycom_uni_data_picker2 + _easycom_uni_icons2 + _easycom_uni_easyinput2 + _easycom_uni_data_checkbox2 + _easycom_uni_popup_message2 + _easycom_uni_popup2 + _easycom_uni_popup_dialog2)();
}
const _easycom_uni_data_picker = () => "../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
if (!Math) {
  (_easycom_uni_data_picker + _easycom_uni_icons + _easycom_uni_easyinput + _easycom_uni_data_checkbox + _easycom_uni_popup_message + _easycom_uni_popup + _easycom_uni_popup_dialog)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.UpdataOrCreate
  }, $data.UpdataOrCreate ? common_vendor.e({
    b: $data.NotChoose
  }, $data.NotChoose ? {
    c: common_vendor.t($data.Address)
  } : {
    d: common_vendor.sr("chooseAddress", "cb0125e2-0"),
    e: common_vendor.o($options.SelectInOrder),
    f: common_vendor.o(($event) => $data.Address = $event),
    g: common_vendor.p({
      localdata: $data.AddressChoose,
      ["popup-title"]: "请选择地址",
      modelValue: $data.Address
    })
  }, {
    h: $data.NotChoose
  }, $data.NotChoose ? {
    i: common_vendor.p({
      type: "forward",
      size: "20",
      color: "#bebebe"
    })
  } : {
    j: common_vendor.p({
      type: "forward",
      size: "20",
      color: "#bebebe"
    })
  }, {
    k: common_vendor.o((...args) => $options.OpenChoose && $options.OpenChoose(...args)),
    l: common_vendor.o(($event) => $data.Doorplate = $event),
    m: common_vendor.p({
      styles: $data.styles,
      modelValue: $data.Doorplate
    }),
    n: common_vendor.o(($event) => $data.Contact = $event),
    o: common_vendor.p({
      styles: $data.styles,
      modelValue: $data.Contact
    }),
    p: common_vendor.o($options.ChooseSex),
    q: common_vendor.o(($event) => $data.value = $event),
    r: common_vendor.p({
      localdata: $data.sex,
      modelValue: $data.value
    }),
    s: common_vendor.o(($event) => $data.Phone = $event),
    t: common_vendor.p({
      styles: $data.styles,
      modelValue: $data.Phone
    }),
    v: common_vendor.o((...args) => $options.SaveAddress && $options.SaveAddress(...args)),
    w: common_vendor.o((...args) => $options.DeleteAddress && $options.DeleteAddress(...args))
  }) : common_vendor.e({
    x: $data.NotChoose
  }, $data.NotChoose ? {
    y: common_vendor.t($data.Address)
  } : {
    z: common_vendor.sr("chooseAddress", "cb0125e2-7"),
    A: common_vendor.o($options.SelectInOrder),
    B: common_vendor.o(($event) => $data.Address = $event),
    C: common_vendor.p({
      localdata: $data.AddressChoose,
      ["popup-title"]: "请选择地址",
      modelValue: $data.Address
    })
  }, {
    D: $data.NotChoose
  }, $data.NotChoose ? {
    E: common_vendor.p({
      type: "forward",
      size: "20",
      color: "#bebebe"
    })
  } : {
    F: common_vendor.p({
      type: "forward",
      size: "20",
      color: "#bebebe"
    })
  }, {
    G: common_vendor.o((...args) => $options.OpenChoose && $options.OpenChoose(...args)),
    H: common_vendor.o(($event) => $data.Doorplate = $event),
    I: common_vendor.p({
      styles: $data.styles,
      modelValue: $data.Doorplate
    }),
    J: common_vendor.o(($event) => $data.Contact = $event),
    K: common_vendor.p({
      styles: $data.styles,
      modelValue: $data.Contact
    }),
    L: common_vendor.o($options.ChooseSex),
    M: common_vendor.o(($event) => $data.value = $event),
    N: common_vendor.p({
      localdata: $data.sex,
      modelValue: $data.value
    }),
    O: common_vendor.o(($event) => $data.Phone = $event),
    P: common_vendor.p({
      styles: $data.styles,
      modelValue: $data.Phone
    }),
    Q: common_vendor.o((...args) => $options.CreateAddress && $options.CreateAddress(...args))
  }), {
    R: common_vendor.p({
      type: "error",
      message: $data.ErrorMessage,
      duration: 2e3
    }),
    S: common_vendor.sr("message", "cb0125e2-14"),
    T: common_vendor.p({
      type: "message"
    }),
    U: common_vendor.o($options.dialogConfirm),
    V: common_vendor.p({
      type: "warn",
      cancelText: "关闭",
      confirmText: "确定",
      title: "通知",
      content: "确定删除该地址"
    }),
    W: common_vendor.sr("alertDialog", "cb0125e2-16"),
    X: common_vendor.p({
      type: "dialog"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway/pages/AddressDetail/AddressDetail.vue"]]);
wx.createPage(MiniProgramPage);
