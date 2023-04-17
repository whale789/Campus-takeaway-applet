<template>
	<!-- 登录之后的界面 -->
	<view v-if="Logged">
		<view style="background-color: #0099FF;">
			<view style="height: 30rpx;"></view>
			<view style="display: flex;margin-left: 5%;">
				<image style="width: 120rpx;height: 120rpx;border-radius: 50%;border: 1px solid black;" 
				src="../../static/images/PersonalAvatar.jpg"></image>
				<view style="flex-direction: row;margin-top:6rpx;margin-left: 5%;">
					<view style="height: 30px;width: 100%; font-weight:bold;font-size: 18px; margin-top: 2%;margin-left: 3%;">
						{{ManagerName}}
					</view>
					<view style="margin-left: 3%;font-size: 15px;display: flex;margin-top: 5rpx;">
						{{ManagerWorkNumber}}
					</view>
					<view style="height: 30rpx;"></view>
				</view>
			</view>
		</view>
		
		<view style="display: flex;width: 100%;margin-top: 10%;">
			<view style="width: 33.33%;display: flex;flex-direction: row; justify-content: center;">
				<view style="width: 60%; background-color: #efeff4;border-radius: 5rpx;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0.1, 0.1);">
					<view style="display: flex;flex-direction: row; justify-content: center;height:90rpx;">
						<uni-icons type="download-filled" size="50" color="#a2a2a2"></uni-icons>
					</view>
					<view style="text-align: center;color:gray;font-size: 25rpx">历史处理</view>
					<view style="height: 10rpx;"></view>
				</view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction: row; justify-content: center;">
				<view style="width: 60%;background-color: #efeff4;border-radius: 5rpx;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0.1, 0.1);">
					<view style="text-align: center;font-size: 35rpx;height: 90rpx;line-height: 100rpx;">{{WorkingDays}}</view>
					<view style="text-align: center;color:gray;font-size: 25rpx;">工作天数</view>
				</view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction: row; justify-content: center;">
				<view style="width: 60%;background-color: #efeff4;border-radius: 5rpx;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0.1, 0.1);">
					<view style="text-align: center;font-size: 35rpx;height: 90rpx;line-height: 100rpx;">{{ProcessingNumber}}</view>
					<view style="text-align: center;color:gray;font-size: 25rpx;">处理个数</view>
				</view>
			</view>
		</view>
		
		<view style="margin-top: 10%;">
			<view @click="AddNewManager" style="width: 100%;border-bottom: 1px solid #dedede;border-top: 1px solid #dedede;height: 100rpx;display: flex;">
				<view style="margin-left: 5%;font-size: 35rpx;line-height: 100rpx;width: 80%;">
					增设管理员
				</view>
				<view style="width: 10%;margin-top: 3.5%;">
					<uni-icons type="forward" size="15" color="#9d9d9d"></uni-icons>
				</view>
			</view>
			<view @click="CancelAccount" style="width: 100%;border-bottom: 1px solid #dedede;border-top: 1px solid #dedede;height: 100rpx;display: flex;">
				<view style="margin-left: 5%;font-size: 35rpx;line-height: 100rpx;width: 80%;">
					注销账号
				</view>
				<view style="width: 10%;margin-top: 3.5%;">
					<uni-icons type="forward" size="15" color="#9d9d9d"></uni-icons>
				</view>
			</view>
			<view style="color: red;border-bottom:1px solid #dedede;border-top: 1px solid #dedede;text-align: center;
			font-size: 35rpx;height: 100rpx;line-height: 100rpx;margin-top: 50%;" @click="LoginOut">退出登录</view>
		</view>
	</view>
	
	<!-- 未登录时的界面 -->
	<view v-else>
		<view style="background-color: #0099FF;">
			<view style="height: 30rpx;"></view>
			<view style="display: flex;margin-left: 5%;">
				<image style="width: 120rpx;height: 120rpx;border-radius: 50%;border: 1px solid black;" 
				src="../../static/images/PersonalAvatar.jpg"></image>
				<view style="flex-direction: row;margin-top:6rpx;margin-left: 5%;">
					<view style="font-size: 30rpx; height: 30px;width: 100%; font-weight:bold;font-size: 18px; margin-top: 20%;margin-left: 3%;"
					@click="Login">
						请您先登录
					</view>
					<view style="height: 30rpx;"></view>
				</view>
			</view>
		</view>
		
		<view style="display: flex;width: 100%;margin-top: 10%;">
			<view @click="Login" style="width: 33.33%;display: flex;flex-direction: row; justify-content: center;">
				<view  style="width: 60%; background-color: #efeff4;border-radius: 5rpx;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0.1, 0.1);">
					<view style="display: flex;flex-direction: row; justify-content: center;height:90rpx;">
						<uni-icons type="download-filled" size="50" color="#a2a2a2"></uni-icons>
					</view>
					<view style="text-align: center;color:gray;font-size: 25rpx">历史处理</view>
					<view style="height: 10rpx;"></view>
				</view>
			</view>
			<view @click="Login" style="width: 33.33%;display: flex;flex-direction: row; justify-content: center;">
				<view style="width: 60%;background-color: #efeff4;border-radius: 5rpx;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0.1, 0.1);">
					<view style="text-align: center;font-size: 35rpx;height: 90rpx;line-height: 100rpx;">*****</view>
					<view style="text-align: center;color:gray;font-size: 25rpx;">工作天数</view>
				</view>
			</view>
			<view @click="Login" style="width: 33.33%;display: flex;flex-direction: row; justify-content: center;">
				<view style="width: 60%;background-color: #efeff4;border-radius: 5rpx;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0.1, 0.1);">
					<view style="text-align: center;font-size: 35rpx;height: 90rpx;line-height: 100rpx;">*****</view>
					<view style="text-align: center;color:gray;font-size: 25rpx;">处理个数</view>
				</view>
			</view>
		</view>
		
		<view style="margin-top: 10%;">
			<view @click="Login" style="width: 100%;border-bottom: 1px solid #dedede;border-top: 1px solid #dedede;height: 100rpx;display: flex;">
				<view style="margin-left: 5%;font-size: 35rpx;line-height: 100rpx;width: 80%;color: #cacace;">
					增设管理员
				</view>
				<view style="width: 10%;margin-top: 3.5%;">
					<uni-icons type="forward" size="15" color="#9d9d9d"></uni-icons>
				</view>
			</view>
			<view @click="Login" style="width: 100%;border-bottom: 1px solid #dedede;border-top: 1px solid #dedede;height: 100rpx;display: flex;">
				<view style="margin-left: 5%;font-size: 35rpx;line-height: 100rpx;width: 80%;color: #cacace;">
					注销账号
				</view>
				<view style="width: 10%;margin-top: 3.5%;">
					<uni-icons type="forward" size="15" color="#9d9d9d"></uni-icons>
				</view>
			</view>
			<view @click="Login" style="color: red;border-bottom:1px solid #dedede;border-top: 1px solid #dedede;text-align: center;
			font-size: 35rpx;height: 100rpx;line-height: 100rpx;margin-top: 50%;color: #cacace;">退出登录</view>
		</view>
	</view>
	<uni-popup ref="cancellation" type="dialog">
		<uni-popup-dialog type="error" cancelText="关闭" confirmText="确定" title="警告" content="您确定注销该账号吗" @confirm="SureCancel"
		></uni-popup-dialog>
	</uni-popup>
