"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      SellerMonthNumber: 0,
      SellerLastTime: 23,
      SellerJoinTime: "2023年4月6日",
      SellerLocate: "七餐三楼",
      BusinessStatus: "营业中",
      SellerName: "山西刀削面",
      GoodsSrc: "../../static/images/GoodsBackgroundTest.jpg",
      SellerMonth: "月售：",
      id: "",
      RTTMsg: [],
      SellerPicture: "https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/dc678af8-928b-42bd-b4dc-babf7e970091.jpg",
      currentList: 0,
      items: ["点菜", "评价"],
      scrollTop: 0,
      //tab标题的滚动条位置
      oldScrollTop: 0,
      // tab标题的滚动条旧位置
      current: 0,
      // 预设当前项的值
      menuHeight: 0,
      // 左边菜单的高度
      menuItemHeight: 0,
      // 左边菜单item的高度
      itemId: "",
      // 栏目右边scroll-view用于滚动的id
      arr: [],
      // 储存距离顶部高度的数组
      scrollRightTop: 0,
      // 右边栏目scroll-view的滚动条高度
      timer: null,
      // 定时器
      DeliveryFees: 0,
      DropOffee: 0,
      ShoppingNumber: 0,
      IfOpen: false,
      CartList: [],
      GoodsNumber: 1,
      CartTotalMoney: 0,
      CartNull: true,
      NotSend: true,
      Account: "",
      NotCollection: true,
      MerchantPhone: "",
      CustomerAvatar: "https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/cc3a9fc9-8d3f-4063-83d2-4c75bf973758.jpg",
      CustomerName: "张三",
      AppraiseTime: "2023-04-26",
      AppraiseText: "味道很不错",
      PictureList: [
        "https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/7ccea677-5716-405d-bcc7-4af2448bed60.jpg",
        "https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/46ae90b3-d7ff-4612-a5d9-52de6bd0ecbe.png",
        "https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/aee982e5-a48e-4d72-86e7-8ea6e8128a81.jpg"
      ],
      IsReply: true,
      ReplyText: "谢谢您的评价",
      AppraiseList: [],
      handoff: true,
      FRate: 0,
      SecondRate: 0,
      ThirdRate: 0
    };
  },
  onReady() {
    this.getMenuItemTop();
  },
  onLoad(option) {
    let id = option.id;
    this.id = id;
    let Account = getApp().globalData.Account;
    this.Account = Account;
    common_vendor.Ds.callFunction({
      name: "GetRTTMsgById",
      data: {
        StoreId: id
      }
    }).then((res) => {
      console.log(res);
      this.RTTMsg = res.result.data[0].GoodsClass;
      this.DeliveryFees = res.result.data[0].DeliveryFees;
      this.DropOffee = res.result.data[0].DropOffee;
      this.SellerName = res.result.data[0].StoreName;
      this.SellerPicture = res.result.data[0].StorePicture;
      this.SellerLocate = res.result.data[0].Address;
      this.MerchantPhone = res.result.data[0].PossessorPhone;
      if (res.result.data[0].BusinessStatus == 1) {
        this.BusinessStatus = "营业中";
      } else {
        this.BusinessStatus = "休息中";
      }
      this.SellerJoinTime = res.result.data[0].SettledDate;
      for (var i = 0; i < res.result.data[0].GoodsClass.length; i++) {
        for (var j = 0; j < res.result.data[0].GoodsClass[i].GoodsDetail.length; j++) {
          this.SellerMonthNumber = this.SellerMonthNumber + res.result.data[0].GoodsClass[i].GoodsDetail[j].GoodsSoldNumber;
        }
      }
      let date1 = new Date();
      let date2 = new Date(Date.parse(res.result.data[0].SettledDate.replace(/-/g, "/")));
      let iDays = parseInt(Math.abs(date1.getTime() - date2.getTime()) / 1e3 / 60 / 60 / 24);
      this.SellerLastTime = iDays;
    });
    common_vendor.Ds.callFunction({
      name: "GetCollectionState",
      data: {
        StoreId: this.id,
        Account: this.Account
      }
    }).then((res) => {
      if (res.result.data.length == 0) {
        this.NotCollection = true;
      } else {
        this.NotCollection = false;
      }
    });
    common_vendor.Ds.callFunction({
      name: "GetAppraiseByStoreId",
      data: {
        StoreId: this.id
      }
    }).then((res) => {
      this.AppraiseList = res.result.data;
      var FRate = 0;
      var SRate = 0;
      var TRate = 0;
      for (var i = 0; i < res.result.data.length; i++) {
        FRate = FRate + res.result.data[i].Rate;
        SRate = SRate + res.result.data[i].SecondRate;
        TRate = TRate + res.result.data[i].ThirdRate;
      }
      this.FRate = FRate / res.result.data.length;
      this.SecondRate = SRate / res.result.data.length;
      this.ThirdRate = TRate / res.result.data.length;
    });
  },
  methods: {
    onClickItem(e) {
      if (this.currentList !== e.currentIndex) {
        this.currentList = e.currentIndex;
        this.handoff = !this.handoff;
      }
    },
    async swichMenu(index) {
      if (this.arr.length == 0) {
        await this.getMenuItemTop();
      }
      if (index == this.current)
        return;
      this.scrollRightTop = this.oldScrollTop;
      this.$nextTick(function() {
        this.scrollRightTop = this.arr[index];
        this.current = index;
        this.leftMenuStatus(index);
      });
    },
    getElRect(elClass, dataVal) {
      new Promise((resolve, reject) => {
        const query = common_vendor.index.createSelectorQuery().in(this);
        query.select("." + elClass).fields({
          size: true
        }, (res) => {
          if (!res) {
            setTimeout(() => {
              this.getElRect(elClass);
            }, 10);
            return;
          }
          this[dataVal] = res.height;
          resolve();
        }).exec();
      });
    },
    // 观测元素相交状态
    async observer() {
      this.RTTMsg.map((val, index) => {
        let observer = common_vendor.index.createIntersectionObserver(this);
        observer.relativeTo(".right-box", {
          top: 0
        }).observe("#item" + index, (res) => {
          if (res.intersectionRatio > 0) {
            let id = res.id.substring(4);
            this.leftMenuStatus(id);
          }
        });
      });
    },
    // 设置左边菜单的滚动状态
    async leftMenuStatus(index) {
      this.current = index;
      if (this.menuHeight == 0 || this.menuItemHeight == 0) {
        await this.getElRect("menu-scroll-view", "menuHeight");
        await this.getElRect("u-tab-item", "menuItemHeight");
      }
      this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
    },
    // 获取右边菜单每个item到顶部的距离
    getMenuItemTop() {
      new Promise((resolve) => {
        let selectorQuery = common_vendor.index.createSelectorQuery();
        selectorQuery.selectAll(".class-item").boundingClientRect((rects) => {
          if (!rects.length) {
            setTimeout(() => {
              this.getMenuItemTop();
            }, 10);
            return;
          }
          rects.forEach((rect) => {
            this.arr.push(rect.top - rects[0].top);
            resolve();
          });
        }).exec();
      });
    },
    // 右边菜单滚动
    async rightScroll(e) {
      this.oldScrollTop = e.detail.scrollTop;
      if (this.arr.length == 0) {
        await this.getMenuItemTop();
      }
      if (this.timer)
        return;
      if (!this.menuHeight) {
        await this.getElRect("menu-scroll-view", "menuHeight");
      }
      setTimeout(() => {
        this.timer = null;
        let scrollHeight = e.detail.scrollTop + this.menuHeight / 2;
        for (let i = 0; i < this.arr.length; i++) {
          let height1 = this.arr[i];
          let height2 = this.arr[i + 1];
          if (!height2 || scrollHeight >= height1 && scrollHeight < height2) {
            this.leftMenuStatus(i);
            return;
          }
        }
      }, 10);
    },
    OpenShoppingList() {
      if (this.CartList.length == 0) {
        this.CartNull = true;
      } else {
        this.IfOpen = !this.IfOpen;
        if (this.IfOpen == true) {
          this.$refs.popup.open("bottom");
        } else {
          this.$refs.popup.close();
        }
      }
    },
    AddToCart(GoodsPicture, GoodsName, GoodsPrice, index, index1) {
      if (this.Account == "0") {
        this.$refs.message.open("center");
      } else {
        this.CartNull = false;
        var k = 0;
        for (var i = 0; i < this.CartList.length; i++) {
          if (this.CartList[i].index == index && this.CartList[i].index1 == index1) {
            this.CartList[i].NumberInCart = this.CartList[i].NumberInCart + 1;
            this.CartTotalMoney = this.CartTotalMoney + this.CartList[i].GoodsPrice;
            if (this.CartTotalMoney > this.DropOffee) {
              this.NotSend = false;
            } else {
              this.DropOffee = this.DropOffee - this.CartTotalMoney;
              this.NotSend = true;
            }
            this.ShoppingNumber = this.ShoppingNumber + 1;
            k++;
            break;
          }
        }
        if (k == 0) {
          this.CartList.push({
            StoreId: this.id,
            GoodsPicture,
            GoodsName,
            GoodsPrice,
            index,
            index1,
            NumberInCart: 1
          });
          this.ShoppingNumber = this.ShoppingNumber + 1;
          this.CartTotalMoney = this.CartTotalMoney + GoodsPrice;
          if (this.CartTotalMoney > this.DropOffee) {
            this.NotSend = false;
          } else {
            this.DropOffee = this.DropOffee - this.CartTotalMoney;
            this.NotSend = true;
          }
        }
      }
    },
    // ChangeCartBadge(number){
    // 	this.ShoppingNumber=number;
    // },
    ChangeNumberInCart(e, index) {
      this.CartList[index].NumberInCart = e;
      if (e == 0) {
        this.CartList.splice(index, 1);
        if (this.CartList.length == 0) {
          this.CartNull = true;
          this.ShoppingNumber = 0;
          this.$refs.popup.close();
        } else {
          this.CartTotalMoney = 0;
          this.ShoppingNumber = 0;
          for (var i = 0; i < this.CartList.length; i++) {
            this.CartTotalMoney = this.CartTotalMoney + this.CartList[i].NumberInCart * this.CartList[i].GoodsPrice;
            this.ShoppingNumber = this.ShoppingNumber + this.CartList[i].NumberInCart;
          }
          if (this.CartTotalMoney > this.DropOffee) {
            this.NotSend = false;
          } else {
            this.DropOffee = this.DropOffee - this.CartTotalMoney;
            this.NotSend = true;
          }
        }
      } else {
        this.CartTotalMoney = 0;
        this.ShoppingNumber = 0;
        for (var i = 0; i < this.CartList.length; i++) {
          this.CartTotalMoney = this.CartTotalMoney + this.CartList[i].NumberInCart * this.CartList[i].GoodsPrice;
          this.ShoppingNumber = this.ShoppingNumber + this.CartList[i].NumberInCart;
        }
        if (this.CartTotalMoney > this.DropOffee) {
          this.NotSend = false;
        } else {
          this.DropOffee = this.DropOffee - this.CartTotalMoney;
          this.NotSend = true;
        }
      }
    },
    Settlement() {
      let arr = [];
      arr = this.CartList;
      arr = encodeURIComponent(JSON.stringify(arr));
      common_vendor.index.navigateTo({
        url: "/pages/OrderDetail/OrderDetail?CartList=" + arr
      });
    },
    Collection() {
      common_vendor.Ds.callFunction({
        name: "AddMerchantToCollection",
        data: {
          StoreId: this.id,
          Account: this.Account,
          StoreName: this.SellerName,
          StorePicture: this.SellerPicture,
          Address: this.SellerLocate,
          DeliveryFees: this.DeliveryFees,
          DropOffee: this.DropOffee
        }
      }).then((res) => {
        this.NotCollection = false;
      });
    },
    RemoveCollection() {
      common_vendor.Ds.callFunction({
        name: "RemoveCollection",
        data: {
          StoreId: this.id,
          Account: this.Account
        }
      }).then((res) => {
        this.NotCollection = true;
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  (_easycom_uni_icons2 + _easycom_uni_badge2 + _easycom_uni_card2 + _easycom_uni_segmented_control2 + _easycom_uni_rate2 + _easycom_uni_number_box2 + _easycom_uni_popup2 + _easycom_uni_popup_message2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_badge = () => "../../uni_modules/uni-badge/components/uni-badge/uni-badge.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_number_box = () => "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_badge + _easycom_uni_card + _easycom_uni_segmented_control + _easycom_uni_rate + _easycom_uni_number_box + _easycom_uni_popup + _easycom_uni_popup_message)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.handoff
  }, $data.handoff ? common_vendor.e({
    b: $data.CartNull
  }, $data.CartNull ? {
    c: common_vendor.p({
      type: "cart",
      size: "45"
    }),
    d: common_vendor.p({
      text: $data.ShoppingNumber,
      absolute: "rightTop",
      size: "small"
    }),
    e: common_vendor.o((...args) => $options.OpenShoppingList && $options.OpenShoppingList(...args)),
    f: common_vendor.t($data.DeliveryFees),
    g: common_vendor.t($data.DropOffee)
  } : common_vendor.e({
    h: common_vendor.p({
      type: "cart-filled",
      size: "45",
      color: "#ffaa00"
    }),
    i: common_vendor.p({
      text: $data.ShoppingNumber,
      absolute: "rightTop",
      size: "small"
    }),
    j: common_vendor.o((...args) => $options.OpenShoppingList && $options.OpenShoppingList(...args)),
    k: common_vendor.t($data.CartTotalMoney.toFixed(2)),
    l: $data.NotSend
  }, $data.NotSend ? {
    m: common_vendor.t($data.DropOffee)
  } : {
    n: common_vendor.o((...args) => $options.Settlement && $options.Settlement(...args))
  })) : {}, {
    o: $data.GoodsSrc,
    p: common_vendor.t($data.SellerLocate),
    q: common_vendor.t($data.SellerJoinTime),
    r: common_vendor.t($data.SellerLastTime),
    s: $data.NotCollection
  }, $data.NotCollection ? {
    t: common_vendor.o((...args) => $options.Collection && $options.Collection(...args))
  } : {
    v: common_vendor.o((...args) => $options.RemoveCollection && $options.RemoveCollection(...args))
  }, {
    w: common_vendor.t($data.MerchantPhone),
    x: common_vendor.p({
      title: $data.SellerName,
      ["sub-title"]: $data.SellerMonth + $data.SellerMonthNumber,
      extra: $data.BusinessStatus,
      thumbnail: $data.SellerPicture
    }),
    y: common_vendor.o($options.onClickItem),
    z: common_vendor.p({
      current: $data.currentList,
      values: $data.items,
      ["style-type"]: "text",
      ["active-color"]: "#007aff"
    }),
    A: $data.currentList === 0
  }, $data.currentList === 0 ? {
    B: common_vendor.f($data.RTTMsg, (item, index, i0) => {
      return {
        a: common_vendor.t(item.ClassName),
        b: index,
        c: common_vendor.n($data.current == index ? "u-tab-item-active" : ""),
        d: common_vendor.o(($event) => $options.swichMenu(index), index)
      };
    }),
    C: $data.scrollTop,
    D: $data.itemId,
    E: common_vendor.f($data.RTTMsg, (item, index, i0) => {
      return {
        a: common_vendor.t(item.ClassName),
        b: common_vendor.f(item.GoodsDetail, (item1, index1, i1) => {
          return {
            a: item1.GoodsPicture,
            b: common_vendor.t(item1.GoodsName),
            c: common_vendor.t(item1.GoodsSoldNumber),
            d: common_vendor.t(item1.GoodsPrice),
            e: "2743023a-6-" + i0 + "-" + i1,
            f: common_vendor.o(($event) => $options.AddToCart(item1.GoodsPicture, item1.GoodsName, item1.GoodsPrice, index, index1), index1),
            g: index1
          };
        }),
        c: "item" + index,
        d: index
      };
    }),
    F: common_vendor.p({
      type: "plus-filled",
      size: "25"
    }),
    G: $data.scrollRightTop,
    H: common_vendor.o((...args) => $options.rightScroll && $options.rightScroll(...args))
  } : {}, {
    I: $data.currentList === 1
  }, $data.currentList === 1 ? {
    J: common_vendor.t($data.FRate.toFixed(1)),
    K: common_vendor.p({
      readonly: true,
      ["allow-half"]: true,
      size: "17",
      value: $data.SecondRate.toFixed(1)
    }),
    L: common_vendor.p({
      readonly: true,
      ["allow-half"]: true,
      size: "17",
      value: $data.ThirdRate.toFixed(1)
    }),
    M: common_vendor.f($data.AppraiseList, (item, index, i0) => {
      return common_vendor.e({
        a: item.CustomerAvatar,
        b: common_vendor.t(item.CustomerName),
        c: common_vendor.t(item.AppraiseTime),
        d: "2743023a-9-" + i0,
        e: common_vendor.p({
          readonly: true,
          ["allow-half"]: true,
          size: "17",
          value: item.Rate
        }),
        f: common_vendor.t(item.AppraiseText),
        g: common_vendor.f(item.PictureList, (item0, index0, i1) => {
          return {
            a: item0,
            b: index0
          };
        }),
        h: item.IsReply
      }, item.IsReply ? {
        i: common_vendor.t(item.ReplyDate),
        j: common_vendor.t(item.ReplyText)
      } : {}, {
        k: index
      });
    })
  } : {}, {
    N: common_vendor.t($data.DeliveryFees.toFixed(2)),
    O: common_vendor.f($data.CartList, (item, index, i0) => {
      return {
        a: item.GoodsPicture,
        b: common_vendor.t(item.GoodsName),
        c: common_vendor.t(item.GoodsPrice.toFixed(2)),
        d: common_vendor.o(($event) => $options.ChangeNumberInCart($event, index), index),
        e: "2743023a-11-" + i0 + ",2743023a-10",
        f: common_vendor.o(($event) => item.NumberInCart = $event, index),
        g: common_vendor.p({
          modelValue: item.NumberInCart
        }),
        h: index
      };
    }),
    P: common_vendor.sr("popup", "2743023a-10"),
    Q: common_vendor.p({
      ["background-color"]: "#fff"
    }),
    R: common_vendor.p({
      type: "error",
      message: "请您先登录",
      duration: 2e3
    }),
    S: common_vendor.sr("message", "2743023a-12"),
    T: common_vendor.p({
      type: "message"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway/pages/MerchantDetail/MerchantDetail.vue"]]);
wx.createPage(MiniProgramPage);
