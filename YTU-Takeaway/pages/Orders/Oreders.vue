<template>
	<view v-if="Logged" v-for="(item,index) in OrdersList" :key="index" style="margin-top: 30rpx; width: 90%;margin-left: 5%;border-radius: 10rpx; border: 1px solid #d8d8d8;
	background-color: white;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);">
		<view style="height: 25rpx;"></view>
		<view style="display: flex;width: 100%;">
			<view style="margin-left: 3%;">
				<image style="width: 75rpx;height: 75rpx;" mode="aspectFill" :src="item.StorePicture"></image>
			</view>
			<view style="width: 70%;display: flex;margin-top: 3%;" @click="GoToMerchant(item.StoreId)">
				<view style="font-weight: bold;font-size: 32rpx;margin-left: 5%;max-width: 80%;">
					{{item.StoreName}}
				</view>
				<view style="width: 10%;margin-top: 1%;margin-left: 2%;">
					<uni-icons type="forward" size="22" color="#c5c5c5"></uni-icons>
				</view>
			</view>
			<view style="width: 25%;margin-top: 3%;">
				{{item.OrderState}}
			</view>
		</view>
		<view style="height: 20rpx;border-bottom: 1px solid #dfdfdf;"></view>
		<view style="height: 20rpx;"></view>
		<view @click="ViewOrders(item._id)" style="display: flex;width: 100%;margin-top: 15rpx;" v-for="(item0,index0) in item.GoodsList" :key="index0">
			<view v-if="item.isOpen||index0<max" style="display: flex;width: 100%;">
				<view style="width: 80%;margin-left: 5%;">
					{{item0.GoodsName}}
				</view>
				<view>
					x{{item0.NumberInCart}}
				</view>
			</view>
		</view>
		<view class="bottomAdd" v-show="!item.isOpen && item.GoodsList.length >max" @click="item.isOpen = !item.isOpen">查看更多</view>
		<view class="bottomAdd" v-show="item.isOpen && item.GoodsList.length > max" @click="item.isOpen = !item.isOpen">收起</view>
		<view style="height: 50rpx;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;justify-content: flex-end;">
			<view style="color: #a7a7a7;">
				共{{item.GoodsTotal}}件商品，实付
			</view>
			<view style="color:black;">
				￥{{(item.TotalMoney).toFixed(2)}}
			</view>
			<view style="width: 5%;"></view>
		</view>
		<view style="height: 50rpx;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;justify-content: flex-end;">
			<!-- <view style="width: 60%;"></view> -->
			<view v-if="item.NotFinish">
				<button size="mini" type="default" @click="CallToMerchant(item.StoreId)">联系商家</button>
			</view>
			<view v-if="item.NotAppraise">
				<button size="mini" type="default" @click="GoToAppraise(item.StoreId,item._id)">去评价</button>
			</view>
			<view v-if="item.Finish">
				<button size="mini" type="default" @click="GoToMerchant(item.StoreId)">再来一单</button>
			</view>
			<view style="width: 5%;"></view>
		</view>
		<view style="height: 30rpx;"></view>
	</view>
	<view v-else style="width: 100%;">
		<view style="height: 50rpx;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;justify-content: center;">
			<view style="font-size: 35rpx;color: #8f8f8f;">
				请您先登录
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Account:"",
				OrdersList:[],
				StorePicture:"",
				StoreName:"",
				OrderState:"",
				NumberInCart:0,
				GoodsName:"",
				GoodsTotal:0,
				TotalMoney:0,
				max:3,
				isOpen:false,
				Logged:false,
			}
		},
		onShow() {
			let Account=getApp().globalData.Account;
			// let Account="15130380905"
			this.Account=Account;
			if(this.Account=="0"){
				this.Logged=false
			}else{
				this.Logged=true;
				uniCloud.callFunction({
					name:"GetOrdersByAccount",
					data:{
						Account:this.Account
					}
				}).then(res=>{
					// console.log(res)
					// this.OrdersList=res.result.data;
					var len=res.result.data.length;
					var k=len-1;
					for(var i=0;i<len;i++){
						this.OrdersList[k]=res.result.data[i];
						k--;
						// console.log(res.result.data[i])
					}
					// console.log(this.OrdersList)
					for(var i=0;i<len;i++){
						if(this.OrdersList[i].OrderState=="未接单"||this.OrdersList[i].OrderState=="已接单"){
							// console.log(this.OrderList[i].OrderState)
							this.$set(this.OrdersList[i], "NotFinish", true);
							this.$set(this.OrdersList[i], "NotAppraise", false);
							this.$set(this.OrdersList[i], "Finish", false);
						}
						if(this.OrdersList[i].OrderState=="已完成"){
							this.$set(this.OrdersList[i], "NotFinish", false);
							this.$set(this.OrdersList[i], "NotAppraise", true);
							this.$set(this.OrdersList[i], "Finish", false);
						}
						if(this.OrdersList[i].OrderState=="已评价"){
							this.$set(this.OrdersList[i], "NotFinish", false);
							this.$set(this.OrdersList[i], "NotAppraise", false);
							this.$set(this.OrdersList[i], "Finish", true);
						}
					}
				})
			}

			
		},
		methods:{
			CallToMerchant(StoreId){
				uniCloud.callFunction({
					name:"GetRTTMsgById",
					data:{
						StoreId:StoreId
					}
				}).then(res=>{
					uni.makePhoneCall({
						phoneNumber: res.result.data[0].PossessorPhone
					})
				})
			},
			ViewOrders(Orderid){
				uni.navigateTo({
					url:"/pages/ViewOrders/ViewOrders?OrderId="+Orderid
				})
			},
			GoToMerchant(StoreId){
				uni.navigateTo({
					url:"/pages/MerchantDetail/MerchantDetail?id="+StoreId
				})
			},
			GoToAppraise(StoreId,OrderId){
				uni.navigateTo({
					url:"/pages/Appraise/Appraise?OrderId="+OrderId
				})
			},
		}
		
	}
	
</script>

<style lang="scss">
.bottomAdd {
	display: flex;
	justify-content: center;
	color: rgb(157, 157, 157);
	padding-bottom: 10px;
	font-size: 12px;
}
</style>
