"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/Orders/Orders.js";
  "./pages/index/index.js";
  "./pages/Message/Message.js";
  "./pages/Conditions/Conditions.js";
  "./pages/Commodity/Commodity.js";
  "./pages/MerChantLogin/MerChantLogin.js";
  "./pages/MerchantRegiste/MerchantRegiste.js";
  "./pages/RecoverPassword/RecoverPassword.js";
  "./pages/StoreDetails/StoreDetails.js";
  "./pages/MerchantSettle/MerchantSettle.js";
  "./pages/MerchantExit/MerchantExit.js";
}
const _sfc_main = {
  globalData: {
    Account: "0",
    StoreId: "0"
  },
  onLaunch: function() {
    console.warn("当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uni-app/YTU-Takeaway-Merchant/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
