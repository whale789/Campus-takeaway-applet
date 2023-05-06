"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      ChatId: "",
      //键盘高度
      keyboardHeight: 0,
      //底部消息发送高度
      bottomHeight: 0,
      //滚动距离
      scrollTop: 0,
      userId: "",
      //发送的消息
      chatMsg: "",
      // msgList:[
      // 	{
      // 	    botContent: "hello，请问我有什么可以帮助你的吗？",
      // 	    recordId: 0,
      // 	    titleId: 0,
      // 	    userContent: "",
      // 	    userId: 0
      // 	},
      // 	{
      // 	    botContent: "",
      // 	    recordId: 0,
      // 	    titleId: 0,
      // 	    userContent: "你好呀我想问你一件事",
      // 	    userId: 0
      // 	},
      // ],
      MsgList: [],
      UserId: "",
      UserNickName: "",
      UserAvatar: "",
      ManagerId: "",
      ManagerName: "",
      ManagerAvatar: "",
      FirstChatTime: "",
      IfTime: true
    };
  },
  updated() {
    this.scrollToBottom();
  },
  computed: {
    windowHeight() {
      return this.rpxTopx(common_vendor.index.getSystemInfoSync().windowHeight);
    },
    // 键盘弹起来的高度+发送框高度
    inputHeight() {
      return this.bottomHeight + this.keyboardHeight;
    }
  },
  onLoad(option) {
    this.ChatId = option.ChatId;
    common_vendor.Ds.callFunction({
      name: "GetChatById",
      data: {
        ChatId: this.ChatId
      }
    }).then((res) => {
      this.UserId = res.result.data[0].UserId;
      this.UserNickName = res.result.data[0].UserNickName;
      this.UserAvatar = res.result.data[0].UserAvatar;
      this.ManagerId = res.result.data[0].ManagerId;
      this.ManagerName = res.result.data[0].ManagerName;
      this.ManagerAvatar = res.result.data[0].ManagerAvatar;
      this.MsgList = res.result.data[0].MsgList;
      this.FirstChatTime = res.result.data[0].MsgList[0].MessageTime;
      for (var i = 0; i < res.result.data[0].MsgList.length; i++) {
        if (res.result.data[0].MsgList[i].MessageState == 0) {
          common_vendor.Ds.callFunction({
            name: "UpdateMessageState",
            data: {
              ChatId: this.ChatId,
              index: i
            }
          }).then((ress) => {
          });
        }
      }
    });
  },
  onPullDownRefresh() {
    this.UpdateMessage();
  },
  onShow() {
    let ChatId = this.ChatId;
    common_vendor.Ds.callFunction({
      name: "GetChatById",
      data: {
        ChatId
      }
    }).then((res) => {
      this.UserId = res.result.data[0].UserId;
      this.UserNickName = res.result.data[0].UserNickName;
      this.UserAvatar = res.result.data[0].UserAvatar;
      this.ManagerId = res.result.data[0].ManagerId;
      this.ManagerName = res.result.data[0].ManagerName;
      this.ManagerAvatar = res.result.data[0].ManagerAvatar;
      this.MsgList = res.result.data[0].MsgList;
      this.FirstChatTime = res.result.data[0].MsgList[0].MessageTime;
    });
  },
  onUnload() {
    common_vendor.index.offKeyboardHeightChange();
  },
  methods: {
    UpdateMessage() {
      let ChatId = this.ChatId;
      common_vendor.Ds.callFunction({
        name: "GetChatById",
        data: {
          ChatId
        }
      }).then((res) => {
        this.UserId = res.result.data[0].UserId;
        this.UserNickName = res.result.data[0].UserNickName;
        this.UserAvatar = res.result.data[0].UserAvatar;
        this.ManagerId = res.result.data[0].ManagerId;
        this.ManagerName = res.result.data[0].ManagerName;
        this.ManagerAvatar = res.result.data[0].ManagerAvatar;
        this.MsgList = res.result.data[0].MsgList;
        this.FirstChatTime = res.result.data[0].MsgList[0].MessageTime;
        for (var i = 0; i < res.result.data[0].MsgList.length; i++) {
          if (res.result.data[0].MsgList[i].MessageState == 0) {
            common_vendor.Ds.callFunction({
              name: "UpdateMessageState",
              data: {
                ChatId: this.ChatId,
                index: i
              }
            }).then((ress) => {
            });
          }
        }
      });
    },
    focus() {
      this.scrollToBottom();
    },
    blur() {
      this.scrollToBottom();
    },
    // px转换成rpx
    rpxTopx(px) {
      let deviceWidth = common_vendor.wx$1.getSystemInfoSync().windowWidth;
      let rpx = 750 / deviceWidth * Number(px);
      return Math.floor(rpx);
    },
    // 监视聊天发送栏高度
    sendHeight() {
      setTimeout(() => {
        let query = common_vendor.index.createSelectorQuery();
        query.select(".send-msg").boundingClientRect();
        query.exec((res) => {
          this.bottomHeight = this.rpxTopx(res[0].height);
        });
      }, 10);
    },
    // 滚动至聊天底部
    scrollToBottom(e) {
      setTimeout(() => {
        let query = common_vendor.index.createSelectorQuery().in(this);
        query.select("#scrollview").boundingClientRect();
        query.select("#msglistview").boundingClientRect();
        query.exec((res) => {
          if (res[1].height > res[0].height) {
            this.scrollTop = this.rpxTopx(res[1].height - res[0].height);
          }
        });
      }, 15);
    },
    // 发送消息
    handleSend() {
      if (!this.chatMsg || !/^\s+$/.test(this.chatMsg)) {
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
        let LastMsgTime = this.MsgList[this.MsgList.length - 1].MessageTime;
        let date1 = new Date(LastMsgTime.replace(/-/g, "/"));
        var minute0 = 1e3 * 60;
        var time1 = new Date().getTime();
        var time2 = new Date(date1).getTime();
        var time = time1 - time2;
        if (time / minute0 >= 15) {
          this.IfTime = true;
        } else {
          this.IfTime = false;
        }
        let obj = {
          botContent: this.chatMsg,
          ManagerId: this.ManagerId,
          ManagerName: this.ManagerName,
          ManagerAvatar: this.ManagerAvatar,
          userContent: "",
          UserId: this.UserId,
          UserAvatar: this.UserAvatar,
          UserNickName: this.UserNickName,
          MessageState: 0,
          MessageTime: timer,
          IfTime: this.IfTime
        };
        common_vendor.Ds.callFunction({
          name: "AddNewMessage",
          data: {
            ChatId: this.ChatId,
            NewMsg: obj
          }
        }).then((res) => {
          console.log(res);
        });
        this.MsgList.push(obj);
        this.chatMsg = "";
        this.scrollToBottom();
      } else {
        this.$refs.message.open("center");
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup_message + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.FirstChatTime),
    b: common_vendor.f($data.MsgList, (item, index, i0) => {
      return common_vendor.e({
        a: item.IfTime
      }, item.IfTime ? {
        b: common_vendor.t(item.MessageTime)
      } : {}, {
        c: item.botContent != ""
      }, item.botContent != "" ? {
        d: common_vendor.t(item.botContent),
        e: item.ManagerAvatar
      } : {}, {
        f: item.userContent != ""
      }, item.userContent != "" ? {
        g: item.UserAvatar,
        h: common_vendor.t(item.userContent)
      } : {}, {
        i: index
      });
    }),
    c: `${$options.windowHeight - $options.inputHeight}rpx`,
    d: $data.scrollTop,
    e: common_vendor.o((...args) => $options.UpdateMessage && $options.UpdateMessage(...args)),
    f: common_vendor.o((...args) => $options.handleSend && $options.handleSend(...args)),
    g: common_vendor.o((...args) => $options.sendHeight && $options.sendHeight(...args)),
    h: common_vendor.o((...args) => $options.focus && $options.focus(...args)),
    i: common_vendor.o((...args) => $options.blur && $options.blur(...args)),
    j: $data.chatMsg,
    k: common_vendor.o(($event) => $data.chatMsg = $event.detail.value),
    l: common_vendor.o((...args) => $options.handleSend && $options.handleSend(...args)),
    m: `${$data.keyboardHeight}rpx`,
    n: `${$options.inputHeight}rpx`,
    o: common_vendor.p({
      type: "error",
      message: "不能发送空消息",
      duration: 2e3
    }),
    p: common_vendor.sr("message", "26814be4-0"),
    q: common_vendor.p({
      type: "message"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-26814be4"], ["__file", "D:/uni-app/YTU-Takeaway-Manage/pages/ChatDetail/ChatDetail.vue"]]);
wx.createPage(MiniProgramPage);