</template>

<script>
	export default {
		data() {
			return {
				WorkingDays:125,
				ProcessingNumber:52,
				Logged:false,
				ManagerName:"",
				ManagerWorkNumber:"",
				Account:0,
				SecretQuestion:"",
				SecretAnswer:"",
			}
		},
		onShow(){
			var Account=getApp().globalData.Account;
			console.log(Account);
			this.Account=Account;
			if(Account==0){
				this.Logged=false;
			}else{
				this.Logged=true;
				uniCloud.callFunction({
					name:"GetManagerMsg",
					data:{
						Account:Account
					}
				}).then(res=>{
					console.log(res);
					let date2=new Date();
					let date1 = new Date(Date.parse(res.result.data[0].RegistrationTime.replace(/-/g,"/")));
					let WorkDays = parseInt(Math.abs(date2.getTime()- date1.getTime()) /1000/60/60/24);
					this.ManagerName=res.result.data[0].name;
					this.ManagerWorkNumber=res.result.data[0].EmployeeNumber;
					this.WorkingDays=WorkDays+1;
					this.ProcessingNumber=res.result.data[0].WorkWithHistory.length;
					this.SecretQuestion=res.result.data[0].SecretQuestion;
				})
			}
		},
		onReady(){
			
		},
		methods: {
			Login(){
				uni.navigateTo({
				    url:"/pages/ManagerLogin/ManagerLogin"
				});
			},
			LoginOut(){
				uniCloud.callFunction({
					name:"UpdateLoginState",
					data:{
						Account:this.Account,
						State:0,
					}
				}).then(res=>{
					this.Logged=false;
					getApp().globalData.Account = 0;
				})
			},
			CancelAccount(){
				this.$refs.cancellation.open();
			},
			SureCancel(){
				uniCloud.callFunction({
					name:"UpdateAccountState",
					data:{
						Account:this.Account,
						State:0,
					}
				}).then(res=>{
					uni.showToast({
						title:"注销成功"
					})
					this.LoginOut();
				})
			},
			AddNewManager(){
				uni.navigateTo({
					url:"/pages/AddManager/AddManager"
				})
			},
		}
	}
</script>

<style>

</style>
