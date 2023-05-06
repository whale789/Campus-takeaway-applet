"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      OrderId: "",
      StoreId: "",
      CustomerPhone: "",
      CustomerName: "",
      CustomerAvatar: "",
      StorePicture: "",
      StoreName: "",
      FirstRate: 1,
      SecondRate: 1,
      ThirdRate: 1,
      AppraiseText: "",
      IsChecked: false,
      contentText: {
        contentDefault: "匿名评价",
        contentFav: "已匿名"
      },
      imageStyles: {
        width: 100,
        height: 100
      },
      PictureList: []
    };
  },
  onLoad(option) {
    console.log(option.OrderId);
    this.OrderId = option.OrderId;
    common_vendor.Ds.callFunction({
      name: "GetOrderById",
      data: {
        OrderId: this.OrderId
      }
    }).then((res) => {
      this.StoreId = res.result.data[0].StoreId;
      this.UserPhone = res.result.data[0].OrderUserPhone;
      common_vendor.Ds.callFunction({
        name: "GetRTTMsgById",
        data: {
          StoreId: this.StoreId
        }
      }).then((ress) => {
        this.StorePicture = ress.result.data[0].StorePicture;
        this.StoreName = ress.result.data[0].StoreName;
        common_vendor.Ds.callFunction({
          name: "GetUserMsg",
          data: {
            Account: this.UserPhone
          }
        }).then((resss) => {
          this.CustomerName = resss.result.data[0].NickName;
          this.CustomerAvatar = resss.result.data[0].Avatar;
        });
      });
    });
  },
  methods: {
    favClick() {
      this.IsChecked = !this.IsChecked;
    },
    PushPicToList(e) {
      this.PictureList.push(e.tempFilePaths[0]);
    },
    RemoveFromList(e) {
      var index;
      for (var i = 0; i < this.PictureList.length; i++) {
        if (this.PictureList[i] == e.tempFilePath) {
          index = i;
          break;
        }
      }
      this.PictureList.splice(index, 1);
    },
    HaveFirstRate(e) {
      this.FirstRate = e.value;
    },
    HaveSecondRate(e) {
      this.SecondRate = e.value;
    },
    HaveThirdtRate(e) {
      this.ThirdRate = e.value;
    },
    SumbitAppraise() {
      var Rate = (this.FirstRate + this.SecondRate + this.ThirdRate) / 3;
      let date2 = new Date();
      let year = date2.getFullYear();
      let month = date2.getMonth() + 1;
      let day = date2.getDate();
      month >= 1 && month <= 9 ? month = "0" + month : "";
      day >= 0 && day <= 9 ? day = "0" + day : "";
      var time = year + "-" + month + "-" + day;
      if (this.IsChecked == false) {
        common_vendor.Ds.callFunction({
          name: "AddToAppraise",
          data: {
            OrderId: this.OrderId,
            StoreId: this.StoreId,
            FirstRate: this.FirstRate,
            SecondRate: this.SecondRate,
            ThirdRate: this.ThirdRate,
            Rate,
            AppraiseText: this.AppraiseText,
            PictureList: this.PictureList,
            CustomerPhone: this.UserPhone,
            CustomerName: this.CustomerName,
            CustomerAvatar: this.CustomerAvatar,
            AppraiseTime: time,
            IsChecked: this.IsChecked,
            IsReply: false
          }
        }).then((res) => {
          common_vendor.Ds.callFunction({
            name: "UpdateOrderStateById",
            data: {
              OrderId: this.OrderId,
              OrderState: "已评价"
            }
          }).then((ress) => {
            common_vendor.index.switchTab({
              url: "/pages/Orders/Oreders"
            });
          });
        });
      } else {
        common_vendor.Ds.callFunction({
          name: "AddToAppraise",
          data: {
            OrderId: this.OrderId,
            StoreId: this.StoreId,
            FirstRate: this.FirstRate,
            SecondRate: this.SecondRate,
            ThirdRate: this.ThirdRate,
            Rate,
            AppraiseText: this.AppraiseText,
            PictureList: this.PictureList,
            CustomerPhone: this.UserPhone,
            CustomerName: "匿名用户",
            CustomerAvatar: "https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/ed7de8be-0096-41b4-bdd4-f58a00ef21e4.png",
            AppraiseTime: time,
            IsChecked: this.IsChecked,
            IsReply: false
          }
        }).then((res) => {
          common_vendor.Ds.callFunction({
            name: "UpdateOrderStateById",
            data: {
              OrderId: this.OrderId,
              OrderState: "已评价"
            }
          }).then((ress) => {
            common_vendor.index.switchTab({
              url: "/pages/Orders/Oreders"
            });
          });
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_fav2 = common_vendor.resolveComponent("uni-fav");
  (_easycom_uni_rate2 + _easycom_uni_file_picker2 + _easycom_uni_easyinput2 + _easycom_uni_fav2)();
}
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_fav = () => "../../uni_modules/uni-fav/components/uni-fav/uni-fav.js";
if (!Math) {
  (_easycom_uni_rate + _easycom_uni_file_picker + _easycom_uni_easyinput + _easycom_uni_fav)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.StorePicture,
    b: common_vendor.t($data.StoreName),
    c: common_vendor.o($options.HaveFirstRate),
    d: common_vendor.p({
      ["allow-half"]: true,
      value: $data.FirstRate
    }),
    e: common_vendor.o($options.HaveSecondRate),
    f: common_vendor.p({
      ["allow-half"]: true,
      value: $data.SecondRate
    }),
    g: common_vendor.o($options.HaveThirdtRate),
    h: common_vendor.p({
      ["allow-half"]: true,
      value: $data.ThirdRate
    }),
    i: common_vendor.o($options.PushPicToList),
    j: common_vendor.o($options.RemoveFromList),
    k: common_vendor.p({
      limit: "3",
      imageStyles: $data.imageStyles,
      title: "最多选择3张图片"
    }),
    l: common_vendor.o(($event) => $data.AppraiseText = $event),
    m: common_vendor.p({
      type: "textarea",
      placeholder: "请输入您的评价",
      modelValue: $data.AppraiseText
    }),
    n: common_vendor.o($options.favClick),
    o: common_vendor.p({
      bgColorChecked: "#a7a7a7",
      ["content-text"]: $data.contentText,
      checked: $data.IsChecked,
      star: false
    }),
    p: common_vendor.o((...args) => $options.SumbitAppraise && $options.SumbitAppraise(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway/pages/Appraise/Appraise.vue"]]);
wx.createPage(MiniProgramPage);
