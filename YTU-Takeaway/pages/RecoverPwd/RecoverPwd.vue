<template>
	<view>
		<view style="display: flex;margin-top: 5%;flex-direction: row;justify-content: center;">
			<view style="margin-top: 1.5%;">账号：</view>
			<view style="width: 60%;">
				<uni-easyinput placeholder="请输入账号" trim="all" v-model="FindAccount" @blur="SendAccount" type="number"></uni-easyinput>
			</view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 27%;" v-if="IFAccount">该账号不存在</view>
		<view style="color: red;font-size: 20rpx;margin-left: 27%;" v-if="IFAccountEmpty">账号不能为空</view>
		<view style="display: flex;margin-left: 6.5%;margin-top: 6%;">
			<view>密保问题：</view>
			<view>{{SecretQuestion}}</view>
		</view>
		<view style="display: flex;margin-left: 6.5%;margin-top: 6%;">
			<view style="margin-top: 1.5%;">密保答案：</view>
			<view style="width: 64%;">
				<uni-easyinput placeholder="请输入密保问题的答案" trim="all" v-model="FindAnswer" @blur="SendAnswer"></uni-easyinput>
			</view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 27%;" v-if="IFSecretAnswer">答案错误</view>
		<view style="color: red;font-size: 20rpx;margin-left: 27%;" v-if="IFSecretAnswerEmpty">密保问题答案不能为空</view>
		<view style="display: flex;margin-left: 10.5%;margin-top: 6%;">
			<view style="margin-top: 1.5%;">新密码：</view>
			<view style="width: 67%;">
				<uni-easyinput placeholder="请输入新密码" trim="all" v-model="FindNewPsd" @blur="SendNewPsd" type="password"></uni-easyinput>
			</view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 27%;" v-if="IFNewPasswordEmpty">新密码不能为空</view>
		<view style="display: flex;margin-left: 6.5%;margin-top: 6%;">
			<view style="margin-top: 1.5%;">确认密码：</view>
			<view style="width: 64%;">
				<uni-easyinput placeholder="请再次输入密码" trim="all" v-model="FindConfirmPsd" @blur="CheckNewPsd" type="password"></uni-easyinput>
			</view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 27%;" v-if="IFPsdNotSame">密码不同</view>
		<view style="color: red;font-size: 20rpx;margin-left: 27%;" v-if="IFConfirmPsaawordEmpty">新密码不能为空</view>
		<view style="display: flex;flex-direction: row;justify-content: center;margin-top: 10%;">
			<button style="width: 40%;" type="primary" @click="UpdatePsd">提交</button>
		</view>
	</view>
	<uni-popup ref="message" type="message">
			<uni-popup-message type="error" message="请先按要求填写内容" :duration="2000"></uni-popup-message>
	</uni-popup>
</template>

<script>
	export default {
		data() {
			return {
				FindAccount: "",
				FindAnswer:"",
				FindNewPsd:"",
				FindConfirmPsd:"",
				SecretQuestion:"",
				IFAccount:false,
				IFAccountEmpty:false,
				IFSecretAnswer:false,
				IFSecretAnswerEmpty:false,
				IFNewPasswordEmpty:false,
				IFConfirmPsaawordEmpty:false,
				IFPsdNotSame:false,
				timer:null,
			}
		},
		onHide() {//离开页面前清除计时器
			clearInterval(this.timer);
			this.timer = null;
		},
		methods: {
			SendAccount(e){
				if(this.FindAccount==""){
					this.IFAccountEmpty=true;
				}else{
					this.IFAccountEmpty=false;
					// console.log(this.FindAccount)
					uniCloud.callFunction({
						name:"GetUserMsg",
						data:{
							Account:this.FindAccount
						}
					}).then(res=>{
						// console.log(res.result);
						if(res.result.data.length==0){
							this.IFAccount=true;
						}else{
							this.IFAccount=false;
							this.SecretQuestion=res.result.data[0].SecretQuestion
						}
					})
				}
			},
			
			SendAnswer(e){
				if(this.FindAnswer==""){
					this.IFSecretAnswerEmpty=true;
				}else{
					this.IFSecretAnswerEmpty=false;
					uniCloud.callFunction({
						name:"GetUserMsg",
						data:{
							Account:this.FindAccount
						}
					}).then(res=>{
						console.log(res.result);
						if(res.result.data[0].SecretAnswer==this.FindAnswer){
							this.IFSecretAnswer=false;
						}else{
							this.IFSecretAnswer=true;
						}
					})
				}
			},
			SendNewPsd(e){
				if(this.FindNewPsd==""){
					this.IFNewPasswordEmpty=true;
				}else{
					this.IFNewPasswordEmpty=false;
				}
			},
			CheckNewPsd(e){
				if(this.FindConfirmPsd==""){
					this.IFConfirmPsaawordEmpty=true;
				}else{
					this.IFConfirmPsaawordEmpty=false;
					if(this.FindNewPsd!=this.FindConfirmPsd){
						this.IFPsdNotSame=true;
					}else{
						this.IFPsdNotSame=false;
					}
				}
			},
			UpdatePsd(e){
				if(this.IFAccount==false&&this.IFAccountEmpty==false&&
				this.IFSecretAnswer==false&&
				this.IFSecretAnswerEmpty==false&&
				this.IFNewPasswordEmpty==false&&
				this.IFConfirmPsaawordEmpty==false&&
				this.IFPsdNotSame==false){
					// this.$refs.message.open()
					uniCloud.callFunction({
						name:"UpdateCustomerPwd",
						data:{
							Account:this.FindAccount,
							Password:this.FindNewPsd
						}
					}).then(res=>{
						console.log(res);
						uni.showToast({
							title:"修改密码成功",
							duration:1500
						})
						this.timer = setInterval(function() {
							 console.log("11")
							uni.navigateTo({
								url:"/pages/CustomerLogin/CustomerLogin"
							})
						}, 1500);
						
					})
				}else{
					this.$refs.message.open()
				}
			},
		}
	}
</script>

<style>

</style>
