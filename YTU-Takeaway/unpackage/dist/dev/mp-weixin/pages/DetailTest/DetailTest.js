"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
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
      tabbar: [
        {
          "name": "蔬菜水果",
          "foods": [
            {
              "cat": 383,
              "name": "蔬菜",
              "icon": "http://nq348.com/uploads/category/20220315/1aeed6fa43b54cd68cce0c4883160f91.png",
              "key": "蔬菜"
            },
            {
              "cat": 384,
              "name": "食用菌",
              "icon": "http://nq348.com/uploads/category/20220418/09839c618b35b510d50151f9a17793ee.png",
              "key": "食用菌"
            },
            {
              "cat": 385,
              "name": "水果",
              "icon": "http://nq348.com/uploads/category/20220418/5294ad2fc7effc9629cbfdb8baf41773.png",
              "key": "水果"
            }
          ]
        },
        {
          "name": "畜禽养殖",
          "foods": [
            {
              "cat": 388,
              "name": "禽类",
              "icon": "http://nq348.com/uploads/category/20220418/da31895fc5a9aacf93fea6f27f08afd7.png",
              "key": "禽类"
            },
            {
              "cat": 389,
              "name": "畜类",
              "icon": "http://nq348.com/uploads/category/20220418/6352081e3f3b36f9360a933676e9452c.png",
              "key": "畜类"
            },
            {
              "cat": 391,
              "name": "蛋类",
              "icon": "http://nq348.com/uploads/category/20220418/d2e7ab4224679c0c796ba3ddd8a68e2f.png",
              "key": "蛋类"
            },
            {
              "cat": 390,
              "name": "水产",
              "icon": "http://nq348.com/uploads/category/20220418/52a1f1baa7617ef4d4e1a4b344b2fce7.png",
              "key": "水产"
            }
          ]
        },
        {
          "name": "粮油副食",
          "foods": [
            {
              "cat": 393,
              "name": "米面粮油",
              "icon": "http://nq348.com/uploads/category/20220418/1bb32e319ecf5aa352b7fe26fc265004.png",
              "key": "米面粮油"
            },
            {
              "cat": 394,
              "name": "坚果干果",
              "icon": "http://nq348.com/uploads/category/20220418/6ded13eae4a3b113b5225ca8b99bbfdd.png",
              "key": "坚果干果"
            },
            {
              "cat": 395,
              "name": "加工食品",
              "icon": "http://nq348.com/uploads/category/20220418/1e1c10838799de5834aa77f0f9eb8f40.png",
              "key": "加工食品"
            },
            {
              "cat": 396,
              "name": "茶烟酒",
              "icon": "http://nq348.com/uploads/category/20220418/c43cd994e49023c7efdf2b18b1bca30b.png",
              "key": "茶烟酒"
            }
          ]
        },
        {
          "name": "花卉苗木",
          "foods": [
            {
              "cat": 398,
              "name": "鲜花盆景",
              "icon": "http://nq348.com/uploads/category/20220418/b21c44045daaa8b8d148981ba9efc2e0.png",
              "key": "鲜花盆景"
            },
            {
              "cat": 399,
              "name": "果树苗",
              "icon": "http://nq348.com/uploads/category/20220418/63ee2b902ff0f4d638d8a5ad770f7641.png",
              "key": "果树苗"
            },
            {
              "cat": 400,
              "name": "蔬瓜种子",
              "icon": "http://nq348.com/uploads/category/20220418/2df521877616ee44fd01aae0434a5815.png",
              "key": "蔬瓜种子"
            },
            {
              "cat": 401,
              "name": "经济作物",
              "icon": "http://nq348.com/uploads/category/20220418/f85be72a98694befd889f30de45a1d64.png",
              "key": "经济作物"
            }
          ]
        },
        {
          "name": "中草药材",
          "foods": [
            {
              "cat": 403,
              "name": "全草类",
              "icon": "http://nq348.com/uploads/category/20220418/01812c1a83f5db7eafbf3bdae927f134.png",
              "key": "全草类"
            },
            {
              "cat": 405,
              "name": "根茎皮叶花",
              "icon": "http://nq348.com/uploads/category/20220418/dca8dcc814401474d4f19ae7394cc209.png",
              "key": "根茎皮叶花"
            },
            {
              "cat": 406,
              "name": "滋补品类",
              "icon": "http://nq348.com/uploads/category/20220418/33b965295811fdd6f5e672e9a3ce34a2.png",
              "key": "滋补品类"
            },
            {
              "cat": 404,
              "name": "果实籽仁类",
              "icon": "http://nq348.com/uploads/category/20220418/1dc8c46c66b4625d458a7f45787ecef9.png",
              "key": "果实籽仁类"
            }
          ]
        },
        {
          "name": "其他",
          "foods": [
            {
              "cat": 434,
              "name": "包装",
              "icon": "http://nq348.com/uploads/category/20220418/ebdfd326333344825adbe81dbd89e2c9.png",
              "key": "包装"
            },
            {
              "cat": 435,
              "name": "安全溯源",
              "icon": "http://nq348.com/uploads/category/20220418/03230c63f066f46005abf5f576df0ed1.png",
              "key": "安全溯源"
            },
            {
              "cat": 436,
              "name": "农用百货",
              "icon": "http://nq348.com/uploads/category/20220418/93393f2df3264faba86bb449a0c10a79.png",
              "key": "农用百货"
            },
            {
              "cat": 437,
              "name": "仓储物流",
              "icon": "http://nq348.com/uploads/category/20220418/f553505ebabbcb1bf762b288716cf1e7.png",
              "key": "仓储物流"
            }
          ]
        }
      ],
      arr: [],
      // 储存距离顶部高度的数组
      scrollRightTop: 0,
      // 右边栏目scroll-view的滚动条高度
      timer: null
      // 定时器
    };
  },
  onReady() {
    this.getMenuItemTop();
  },
  methods: {
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
            this.arr.push(rect.top);
            resolve();
          });
        }).exec();
      });
    },
    async observer() {
      this.tabbar.map((val, index) => {
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
    async leftMenuStatus(index) {
      this.current = index;
      if (this.menuHeight == 0 || this.menuItemHeight == 0) {
        await this.getElRect("menu-scroll-view", "menuHeight");
        await this.getElRect("u-tab-item", "menuItemHeight");
      }
      this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
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
        let scrollHeight = e.detail.scrollTop + 20;
        for (let i = 0; i < this.arr.length; i++) {
          let height1 = this.arr[i];
          let height2 = this.arr[i + 1];
          if (!height2 || scrollHeight >= height1 && scrollHeight < height2) {
            this.leftMenuStatus(i);
            return;
          }
        }
      }, 10);
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.tabbar, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: index,
        c: common_vendor.n($data.current == index ? "u-tab-item-active" : ""),
        d: common_vendor.o(($event) => $options.swichMenu(index), index)
      };
    }),
    b: $data.scrollTop,
    c: $data.itemId,
    d: common_vendor.f($data.tabbar, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.f(item.foods, (item1, index1, i1) => {
          return {
            a: item1.icon,
            b: common_vendor.t(item1.name),
            c: common_vendor.t(item1.key),
            d: common_vendor.t(item1.cat),
            e: "df971e9f-0-" + i0 + "-" + i1,
            f: index1,
            g: common_vendor.o(($event) => _ctx.featureC(item1.cat, item1.name), index1)
          };
        }),
        c: "item" + index,
        d: index
      };
    }),
    e: common_vendor.p({
      type: "plus-filled",
      size: "25"
    }),
    f: $data.scrollRightTop,
    g: common_vendor.o((...args) => $options.rightScroll && $options.rightScroll(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-df971e9f"], ["__file", "D:/uni-app/YTU-Takeaway/pages/DetailTest/DetailTest.vue"]]);
wx.createPage(MiniProgramPage);
