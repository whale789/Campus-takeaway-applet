<template>
	<view style="width: 100%;">
		<view style="width: 100%;display: flex;flex-direction: row;justify-content: center;margin-top: 10%;">
			<image src="../../static/images/ManageLogo.jpg" style="width: 150rpx;height: 150rpx"></image>
		</view>
		<view style="display: flex;flex-direction: row;justify-content: center;margin-top: 7%;">
			<view style="margin-top: 1%;font-size:32rpx;">账号：</view>
			<view style="width: 50%;">
				<uni-easyinput trim="all" type="number" v-model.number="account" placeholder="请输入账号" @blur="LAEmpty"></uni-easyinput>
			</view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 32%;" v-if="LoginAccountEmpty">账号不能为空</view>
		<view style="display: flex;flex-direction: row;justify-content: center;margin-top: 5%;">
			<view style="margin-top: 1%;font-size: 32rpx;">密码：</view>
			<view style="width: 50%;">
				<uni-easyinput trim="all" type="password" v-model="password" placeholder="请输入密码" @blur="LPEmpty"></uni-easyinput>
			</view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 32%;" v-if="LoginPasswordEmpty">密码不能为空</view>
		<view style="color:#0099FF;font-size: 25rpx;margin-left: 65%;margin-top: 3%;" @click="FindBackPsd">忘记密码？</view>
		<view style="display: flex;flex-direction: row;justify-content: center;margin-top: 10%;">
			<button style="width: 40%;" type="primary" @click="Login">登录</button>
		</view>
	</view>
	<uni-popup ref="message" type="message">
			<uni-popup-message type="error" :message="LoginMessage" :duration="2000"></uni-popup-message>
	</uni-popup>
</template>

<script>
	export default {
		data() {
			return {
				account:"",
				password:"",
				LoginAccountEmpty:false,
				LoginPasswordEmpty:false,
				LoginMessage:"",
				LoginState:-1,
				AccountState:-1,
			}
		},
		methods: {
			LAEmpty(e){
				if(this.account==""){
					this.LoginAccountEmpty=true;
				}else{
					this.LoginAccountEmpty=false;
				}
			},
			LPEmpty(e){
				if(this.password==""){
					this.LoginPasswordEmpty=true;
				}else{
					this.LoginPasswordEmpty=false;
				}
			},
			Login(e){
				uniCloud.callFunction({
					name:"GetManagerMsg",
					data:{
						Account:this.account
					}
				}).then(res=>{
					// this.LoginState=res.result.data[0].LoginState;
					if(res.result.data.length==0){
						this.LoginMessage="账号不存在";
						this.$refs.message.open();
					}else{
						if(res.result.data[0].PassWord!=this.password){
							this.LoginMessage="密码错误";
							this.$refs.message.open();
						}else{
							this.LoginState=res.result.data[0].LoginState;
							if(this.LoginState==1){
								this.LoginMessage="该账号已在其他设备登录";
								this.$refs.message.open();
							}else{
								this.AccountState=res.result.data[0].AccountState;
								if(this.AccountState==0){
									this.LoginMessage="该账号已被注销";
									this.$refs.message.open();
								}else{
									uniCloud.callFunction({
										name:"UpdateLoginState",
										data:{
											Account:this.account,
											State:1,
										}
									}).then(res=>{
										getApp().globalData.Account = this.account;
										uni.switchTab({
											url:"/pages/Personal/Personal"
										})
										// console.log(getApp().globalData.Account);
									})
								}
							}
						}
					}
				})
			},
			FindBackPsd(){
				uni.navigateTo({
					url:"/pages/Recoverpsd/Recoverpsd"
				})
			},
		}
	}
</script>

<style>

</style>
