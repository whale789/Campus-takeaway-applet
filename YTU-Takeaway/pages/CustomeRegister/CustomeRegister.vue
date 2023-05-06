<template>
	<view>
		<view style="display: flex;flex-direction: row;justify-content: center;">
			<view>
				<uni-file-picker limit="1" :del-icon="false" disable-preview="false" :imageStyles="imageStyles"
							file-mediatype="image" @success="AvatarLoadScs" @fail="FailAvatarLoad">
					<image :src="MerchantUserAvater" style="background-color: white;" mode="aspectFit"></image>
				</uni-file-picker>
			</view>
		</view>
		<view style="display: flex;margin-left: 11%;margin-top: 6%;">
			<view style="margin-top: 1.5%;">手机号：</view>
			<view style="width: 66%;">
				<uni-easyinput placeholder="请输入手机号" trim="all" v-model="NewAccount" @blur="SendNewAccount" type="number"></uni-easyinput>
			</view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 27%;" v-if="NewAccountEmpty">手机号不能为空</view>
		<view style="display: flex;flex-direction: row;justify-content: center;margin-top: 6%;">
			<view style="margin-top: 1.5%;">昵称：</view>
			<view style="width: 60%;">
				<uni-easyinput placeholder="请输入昵称" trim="all" v-model="NewNickName" @blur="SendNickName"></uni-easyinput>
			</view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 27%;" v-if="NewNickNameEmpty">昵称不能为空</view>
		<view style="display: flex;margin-left: 6.5%;margin-top: 6%;">
			<view style="margin-top: 1.5%;">密保问题：</view>
			<view style="width: 64%;">
				<uni-easyinput placeholder="请输入您的密保问题" trim="all" v-model="NewSecretQuestion" @blur="SendSecretQuestion"></uni-easyinput>
			</view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 27%;" v-if="NewSecretQuestionEmpty">密保问题不能为空</view>
		<view style="display: flex;margin-left: 6.5%;margin-top: 6%;">
			<view style="margin-top: 1.5%;">密保答案：</view>
			<view style="width: 64%;">
				<uni-easyinput placeholder="请输入密保问题的答案" trim="all" v-model="NewAnswer" @blur="SendAnswer"></uni-easyinput>
			</view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 27%;" v-if="NewSecretAnswerEmpty">密保问题答案不能为空</view>
		<view style="display: flex;flex-direction: row;justify-content: center;margin-top: 6%;">
			<view style="margin-top: 1.5%;">密码：</view>
			<view style="width: 60%;">
				<uni-easyinput placeholder="请输入新密码" trim="all" v-model="NewPassword" @blur="SendNewPsd" type="password"></uni-easyinput>
			</view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 27%;" v-if="NewPasswordEmpty">新密码不能为空</view>
		<view style="display: flex;margin-left: 6.5%;margin-top: 6%;">
			<view style="margin-top: 1.5%;">确认密码：</view>
			<view style="width: 64%;">
				<uni-easyinput placeholder="请再次输入密码" trim="all" v-model="NewConfirmPsd" @blur="CheckNewPsd" type="password"></uni-easyinput>
			</view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 27%;" v-if="PsdNotSame">两次输入的密码不同</view>
		<view style="color: red;font-size: 20rpx;margin-left: 27%;" v-if="ConfirmPsaawordEmpty">新密码不能为空</view>
		<view style="display: flex;flex-direction: row;justify-content: center;margin-top: 10%;">
			<button style="width: 40%;" type="primary" @click="SubmitNewMCTUser">提交</button>
		</view>
	</view>
	<uni-popup ref="message" type="message">
			<uni-popup-message type="error" :message="PromptMsg" :duration="2000"></uni-popup-message>
	</uni-popup>
</template>

