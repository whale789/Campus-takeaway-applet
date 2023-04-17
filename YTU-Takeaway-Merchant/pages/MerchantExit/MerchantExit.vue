<template>
	<view>
		<view style="display: flex;margin-left: 18%;margin-top: 2%;">
			<view>持有人手机：</view>
			<view>
				{{ExitPossessorPhone}}
			</view>
		</view>
		
		<view style="display: flex;margin-left: 18%;margin-top: 5%;">
			<view style="margin-top: 1%;">持有人姓名：</view>
			 <view style="width: 60%;">
				 <uni-easyinput trim="all" v-model="ExitPossessor" placeholder="请输入持有人姓名" @blur="IFExitPossess"></uni-easyinput>
			 </view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 42%;" v-if="ExitPossessorEmpty">持有人姓名不能为空</view>
		<view style="color: red;font-size: 20rpx;margin-left: 42%;" v-if="ExitPossessorNotSame">持有人姓名与手机号不相符</view>
		<view style="display: flex;margin-left: 21.5%;margin-top: 5%;">
			<view style="margin-top: 8%;">退出原因：</view>
			<view style="width: 60%;">
				<uni-easyinput trim="all" type="textarea" v-model="ExitCause" placeholder="请输入退出原因" @blur="IFExitCause"></uni-easyinput>
			</view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 42%;" v-if="ExitCauseEmpty">退出原因不能为空</view>
		<view style="display: flex;justify-content: center;flex-direction: row;margin-top: 10%;">
			<button type="primary" style="width: 40%;">提交审核</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ExitPossessorPhone:"15130380905",
				ExitPossessor:"",
				ExitCause:"",
				ExitPossessorEmpty:false,
				ExitPossessorNotSame:false,
				ExitCauseEmpty:false,
			}
		},
		methods: {
			IFExitPossess(){
				if(this.ExitPossessor==""){
					this.ExitPossessorEmpty=true;
				}else{
					this.ExitPossessorEmpty=false;
					uniCloud.callFunction({
						name:"GetRTTAllInUser",
						data:{
							PossessorPhone:this.ExitPossessorPhone
						}
					}).then(res=>{
						console.log(res);
						if(res.result.data[0].Possessor!=this.ExitPossessor){
							this.ExitPossessorNotSame=true;
						}else{
							this.ExitPossessorNotSame=false;
						}
					})
				}
			},
			IFExitCause(){
				if(this.ExitCause==""){
					this.ExitCauseEmpty=true;
				}else{
					this.ExitCauseEmpty=false;
				}
			}
		}
	}
</script>

<style>

</style>
