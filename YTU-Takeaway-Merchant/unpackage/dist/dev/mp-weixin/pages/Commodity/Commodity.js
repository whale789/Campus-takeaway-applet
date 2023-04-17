"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      StoreId: "",
      value: "",
      GoodsSrc: "../../static/images/GoodsBackgroundTest.jpg",
      avatar: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
      SellerName: "山西刀削面",
      BusinessStatus: "营业中",
      SellerLocate: "七餐三楼",
      SellerMonth: "月售：",
      SellerMonthNumber: 800,
      SellerPicture: "/static/images/conditions-active.png",
      SellerJoinTime: "2023年4月6日",
      SellerLastTime: 23,
      GoodsPriceIcon: "￥",
      DeletePrompt: "",
      DeletePromptFront: "是否确定删除商品",
      DeleteClass: "",
      DeleteClassFront: "是否删除类别",
      ListCategory: [],
      PromptMessage: "",
      ClassId: "",
      GoodsId: "",
      timer: null,
      ClassName: "",
      GoodsName: "",
      ContentNeedUpdate: "",
      Updatecontent: "",
      index: 0,
      index0: 0,
      GoodsPrice: 0,
      imageStyles: {
        width: 120,
        height: 70
      },
      GoodsPicture: ""
    };
  },
  onHide() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
  onShow() {
    clearInterval(this.timer);
    this.timer = null;
    this.StoreId = "6437e58ef5cf3a3e090eab85";
    if (this.StoreId == 0)
      ;
    else {
      common_vendor.Ls.callFunction({
        name: "GetRTTMsgById",
        data: {
          StoreId: this.StoreId
        }
      }).then((res) => {
        this.SellerPicture = res.result.data[0].StorePicture;
        this.SellerName = res.result.data[0].StoreName;
        if (res.result.data[0].BusinessStatus == 1) {
          this.BusinessStatus = "营业中";
        } else {
          this.BusinessStatus = "休息中";
        }
        this.SellerLocate = res.result.data[0].Address;
        this.SellerJoinTime = res.result.data[0].SettledDate;
        let date1 = new Date();
        let date2 = new Date(Date.parse(res.result.data[0].SettledDate.replace(/-/g, "/")));
        let iDays = parseInt(Math.abs(date1.getTime() - date2.getTime()) / 1e3 / 60 / 60 / 24);
        this.SellerLastTime = iDays;
        this.SellerMonthNumber = 0;
        this.ListCategory = res.result.data[0].GoodsClass;
        for (var i = 0; i < res.result.data[0].GoodsClass.length; i++) {
          for (var j = 0; j < res.result.data[0].GoodsClass[i].GoodsDetail.length; j++) {
            this.SellerMonthNumber = this.SellerMonthNumber + res.result.data[0].GoodsClass[i].GoodsDetail[j].GoodsSoldNumber;
          }
        }
      });
    }
  },
  methods: {
    DeleteGoods(ClassId, GoodsId) {
      this.GoodsId = GoodsId;
      this.ClassId = ClassId;
      this.$refs.alertDialog.open();
    },
    dialogConfirm() {
      common_vendor.Ls.callFunction({
        name: "DeleteMerchantGoods",
        data: {
          StoreId: this.StoreId,
          GoodsId: this.GoodsId,
          ClassId: this.ClassId
        }
      }).then((res) => {
        common_vendor.index.showToast({
          title: "删除成功",
          duration: 1500
        });
        this.timer = setTimeout(() => {
          console.log("定时器循环");
          let pages = getCurrentPages();
          let page = pages[pages.length - 1];
          common_vendor.index.redirectTo({ url: page.$page.fullPath });
        }, 1500);
      });
    },
    DeleteClassWay(ClassId) {
      this.ClassId = ClassId;
      this.$refs.DeleteClassRef.open();
    },
    DeleteClassConfirm() {
      common_vendor.Ls.callFunction({
        name: "DeleteMerchantGoodsClass",
        data: {
          StoreId: this.StoreId,
          ClassId: this.ClassId
        }
      }).then((res) => {
        common_vendor.index.showToast({
          title: "删除成功"
        });
        this.timer = setTimeout(() => {
          console.log("定时器循环");
          let pages = getCurrentPages();
          let page = pages[pages.length - 1];
          common_vendor.index.redirectTo({ url: page.$page.fullPath });
        }, 1500);
      });
    },
    AddGoods(ClassId) {
      common_vendor.Ls.callFunction({
        name: "AddMerchantNewGoods",
        data: {
          StoreId: this.StoreId,
          ClassId
        }
      }).then((res) => {
        let pages = getCurrentPages();
        let page = pages[pages.length - 1];
        common_vendor.index.redirectTo({ url: page.$page.fullPath });
      });
    },
    AddClass() {
      common_vendor.Ls.callFunction({
        name: "AddMerchantNewClass",
        data: {
          StoreId: this.StoreId
        }
      }).then((res) => {
        console.log(res);
        let pages = getCurrentPages();
        let page = pages[pages.length - 1];
        common_vendor.index.redirectTo({ url: page.$page.fullPath });
      });
    },
    AddNewClass(ClassId, ClassName) {
      this.ClassId = ClassId;
      this.ClassName = ClassName;
      this.ContentNeedUpdate = ClassName;
      this.$refs.inputDialog.open();
    },
    UpdateNewClassName(val) {
      let value = val;
      if (value == "") {
        value = this.ClassName;
      }
      common_vendor.Ls.callFunction({
        name: "UpdateMerchantClassName",
        data: {
          StoreId: this.StoreId,
          ClassId: this.ClassId,
          ClassName: value
        }
      }).then((res) => {
        let pages = getCurrentPages();
        let page = pages[pages.length - 1];
        common_vendor.index.redirectTo({ url: page.$page.fullPath });
      });
    },
    AddNewGoodsName(ClassId, GoodsId, GoodsName, index, index0) {
      this.ClassId = ClassId;
      this.GoodsId = GoodsId;
      this.GoodsName = GoodsName;
      this.ContentNeedUpdate = GoodsName;
      this.index = index;
      this.index0 = index0;
      this.$refs.inputGoodsName.open();
    },
    UpdateNewGoodsName(val) {
      let value = val;
      if (value == "") {
        value = this.GoodsName;
      }
      common_vendor.Ls.callFunction({
        name: "UpdateMerchantGoodsName",
        data: {
          StoreId: this.StoreId,
          ClassId: this.ClassId,
          GoodsId: this.GoodsId,
          index: this.index,
          index0: this.index0,
          GoodsName: value
        }
      }).then((res) => {
        let pages = getCurrentPages();
        let page = pages[pages.length - 1];
        common_vendor.index.redirectTo({ url: page.$page.fullPath });
      });
    },
    AddNewGoodsPrice(ClassId, GoodsId, GoodsPrice, index, index0) {
      this.ClassId = ClassId;
      this.GoodsId = GoodsId;
      this.GoodsPrice = GoodsPrice;
      this.ContentNeedUpdate = GoodsPrice;
      this.index = index;
      this.index0 = index0;
      this.$refs.inputGoodsPrice.open();
    },
    UpdateNewGoodsPrice(val) {
      let value = val;
      if (value == "") {
        value = this.GoodsPrice;
      } else {
        const inputRule = /[^\d.]/g;
        let val2 = value.replace(inputRule, "");
        if (!val2) {
          value = this.GoodsPrice;
        } else {
          common_vendor.Ls.callFunction({
            name: "UpdateMerchantGooodsPrice",
            data: {
              StoreId: this.StoreId,
              ClassId: this.ClassId,
              GoodsId: this.GoodsId,
              index: this.index,
              index0: this.index0,
              GoodsPrice: value
            }
          }).then((res) => {
            let pages = getCurrentPages();
            let page = pages[pages.length - 1];
            common_vendor.index.redirectTo({ url: page.$page.fullPath });
          });
        }
      }
    },
    UpdatePictureLoadScs(e, ClassId, GoodsId, index, index0) {
      this.GoodsPicture = e.tempFilePaths[0];
      common_vendor.Ls.callFunction({
        name: "UpdateMerchantGoodsPicture",
        data: {
          StoreId: this.StoreId,
          ClassId,
          GoodsId,
          index,
          index0,
          GoodsPicture: this.GoodsPicture
        }
      }).then((res) => {
        console.log(res);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  (_easycom_uni_card2 + _easycom_uni_file_picker2 + _easycom_uni_icons2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_popup_message2)();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_file_picker + _easycom_uni_icons + _easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_popup_message)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.GoodsSrc,
    b: common_vendor.t($data.SellerLocate),
    c: common_vendor.t($data.SellerJoinTime),
    d: common_vendor.t($data.SellerLastTime),
    e: common_vendor.p({
      title: $data.SellerName,
      ["sub-title"]: $data.SellerMonth + $data.SellerMonthNumber,
      extra: $data.BusinessStatus,
      thumbnail: $data.SellerPicture
    }),
    f: common_vendor.o((...args) => $options.AddClass && $options.AddClass(...args)),
    g: common_vendor.f($data.ListCategory, (item, index, i0) => {
      return {
        a: common_vendor.t(item.ClassName),
        b: common_vendor.o(($event) => $options.AddNewClass(item.ClassID, item.ClassName), index),
        c: common_vendor.o(($event) => $options.AddGoods(item.ClassID), index),
        d: common_vendor.f(item.GoodsDetail, (item0, index0, i1) => {
          return {
            a: item0.GoodsPicture,
            b: common_vendor.o(($event) => $options.UpdatePictureLoadScs($event, item.ClassId, item0.GoodsId, index, index0), index0),
            c: "9d48faf0-2-" + i0 + "-" + i1 + "," + ("9d48faf0-1-" + i0),
            d: common_vendor.t(item0.GoodsName),
            e: common_vendor.o(($event) => $options.AddNewGoodsName(item.ClassID, item0.GoodsId, item0.GoodsName, index, index0), index0),
            f: common_vendor.t(item0.GoodsPrice),
            g: common_vendor.o(($event) => $options.AddNewGoodsPrice(item.ClassID, item0.GoodsId, item0.GoodsPrice, index, index0), index0),
            h: common_vendor.o(($event) => $options.DeleteGoods(item.ClassID, item0.GoodsId), index0),
            i: "9d48faf0-3-" + i0 + "-" + i1 + "," + ("9d48faf0-1-" + i0),
            j: index0
          };
        }),
        e: common_vendor.o(($event) => $options.DeleteClassWay(item.ClassID), index),
        f: "9d48faf0-1-" + i0,
        g: index
      };
    }),
    h: common_vendor.p({
      limit: "1",
      ["del-icon"]: false,
      ["disable-preview"]: "false",
      imageStyles: $data.imageStyles,
      ["file-mediatype"]: "image"
    }),
    i: common_vendor.p({
      type: "clear",
      size: "30",
      color: "red"
    }),
    j: common_vendor.p({
      title: "基础卡片",
      ["sub-title"]: "副标题",
      extra: "额外信息",
      padding: "10px 0"
    }),
    k: common_vendor.o($options.dialogConfirm),
    l: common_vendor.p({
      type: "warn",
      cancelText: "关闭",
      confirmText: "确定",
      title: "通知",
      content: $data.DeletePromptFront + $data.DeletePrompt
    }),
    m: common_vendor.sr("alertDialog", "9d48faf0-4"),
    n: common_vendor.p({
      type: "dialog"
    }),
    o: common_vendor.o($options.DeleteClassConfirm),
    p: common_vendor.p({
      type: "warn",
      cancelText: "关闭",
      confirmText: "确定",
      title: "通知",
      content: $data.DeleteClassFront + $data.DeleteClass
    }),
    q: common_vendor.sr("DeleteClassRef", "9d48faf0-6"),
    r: common_vendor.p({
      type: "dialog"
    }),
    s: common_vendor.p({
      type: "error",
      message: $data.PromptMessage,
      duration: 2e3
    }),
    t: common_vendor.sr("message", "9d48faf0-8"),
    v: common_vendor.p({
      type: "message"
    }),
    w: common_vendor.sr("inputClose", "9d48faf0-11,9d48faf0-10"),
    x: common_vendor.o($options.UpdateNewClassName),
    y: common_vendor.p({
      mode: "input",
      title: "修改种类名",
      value: $data.ContentNeedUpdate,
      placeholder: "请输入内容"
    }),
    z: common_vendor.sr("inputDialog", "9d48faf0-10"),
    A: common_vendor.p({
      type: "dialog"
    }),
    B: common_vendor.sr("inputClose", "9d48faf0-13,9d48faf0-12"),
    C: common_vendor.o($options.UpdateNewGoodsName),
    D: common_vendor.p({
      mode: "input",
      title: "修改商品名",
      value: $data.ContentNeedUpdate,
      placeholder: "请输入内容"
    }),
    E: common_vendor.sr("inputGoodsName", "9d48faf0-12"),
    F: common_vendor.p({
      type: "dialog"
    }),
    G: common_vendor.sr("inputClose", "9d48faf0-15,9d48faf0-14"),
    H: common_vendor.o($options.UpdateNewGoodsPrice),
    I: common_vendor.p({
      mode: "input",
      title: "修改商品价格",
      value: $data.ContentNeedUpdate,
      placeholder: "请输入内容"
    }),
    J: common_vendor.sr("inputGoodsPrice", "9d48faf0-14"),
    K: common_vendor.p({
      type: "dialog"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway-Merchant/pages/Commodity/Commodity.vue"]]);
wx.createPage(MiniProgramPage);
