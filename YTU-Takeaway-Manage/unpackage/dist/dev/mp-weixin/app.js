"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/Users/Users.js";
  "./pages/Audit/Audit.js";
  "./pages/Feedback/Feedback.js";
  "./pages/Personal/Personal.js";
  "./pages/index/index.js";
  "./pages/ManagerLogin/ManagerLogin.js";
  "./pages/Recoverpsd/Recoverpsd.js";
  "./pages/AddManager/AddManager.js";
  "./pages/AuditDetail/AuditDetail.js";
}
const _sfc_main = {
  globalData: {
    Account: 0
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
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/uni-app/YTU-Takeaway-Manage/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
