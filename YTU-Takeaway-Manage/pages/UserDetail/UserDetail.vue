<template>
	<view style="width: 100%;">
		<view style="height: 20rpx;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;justify-content: center;">
			<view>
				<image mode="aspectFit" style="width: 150rpx;height: 150rpx;border-radius: 50%;" :src="Avatar"></image>
			</view>
		</view>
		<view style="height: 50rpx;"></view>
		<view style="display: flex;margin-left: 27%;">
			<view>用户昵称：</view>
			<view>{{NickName}}</view>
		</view>
		<view style="height: 50rpx;"></view>
		<view style="display: flex;margin-left: 27%;">
			<view>用户账号：</view>
			<view>{{Account}}</view>
		</view>
		<view style="height: 50rpx;"></view>
		<view style="display: flex;margin-left: 27%;">
			<view>账号状态：</view>
			<view :style="styles">{{State}}</view>
			<view v-if="AccState" style="margin-left: 10%;margin-top: -5rpx;">
				<button type="warn" size="mini" @click="ChangeState">禁用</button>
			</view>
			<view v-else style="margin-left: 10%;margin-top: -5rpx;">
				<button type="primary" size="mini" @click="ChangeState">启用</button>
			</view>
		</view>
		<view style="height: 30rpx;"></view>
		<view style="display: flex;;margin-left: 27%;">
			<view>下单数量：</view>
			<view>{{OrdersNum}}</view>
		</view>
		<view style="height: 50rpx;"></view>
		<view style="display: flex;;margin-left: 27%;">
			<view>评价数量：</view>
			<view>{{AppraiseNum}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Avatar:"",
				Account:"",
				NickName:"",
				State:"",
				AccState:true,
				OrdersNum:0,
				AppraiseNum:0,
				styles:"color:green",
			}
		},
		onLoad(option) {
			this.Account=option.Account;
			// console.log(this.Account);
			uniCloud.callFunction({
				name:"GetCustomerByAccount",
				data:{
					Account:this.Account
				}
			}).then(res=>{
				this.Avatar=res.result.data[0].Avatar;
				this.NickName=res.result.data[0].NickName;
				if(res.result.data[0].AccountState==1){
					this.State="正常";
					this.styles="color:green";
					this.AccState=true;
				}else{
					this.State="禁用";
					this.styles="color:red";
					this.AccState=false;
				}
			})
			
			uniCloud.callFunction({
				name:"GetOrdersByAccount",
				data:{
					Account:this.Account
				}
			}).then(res=>{
				this.OrdersNum=res.result.data.length;
			})
			
			uniCloud.callFunction({
				name:"GetAppraiseByUserPhone",
				data:{
					CustomerPhone:this.Account
				}
			}).then(res=>{
				this.AppraiseNum=res.result.data.length;
			})
			
			
		},
		methods: {
			ChangeState(e){
				var State=0;
				if(this.State=="正常"){
					this.State="禁用";
					State=0;
					this.AccState=false;
					this.styles="color:red;"
				}else{
					this.State="正常";
					State=1;
					this.AccState=true;
					this.styles="color:green;"
				}
				uniCloud.callFunction({
					name:"UpdateCustomerAccountState",
					data:{
						Account:this.Account,
						State:State
					}
				}).then(res=>{
					let pages= getCurrentPages();
					let page = pages[pages.length-1];  
					uni.redirectTo({url:page.$page.fullPath});
				})
			},
		}
	}
</script>

<style>

</style>
