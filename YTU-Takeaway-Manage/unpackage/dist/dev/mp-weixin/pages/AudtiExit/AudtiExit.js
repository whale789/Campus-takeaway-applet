"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      AuditExitId: "",
      MerchantPicture: "../../static/images/PersonalAvatar.jpg",
      MerchantName: "山西刀削面",
      MerchantAddress: "七餐三楼",
      MerChantPossessor: "张三",
      PossessorPhone: "15130380905",
      ReasonForExit: "经营不善",
      ApplicationTime: "2023-04-19",
      Handlers: "李四",
      HandlersPhone: 2640055850001,
      AuditState: "处理中",
      Feedback: "",
      color: "",
      AuditListId: "",
      ProcessingTime: "",
      FeedbackEmpty: false,
      HaveProcessed: false,
      NotProcessed: false
    };
  },
  onLoad(option) {
    this.AuditListId = option.AuditId;
    common_vendor.Ds.callFunction({
      name: "GetAuditByListId",
      data: {
        AuditListId: this.AuditListId
      }
    }).then((res) => {
      this.AuditExitId = res.result.data[0]._id;
      this.MerchantPicture = res.result.data[0].MerchantPicture;
      this.MerchantName = res.result.data[0].MerchantName;
      this.MerchantAddress = res.result.data[0].MerchantAddress;
      this.MerChantPossessor = res.result.data[0].MerChantPossessor;
      this.PossessorPhone = res.result.data[0].PossessorPhone;
      this.ReasonForExit = res.result.data[0].ReasonForExit;
      this.ApplicationTime = res.result.data[0].ApplicationTime;
      this.Handlers = res.result.data[0].Handlers;
      this.HandlersPhone = res.result.data[0].HandlersPhone;
      this.AuditState = res.result.data[0].AuditState;
      this.Feedback = res.result.data[0].Feedback;
      if (res.result.data[0].AuditState == "未处理") {
        this.color = "color:#1296db";
        this.NotProcessed = true;
        this.HaveProcessed = false;
      }
      if (res.result.data[0].AuditState == "处理中") {
        this.color = "color:#ffaa00";
        if (getApp().globalData.Account == this.HandlersPhone) {
          this.NotProcessed = true;
          this.HaveProcessed = false;
        } else {
          this.NotProcessed = false;
          this.HaveProcessed = true;
        }
      }
      if (res.result.data[0].AuditState == "已通过") {
        this.color = "color:#00aa00";
        this.NotProcessed = false;
        this.HaveProcessed = true;
        this.ProcessingTime = res.result.data[0].ProcessingTime;
      }
      if (res.result.data[0].AuditState == "已驳回") {
        this.color = "color:#ff0000";
        this.NotProcessed = false;
        this.HaveProcessed = true;
        this.ProcessingTime = res.result.data[0].ProcessingTime;
      }
    });
  },
  methods: {
    IFFeedbackEmpty() {
      if (this.Feedback == "") {
        this.FeedbackEmpty = true;
      } else {
        this.FeedbackEmpty = false;
      }
    },
    Approved() {
      if (this.FeedbackEmpty == false) {
        let date2 = new Date();
        let year = date2.getFullYear();
        let month = date2.getMonth() + 1;
        let day = date2.getDate();
        month >= 1 && month <= 9 ? month = "0" + month : "";
        day >= 0 && day <= 9 ? day = "0" + day : "";
        var time = year + "-" + month + "-" + day;
        common_vendor.Ds.callFunction({
          name: "UpdateAuditListState",
          data: {
            AuditListId: this.AuditListId,
            AuditState: "已通过",
            HandlersAccount: this.HandlersPhone,
            Handlers: this.Handlers,
            ProcessingTime: time,
            Feedback: this.Feedback
          }
        }).then((res) => {
          common_vendor.Ds.callFunction({
            name: "UpdateAuditExitById",
            data: {
              AuditExitId: this.AuditExitId,
              AuditState: "已通过",
              Feedback: this.Feedback,
              ProcessingTime: time
            }
          }).then((ress) => {
            common_vendor.Ds.callFunction({
              name: "UpdateRTTBoardStatus",
              data: {
                PossessorPhone: this.PossessorPhone,
                OnboardingStatus: 0
              }
            }).then((resss) => {
              common_vendor.index.switchTab({
                url: "/pages/Audit/Audit"
              });
            });
          });
        });
      } else {
        this.$refs.message.open("center");
      }
    },
    Overrule() {
      if (this.FeedbackEmpty == false) {
        let date2 = new Date();
        let year = date2.getFullYear();
        let month = date2.getMonth() + 1;
        let day = date2.getDate();
        month >= 1 && month <= 9 ? month = "0" + month : "";
        day >= 0 && day <= 9 ? day = "0" + day : "";
        var time = year + "-" + month + "-" + day;
        common_vendor.Ds.callFunction({
          name: "UpdateAuditListState",
          data: {
            AuditListId: this.AuditListId,
            AuditState: "已驳回",
            HandlersAccount: this.HandlersPhone,
            Handlers: this.Handlers,
            ProcessingTime: time,
            Feedback: this.Feedback
          }
        }).then((res) => {
          common_vendor.Ds.callFunction({
            name: "UpdateAuditExitById",
            data: {
              AuditExitId: this.AuditExitId,
              AuditState: "已驳回",
              Feedback: this.Feedback,
              ProcessingTime: time
            }
          }).then((ress) => {
            common_vendor.index.switchTab({
              url: "/pages/Audit/Audit"
            });
          });
        });
      } else {
        this.$refs.message.open("center");
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_easyinput2 + _easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_popup_message + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.MerchantPicture,
    b: common_vendor.t($data.MerchantName),
    c: common_vendor.t($data.MerchantAddress),
    d: common_vendor.t($data.MerChantPossessor),
    e: common_vendor.t($data.PossessorPhone),
    f: common_vendor.t($data.ReasonForExit),
    g: common_vendor.t($data.ApplicationTime),
    h: common_vendor.t($data.Handlers),
    i: common_vendor.t($data.HandlersPhone),
    j: common_vendor.t($data.AuditState),
    k: common_vendor.s($data.color),
    l: $data.NotProcessed
  }, $data.NotProcessed ? {
    m: common_vendor.o($options.IFFeedbackEmpty),
    n: common_vendor.o(($event) => $data.Feedback = $event),
    o: common_vendor.p({
      type: "textarea",
      placeholder: "请输入处理结果",
      modelValue: $data.Feedback
    })
  } : {}, {
    p: $data.FeedbackEmpty
  }, $data.FeedbackEmpty ? {} : {}, {
    q: $data.HaveProcessed
  }, $data.HaveProcessed ? {
    r: common_vendor.t($data.Feedback)
  } : {}, {
    s: $data.HaveProcessed
  }, $data.HaveProcessed ? {
    t: common_vendor.t($data.ProcessingTime)
  } : {}, {
    v: $data.NotProcessed
  }, $data.NotProcessed ? {
    w: common_vendor.o((...args) => $options.Approved && $options.Approved(...args)),
    x: common_vendor.o((...args) => $options.Overrule && $options.Overrule(...args))
  } : {}, {
    y: common_vendor.p({
      type: "error",
      message: "请先按要求填写内容",
      duration: 2e3
    }),
    z: common_vendor.sr("message", "d00311de-1"),
    A: common_vendor.p({
      type: "message"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway-Manage/pages/AudtiExit/AudtiExit.vue"]]);
wx.createPage(MiniProgramPage);
