"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      ListAudit: [],
      AuditState: "",
      Account: 0
    };
  },
  onShow() {
    var Account = 2640055850001;
    this.Account = Account;
    common_vendor.Ds.callFunction({
      name: "GetAuditsByAccount",
      data: {
        Account: this.Account
      }
    }).then((res) => {
      for (var i = 0; i < res.result.data.length; i++) {
        if (res.result.data[i].AuditState == "未处理") {
          res.result.data[i].color = "color:#1296db";
        }
        if (res.result.data[i].AuditState == "处理中") {
          res.result.data[i].color = "color:#ffaa00";
        }
        if (res.result.data[i].AuditState == "已通过") {
          res.result.data[i].color = "color:#00aa00";
        }
        if (res.result.data[i].AuditState == "已驳回") {
          res.result.data[i].color = "color:#ff0000";
        }
      }
      this.ListAudit = res.result.data;
    });
  },
  methods: {
    AuditDetail(AuditId, AuditState, AuditType) {
      let Handlers;
      if (AuditType == "商家入驻") {
        if (AuditState == "未处理") {
          common_vendor.Ds.callFunction({
            name: "UpdateAuditListState",
            data: {
              AuditListId: AuditId,
              AuditState: "处理中"
            }
          });
          common_vendor.Ds.callFunction({
            name: "GetManagerMsg",
            data: {
              Account: this.Account
            }
          }).then((res) => {
            Handlers = res.result.data[0].name;
            common_vendor.Ds.callFunction({
              name: "UpdateHandlersInAudit",
              data: {
                AuditListId: AuditId,
                AuditState: "处理中",
                Handlers,
                HandlersPhone: this.Account
              }
            }).then((res2) => {
              common_vendor.index.navigateTo({
                url: "/pages/AuditDetail/AuditDetail?AuditId=" + AuditId
              });
            });
          });
        } else {
          common_vendor.index.navigateTo({
            url: "/pages/AuditDetail/AuditDetail?AuditId=" + AuditId
          });
        }
      } else {
        if (AuditType == "商家退出") {
          if (AuditState == "未处理") {
            common_vendor.Ds.callFunction({
              name: "UpdateAuditListState",
              data: {
                AuditListId: AuditId,
                AuditState: "处理中"
              }
            });
            common_vendor.Ds.callFunction({
              name: "GetManagerMsg",
              data: {
                Account: this.Account
              }
            }).then((res) => {
              Handlers = res.result.data[0].name;
              common_vendor.Ds.callFunction({
                name: "UpdateHandlersInExitAudit",
                data: {
                  AuditListId: AuditId,
                  AuditState: "处理中",
                  Handlers,
                  HandlersPhone: this.Account
                }
              }).then((res2) => {
                common_vendor.index.navigateTo({
                  url: "/pages/AudtiExit/AudtiExit?AuditId=" + AuditId
                });
              });
            });
          } else {
            common_vendor.index.navigateTo({
              url: "/pages/AudtiExit/AudtiExit?AuditId=" + AuditId
            });
          }
        }
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.ListAudit, (item, index, i0) => {
      return {
        a: common_vendor.t(item.AuditType),
        b: common_vendor.t(item.AuditState),
        c: common_vendor.s(item.color),
        d: common_vendor.t(item._id),
        e: common_vendor.t(item.AuditMain),
        f: common_vendor.t(item.Applicant),
        g: common_vendor.t(item.ApplicationTime),
        h: "4796871a-0-" + i0,
        i: common_vendor.p({
          title: item.AuditType,
          extra: item.AuditState
        }),
        j: common_vendor.o(($event) => $options.AuditDetail(item._id, item.AuditState, item.AuditType))
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/uni-app/YTU-Takeaway-Manage/pages/History/History.vue"]]);
wx.createPage(MiniProgramPage);
