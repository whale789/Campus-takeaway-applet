<template>
	<view>
		<uni-card title="基础卡片" sub-title="副标题" extra="额外信息" padding="10px 0" >
			<template v-slot:title>
				<view style="display: flex;border-bottom: 1px solid #cacaca;margin-top: 20rpx;width: 100%;">
					<view style="display: flex;width: 80%;">
						<view style="font-size: 13px;">
							订单号：
						</view>
						<view style="font-size: 13px;line-height:38rpx;">
							{{OrdersNumber}}
						</view>
					</view>
					<view style="width: 20%; text-align: center;line-height:35rpx;">{{OrdersState}}</view>
					
				</view>
			</template>
			<view style="border-bottom: 1px solid #cacaca;">
				<view style="display: flex;width: 100%;" v-for="(item,index) in ListGoods" :key="index">
					<view v-if="isOpen||index<max" style="display: flex;width: 100%;">
						<view style="width: 15%;">
							<image :src="item.GoodsImage" style="width: 100rpx;height: 100rpx;" mode="aspectFit"></image>
						</view>  
						<view style="width: 85%;">
							<view style="display: flex;margin-left: 5%;margin-top: 1%;">
								<view class="text">{{item.GoodsName}}</view>
								<view style="width: 5%;"></view>
								<view style="width: 25%;text-align: center;">￥{{item.GoodsPrice}}</view>
							</view>
							<view style="margin-left: 5%;margin-top: 2%;font-size: 25rpx;color: black;">x{{item.GoodsNum}}</view>
						</view>
					</view>
				</view>
				<view class="bottomAdd" v-show="!isOpen && ListGoods.length >max" @click="isOpen = !isOpen">查看更多</view>
				<view class="bottomAdd" v-show="isOpen && ListGoods.length > max" @click="isOpen = !isOpen">收起</view>
				<view style="display: flex;">
					<view>配送地址：</view>
					<view style="color: black;">
						<view>
							{{CustomerName}}&nbsp&nbsp&nbsp{{CustomerPhoneNumber}}
						</view>
						<view>{{CustomerAddress}}</view>
					</view>
				</view>
				<view style="display: flex;">
					<view>订单时间：</view>
					<view style="color: black;">{{OrdersTime}}</view>
				</view>
				<view style="display: flex;">
					<view >用户备注：</view>
					<view :class="{remark:xian}" class="remark-active">{{CustomerNote}}</view>
					<view @click="change()" style="margin-left: 3%;">{{foldText}}</view>
				</view>
			</view>
			<view>
				<view style="margin-top: 5%;width: 80%;display: flex;margin-left: 20%;">
					<button type="default" size="mini" @click="CallToCustomer(CustomerPhoneNumber)" >联系用户</button>
					<button type="primary" size="mini">接单</button>
					<button type="warn" size="mini">退单</button>
				</view>
			</view>
		</uni-card>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				 xian:false,
				 foldText:"展开",
				 OrdersNumber:"20190909103109582536",
				 OrdersState:"未接单",
				 CustomerName:"张乾",
				 CustomerPhoneNumber:"18309346278",
				 CustomerAddress:"烟台大学北校区12号楼",
				 OrdersTime:"2023年4月5日13:12:32",
				 CustomerNote:"不要辣，需要两双筷子，外卖放到楼下时打电话通知一下，给几张餐巾纸，帮忙带一瓶可乐",
				 max:3,
				 isOpen:false,
				 ListGoods:[{
					 GoodsName:"油泼面",
					 GoodsPrice:9.99,
					 GoodsNum:2,
					 GoodsImage:"../../static/images/conditions.png"
				 },
				 {
					 GoodsName:"卤蛋",
					 GoodsPrice:1.5,
					 GoodsNum:1,
					 GoodsImage:"../../static/images/conditions-active.png"
				 },
				 {
					 GoodsName:"狮子头",
					 GoodsPrice:1,
					 GoodsNum:2,
					 GoodsImage:"../../static/images/conditions.png"
				 },
				 {
					 GoodsName:"醋",
					 GoodsPrice:0,
					 GoodsNum:1,
					 GoodsImage:"../../static/images/conditions-active.png"
				 },
				 {
					 GoodsName:"葱花",
					 GoodsPrice:0,
					 GoodsNum:1,
					 GoodsImage:"../../static/images/conditions.png"
				 },
				 {
					 GoodsName:"香菜",
					 GoodsPrice:0,
					 GoodsNum:1,
					 GoodsImage:"../../static/images/conditions-active.png"
				 }
				 ],
			}
		},
		methods: {
			change(){
				 this.xian=!this.xian;
				 if(this.xian==false){
					 this.foldText="展开"
				 }else{
					 this.foldText="收起"
				 }
			 },
			 CallToCustomer(CustomerPhoneNumber){
				uni.makePhoneCall({
					phoneNumber: CustomerPhoneNumber
				});
			 },
		},
		
	}
</script>


<style>
.text{
	width: 70%; 
	height: 40rpx;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	text-overflow:ellipsis;
	overflow: hidden;
	color: black;
}
.remark-active{
	position: relative;
	width: 65%;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	text-overflow:ellipsis;
	overflow: hidden;
	color: black;
}
.remark{
	position: relative;
	width: 65%;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 5;
	text-overflow:ellipsis;
	overflow: hidden;
	color: black;
}
.bottomAdd {
	display: flex;
	justify-content: center;
	color: rgb(157, 157, 157);
	padding-bottom: 10px;
	font-size: 12px;
}


</style>
