<template>
	<scroll-view>
		<view style="display: flex;margin-left: 15%;">
			<view style="margin-top: 8%;">店铺信息：</view>
			<view>
				<image style="width: 120rpx;height: 120rpx" :src="MerchantPicture" mode="scaleToFill" ></image>
			</view>
			<view style="margin-top: 2%;margin-left: 3%;">
				<view>
					{{MerchantName}}
				</view>
				<view style="margin-top: 8%;font-size: 25rpx;">
					{{MerchantAddress}}
				</view>
			</view>
		</view>
		<view style="display: flex;margin-left: 11.5%;margin-top: 3%;">
			<view>店铺持有人：</view>
			<view>
				{{MerChantPossessor}}
			</view>
		</view>
		<view style="display: flex;margin-left: 11.5%;margin-top: 3%;">
			<view>持有人手机：</view>
			<view>
				{{PossessorPhone}}
			</view>
		</view>
		<view style="display: flex;margin-left: 15%;margin-top: 3%;">
			<view>退出原因：</view>
			<view>
				{{ReasonForExit}}
			</view>
		</view>
		<view style="display: flex;margin-left: 15%;margin-top: 3%;">
			<view>申请时间：</view>
			<view>
				{{ApplicationTime}}
			</view>
		</view>
		<view style="display: flex;margin-left: 18.5%;margin-top: 3%;">
			<view>处理人：</view>
			<view>
				{{Handlers}}
			</view>
		</view>
		<view style="display: flex;margin-left: 11%;margin-top: 3%;">
			<view>处理人账号：</view>
			<view>
				{{HandlersPhone}}
			</view>
		</view>
		<view style="display: flex;margin-left: 15%;margin-top: 3%;">
			<view>反馈状态：</view>
			<view :style="color">
				{{AuditState}}
			</view>
		</view>
		<view v-if="NotProcessed" style="display: flex;margin-left: 6%;margin-top: 8%;">
			<view>处理结果：</view>
			<view style="width: 70%;">
				<uni-easyinput type="textarea" v-model="Feedback" placeholder="请输入处理结果" @blur="IFFeedbackEmpty"></uni-easyinput>
			</view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 27%;" v-if="FeedbackEmpty">处理结果不能为空</view>
		<view v-if="HaveProcessed" style="display: flex;margin-left: 15%;margin-top: 8%;">
			<view>处理结果：</view>
			<view style="width: 70%;">
				{{Feedback}}
			</view>
		</view>
		<view v-if="HaveProcessed" style="display: flex;margin-left: 15%;margin-top: 8%;">
			<view>处理时间：</view>
			<view style="width: 70%;">
				{{ProcessingTime}}
			</view>
		</view>
		
		<view style="height: 150rpx;"></view>
		<view v-if="NotProcessed" style="display: flex;flex-direction: row;justify-content: center;">
			<button type="primary" style="width: 33%;" size="mini" @click="Approved">通过</button>
			<button type="warn" style="width: 33%;" size="mini" @click="Overrule">驳回</button>
		</view>
		<view style="height: 200rpx;"></view>
	</scroll-view>
	<uni-popup ref="message" type="message">
			<uni-popup-message type="error" message="请先按要求填写内容" :duration="2000"></uni-popup-message>
	</uni-popup>
</template>

