<template>
	<scroll-view style="background-color: white;" scroll-y="true" enable-back-to-top="true">
		<view style="display: flex;margin-left: 19%;">
			<view style="margin-top: 24%;margin-top: 2%;">店铺照片：</view>	
			<image @click="ImagePlus(0)" :src="MerchantPicture" style="background-color: white;width: 120rpx;height: 120rpx;" mode="aspectFit"></image>
		</view>
		<view style="display: flex;margin-left: 19%;margin-top: 5%;">
			<view>店铺名称：</view>
			<view style="width: 60%;">
				{{MerchantName}}
			</view>
		</view>
		<view style="display: flex;margin-left: 19%;margin-top: 5%;">
			<view>店铺地址：</view>
			<view style="width: 60%;">
				{{MerchantAddress}}
			</view>
		</view>
		<view style="display: flex;margin-left: 15.5%;margin-top: 5%;">
			<view>店铺持有人：</view>
			<view style="width: 57%;">
				{{MerChantPossessor}}
			</view>
		</view>
		<view style="display: flex;margin-left: 15.5%;margin-top: 5%;">
			<view>持有人手机：</view>
			<view>
				{{PossessorPhone}}
			</view>
		</view>
		<view style="display: flex;margin-left: 19%;margin-top: 5%;">
			<view style="margin-top: 10%;">营业执照：</view>
			<image @click="ImagePlus(1)" :src="LicensePicture" style="background-color: white;width: 120rpx;height: 120rpx;" mode="aspectFit"></image>
		</view>
		<view style="display: flex;margin-left: 15.5%;margin-top: 5%;">
			<view style="margin-top: 9%;">卫生许可证：</view>
			<image @click="ImagePlus(2)" :src="SanitaryPermit" style="background-color: white;width: 120rpx;height: 120rpx;" mode="aspectFit"></image>
		</view>
		<view style="display: flex;margin-left: 6%;margin-top: 5%;">
			<view style="margin-top: 8%;">持有人身份证(正)：</view>
			<image @click="ImagePlus(3)" :src="IdentityCardZ" style="background-color: white;width: 120rpx;height: 120rpx;" mode="aspectFit"></image>
		</view>
		<view style="display: flex;margin-left: 6%;margin-top: 5%;">
			<view style="margin-top: 8%;">持有人身份证(反)：</view>
			<image @click="ImagePlus(4)" :src="IdentityCardF" style="background-color: white;width: 120rpx;height: 120rpx;" mode="aspectFit"></image>
		</view>
		<view style="display: flex;margin-left: 20.5%;margin-top: 8%;">
			<view>经营内容：</view>
			<view style="width: 70%;">
				{{BusinessContent}}
			</view>
		</view>
		<view style="display: flex;margin-left: 24.5%;margin-top: 8%;">
			<view>处理人：</view>
			<view style="width: 70%;">
				<!-- {{BusinessContent}} -->
				{{Handlers}}
			</view>
		</view>
		<view style="display: flex;margin-left: 17%;margin-top: 8%;">
			<view>处理人账号：</view>
			<view style="width: 70%;">
				<!-- {{BusinessContent}} -->
				{{HandlersPhone}}
			</view>
		</view>
		<view style="display: flex;margin-left: 20.5%;margin-top: 8%;">
			<view>处理状态：</view>
			<view style="width: 70%;">
				<view :style="color">
					{{AuditState}}
				</view>
			</view>
		</view>
		<view style="display: flex;margin-left: 6%;margin-top: 8%;">
			<view>处理结果：</view>
			<view style="width: 70%;">
				<uni-easyinput type="textarea" v-model="Feedback" placeholder="请输入处理结果" @blur="IFFeedbackEmpty"></uni-easyinput>
			</view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 27%;" v-if="FeedbackEmpty">处理结果不能为空</view>
		<view style="height: 150rpx;"></view>
		<view  style="display: flex;flex-direction: row;justify-content: center;">
			<button type="primary" style="width: 33%;" size="mini">通过</button>
			<button type="warn" style="width: 33%;" size="mini">驳回</button>
		</view>
		<view style="height: 200rpx;"></view>
	</scroll-view>
	<!-- <uni-popup ref="message" type="message">
			<uni-popup-message type="error" message="请先按要求填写内容" :duration="2000"></uni-popup-message>
	</uni-popup> -->
</template>

<script>
	export default {
		data() {
			return {
				AuditListId:"",
				MerchantPicture:"",
				MerchantName:"",
				MerchantAddress:"",
				MerChantPossessor:"",
				PossessorPhone:"",
				LicensePicture:"",
				SanitaryPermit:"",
				IdentityCardZ:"",
				IdentityCardF:"",
				BusinessContent:"",
				ImageList:[],
				color:"",
				AuditState:"",
				Handlers:"",
				HandlersPhone:"",
				Feedback:"",
				FeedbackEmpty:false,
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
				this.MerchantPicture=res.result.data[0].MerchantPicture;
				this.MerchantName=res.result.data[0].MerchantName;
				this.MerchantAddress=res.result.data[0].MerchantAddress;
				this.MerChantPossessor=res.result.data[0].MerChantPossessor;
				this.PossessorPhone=res.result.data[0].PossessorPhone;
				this.LicensePicture=res.result.data[0].LicensePicture;
				this.SanitaryPermit=res.result.data[0].SanitaryPermit;
				this.IdentityCardZ=res.result.data[0].IdentityCardZ;
				this.IdentityCardF=res.result.data[0].IdentityCardF;
				this.BusinessContent=res.result.data[0].BusinessContent;
				this.Handlers=res.result.data[0].Handlers;
				this.HandlersPhone=res.result.data[0].HandlersPhone;
				this.AuditState=res.result.data[0].AuditState;
				this.ImageList.push(this.MerchantPicture);
				this.ImageList.push(this.LicensePicture);
				this.ImageList.push(this.SanitaryPermit);
				this.ImageList.push(this.IdentityCardZ);
				this.ImageList.push(this.IdentityCardF);
				// console.log(this.ImageList)
				if(res.result.data[0].AuditState=="未处理"){
					this.color="color:#1296db";
				}
				if(res.result.data[0].AuditState=="处理中"){
					this.color="color:#ffaa00";
				}
				if(res.result.data[0].AuditState=="已通过"){
					this.color="color:#00aa00";
				}
				if(res.result.data[0].AuditState=="已驳回"){
					this.color="color:#ff0000";
				}
			})
		},
		methods: {
			ImagePlus(e){
				uni.previewImage({
					urls:this.ImageList,
					current:e,
					indicator:"default",
					loop:true,
				})
			},
			IFFeedbackEmpty(){
				if(this.Feedback==""){
					this.FeedbackEmpty=true;
				}else{
					this.FeedbackEmpty=false;
				}
			},
		}
	}
</script>

<style>

</style>
