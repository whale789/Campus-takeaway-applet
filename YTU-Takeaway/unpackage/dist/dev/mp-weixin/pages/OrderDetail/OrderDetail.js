"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      ListGoods: [],
      avatar: "https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/503aec21-87f4-42bf-8571-e71981c91cb4.png",
      Account: "",
      AddressList: [],
      NotChoose: true,
      Address: "",
      Doorplate: "",
      Contact: "",
      gender: "",
      Phone: "",
      max: 3,
      isOpen: false,
      MerchantName: "山西刀削面",
      DeliveryFees: 0,
      TotalMoney: 0,
      num: 0,
      NumberOfCutlery: ["无需餐具", "一份", "两份", "三份", "四份", "五份", "五份以上"],
      RemarkText: "",
      RemarkInPop: "",
      MerchantUser: "张乾",
      OrdersMessage: "",
      StoreId: "",
      MerchantPicture: "",
      GoodsTotal: 0
    };
  },
  onLoad(option) {
    this.ListGoods = JSON.parse(decodeURIComponent(option.CartList));
    this.StoreId = this.ListGoods[0].StoreId;
    common_vendor.Ds.callFunction({
      name: "GetRTTMsgById",
      data: {
        StoreId: this.ListGoods[0].StoreId
      }
    }).then((res) => {
      console.log(res);
      this.MerchantName = res.result.data[0].StoreName;
      this.DeliveryFees = res.result.data[0].DeliveryFees;
      this.MerchantPicture = res.result.data[0].StorePicture;
      this.MerchantUser = res.result.data[0].Possessor;
      let Name = this.MerchantUser;
      let NewName = "**" + Name.substring(Name.length - 1, 2);
      this.MerchantUser = NewName;
    });
    var num = 0;
    for (var i = 0; i < this.ListGoods.length; i++) {
      this.TotalMoney = this.TotalMoney + this.ListGoods[i].NumberInCart * this.ListGoods[i].GoodsPrice;
      num = num + this.ListGoods[i].NumberInCart;
    }
    this.GoodsTotal = num;
  },
  onShow() {
    let Account = getApp().globalData.Account;
    this.Account = Account;
    common_vendor.Ds.callFunction({
      name: "GetAddressByAccount",
      data: {
        Account
      }
    }).then((res) => {
      this.AddressList = res.result.data;
    });
    this.TotalMoney = this.TotalMoney + this.DeliveryFees;
  },
  methods: {
    ChooseMyAddress() {
      this.$refs.AddressListPupop.open("bottom");
    },
    AddressDetail(AddressId) {
      common_vendor.index.navigateTo({
        url: "/pages/AddressDetail/AddressDetail?Type=0&AddressId=" + AddressId
      });
    },
    CreateAddress(AddressId) {
      common_vendor.index.navigateTo({
        url: "/pages/AddressDetail/AddressDetail?Type=1&AddressId=0"
      });
    },
    SelectedAddress(Address, Doorplate, Contact, gender, Phone) {
      this.NotChoose = false;
      this.$refs.AddressListPupop.close();
      this.Address = Address;
      this.Doorplate = Doorplate;
      this.Contact = Contact;
      this.gender = gender;
      this.Phone = Phone;
    },
    bindPickerChange: function(e) {
      this.num = e.detail.value;
    },
    OpenRemarkPopup() {
      this.RemarkInPop = this.RemarkText;
      this.$refs.RemarkPupop.open("bottom");
    },
    CompleteNote() {
      this.RemarkText = this.RemarkInPop;
      this.$refs.RemarkPupop.close();
    },
    GoToPay() {
      if (this.NotChoose == true) {
        this.OrdersMessage = "请先填写地址";
        this.$refs.message.open("center");
      } else {
        var Deliver = this.DeliveryFees;
        this.DeliveryFees = Deliver;
        this.$refs.PayPupop.open("bottom");
      }
    },
    ClosePay() {
      this.$refs.PayPupop.close();
    },
    OrderSuccess() {
      let now = new Date();
      let y = now.getFullYear();
      let m = now.getMonth() + 1;
      let d = now.getDate();
      let nowtime = y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
      common_vendor.Ds.callFunction({
        name: "AddToOrderList",
        data: {
          StoreId: this.StoreId,
          StoreName: this.MerchantName,
          StorePicture: this.MerchantPicture,
          GoodsList: this.ListGoods,
          TotalMoney: this.DeliveryFees + this.TotalMoney,
          GoodsTotal: this.GoodsTotal,
          OrderState: "未接单",
          Address: this.Address,
          Doorplate: this.Doorplate,
          Contact: this.Contact,
          gender: this.gender,
          Phone: this.Phone,
          OrderUserPhone: this.Account,
          RemarkText: this.RemarkText,
          Cutlery: this.NumberOfCutlery[this.num],
          TimeOfOrder: nowtime,
          isOpen: false
        }
      }).then((res) => {
        console.log(res);
        this.$refs.PayPupop.close();
        common_vendor.index.switchTab({
          url: "/pages/Orders/Oreders"
        });
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  (_easycom_uni_icons2 + _easycom_uni_popup2 + _easycom_uni_easyinput2 + _easycom_uni_popup_message2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup + _easycom_uni_easyinput + _easycom_uni_popup_message)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.NotChoose
  }, $data.NotChoose ? {
    b: common_vendor.p({
      type: "plus-filled",
      size: "30",
      color: "#ffaa00"
    }),
    c: common_vendor.p({
      type: "forward",
      size: "25",
      color: "#dddddd"
    }),
    d: common_vendor.o((...args) => $options.ChooseMyAddress && $options.ChooseMyAddress(...args))
  } : {
    e: common_vendor.t($data.Address),
    f: common_vendor.t($data.Doorplate),
    g: common_vendor.p({
      type: "forward",
      size: "25",
      color: "#dddddd"
    }),
    h: common_vendor.t($data.Contact),
    i: common_vendor.t($data.gender),
    j: common_vendor.t($data.Phone),
    k: common_vendor.o((...args) => $options.ChooseMyAddress && $options.ChooseMyAddress(...args))
  }, {
    l: common_vendor.t($data.MerchantName),
    m: common_vendor.f($data.ListGoods, (item, index, i0) => {
      return common_vendor.e({
        a: $data.isOpen || index < $data.max
      }, $data.isOpen || index < $data.max ? {
        b: item.GoodsPicture,
        c: common_vendor.t(item.GoodsName),
        d: common_vendor.t(item.GoodsPrice),
        e: common_vendor.t(item.NumberInCart)
      } : {}, {
        f: index
      });
    }),
    n: !$data.isOpen && $data.ListGoods.length > $data.max,
    o: common_vendor.o(($event) => $data.isOpen = !$data.isOpen),
    p: $data.isOpen && $data.ListGoods.length > $data.max,
    q: common_vendor.o(($event) => $data.isOpen = !$data.isOpen),
    r: common_vendor.t($data.DeliveryFees),
    s: common_vendor.t(($data.DeliveryFees + $data.TotalMoney).toFixed(2)),
    t: common_vendor.t($data.RemarkText),
    v: common_vendor.o((...args) => $options.OpenRemarkPopup && $options.OpenRemarkPopup(...args)),
    w: common_vendor.p({
      type: "forward",
      size: "25",
      color: "#dedede"
    }),
    x: common_vendor.t($data.NumberOfCutlery[$data.num]),
    y: common_vendor.o((...args) => $options.bindPickerChange && $options.bindPickerChange(...args)),
    z: $data.num,
    A: $data.NumberOfCutlery,
    B: common_vendor.p({
      type: "forward",
      size: "25",
      color: "#dedede"
    }),
    C: common_vendor.t(($data.DeliveryFees + $data.TotalMoney).toFixed(2)),
    D: common_vendor.o((...args) => $options.GoToPay && $options.GoToPay(...args)),
    E: common_vendor.f($data.AddressList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.Address),
        b: common_vendor.t(item.Doorplate),
        c: "1d933f43-6-" + i0 + ",1d933f43-5",
        d: common_vendor.o(($event) => $options.AddressDetail(item._id), index),
        e: common_vendor.t(item.Contact),
        f: common_vendor.t(item.gender),
        g: common_vendor.t(item.Phone),
        h: index,
        i: common_vendor.o(($event) => $options.SelectedAddress(item.Address, item.Doorplate, item.Contact, item.gender, item.Phone), index)
      };
    }),
    F: common_vendor.p({
      type: "compose",
      size: "28",
      color: "#6c6c6c"
    }),
    G: common_vendor.p({
      type: "plusempty",
      size: "24",
      color: "#ffaa00"
    }),
    H: common_vendor.o((...args) => $options.CreateAddress && $options.CreateAddress(...args)),
    I: common_vendor.sr("AddressListPupop", "1d933f43-5"),
    J: common_vendor.p({
      ["background-color"]: "#fff"
    }),
    K: common_vendor.o(($event) => $data.RemarkInPop = $event),
    L: common_vendor.p({
      type: "textarea",
      placeholder: "请输入备注",
      modelValue: $data.RemarkInPop
    }),
    M: common_vendor.o((...args) => $options.CompleteNote && $options.CompleteNote(...args)),
    N: common_vendor.sr("RemarkPupop", "1d933f43-8"),
    O: common_vendor.p({
      ["background-color"]: "#fff"
    }),
    P: common_vendor.p({
      type: "closeempty",
      size: "20",
      color: "#747474"
    }),
    Q: common_vendor.o((...args) => $options.ClosePay && $options.ClosePay(...args)),
    R: common_vendor.t($data.MerchantName),
    S: common_vendor.t($data.MerchantUser),
    T: common_vendor.t(($data.DeliveryFees + $data.TotalMoney).toFixed(2)),
    U: common_vendor.p({
      type: "forward",
      size: "16",
      color: "#9c9c9c"
    }),
    V: common_vendor.o((...args) => $options.OrderSuccess && $options.OrderSuccess(...args)),
    W: common_vendor.sr("PayPupop", "1d933f43-10"),
    X: common_vendor.p({
      ["background-color"]: "#fff"
    }),
    Y: common_vendor.p({
      type: "error",
      message: $data.OrdersMessage,
      duration: 2e3
    }),
    Z: common_vendor.sr("message", "1d933f43-13"),
    aa: common_vendor.p({
      type: "message"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway/pages/OrderDetail/OrderDetail.vue"]]);
wx.createPage(MiniProgramPage);