<script>
	export default {
		data() {
			return {
				NewAccount:"",
				NewAccountEmpty:false,
				NewNickName:"",
				NewNickNameEmpty:false,
				NewSecretQuestion:"",
				NewSecretQuestionEmpty:false,
				NewAnswer:"",
				NewSecretAnswerEmpty:false,
				NewPassword:"",
				NewPasswordEmpty:false,
				NewConfirmPsd:"",
				ConfirmPsaawordEmpty:false,
				PsdNotSame:false,
				PromptMsg:"",
				imageStyles: {
					width: 80,
					height: 80,
					border: {
						radius: '50%'
					}
				},
				MerchantUserAvater:"../../static/images/PersonalAvatar.jpg",
				timer:null,
			}
		},
		onHide() {
			if(this.timer) {  
				clearTimeout(this.timer);  
				this.timer = null;  
			}  
		},
		methods: {
			SendNewAccount(){
				if(this.NewAccount==""){
					this.NewAccountEmpty=true;
				}else{
					this.NewAccountEmpty=false;
				}
			},
			SendNickName(){
				if(this.NewNickName==""){
					this.NewNickNameEmpty=true;
				}else{
					this.NewNickNameEmpty=false;
				}
			},
			SendSecretQuestion(){
				if(this.NewSecretQuestion==""){
					this.NewSecretQuestionEmpty=true;
				}else{
					this.NewSecretQuestionEmpty=false;
				}
			},
			SendAnswer(){
				if(this.NewAnswer==""){
					this.NewSecretAnswerEmpty=true;
				}else{
					this.NewSecretAnswerEmpty=false;
				}
			},
			SendNewPsd(){
				if(this.NewPassword==""){
					this.NewPasswordEmpty=true;
				}else{
					this.NewPasswordEmpty=false;
				}
			},
			CheckNewPsd(){
				if(this.NewConfirmPsd==""){
					this.ConfirmPsaawordEmpty=true;
				}else{
					this.ConfirmPsaawordEmpty=false;
					if(this.NewPassword!=this.NewConfirmPsd){
						this.PsdNotSame=true;
					}else{
						this.PsdNotSame=false;
					}
				}
			},
			AvatarLoadScs(e){
				console.log(e);
				this.MerchantUserAvater=e.tempFilePaths[0];
			},
			FailAvatarLoad(){
				this.PromptMsg="头像上传失败，请重新上传";
				this.$refs.message.opne();
			},
			SubmitNewMCTUser(){
				if(this.NewAccountEmpty==false&&
				this.NewNickNameEmpty==false&&
				this.NewSecretQuestionEmpty==false&&
				this.NewSecretAnswerEmpty==false&&
				this.NewPasswordEmpty==false&&
				this.ConfirmPsaawordEmpty==false&&
				this.PsdNotSame==false){
					uniCloud.callFunction({
						name:"GetAllCustomerUser",
					}).then(res=>{
						var k=0;
						for(var i=0;i<res.result.data.length;i++){
							if(res.result.data[i].Account==this.NewAccount){
								k++;
								this.PromptMsg="该账号已存在";
								this.$refs.message.open();
								break;
							}
						}
						if(k==0){
							uniCloud.callFunction({
								name:"AddNewCustomerUser",
								data:{
                                    Avatar:this.MerchantUserAvater,
									Account:this.NewAccount,
									NickName:this.NewNickName,
									SecretQuestion:this.NewSecretQuestion,
									SecretAnswer:this.NewAnswer,
									PassWord:this.NewPassword,
									AccountState:1,
									LoginState:0,
								}
							}).then(res=>{
								console.log(res)
								uni.showToast({
									title:"增设成功",
									duration:1500
								})
								
								this.timer = setTimeout( () => {
									console.log("定时器循环")
									uni.navigateTo({
										url:"/pages/CustomerLogin/CustomerLogin"
									})	
								}, 1500)
							})
						}
					})
				}else{
					this.PromptMsg="请先按要求填写内容"
					this.$refs.message.open();
				}
			},
		}
	}
</script>

<style>

</style>
