"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      AppraiseList: [],
      StorePicture: "https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/7ccea677-5716-405d-bcc7-4af2448bed60.jpg",
      PictureList: [
        "https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/7ccea677-5716-405d-bcc7-4af2448bed60.jpg",
        "https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/46ae90b3-d7ff-4612-a5d9-52de6bd0ecbe.png",
        "https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/aee982e5-a48e-4d72-86e7-8ea6e8128a81.jpg"
      ],
      StoreName: "山西刀削面",
      AppraiseTime: "2023-04-25",
      AppraiseText: "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
      ReplyText: "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
      StoreMessage: [],
      AppraiseId: ""
    };
  },
  onShow() {
    let Account = getApp().globalData.Account;
    this.Account = Account;
    let that = this;
    common_vendor.Ds.callFunction({
      name: "GetAppraiseByUserPhone",
      data: {
        CustomerPhone: this.Account
      }
    }).then((res) => {
      this.AppraiseList = res.result.data;
      for (var i = 0; i < that.AppraiseList.length; i++) {
        common_vendor.Ds.callFunction({
          name: "GetRTTMsgById",
          data: {
            StoreId: this.AppraiseList[i].StoreId
          }
        }).then((ress) => {
          this.StoreMessage.push({
            "StoreName": ress.result.data[0].StoreName,
            "StorePicture": ress.result.data[0].StorePicture
          });
        });
      }
    });
  },
  methods: {
    DeleteMyAppraise(id) {
      this.AppraiseId = id;
      this.$refs.DeleteSure.open();
    },
    dialogConfirm() {
      common_vendor.Ds.callFunction({
        name: "DeleteAppraise",
        data: {
          AppraiseId: this.AppraiseId
        }
      }).then((res) => {
        this.$refs.DeleteSure.close();
        let pages = getCurrentPages();
        let page = pages[pages.length - 1];
        common_vendor.index.redirectTo({ url: page.$page.fullPath });
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_rate2 + _easycom_uni_icons2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_rate + _easycom_uni_icons + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.AppraiseList, (item, index, i0) => {
      return common_vendor.e({
        a: $data.StoreMessage[index].StorePicture,
        b: common_vendor.t($data.StoreMessage[index].StoreName),
        c: common_vendor.t(item.AppraiseTime),
        d: "585b1863-0-" + i0,
        e: common_vendor.p({
          size: "17",
          readonly: true,
          ["allow-half"]: true,
          value: item.FirstRate
        }),
        f: common_vendor.t(item.SecondRate),
        g: common_vendor.t(item.ThirdRate),
        h: common_vendor.t(item.AppraiseText),
        i: common_vendor.f(item.PictureList, (item0, index0, i1) => {
          return {
            a: item0,
            b: index0
          };
        }),
        j: item.IsReply
      }, item.IsReply ? {
        k: common_vendor.t(item.ReplyDate),
        l: common_vendor.t(item.ReplyText)
      } : {}, {
        m: item.IsChecked
      }, item.IsChecked ? {} : {}, {
        n: "585b1863-1-" + i0,
        o: common_vendor.o(($event) => $options.DeleteMyAppraise(item._id), index),
        p: index
      });
    }),
    b: common_vendor.p({
      type: "trash-filled",
      size: "20",
      color: "#767676"
    }),
    c: common_vendor.o($options.dialogConfirm),
    d: common_vendor.p({
      type: _ctx.msgType,
      cancelText: "关闭",
      confirmText: "同意",
      title: "通知",
      content: "确定删除该评价吗？"
    }),
    e: common_vendor.sr("DeleteSure", "585b1863-2"),
    f: common_vendor.p({
      type: "dialog"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway/pages/AppraiseList/AppraiseList.vue"]]);
wx.createPage(MiniProgramPage);