<script>
	export default {
		data() {
			return {
				AuditExitId:"",
				MerchantPicture:"../../static/images/PersonalAvatar.jpg",
				MerchantName:"山西刀削面",
				MerchantAddress:"七餐三楼",
				MerChantPossessor:"张三",
				PossessorPhone:"15130380905",
				ReasonForExit:"经营不善",
				ApplicationTime:"2023-04-19",
				Handlers:"李四",
				HandlersPhone:2640055850001,
				AuditState:"处理中",
				Feedback:"",
				color:"",
				AuditListId:"",
				ProcessingTime:"",
				FeedbackEmpty:false,
				HaveProcessed:false,
				NotProcessed:false,
			}
		},
		onLoad(option) {
			// console.log(option)
			this.AuditListId=option.AuditId;
			uniCloud.callFunction({
				name:"GetAuditByListId",
				data:{
					AuditListId:this.AuditListId
				}
			}).then(res=>{
				// console.log(res)
				this.AuditExitId=res.result.data[0]._id;
				this.MerchantPicture=res.result.data[0].MerchantPicture;
				this.MerchantName=res.result.data[0].MerchantName;
				this.MerchantAddress=res.result.data[0].MerchantAddress;
				this.MerChantPossessor=res.result.data[0].MerChantPossessor;
				this.PossessorPhone=res.result.data[0].PossessorPhone;
				this.ReasonForExit=res.result.data[0].ReasonForExit;
				this.ApplicationTime=res.result.data[0].ApplicationTime;
				this.Handlers=res.result.data[0].Handlers;
				this.HandlersPhone=res.result.data[0].HandlersPhone;
				this.AuditState=res.result.data[0].AuditState;
				this.Feedback=res.result.data[0].Feedback;
				if(res.result.data[0].AuditState=="未处理"){
					this.color="color:#1296db";
					this.NotProcessed=true;
					this.HaveProcessed=false;
				}
				if(res.result.data[0].AuditState=="处理中"){
					this.color="color:#ffaa00";
					// console.log(getApp().globalData.Account);
					if(getApp().globalData.Account==this.HandlersPhone){
						this.NotProcessed=true;
						this.HaveProcessed=false;
					}else{
						this.NotProcessed=false;
						this.HaveProcessed=true;
					}
				}
				if(res.result.data[0].AuditState=="已通过"){
					this.color="color:#00aa00";
					this.NotProcessed=false;
					this.HaveProcessed=true;
					this.ProcessingTime=res.result.data[0].ProcessingTime;
				}
				if(res.result.data[0].AuditState=="已驳回"){
					this.color="color:#ff0000";
					this.NotProcessed=false;
					this.HaveProcessed=true;
					this.ProcessingTime=res.result.data[0].ProcessingTime;
				}
			})
		},
		methods: {
			IFFeedbackEmpty(){
				if(this.Feedback==""){
					this.FeedbackEmpty=true;
				}else{
					this.FeedbackEmpty=false;
				}
			},
			Approved(){
				if(this.FeedbackEmpty==false){
					let date2 = new Date();//当前时间
					let year = date2.getFullYear()
					let month = date2.getMonth() + 1
					let day = date2.getDate()
					month >= 1 && month <= 9 ? (month = "0" + month) : "";
					day >= 0 && day <= 9 ? (day = "0" + day) : "";
					var time=year + '-' + month + '-' + day;
					uniCloud.callFunction({
						name:"UpdateAuditListState",
						data:{
							AuditListId:this.AuditListId,
							AuditState:"已通过",
							HandlersAccount:this.HandlersPhone,
							Handlers:this.Handlers,
							ProcessingTime:time,
							Feedback:this.Feedback,
						}
					}).then(res=>{
						uniCloud.callFunction({
							name:"UpdateAuditExitById",
							data:{
								AuditExitId:this.AuditExitId,
								AuditState:"已通过",
								Feedback:this.Feedback,
								ProcessingTime:time,
							}
						}).then(ress=>{
							uniCloud.callFunction({
								name:"UpdateRTTBoardStatus",
								data:{
									PossessorPhone:this.PossessorPhone,
									OnboardingStatus:0
								}
							}).then(resss=>{
								uni.switchTab({
									url:"/pages/Audit/Audit"
								})
							})
						})
					})
				}else{
					this.$refs.message.open("center");
				}
			},
			Overrule(){
				if(this.FeedbackEmpty==false){
					let date2 = new Date();//当前时间
					let year = date2.getFullYear()
					let month = date2.getMonth() + 1
					let day = date2.getDate()
					month >= 1 && month <= 9 ? (month = "0" + month) : "";
					day >= 0 && day <= 9 ? (day = "0" + day) : "";
					var time=year + '-' + month + '-' + day;
					uniCloud.callFunction({
						name:"UpdateAuditListState",
						data:{
							AuditListId:this.AuditListId,
							AuditState:"已驳回",
							HandlersAccount:this.HandlersPhone,
							Handlers:this.Handlers,
							ProcessingTime:time,
							Feedback:this.Feedback
						}
					}).then(res=>{
						uniCloud.callFunction({
							name:"UpdateAuditExitById",
							data:{
								AuditExitId:this.AuditExitId,
								AuditState:"已驳回",
								Feedback:this.Feedback,
								ProcessingTime:time,
							}
						}).then(ress=>{
							uni.switchTab({
								url:"/pages/Audit/Audit"
							})
						})
					})
				}else{
					this.$refs.message.open("center");
				}
			},
		}
	}
</script>

<style>

</style>
