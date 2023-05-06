<template>
	<view class="u-wrap">
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop"
			 :scroll-into-view="itemId">
				<view v-for="(item,index) in tabbar" :key="index" class="u-tab-item" :class="[current == index ? 'u-tab-item-active' : '']"
				 @tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.name}}</text>
				</view>
			</scroll-view>
			<scroll-view :scroll-top="scrollRightTop" scroll-y scroll-with-animation class="right-box" @scroll="rightScroll">
				<view class="page-view">
					<view class="class-item" :id="'item' + index" v-for="(item , index) in tabbar" :key="index">
						<view class="item-title">
							<text>{{item.name}}</text>
						</view>
						<view class="item-container">
							<view style="width: 100%;" v-for="(item1, index1) in item.foods" :key="index1" @click="featureC(item1.cat, item1.name)">
								<!-- <image v-if="item1.icon != ''" class="item-menu-image" :src="item1.icon" mode=""></image>
								<view v-else class="item-menu-image row-c" style="background-color: #F4F6F8;"><text style="font-size: 20rpx;color: #d0d0d0;">加载失败</text></view>
								<view class="item-menu-name">{{item1.name}}</view> -->
								<view style="display: flex;width: 100%;">
									<view>
										<image :src="item1.icon" style="width: 150rpx;height: 150rpx;"></image>
									</view>
									<view style="width: 100%;">
										<view style="font-weight: bold;font-size: 35rpx;">
											{{item1.name}}
										</view>
										<view style="font-size: 25rpx;color: #9c9c9c;">
											月售：{{item1.key}}
										</view>
										<view style="display: flex;width: 100%;">
											<view style="width: 80%;color: red;">
												￥{{item1.cat}}
											</view>
											<view style="width: 20%;">
												<uni-icons type="plus-filled" size="25"></uni-icons>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0, //tab标题的滚动条位置
				oldScrollTop: 0, // tab标题的滚动条旧位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				itemId: '', // 栏目右边scroll-view用于滚动的id
				tabbar: [
    {
        "name":"蔬菜水果",
        "foods":[
            {
                "cat":383,
                "name":"蔬菜",
                "icon":"http://nq348.com/uploads/category/20220315/1aeed6fa43b54cd68cce0c4883160f91.png",
                "key":"蔬菜"
            },
            {
                "cat":384,
                "name":"食用菌",
                "icon":"http://nq348.com/uploads/category/20220418/09839c618b35b510d50151f9a17793ee.png",
                "key":"食用菌"
            },
            {
                "cat":385,
                "name":"水果",
                "icon":"http://nq348.com/uploads/category/20220418/5294ad2fc7effc9629cbfdb8baf41773.png",
                "key":"水果"
            }
        ]
    },
    {
        "name":"畜禽养殖",
        "foods":[
            {
                "cat":388,
                "name":"禽类",
                "icon":"http://nq348.com/uploads/category/20220418/da31895fc5a9aacf93fea6f27f08afd7.png",
                "key":"禽类"
            },
            {
                "cat":389,
                "name":"畜类",
                "icon":"http://nq348.com/uploads/category/20220418/6352081e3f3b36f9360a933676e9452c.png",
                "key":"畜类"
            },
            {
                "cat":391,
                "name":"蛋类",
                "icon":"http://nq348.com/uploads/category/20220418/d2e7ab4224679c0c796ba3ddd8a68e2f.png",
                "key":"蛋类"
            },
            {
                "cat":390,
                "name":"水产",
                "icon":"http://nq348.com/uploads/category/20220418/52a1f1baa7617ef4d4e1a4b344b2fce7.png",
                "key":"水产"
            }
        ]
    },
    {
        "name":"粮油副食",
        "foods":[
            {
                "cat":393,
                "name":"米面粮油",
                "icon":"http://nq348.com/uploads/category/20220418/1bb32e319ecf5aa352b7fe26fc265004.png",
                "key":"米面粮油"
            },
            {
                "cat":394,
                "name":"坚果干果",
                "icon":"http://nq348.com/uploads/category/20220418/6ded13eae4a3b113b5225ca8b99bbfdd.png",
                "key":"坚果干果"
            },
            {
                "cat":395,
                "name":"加工食品",
                "icon":"http://nq348.com/uploads/category/20220418/1e1c10838799de5834aa77f0f9eb8f40.png",
                "key":"加工食品"
            },
            {
                "cat":396,
                "name":"茶烟酒",
                "icon":"http://nq348.com/uploads/category/20220418/c43cd994e49023c7efdf2b18b1bca30b.png",
                "key":"茶烟酒"
            }
        ]
    },
    {
        "name":"花卉苗木",
        "foods":[
            {
                "cat":398,
                "name":"鲜花盆景",
                "icon":"http://nq348.com/uploads/category/20220418/b21c44045daaa8b8d148981ba9efc2e0.png",
                "key":"鲜花盆景"
            },
            {
                "cat":399,
                "name":"果树苗",
                "icon":"http://nq348.com/uploads/category/20220418/63ee2b902ff0f4d638d8a5ad770f7641.png",
                "key":"果树苗"
            },
            {
                "cat":400,
                "name":"蔬瓜种子",
                "icon":"http://nq348.com/uploads/category/20220418/2df521877616ee44fd01aae0434a5815.png",
                "key":"蔬瓜种子"
            },
            {
                "cat":401,
                "name":"经济作物",
                "icon":"http://nq348.com/uploads/category/20220418/f85be72a98694befd889f30de45a1d64.png",
                "key":"经济作物"
            }
        ]
    },
    {
        "name":"中草药材",
        "foods":[
            {
                "cat":403,
                "name":"全草类",
                "icon":"http://nq348.com/uploads/category/20220418/01812c1a83f5db7eafbf3bdae927f134.png",
                "key":"全草类"
            },
            {
                "cat":405,
                "name":"根茎皮叶花",
                "icon":"http://nq348.com/uploads/category/20220418/dca8dcc814401474d4f19ae7394cc209.png",
                "key":"根茎皮叶花"
            },
            {
                "cat":406,
                "name":"滋补品类",
                "icon":"http://nq348.com/uploads/category/20220418/33b965295811fdd6f5e672e9a3ce34a2.png",
                "key":"滋补品类"
            },
            {
                "cat":404,
                "name":"果实籽仁类",
                "icon":"http://nq348.com/uploads/category/20220418/1dc8c46c66b4625d458a7f45787ecef9.png",
                "key":"果实籽仁类"
            }
        ]
    },
    {
        "name":"其他",
        "foods":[
            {
                "cat":434,
                "name":"包装",
                "icon":"http://nq348.com/uploads/category/20220418/ebdfd326333344825adbe81dbd89e2c9.png",
                "key":"包装"
            },
            {
                "cat":435,
                "name":"安全溯源",
                "icon":"http://nq348.com/uploads/category/20220418/03230c63f066f46005abf5f576df0ed1.png",
                "key":"安全溯源"
            },
            {
                "cat":436,
                "name":"农用百货",
                "icon":"http://nq348.com/uploads/category/20220418/93393f2df3264faba86bb449a0c10a79.png",
                "key":"农用百货"
            },
            {
                "cat":437,
                "name":"仓储物流",
                "icon":"http://nq348.com/uploads/category/20220418/f553505ebabbcb1bf762b288716cf1e7.png",
                "key":"仓储物流"
            }
        ]
    }
],

				arr: [], // 储存距离顶部高度的数组
				scrollRightTop: 0, // 右边栏目scroll-view的滚动条高度
				timer: null // 定时器
			}
		},
		
		onReady() {
			this.getMenuItemTop()
		},
		methods:{
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
						resolve();
					}).exec();
				})
			},
			getMenuItemTop() {
				new Promise(resolve => {
					let selectorQuery = uni.createSelectorQuery();
					selectorQuery.selectAll('.class-item').boundingClientRect((rects) => {
						// 如果节点尚未生成，rects值为[](因为用selectAll，所以返回的是数组)，循环调用执行
						if(!rects.length) {
							setTimeout(() => {
								this.getMenuItemTop();
							}, 10);
							return ;
						}
						rects.forEach((rect) => {
							// 视情况而定，这里减去rects[0].top，是因为第一项顶部可能不是贴到导航栏(比如有个搜索框的情况)
							// this.arr.push(rect.top - rects[0].top);
							this.arr.push(rect.top)
							resolve();
						})
					}).exec()
				})
			},
			async observer() {
				this.tabbar.map((val, index) => {
					let observer = uni.createIntersectionObserver(this);
					observer.relativeTo('.right-box', {
						top: 0
					}).observe('#item' + index, res => {
						if (res.intersectionRatio > 0) {
							let id = res.id.substring(4);
							this.leftMenuStatus(id);
						}
					})
				})
			},
			async leftMenuStatus(index) {
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			async swichMenu(index) {
				if(this.arr.length == 0) {
					await this.getMenuItemTop();
				}
				if (index == this.current) return;
				this.scrollRightTop = this.oldScrollTop;
				this.$nextTick(function(){
					this.scrollRightTop = this.arr[index];
					this.current = index;
					this.leftMenuStatus(index);
				})
			},
			async rightScroll(e) {
				this.oldScrollTop = e.detail.scrollTop;
				if(this.arr.length == 0) {
					await this.getMenuItemTop();
				}
				if(this.timer) return ;
				if(!this.menuHeight) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
				}
				setTimeout(() => { // 节流
					this.timer = null;
					// scrollHeight为右边菜单垂直中点位置
					// let scrollHeight = e.detail.scrollTop + this.menuHeight / 2;
					// scrollHeight为右边菜单头部位置
					let scrollHeight = e.detail.scrollTop + 20;
					for (let i = 0; i < this.arr.length; i++) {
						let height1 = this.arr[i];
						let height2 = this.arr[i + 1];
						if (!height2 || scrollHeight >= height1 && scrollHeight < height2) {
							this.leftMenuStatus(i);
							return ;
						}
					}
				}, 10)
			},
		}
	}
</script>
<style scoped lang="scss">
	.u-wrap {
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
		height: 100vh;
	}
	
	.u-search-box {
		padding: 18rpx 30rpx;
	}
	
	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}
	
	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}
	
	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}
	
	.u-tab-item-active {
		position: relative;
		color: #06A446;
		font-size: 30rpx;
		font-weight: 500;
		background: #D6FFE7;
	}
	
	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid #06A446;
		height: 52rpx;
		left: 0;
		top: 29rpx;
	}
	
	.u-tab-view {
		height: 100%;
	}
	
	.right-box {
		background-color: rgb(250, 250, 250);
	}
	
	.page-view {
		padding: 16rpx;
	}
	
	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}
	
	.class-item:last-child {
		min-height: 100vh;
	}
	
	.item-title {
		font-size: 26rpx;
		color: red;
		font-weight: bold;
	}
	
	.item-menu-name {
		margin-top: 8rpx;
		font-weight: normal;
		font-size: 24rpx;
		color: red;
	}
	
	.item-container {
		display: flex;
		flex-wrap: wrap;
	}
	
	.thumb-box {
		width: 33.333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
	}
	
	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}

</style>
