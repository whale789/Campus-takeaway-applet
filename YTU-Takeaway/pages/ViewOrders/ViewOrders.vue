<template>
	<view style="width: 100%;">
		<view style="background-color: white;width: 95%;margin-left: 2.5%;border-radius: 10rpx;margin-top: 5%;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);">
			<view style="height: 20rpx;"></view>
			<view style="color: #ababab;width: 100%;text-align: center;">
				订单状态
			</view>
			<view style="color: black;font-size: 35rpx;width: 100%;text-align: center;margin-top: 3%;">
				{{OrderState}}
			</view>
			<view style="height: 30rpx;"></view>
		</view>
		
		<view style="background-color: white;width: 95%;margin-left: 2.5%;border-radius: 10rpx;margin-top: 3%;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);">
			<view style="border-bottom: 1px solid #d0d0d0;width: 100%;">
				<view style="height: 15rpx;"></view>
				<view style="display: flex;">
					<view style="margin-left: 3%;">
						<image :src="StorePicture" style="width: 60rpx;height: 60rpx;border-radius: 5rpx;" mode="aspectFill"></image>
					</view>
					<view style="margin-left: 2%;margin-top: 1%;">{{MerchantName}}</view>
				</view>
				<view style="height: 15rpx;"></view>
			</view>
			
			<view style="width: 100%;display: flex;margin-top: 2%;margin-left: 3%;" v-for="(item,index) in ListGoods" :key="index">
				<view v-if="isOpen||index<max" style="display: flex;width: 100%;">
					<view style="width: 15%;">
						<image :src="item.GoodsPicture" style="width: 100rpx;height: 100rpx;" mode="aspectFit"></image>
					</view>  
					<view style="width: 85%;">
						<view style="display: flex;margin-left: 5%;margin-top: 1%;">
							<view class="text">{{item.GoodsName}}</view>
							<view style="width: 5%;"></view>
							<view style="width: 20%;text-align: center;">￥{{item.GoodsPrice}}</view>
						</view>
						<view style="margin-left: 5%;margin-top: 2%;font-size: 25rpx;color: black;">x{{item.NumberInCart}}</view>
					</view>
				</view>
			</view>
			<view class="bottomAdd" v-show="!isOpen && ListGoods.length >max" @click="isOpen = !isOpen">查看更多</view>
			<view class="bottomAdd" v-show="isOpen && ListGoods.length > max" @click="isOpen = !isOpen">收起</view>
			<view style="display: flex;width: 100%;margin-top: 3%;">
				<view style="margin-left: 3%;width: 80%;">
					配送费：
				</view>
				<view style="width: 17%;text-align: center;">
					￥{{DeliveryFees}}
				</view>
			</view>
			<view style="border-bottom: 1px solid #d0d0d0;height: 30rpx;"></view>
			<view style="height: 25rpx;"></view>
			<view style="display: flex;">
				<view style="width: 60%;"></view>
				<view style="margin-top: 1%;">
					小计：
				</view>
				<view style="font-size: 37rpx;">
					￥{{TotalMoney.toFixed(2)}}
				</view>
			</view>
			<view style="height: 25rpx;border-bottom: 1px solid #d0d0d0;"></view>
		</view>
		
		<view style="background-color: white;width: 95%;margin-left: 2.5%;border-radius: 10rpx;margin-top: 3%;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);">
			<view style="height: 20rpx;"></view>
			<view style="display: flex;margin-left: 2%;">
				<view style="color: #ababab;">期望时间</view>
				<view style="margin-left: 1.5%;">立即配送</view>
			</view>
			<view style="height: 30rpx;"></view>
			<view style="display: flex;margin-left: 2%;">
				<view style="color: #ababab;">配送地址</view>
				<view style="margin-left: 1.5%;">
					<view>{{Contact}}({{gender}}){{Phone}}</view>
					<view style="margin-top: 10rpx;">{{Address}}{{Doorplate}}</view>
				</view>
			</view>
			<view style="height: 30rpx;"></view>
			<view style="display: flex;margin-left: 2%;">
				<view style="color: #ababab;">配送服务</view>
				<view style="margin-left: 1.5%;">商家自配</view>
			</view>
			<view style="height: 20rpx;"></view>
		</view>
		
		<view style="background-color: white;width: 95%;margin-left: 2.5%;border-radius: 10rpx;margin-top: 3%;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);">
			<view style="height: 20rpx;"></view>
			<view style="display: flex;margin-left: 2%;">
				<view style="color: #ababab;">订单号码</view>
				<view style="margin-left: 1.5%;font-size: 26rpx;margin-top: 0.5%;">{{OrderId}}</view>
			</view>
			<view style="height: 30rpx;"></view>
			<view style="display: flex;margin-left: 2%;">
				<view style="color: #ababab;">订单时间</view>
				<view style="margin-left: 1.5%;font-size: 26rpx;">{{TimeOfOrder}}</view>
			</view>
			<view style="height: 30rpx;"></view>
			<view style="display: flex;margin-left: 2%;">
				<view style="color: #ababab;">支付方式</view>
				<view style="margin-left: 1.5%;">在线支付</view>
			</view>
			<view style="height: 30rpx;"></view>
			<view style="display: flex;margin-left: 2%;">
				<view style="color: #ababab;">餐具数量</view>
				<view style="margin-left: 1.5%;">{{Cutlery}}</view>
			</view>
			<view style="height: 20rpx;"></view>
		</view>
		<view style="height: 100rpx;"></view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				OrderId:"",
				StoreId:"",
				ListGoods:[],
				isOpen:false,
				max:3,
				MerchantName:"",
				DeliveryFees:0,
				TotalMoney:0,
				StorePicture:"",
				OrderState:"",
				Contact:"",
				gender:"",
				Phone:"",
				Address:"",
				Doorplate:"",
				TimeOfOrder:"",
				Cutlery:"",
			}
		},
		onLoad(option) {
			this.OrderId=option.OrderId;
			// console.log(this.OrderId)
			uniCloud.callFunction({
				name:"GetOrderById",
				data:{
					OrderId:this.OrderId
				}
			}).then(res=>{
				this.MerchantName=res.result.data[0].StoreName;
				this.TotalMoney=res.result.data[0].TotalMoney;
				this.ListGoods=res.result.data[0].GoodsList;
				this.StorePicture=res.result.data[0].StorePicture;
				this.StoreId=res.result.data[0].StoreId;
				this.OrderState=res.result.data[0].OrderState;
				this.Contact=res.result.data[0].Contact;
				this.gender=res.result.data[0].gender;
				this.Phone=res.result.data[0].Phone;
				this.Address=res.result.data[0].Address;
				this.Doorplate=res.result.data[0].Doorplate;
				this.TimeOfOrder=res.result.data[0].TimeOfOrder;
				this.Cutlery=res.result.data[0].Cutlery;
				uniCloud.callFunction({
					name:"GetRTTMsgById",
					data:{
						StoreId:this.StoreId
					}
				}).then(ress=>{
					this.DeliveryFees=ress.result.data[0].DeliveryFees
				})
			})
		},
		methods: {
			
		}
	}
</script>

<style>
.bottomAdd {
	display: flex;
	justify-content: center;
	color: rgb(157, 157, 157);
	padding-bottom: 10px;
	font-size: 12px;
}
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
</style>
