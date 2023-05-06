<template>
	<view v-if="handoff">
		<view v-if="CartNull" style="position: absolute;margin-top: 200%;z-index: 2;width: 100%;">
			<view style="display: flex; position: absolute;height: 80rpx;border-radius: 100rpx;background-color: #9c9c9c;width: 90%;margin-left: 5%;">
				<view style="margin-left: 10%;" @click="OpenShoppingList">
					<uni-badge  :text="ShoppingNumber" absolute="rightTop" size="small">
						<uni-icons type="cart" size="45"></uni-icons>
					</uni-badge>
				</view>
				<view style="margin-top: 2.5%;margin-left: 5%;">
					预计加配送费￥{{DeliveryFees}}
				</view>
				<view style="margin-left: 18%;margin-top: 2.5%;">
					￥{{DropOffee}}起送
				</view>
			</view>
		</view>
		
		
		<view v-else style="position: absolute;margin-top: 200%;z-index: 2;width: 100%;">
			<view style="display: flex; position: absolute;height: 80rpx;border-radius: 100rpx;background-color: #000000;width: 90%;margin-left: 5%;">
				<view style="margin-left: 10%;" @click="OpenShoppingList">
					<uni-badge  :text="ShoppingNumber" absolute="rightTop" size="small">
						<uni-icons type="cart-filled" size="45" color="#ffaa00"></uni-icons>
					</uni-badge>
				</view>
				<view style="margin-top: 2.5%;margin-left: 5%;color: white;width: 43.5%;">
					￥{{CartTotalMoney.toFixed(2)}}
				</view>
				<view v-if="NotSend" style="margin-left: 18%;margin-top: 2.5%;color: white;width: 50%;">
					差￥{{DropOffee}}起送
				</view>
				<view v-else style="width: 30%;">
					<button style="border-radius: 0 100rpx 100rpx 0;height: 80rpx;" type="primary" @click="Settlement">去结算</button>
				</view>
			</view>
		</view>
	</view>
	
	
	
	<view style="width: 100%;">
		<view style="width:100%;height: 250rpx;z-index: -1;">
			<image style="width: 100%;height: 250rpx;" :src="GoodsSrc" mode="scaleToFill"></image>
		</view>
		<view style="margin-top: -16%;">
			<uni-card :title="SellerName"  :sub-title="SellerMonth+SellerMonthNumber" :extra="BusinessStatus" :thumbnail="SellerPicture">
				<view style="display: flex;">
					<text style="width: 85%;" class="uni-body">店铺位于{{SellerLocate}},于{{SellerJoinTime}}入驻，共经营{{SellerLastTime}}天</text>
					<view v-if="NotCollection" style="width: 10%;margin-left: 5%;margin-top: 3%;font-weight: bold;" @click="Collection">
						收藏
					</view>
					<view v-else style="width: 15%;text-align: center; margin-left: 5%;margin-top: 3%;font-weight: bold;" @click="RemoveCollection">
						已收藏
					</view>
				</view>
				<view style="display: flex;">
					<view>联系电话：</view>
					<view>{{MerchantPhone}}</view>
				</view>
			</uni-card>
		</view>
		
		<view>
			<view>
				<uni-segmented-control :current="currentList" :values="items" style-type="text"
					active-color="#007aff" @clickItem="onClickItem" />
			</view>
			<view>
				<view v-if="currentList === 0">
					<template>
						<view class="u-wrap">
							<view class="u-menu-wrap">
								<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop"
								 :scroll-into-view="itemId">
									<view v-for="(item,index) in RTTMsg" :key="index" class="u-tab-item" :class="[current == index ? 'u-tab-item-active' : '']"
									 @tap.stop="swichMenu(index)">
										<text class="u-line-1">{{item.ClassName}}</text>
									</view>
								</scroll-view>
								<scroll-view :scroll-top="scrollRightTop" scroll-y scroll-with-animation class="right-box" @scroll="rightScroll">
									<view class="page-view">
										<view class="class-item" :id="'item' + index" v-for="(item , index) in RTTMsg" :key="index">
											<view class="item-title">
												<text>{{item.ClassName}}</text>
											</view>
											<view class="item-container" style="margin-top: 3%;">
												<view style="width: 100%;" v-for="(item1, index1) in item.GoodsDetail" :key="index1">
													<view style="display: flex;width: 100%;margin-top: 3%;">
														<view>
															<image :src="item1.GoodsPicture" mode="aspectFill" style="width: 120rpx;height: 120rpx;border-radius: 5%;"></image>
														</view>
														<view style="width: 100%;margin-left: 4%;">
															<view style="font-weight: bold;font-size: 32rpx;">
																{{item1.GoodsName}}
															</view>
															<view style="font-size: 25rpx;color: #9c9c9c;">
																月售：{{item1.GoodsSoldNumber}}
															</view>
															<view style="display: flex;width: 100%;">
																<view style="width: 80%;color: red;font-size: 28rpx;">
																	￥{{item1.GoodsPrice}}
																</view>
																<view style="width: 20%;" @click="AddToCart(item1.GoodsPicture,item1.GoodsName,item1.GoodsPrice,index,index1)">
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
					
				</view>
				
				<view style="width: 100%;" v-if="currentList === 1">
					<view style="width: 100%;" >
						<view style="height: 20rpx;"></view>
						<view style="background-color: white;border-radius: 10rpx;">
							<view style="height: 15rpx;"></view>
							<view style="display: flex;">
								<view style="margin-left: 23%;">
									<view style="color: gold;font-size: 55rpx;">{{FRate.toFixed(1)}}</view>
									<view style="color: #9c9c9c;font-size: 25rpx;">商家评分</view>
								</view>
								<view style="margin-left: 3%;">
									<view style="height: 13rpx;"></view>
									<view style="display: flex;">
										<view style="color: #9c9c9c;font-size: 25rpx;">口味:</view>
										<view>
											<uni-rate :readonly="true" allow-half size="17" :value="SecondRate.toFixed(1)" />
										</view>
										<view style="margin-left: 15rpx;margin-top: -4rpx; color: #9c9c9c;font-size: 28rpx;">3.5</view>
									</view>
									<view style="height: 13rpx;"></view>
									<view style="display: flex;">
										<view style="color: #9c9c9c;font-size: 25rpx;">包装:</view>
										<view>
											<uni-rate :readonly="true" allow-half size="17" :value="ThirdRate.toFixed(1)" />
										</view>
										<view style="margin-left: 15rpx;margin-top: -4rpx; color: #9c9c9c;font-size: 28rpx;">3.5</view>
									</view>
								</view>
							</view>
							<view style="height: 15rpx;"></view>
						</view>
						
						<view style="height: 30rpx;"></view>
						<view style="background-color: white;width: 95%;margin-left: 2.5%;" v-for="(item,index) in AppraiseList" :key="index">
							<view style="height: 20rpx;"></view>
							<view style="display: flex;margin-left: 5%;width: 95%;">
								<view>
									<image style="width: 80rpx;height: 80rpx;border-radius: 50%;" mode="aspectFit" :src="item.CustomerAvatar"></image>
								</view>
								<view style="margin-left: 3%;width: 85%;">
									<view style="display: flex;width: 100%;">
										<view style="width: 60%;">
											{{item.CustomerName}}
										</view>
										<view style="width: 35%;text-align: right;font-size: 25rpx;color: #9c9c9c;">
											{{item.AppraiseTime}}
										</view>
										<view style="width: 5%;"></view>
									</view>
									<view>
										<uni-rate :readonly="true" allow-half size="17" :value="item.Rate" />
									</view>
								</view>
							</view>
							<view style="width: 100%;">
								<view style="margin-left: 19%;">
									{{item.AppraiseText}}
								</view>
								<view style="height: 20rpx;"></view>
								<view style="display: flex;width: 90%;margin-left: 15%;">
									<view style="margin-left: 3%;" v-for="(item0,index0) in item.PictureList" :key="index0">
										<image mode="aspectFill" style="width: 145rpx;height: 145rpx;" :src="item0"></image>
									</view>
								</view>
								<view style="height: 20rpx;"></view>
								<view v-if="item.IsReply" style="border-radius: 8rpx; width: 80%; margin-left: 16%;color: #767676;font-size: 25rpx;background-color: #efefef;">
									<view style="height: 20rpx;"></view>
									<view style="display: flex;margin-left: 3%;">
										<view>商家回复</view>
										<view style="width: 58%;"></view>
										<view>{{item.ReplyDate}}</view>
									</view>
									<view style="height: 7rpx;"></view>
									<view style="width: 95%;margin-left: 3%;">
										{{item.ReplyText}}
									</view>
									<view style="height: 25rpx;"></view>
								</view>
								<view style="height: 30rpx;"></view>
							</view>
							<view style="border-bottom: 1px solid #d9d9d9;"></view>
						</view>
						<view style="height: 50rpx;"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
	
	<view style="z-index: 1;position:absolute">
		<uni-popup ref="popup" background-color="#fff">
			<view style="height: 10rpx;"></view>
			<view style="border-bottom: #9c9c9c;margin-left: 6%;">需另外支付配送费￥{{DeliveryFees.toFixed(2)}}</view>
			<view style="height: 30rpx;"></view>
			<view style="display: flex;margin-left: 6%;width: 100%;margin-top: 2%;" v-for="(item,index) in CartList" :key="index">
				<view>
					<image style="width: 100rpx;height: 100rpx;border-radius: 10%;" mode="aspectFill" :src="item.GoodsPicture"></image>
				</view>
				<view style="margin-left: 5%;width: 100%;">
					<view style="font-size: 33rpx;">{{item.GoodsName}}</view>
					<view style="display: flex;width: 100%;">
						<view style="width:52%; margin-top: 3%;">￥{{item.GoodsPrice.toFixed(2)}}</view>
						<view style="width:48%; margin-top: 3%;">
							<uni-number-box v-model="item.NumberInCart" @change="ChangeNumberInCart($event,index)" />
						</view>
					</view>
				</view>
			</view>
			<view style="height: 100rpx;"></view>
		</uni-popup>
	</view>
	
	<uni-popup ref="message" type="message">
			<uni-popup-message type="error" message="请您先登录" :duration="2000"></uni-popup-message>
	</uni-popup>
	
