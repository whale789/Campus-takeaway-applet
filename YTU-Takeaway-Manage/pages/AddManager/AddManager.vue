<template>
	<view>
		<view style="display: flex;margin-top: 5%;margin-left: 14.5%;">
			<view style="">账号：</view>
			<view>{{NewAccount}}</view>
		</view>
		<view style="display: flex;flex-direction: row;justify-content: center;margin-top: 6%;">
			<view style="margin-top: 1.5%;">工号：</view>
			<view style="width: 60%;">
				<uni-easyinput placeholder="请输入职工号" trim="all" v-model="NewWorkNumber" @blur="SendWorkNumber" type="number"></uni-easyinput>
			</view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 27%;" v-if="NewWorkNumberEmpty">工号不能为空</view>
		<view style="display: flex;flex-direction: row;justify-content: center;margin-top: 6%;">
			<view style="margin-top: 1.5%;">姓名：</view>
			<view style="width: 60%;">
				<uni-easyinput placeholder="请输入您的真实姓名" trim="all" v-model="NewName" @blur="SendName"></uni-easyinput>
			</view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 27%;" v-if="NewNameEmpty">姓名不能为空</view>
		<view style="display: flex;margin-left: 6.5%;margin-top: 6%;">
			<view>密保问题：</view>
			<view style="width: 60%;">
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
		<view style="color: red;font-size: 20rpx;margin-left: 27%;" v-if="IFNewPasswordEmpty">新密码不能为空</view>
		<view style="display: flex;margin-left: 6.5%;margin-top: 6%;">
			<view style="margin-top: 1.5%;">确认密码：</view>
			<view style="width: 64%;">
				<uni-easyinput placeholder="请再次输入密码" trim="all" v-model="NewConfirmPsd" @blur="CheckNewPsd" type="password"></uni-easyinput>
			</view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 27%;" v-if="IFPsdNotSame">两次输入的密码不同</view>
		<view style="color: red;font-size: 20rpx;margin-left: 27%;" v-if="IFConfirmPsaawordEmpty">新密码不能为空</view>
		<view style="display: flex;flex-direction: row;justify-content: center;margin-top: 10%;">
			<button style="width: 40%;" type="primary" @click="SubmitNewMag">提交</button>
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
				NewAccount:0,
				NewName:"",
				NewWorkNumber:"",
				NewSecretQuestion:"",
				NewAnswer:"",
				NewPassword:"",
				NewConfirmPsd:"",
				NewNameEmpty:false,
				NewWorkNumberEmpty:false,
				NewSecretQuestionEmpty:false,
				NewSecretAnswerEmpty:false,
				IFNewPasswordEmpty:false,
				IFConfirmPsaawordEmpty:false,
				IFPsdNotSame:false,
				timer: null,
			}
		},
		onLoad(){
			uniCloud.callFunction({
				name:"GetAllManagers"
			}).then(res=>{
				console.log(res)
				var i;
				for(i=0;i<res.result.data.length;i++){
					if(res.result.data[i].Account>this.NewAccount){
						this.NewAccount=res.result.data[i].Account;
					}
				}
				this.NewAccount=this.NewAccount+1;
			})
		},
		onHide() {//离开页面前清除计时器
			clearInterval(this.timer);
			this.timer = null;
		},
		methods: {
			SendWorkNumber(){
				if(this.NewWorkNumber==""){
					this.NewWorkNumberEmpty=true;
				}else{
					this.NewWorkNumberEmpty=false;
				}
			},
			SendName(){
				if(this.NewName==""){
					this.NewNameEmpty=true;
				}else{
					this.NewNameEmpty=false;
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
					this.IFNewPasswordEmpty=true;
				}else{
					this.IFNewPasswordEmpty=false;
				}
			},
			CheckNewPsd(){
				if(this.NewConfirmPsd==""){
					this.IFConfirmPsaawordEmpty=true;
				}else{
					this.IFConfirmPsaawordEmpty=false;
					if(this.NewPassword!=this.NewConfirmPsd){
						this.IFPsdNotSame=true;
					}else{
						this.IFPsdNotSame=false;
					}
				}
			},
			SubmitNewMag(){
				if(this.NewNameEmpty==false&&
				this.NewWorkNumberEmpty==false&&
				this.NewSecretQuestionEmpty==false&&
				this.NewSecretAnswerEmpty==false&&
				this.IFNewPasswordEmpty==false&&
				this.IFConfirmPsaawordEmpty==false&&
				this.IFPsdNotSame==false){
					let date=new Date();
					let year = date.getFullYear()
					let month = date.getMonth() + 1
					let day = date.getDate()
					month >= 1 && month <= 9 ? (month = "0" + month) : "";
					day >= 0 && day <= 9 ? (day = "0" + day) : "";
					var time=year + '-' + month + '-' + day;
					uniCloud.callFunction({
						name:"AddNewManager",
						data:{
							Account:this.NewAccount,
							PassWord:this.NewPassword,
							name:this.NewName,
							EmployeeNumber:this.NewWorkNumber,
							WorkWithHistory:[],
							AccountState:1,
							LoginState:0,
							SecretQuestion:this.NewSecretQuestion,
							SecretAnswer:this.NewAnswer,
							RegistrationTime:time,
						}
					}).then(res=>{
						// console.log(res);
						uni.showToast({
							title:"增设成功",
							duration:1500
						})
						 this.timer = setInterval(function() {
							uni.switchTab({
								url:"/pages/Personal/Personal"
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
