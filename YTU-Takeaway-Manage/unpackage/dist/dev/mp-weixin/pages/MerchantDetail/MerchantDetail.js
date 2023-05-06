"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      Account: 0,
      ManagerName: "",
      StoreId: "",
      StorePicture: "https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/dc678af8-928b-42bd-b4dc-babf7e970091.jpg",
      StoreName: "土豆粉",
      Possessor: "李四",
      PossessorPhone: "15130380905",
      Address: "七餐三楼",
      BussinessState: "营业中",
      BussinessStyle: "color:green",
      StoreState: "正常",
      StoreStyle: "color:green",
      BusinessContent: "主要经营山西特色刀削面为主",
      PunishValue: 0,
      PunishList: [{ "value": 0, "text": "警告" }, { "value": 1, "text": "封禁1天" }, { "value": 2, "text": "封禁3天" }, { "value": 3, "text": "封禁7天" }, { "value": 4, "text": "永久封禁" }],
      PunishReason: "",
      IfPunish: true,
      ManagerAccount: "",
      ManagerName: "",
      PunishTime: "",
      PunishName: "",
      PunishReason: "",
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      PunishId: ""
    };
  },
  onLoad(option) {
    this.StoreId = option.StoreId;
    this.Account = 2640055850001;
    console.log(this.StoreId);
    common_vendor.Ds.callFunction({
      name: "GetRTTMsgById",
      data: {
        StoreId: this.StoreId
      }
    }).then((res) => {
      this.StorePicture = res.result.data[0].StorePicture;
      this.StoreName = res.result.data[0].StoreName;
      this.Possessor = res.result.data[0].Possessor;
      this.PossessorPhone = res.result.data[0].PossessorPhone;
      this.Address = res.result.data[0].Address;
      if (res.result.data[0].BusinessStatus == 1) {
        this.BussinessState = "营业中";
        this.BussinessStyle = "color:green";
      } else {
        this.BussinessState = "休息中";
        this.BussinessStyle = "color:grey";
      }
      if (res.result.data[0].OnboardingStatus == 1) {
        this.StoreState = "正常";
        this.StoreStyle = "color:green";
      } else {
        this.StoreState = "禁用";
        this.StoreStyle = "color:red";
      }
      this.BusinessContent = res.result.data[0].BusinessContent;
    });
    common_vendor.Ds.callFunction({
      name: "GetPunishByStoreId",
      data: {
        StoreId: this.StoreId
      }
    }).then((res) => {
      if (res.result.data.length == 0) {
        this.IfPunish = true;
      } else {
        for (var i = 0; i < res.result.data.length; i++) {
          if (res.result.data[i].PunishState == 1) {
            let Undate = res.result.data[i].UnblockingTime;
            let NowDate = new Date().getTime();
            let StimeDate = new Date(Undate).getTime();
            if (NowDate < StimeDate) {
              this.IfPunish = false;
              this.PunishId = res.result.data[i]._id;
              this.ManagerAccount = res.result.data[i].ManagerAccount;
              this.ManagerName = res.result.data[i].ManagerName;
              this.PunishTime = res.result.data[i].PunishTime;
              this.PunishName = res.result.data[i].PunishName;
              this.PunishReason = res.result.data[i].PunishReason;
              let date2 = new Date();
              let date1 = new Date(Date.parse(Undate.replace(/-/g, "/")));
              let iDays = parseInt(Math.abs(date1.getTime() - date2.getTime()) / 1e3 / 60 / 60 / 24);
              let dateDiff = StimeDate - NowDate;
              let residue1 = dateDiff % (24 * 3600 * 1e3);
              let hours = Math.floor(residue1 / (3600 * 1e3));
              let residue2 = residue1 % (3600 * 1e3);
              let minutes = Math.floor(residue2 / (60 * 1e3));
              let residue3 = residue2 % (60 * 1e3);
              let seconds = Math.round(residue3 / 1e3);
              this.days = iDays;
              this.hours = hours;
              this.minutes = minutes;
              this.seconds = seconds;
              break;
            } else {
              this.IfPunish = true;
              this.PunishId = res.result.data[i]._id;
              this.ManagerAccount = res.result.data[i].ManagerAccount;
              this.ManagerName = res.result.data[i].ManagerName;
              this.PunishTime = res.result.data[i].PunishTime;
              this.PunishName = res.result.data[i].PunishName;
              this.PunishReason = res.result.data[i].PunishReason;
              let Undate2 = res.result.data[i].UnblockingTime;
              let date2 = new Date();
              let date1 = new Date(Date.parse(Undate2.replace(/-/g, "/")));
              parseInt(Math.abs(date1.getTime() - date2.getTime()) / 1e3 / 60 / 60 / 24);
              this.PunishTimeOut();
              break;
            }
          }
        }
      }
    });
  },
  methods: {
    OpenPunishref() {
      this.$refs.ChoosePunish.open("bottom");
    },
    changePunish() {
      console.log(this.PunishValue);
    },
    FinishPunish() {
      if (this.PunishReason == "") {
        this.$refs.message.open("center");
      } else {
        common_vendor.Ds.callFunction({
          name: "GetManagerMsg",
          data: {
            Account: this.Account
          }
        }).then((res) => {
          this.ManagerName = res.result.data[0].name;
          let date2 = new Date();
          let year = date2.getFullYear();
          let month = date2.getMonth() + 1;
          let day = date2.getDate();
          let hour = date2.getHours() < 10 ? "0" + date2.getHours() : date2.getHours();
          let minute = date2.getMinutes() < 10 ? "0" + date2.getMinutes() : date2.getMinutes();
          let second = date2.getSeconds() < 10 ? "0" + date2.getSeconds() : date2.getSeconds();
          month >= 1 && month <= 9 ? month = "0" + month : "";
          day >= 0 && day <= 9 ? day = "0" + day : "";
          var timer = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
          var PunishLastTime = 0;
          let PunishName = "";
          if (this.PunishValue == 0) {
            PunishLastTime = 0;
            PunishName = "警告";
            common_vendor.Ds.callFunction({
              name: "AddNewPunish",
              data: {
                StoreId: this.StoreId,
                StoreName: this.StoreName,
                StorePicture: this.StorePicture,
                Possessor: this.Possessor,
                PossessorPhone: this.PossessorPhone,
                Address: this.Address,
                ManagerAccount: this.Account,
                ManagerName: this.ManagerName,
                PunishTime: timer,
                PunishLastTime,
                UnblockingTime: timer1,
                PunishName,
                PunishReason: this.PunishReason,
                PunishState: 0
              }
            }).then((res2) => {
              this.$refs.ChoosePunish.close();
              let pages = getCurrentPages();
              let page = pages[pages.length - 1];
              common_vendor.index.redirectTo({ url: page.$page.fullPath });
            });
          } else {
            if (this.PunishValue == 1) {
              PunishLastTime = 1;
              PunishName = "封禁1天";
            }
            if (this.PunishValue == 2) {
              PunishLastTime = 3;
              PunishName = "封禁3天";
            }
            if (this.PunishValue == 3) {
              PunishLastTime = 7;
              PunishName = "封禁7天";
            }
            if (this.PunishValue == 4) {
              PunishLastTime = 3650;
              PunishName = "永久封禁";
            }
            var now = new Date();
            let date = new Date(now.getTime() + PunishLastTime * 24 * 3600 * 1e3);
            let year1 = date.getFullYear();
            let month1 = date.getMonth() + 1;
            let day1 = date.getDate();
            let hour1 = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            let minute1 = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            let second1 = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            month1 >= 1 && month1 <= 9 ? month1 = "0" + month1 : "";
            day1 >= 0 && day1 <= 9 ? day1 = "0" + day1 : "";
            var timer1 = year1 + "-" + month1 + "-" + day1 + " " + hour1 + ":" + minute1 + ":" + second1;
            common_vendor.Ds.callFunction({
              name: "AddNewPunish",
              data: {
                StoreId: this.StoreId,
                StoreName: this.StoreName,
                StorePicture: this.StorePicture,
                Possessor: this.Possessor,
                PossessorPhone: this.PossessorPhone,
                Address: this.Address,
                ManagerAccount: this.Account,
                ManagerName: this.ManagerName,
                PunishTime: timer,
                PunishLastTime,
                UnblockingTime: timer1,
                PunishName,
                PunishReason: this.PunishReason,
                PunishState: 1
              }
            }).then((res2) => {
              common_vendor.Ds.callFunction({
                name: "UpdateMerchantStateById",
                data: {
                  StoreId: this.StoreId,
                  BusinessStatus: 0
                }
              }).then((ress) => {
                common_vendor.Ds.callFunction({
                  name: "UpdateMerchantOnboardingStatus",
                  data: {
                    StoreId: this.StoreId,
                    OnboardingStatus: 0
                  }
                }).then((resss) => {
                  this.$refs.ChoosePunish.close();
                  let pages = getCurrentPages();
                  let page = pages[pages.length - 1];
                  common_vendor.index.redirectTo({ url: page.$page.fullPath });
                });
              });
            });
          }
        });
      }
    },
    PunishTimeOut() {
      common_vendor.Ds.callFunction({
        name: "UpdatePunishState",
        data: {
          PunishId: this.PunishId,
          PunishState: 0
        }
      }).then((res) => {
        common_vendor.Ds.callFunction({
          name: "UpdateMerchantStateById",
          data: {
            StoreId: this.StoreId,
            BusinessStatus: 0
          }
        }).then((ress) => {
          common_vendor.Ds.callFunction({
            name: "UpdateMerchantOnboardingStatus",
            data: {
              StoreId: this.StoreId,
              OnboardingStatus: 1
            }
          }).then((resss) => {
            this.IfPunish = true;
            let pages = getCurrentPages();
            let page = pages[pages.length - 1];
            common_vendor.index.redirectTo({ url: page.$page.fullPath });
          });
        });
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_countdown2 = common_vendor.resolveComponent("uni-countdown");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  (_easycom_uni_countdown2 + _easycom_uni_data_checkbox2 + _easycom_uni_easyinput2 + _easycom_uni_popup2 + _easycom_uni_popup_message2)();
}
const _easycom_uni_countdown = () => "../../uni_modules/uni-countdown/components/uni-countdown/uni-countdown.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
if (!Math) {
  (_easycom_uni_countdown + _easycom_uni_data_checkbox + _easycom_uni_easyinput + _easycom_uni_popup + _easycom_uni_popup_message)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.StorePicture,
    b: common_vendor.t($data.StoreName),
    c: common_vendor.t($data.Possessor),
    d: common_vendor.t($data.PossessorPhone),
    e: common_vendor.t($data.Address),
    f: common_vendor.t($data.BusinessContent),
    g: common_vendor.t($data.BussinessState),
    h: common_vendor.s($data.BussinessStyle),
    i: common_vendor.t($data.StoreState),
    j: common_vendor.s($data.StoreStyle),
    k: $data.IfPunish
  }, $data.IfPunish ? {
    l: common_vendor.o((...args) => $options.OpenPunishref && $options.OpenPunishref(...args))
  } : {
    m: common_vendor.t($data.ManagerAccount),
    n: common_vendor.t($data.ManagerName),
    o: common_vendor.t($data.PunishReason),
    p: common_vendor.t($data.PunishTime),
    q: common_vendor.t($data.PunishName),
    r: common_vendor.o($options.PunishTimeOut),
    s: common_vendor.p({
      day: $data.days,
      hour: $data.hours,
      minute: $data.minutes,
      second: $data.seconds
    }),
    t: common_vendor.o((...args) => $options.PunishTimeOut && $options.PunishTimeOut(...args))
  }, {
    v: common_vendor.o($options.changePunish),
    w: common_vendor.o(($event) => $data.PunishValue = $event),
    x: common_vendor.p({
      selectedColor: "red",
      mode: "tag",
      localdata: $data.PunishList,
      modelValue: $data.PunishValue
    }),
    y: common_vendor.o(($event) => $data.PunishReason = $event),
    z: common_vendor.p({
      type: "textarea",
      placeholder: "请输入处罚原因",
      modelValue: $data.PunishReason
    }),
    A: common_vendor.o((...args) => $options.FinishPunish && $options.FinishPunish(...args)),
    B: common_vendor.sr("ChoosePunish", "6a6ce8e9-1"),
    C: common_vendor.p({
      ["background-color"]: "#fff"
    }),
    D: common_vendor.p({
      type: "error",
      message: "请填写处罚理由",
      duration: 2e3
    }),
    E: common_vendor.sr("message", "6a6ce8e9-4"),
    F: common_vendor.p({
      type: "message"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway-Manage/pages/MerchantDetail/MerchantDetail.vue"]]);
wx.createPage(MiniProgramPage);