</template>

<script>
	export default {
		data() {
			return {
				SellerMonthNumber:0,
				SellerLastTime:23,
				SellerJoinTime:"2023年4月6日",
				SellerLocate:"七餐三楼",
				BusinessStatus:"营业中",
				SellerName:"山西刀削面",
				GoodsSrc:"../../static/images/GoodsBackgroundTest.jpg",
				SellerMonth:"月售：",
				id:"",
				RTTMsg:[],
				SellerPicture:"https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/dc678af8-928b-42bd-b4dc-babf7e970091.jpg",
				currentList: 0,
				items: ['点菜', '评价',],
				scrollTop: 0, //tab标题的滚动条位置
				oldScrollTop: 0, // tab标题的滚动条旧位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				itemId: '', // 栏目右边scroll-view用于滚动的id
				arr: [], // 储存距离顶部高度的数组
				scrollRightTop: 0, // 右边栏目scroll-view的滚动条高度
				timer: null, // 定时器
				DeliveryFees:0,
				DropOffee:0,
				ShoppingNumber:0,
				IfOpen:false,
				CartList:[],
				GoodsNumber:1,
				CartTotalMoney:0,
				CartNull:true,
				NotSend:true,
				Account:"",
				NotCollection:true,
				MerchantPhone:"",
				CustomerAvatar:"https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/cc3a9fc9-8d3f-4063-83d2-4c75bf973758.jpg",
				CustomerName:"张三",
				AppraiseTime:"2023-04-26",
				AppraiseText:"味道很不错",
				PictureList:[
					"https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/7ccea677-5716-405d-bcc7-4af2448bed60.jpg",
					"https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/46ae90b3-d7ff-4612-a5d9-52de6bd0ecbe.png",
					"https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/aee982e5-a48e-4d72-86e7-8ea6e8128a81.jpg",
				],
				IsReply:true,
				ReplyText:"谢谢您的评价",
				AppraiseList:[],
				handoff:true,
				FRate:0,
				SecondRate:0,
				ThirdRate:0,
			}
		},
		onReady() {
			this.getMenuItemTop()
		},
		onLoad(option) {
			let id=option.id;
			this.id=id;
			let Account=getApp().globalData.Account;
			// let Account="15130380905"
			this.Account=Account;
			// console.log(id)
			uniCloud.callFunction({
				name:"GetRTTMsgById",
				data:{
					StoreId:id
				}
			}).then(res=>{
				console.log(res)
				this.RTTMsg=res.result.data[0].GoodsClass;
				this.DeliveryFees=res.result.data[0].DeliveryFees;
				this.DropOffee=res.result.data[0].DropOffee;
				this.SellerName=res.result.data[0].StoreName;
				this.SellerPicture=res.result.data[0].StorePicture;
				this.SellerLocate=res.result.data[0].Address;
				this.MerchantPhone=res.result.data[0].PossessorPhone;
				if(res.result.data[0].BusinessStatus==1){
					this.BusinessStatus="营业中"
				}else{
					this.BusinessStatus="休息中"
				}
				this.SellerJoinTime=res.result.data[0].SettledDate;
				for(var i=0;i<res.result.data[0].GoodsClass.length;i++){
					for(var j=0;j<res.result.data[0].GoodsClass[i].GoodsDetail.length;j++){
						this.SellerMonthNumber=this.SellerMonthNumber+res.result.data[0].GoodsClass[i].GoodsDetail[j].GoodsSoldNumber;
					}
				}
				let date1=new Date();
				let date2=new Date(Date.parse(res.result.data[0].SettledDate.replace(/-/g,"/")));
				let iDays = parseInt(Math.abs(date1.getTime()- date2.getTime()) /1000/60/60/24);
				this.SellerLastTime=iDays;
			})
			
			uniCloud.callFunction({
				name:"GetCollectionState",
				data:{
					StoreId:this.id,
					Account:this.Account
				}
			}).then(res=>{
				if(res.result.data.length==0){
					this.NotCollection=true;
				}else{
					this.NotCollection=false;
				}
			})
			
			uniCloud.callFunction({
				name:"GetAppraiseByStoreId",
				data:{
					StoreId:this.id
				}
			}).then(res=>{
				this.AppraiseList=res.result.data;
				var FRate=0;
				var SRate=0;
				var TRate=0;
				for(var i=0;i<res.result.data.length;i++){
					FRate=FRate+res.result.data[i].Rate;
					SRate=SRate+res.result.data[i].SecondRate;
					TRate=TRate+res.result.data[i].ThirdRate;
				}
				this.FRate=FRate/res.result.data.length;
				this.SecondRate=SRate/res.result.data.length;
				this.ThirdRate=TRate/res.result.data.length;
			})
			
		},
		methods: {
			onClickItem(e) {
				if (this.currentList !== e.currentIndex) {
					this.currentList = e.currentIndex
					this.handoff=!this.handoff
				}
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
			// 观测元素相交状态
			async observer() {
				this.RTTMsg.map((val, index) => {
					let observer = uni.createIntersectionObserver(this);
					// 检测右边scroll-view的id为itemxx的元素与right-box的相交状态
					// 如果跟.right-box底部相交，就动态设置左边栏目的活动状态
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
			// 设置左边菜单的滚动状态
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
			// 获取右边菜单每个item到顶部的距离
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
							// 这里减去rects[0].top，是因为第一项顶部可能不是贴到导航栏(比如有个搜索框的情况)
							this.arr.push(rect.top - rects[0].top);
							resolve();
						})
					}).exec()
				})
			},
			// 右边菜单滚动
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
					let scrollHeight = e.detail.scrollTop + this.menuHeight / 2;
					for (let i = 0; i < this.arr.length; i++) {
						let height1 = this.arr[i];
						let height2 = this.arr[i + 1];
						// 如果不存在height2，意味着数据循环已经到了最后一个，设置左边菜单为最后一项即可
						if (!height2 || scrollHeight >= height1 && scrollHeight < height2) {
							this.leftMenuStatus(i);
							return ;
						}
					}
				}, 10)
			},
			OpenShoppingList(){
				if(this.CartList.length==0){
					this.CartNull=true;
				}else{
					this.IfOpen=!this.IfOpen;
					if(this.IfOpen==true){
						this.$refs.popup.open('bottom');
					}else{
						this.$refs.popup.close();
					}
				}
				
				
			},
			AddToCart(GoodsPicture,GoodsName,GoodsPrice,index,index1){
				if(this.Account=="0"){
					this.$refs.message.open("center");
				}else{
					this.CartNull=false;
					var k=0;
					for(var i=0;i<this.CartList.length;i++){
						if(this.CartList[i].index==index&&this.CartList[i].index1==index1){
							this.CartList[i].NumberInCart=this.CartList[i].NumberInCart+1;
							this.CartTotalMoney=this.CartTotalMoney+this.CartList[i].GoodsPrice;
							if(this.CartTotalMoney>this.DropOffee){
								this.NotSend=false;
							}else{
								this.DropOffee=this.DropOffee-this.CartTotalMoney;
								this.NotSend=true;
							}
							this.ShoppingNumber=this.ShoppingNumber+1;
							k++;
							break;
						}
					}
					if(k==0){
						this.CartList.push({
							StoreId:this.id,
							GoodsPicture:GoodsPicture,
							GoodsName:GoodsName,
							GoodsPrice:GoodsPrice,
							index:index,
							index1:index1,
							NumberInCart:1
						})
						this.ShoppingNumber=this.ShoppingNumber+1;
						this.CartTotalMoney=this.CartTotalMoney+GoodsPrice;
						if(this.CartTotalMoney>this.DropOffee){
							this.NotSend=false;
						}else{
							this.DropOffee=this.DropOffee-this.CartTotalMoney;
							this.NotSend=true;
						}
					}
				}

				// console.log(this.CartList)
			},
			// ChangeCartBadge(number){
			// 	this.ShoppingNumber=number;
			// },
			ChangeNumberInCart(e,index){
				// console.log(e)
				// console.log(index)
				this.CartList[index].NumberInCart=e;
				if(e==0){
					this.CartList.splice(index,1);
					if(this.CartList.length==0){
						this.CartNull=true;
						this.ShoppingNumber=0;
						this.$refs.popup.close();
					}else{
						this.CartTotalMoney=0;
						this.ShoppingNumber=0;
						for(var i=0;i<this.CartList.length;i++){
							this.CartTotalMoney=this.CartTotalMoney+(this.CartList[i].NumberInCart*this.CartList[i].GoodsPrice)
							this.ShoppingNumber=this.ShoppingNumber+this.CartList[i].NumberInCart;
						}
						// this.ShoppingNumber=this.ShoppingNumber+1;
						// this.CartTotalMoney=Total;
						if(this.CartTotalMoney>this.DropOffee){
							this.NotSend=false;
						}else{
							this.DropOffee=this.DropOffee-this.CartTotalMoney;
							this.NotSend=true;
						}
					}
				}else{
					this.CartTotalMoney=0;
					this.ShoppingNumber=0;
					for(var i=0;i<this.CartList.length;i++){
						this.CartTotalMoney=this.CartTotalMoney+(this.CartList[i].NumberInCart*this.CartList[i].GoodsPrice)
						this.ShoppingNumber=this.ShoppingNumber+this.CartList[i].NumberInCart;
					}
					// this.ShoppingNumber=this.ShoppingNumber+1;
					// this.CartTotalMoney=Total;
					if(this.CartTotalMoney>this.DropOffee){
						this.NotSend=false;
					}else{
						this.DropOffee=this.DropOffee-this.CartTotalMoney;
						this.NotSend=true;
					}
				}
				// console.log(this.CartList)
			},
			Settlement(){
				let arr=[];
				arr=this.CartList;
				arr=encodeURIComponent(JSON.stringify(arr))
				uni.navigateTo({
					url:"/pages/OrderDetail/OrderDetail?CartList="+arr
				})
			},
			Collection(){
				uniCloud.callFunction({
					name:"AddMerchantToCollection",
					data:{
						StoreId:this.id,
						Account:this.Account,
						StoreName:this.SellerName,
						StorePicture:this.SellerPicture,
						Address:this.SellerLocate,
						DeliveryFees:this.DeliveryFees,
						DropOffee:this.DropOffee
					}
				}).then(res=>{
					// console.log(res)
					this.NotCollection=false;
				})
			},
			RemoveCollection(){
				uniCloud.callFunction({
					name:"RemoveCollection",
					data:{
						StoreId:this.id,
						Account:this.Account
					}
				}).then(res=>{
					this.NotCollection=true;
				})
			},
		}
	}
</script>

<style>
.u-wrap {
	height:1100rpx;
	/* #ifdef H5 */
	/* height: calc(100vh - var(--window-top)); */
	/* #endif */
	display: flex;
	flex-direction: column;
}

.u-search-box {
	padding: 18rpx 30rpx;
}

.u-menu-wrap {
	flex: 1;
	display: flex;
	overflow: hidden;
}

.u-search-inner {
	background-color: rgb(234, 234, 234);
	border-radius: 100rpx;
	display: flex;
	align-items: center;
	padding: 10rpx 16rpx;
}

.u-search-text {
	font-size: 26rpx;
	color: $u-tips-color;
	margin-left: 10rpx;
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
	color: #000;
	font-size: 30rpx;
	font-weight: 600;
	background: #fff;
}

.u-tab-item-active::before {
	content: "";
	position: absolute;
	border-left: 4px solid $u-type-primary;
	height: 32rpx;
	left: 0;
	top: 39rpx;
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
	min-height: 50vh;
}

.item-title {
	font-size: 26rpx;
	color: red;
	font-weight: bold;
}

.item-menu-name {
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
