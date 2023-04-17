"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      MerchantUserName: "Imaginary",
      MerchantUserPhone: "15130380905",
      MerchantUserAvater: "../../static/images/PersonalAvatar.jpg",
      imageStyles: {
        width: 80,
        height: 80,
        border: {
          radius: "50%"
        }
      },
      MonthOrdersNumber: 0,
      MonthOrdersMoneyFront: "￥",
      MonthOrdersMoney: 0,
      MonthBestSell: "*****",
      OverallRate: 0,
      ComplaintsNumber: 0,
      Logged: false,
      jsCode: "",
      openid: "",
      unionid: "",
      session_key: "",
      Account: "",
      MerchantMessage: "",
      MerchantRunning: false,
      NotHaveMerchant: true
    };
  },
  onShow() {
    let Account = getApp().globalData.Account;
    console.log(Account);
    this.Account = Account;
    if (Account == "0") {
      this.Logged = false;
    } else {
      this.Logged = true;
      common_vendor.Ls.callFunction({
        name: "GetMerchantUserMsg",
        data: {
          Account: this.Account
        }
      }).then((res) => {
        this.MerchantUserAvater = res.result.data[0].Avatar;
        this.MerchantUserName = res.result.data[0].NickName;
        this.MerchantUserPhone = res.result.data[0].Account;
      });
      common_vendor.Ls.callFunction({
        name: "GetRTTAllInUser",
        data: {
          PossessorPhone: this.Account
        }
      }).then((res) => {
        console.log(res);
        if (res.result.data.length == 0) {
          this.NotHaveMerchant = true;
          this.MerchantRunning = false;
          this.MonthOrdersNumber = 0;
          this.MonthOrdersMoney = 0;
          this.MonthBestSell = "*****";
          this.OverallRate = 0;
          this.ComplaintsNumber = 0;
        } else {
          if (res.result.data[0].OnboardingStatus == 1) {
            this.NotHaveMerchant = false;
            this.MerchantRunning = true;
            getApp().globalData.storeId = res.result.data[0]._id;
            this.OverallRate = res.result.data[0].OverallRate;
            this.ComplaintsNumber = res.result.data[0].ComplaintNumber;
            var max = -1;
            for (var i = 0; i < res.result.data[0].GoodsClass.length; i++) {
              for (var j = 0; j < res.result.data[0].GoodsClass[i].GoodsDetail.length; j++) {
                this.MonthOrdersNumber = this.MonthOrdersNumber + res.result.data[0].GoodsClass[i].GoodsDetail[j].GoodsSoldNumber;
                var num = res.result.data[0].GoodsClass[i].GoodsDetail[j].GoodsSoldNumber * res.result.data[0].GoodsClass[i].GoodsDetail[j].GoodsPrice;
                num = Math.floor(num * 100) / 100;
                this.MonthOrdersMoney = this.MonthOrdersMoney + num;
                if (res.result.data[0].GoodsClass[i].GoodsDetail[j].GoodsSoldNumber > max) {
                  max = res.result.data[0].GoodsClass[i].GoodsDetail[j].GoodsSoldNumber;
                  this.MonthBestSell = res.result.data[0].GoodsClass[i].GoodsDetail[j].GoodsName;
                }
              }
            }
            this.MonthOrdersMoney = Math.floor(this.MonthOrdersMoney * 100) / 100;
          } else {
            this.MonthOrdersNumber = 0;
            this.MonthOrdersMoney = 0;
            this.MonthBestSell = "*****";
            this.OverallRate = 0;
            this.ComplaintsNumber = 0;
          }
        }
      });
    }
  },
  methods: {
    FileLoadScs(e) {
      console.log(e);
    },
    MerChantLogin() {
      common_vendor.index.navigateTo({
        url: "/pages/MerChantLogin/MerChantLogin"
      });
    },
    MerchantLoginOut() {
      common_vendor.Ls.callFunction({
        name: "UpdateMerchantLoginState",
        data: {
          Account: this.Account,
          State: 0
        }
      }).then((res) => {
        this.Logged = false;
        getApp().globalData.Account = "0";
      });
    },
    MyShop() {
      common_vendor.Ls.callFunction({
        name: "GetRTTAllInUser",
        data: {
          PossessorPhone: this.Account
        }
      }).then((res) => {
        if (res.result.data.length == 0) {
          this.MerchantMessage = "您未拥有入驻店铺";
          this.$refs.message.open();
        } else {
          if (res.result.data[0].OnboardingStatus == 0) {
            this.MerchantMessage = "店铺已经退出外卖平台或因违规被封号";
            this.$refs.message.open();
          } else {
            common_vendor.index.navigateTo({
              url: "/pages/StoreDetails/StoreDetails"
            });
          }
        }
      });
    },
    OpenShop() {
      common_vendor.index.navigateTo({
        url: "/pages/StoreDetails/StoreDetails"
      });
    },
    ApplyForOccupancy() {
      common_vendor.index.navigateTo({
        url: "/pages/MerchantSettle/MerchantSettle"
      });
    },
    ApplyMerchantExit() {
      common_vendor.index.navigateTo({
        url: "/pages/MerchantExit/MerchantExit"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_tooltip2 = common_vendor.resolveComponent("uni-tooltip");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_file_picker2 + _easycom_uni_icons2 + _easycom_uni_tooltip2 + _easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_tooltip = () => "../../uni_modules/uni-tooltip/components/uni-tooltip/uni-tooltip.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_file_picker + _easycom_uni_icons + _easycom_uni_tooltip + _easycom_uni_popup_message + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.Logged
  }, $data.Logged ? common_vendor.e({
    b: $data.MerchantUserAvater,
    c: common_vendor.o($options.FileLoadScs),
    d: common_vendor.p({
      limit: "1",
      ["del-icon"]: false,
      ["disable-preview"]: "false",
      imageStyles: $data.imageStyles,
      ["file-mediatype"]: "image"
    }),
    e: common_vendor.t($data.MerchantUserName),
    f: common_vendor.t($data.MerchantUserPhone),
    g: common_vendor.p({
      type: "compose"
    }),
    h: common_vendor.p({
      type: "shop-filled",
      size: "50",
      color: "#a2a2a2"
    }),
    i: common_vendor.o((...args) => $options.MyShop && $options.MyShop(...args)),
    j: common_vendor.t($data.MonthOrdersNumber),
    k: common_vendor.t($data.MonthOrdersMoneyFront + $data.MonthOrdersMoney),
    l: common_vendor.t($data.MonthBestSell),
    m: common_vendor.p({
      content: $data.MonthBestSell
    }),
    n: common_vendor.t($data.OverallRate),
    o: common_vendor.t($data.ComplaintsNumber),
    p: $data.MerchantRunning
  }, $data.MerchantRunning ? {
    q: common_vendor.p({
      type: "forward",
      size: "15",
      color: "#9d9d9d"
    })
  } : {}, {
    r: $data.NotHaveMerchant
  }, $data.NotHaveMerchant ? {
    s: common_vendor.p({
      type: "forward",
      size: "15",
      color: "#9d9d9d"
    }),
    t: common_vendor.o((...args) => $options.ApplyForOccupancy && $options.ApplyForOccupancy(...args))
  } : {}, {
    v: $data.MerchantRunning
  }, $data.MerchantRunning ? {
    w: common_vendor.p({
      type: "forward",
      size: "15",
      color: "#9d9d9d"
    }),
    x: common_vendor.o((...args) => $options.ApplyMerchantExit && $options.ApplyMerchantExit(...args))
  } : {}, {
    y: common_vendor.o((...args) => $options.MerchantLoginOut && $options.MerchantLoginOut(...args))
  }) : {
    z: common_vendor.o($options.FileLoadScs),
    A: common_vendor.p({
      limit: "1",
      ["del-icon"]: false,
      ["disable-preview"]: "false",
      imageStyles: $data.imageStyles,
      ["file-mediatype"]: "image"
    }),
    B: common_vendor.o((...args) => $options.MerChantLogin && $options.MerChantLogin(...args)),
    C: common_vendor.p({
      type: "shop-filled",
      size: "50",
      color: "#a2a2a2"
    }),
    D: common_vendor.o((...args) => $options.MerChantLogin && $options.MerChantLogin(...args)),
    E: common_vendor.o((...args) => $options.MerChantLogin && $options.MerChantLogin(...args)),
    F: common_vendor.o((...args) => $options.MerChantLogin && $options.MerChantLogin(...args)),
    G: common_vendor.p({
      content: $data.MonthBestSell
    }),
    H: common_vendor.o((...args) => $options.MerChantLogin && $options.MerChantLogin(...args)),
    I: common_vendor.o((...args) => $options.MerChantLogin && $options.MerChantLogin(...args)),
    J: common_vendor.o((...args) => $options.MerChantLogin && $options.MerChantLogin(...args)),
    K: common_vendor.p({
      type: "forward",
      size: "15",
      color: "#9d9d9d"
    }),
    L: common_vendor.o((...args) => $options.MerChantLogin && $options.MerChantLogin(...args)),
    M: common_vendor.p({
      type: "forward",
      size: "15",
      color: "#9d9d9d"
    }),
    N: common_vendor.o((...args) => $options.MerChantLogin && $options.MerChantLogin(...args)),
    O: common_vendor.p({
      type: "forward",
      size: "15",
      color: "#9d9d9d"
    }),
    P: common_vendor.o((...args) => $options.MerChantLogin && $options.MerChantLogin(...args)),
    Q: common_vendor.o((...args) => $options.MerChantLogin && $options.MerChantLogin(...args))
  }, {
    R: common_vendor.p({
      type: "error",
      message: $data.MerchantMessage,
      duration: 2e3
    }),
    S: common_vendor.sr("message", "573541a8-13"),
    T: common_vendor.p({
      type: "message"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway-Merchant/pages/Conditions/Conditions.vue"]]);
wx.createPage(MiniProgramPage);
