<template>
	<scroll-view style="background-color: white;" scroll-y="true" enable-back-to-top="true"> 
		<view style="display: flex;margin-left: 19%;">
			<view style="margin-top: 24%;margin-top: 2%;">店铺照片：</view>
			<uni-file-picker limit="1" :del-icon="false" disable-preview="false" :imageStyles="imageStyles"
				file-mediatype="image" @success="NewMerPictureLoadScs">
				<image :src="NewMerchantPicture" style="background-color: white;" mode="aspectFit"></image>
			</uni-file-picker>
		</view>
		<view style="display: flex;margin-left: 19%;margin-top: 5%;">
			<view>店铺名称：</view>
			<view style="width: 60%;">
				<uni-easyinput trim="all" v-model="NewMerchantName" placeholder="请输入店铺名称" @blur="IFNewMerchantNameEmpty"></uni-easyinput>
			</view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 39%;" v-if="NewMerchantNameEmpty">店铺名称不能为空</view>
		<view style="display: flex;margin-left: 19%;margin-top: 5%;">
			<view>店铺地址：</view>
			<view style="width: 60%;">
				<uni-easyinput trim="all" v-model="NewMerchantAddress" placeholder="例:七餐三楼" @blur="IFMerchantAddressEmpty"></uni-easyinput>
			</view>
		</view><view style="color: red;font-size: 20rpx;margin-left: 39%;" v-if="NewMerchantAddressEmpty">店铺地址不能为空</view>
		<view style="display: flex;margin-left: 15.5%;margin-top: 5%;">
			<view>店铺持有人：</view>
			<view style="width: 57%;">
				<uni-easyinput trim="all" v-model="NewPossessor" placeholder="请输入店铺持有人" @blur="IFPossessorEmpty"></uni-easyinput>
			</view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 39%;" v-if="NewPossessorEmpty">店铺持有人不能为空</view>
		<view style="display: flex;margin-left: 15.5%;margin-top: 5%;">
			<view>持有人手机：</view>
			<view>
				{{NewPossessorPhone}}
			</view>
		</view>
		<view style="display: flex;margin-left: 19%;margin-top: 5%;">
			<view style="margin-top: 25%;">营业执照：</view>
			<uni-file-picker limit="1" :del-icon="false" disable-preview="false" :imageStyles="imageStyles"
				file-mediatype="image" @success="NewLicensePictureScs">
				<image :src="NewLicensePicture" style="background-color: white;" mode="aspectFit"></image>
			</uni-file-picker>
		</view>
		<view style="display: flex;margin-left: 15.5%;margin-top: 5%;">
			<view style="margin-top: 24%;">卫生许可证：</view>
			<uni-file-picker limit="1" :del-icon="false" disable-preview="false" :imageStyles="imageStyles"
				file-mediatype="image" @success="NewSanitaryPermitScs">
				<image :src="NewSanitaryPermit" style="background-color: white;" mode="aspectFit"></image>
			</uni-file-picker>
		</view>
		<view style="display: flex;margin-left: 6%;margin-top: 5%;">
			<view style="margin-top: 21%;">持有人身份证(正)：</view>
			<uni-file-picker limit="1" :del-icon="false" disable-preview="false" :imageStyles="imageStyles"
				file-mediatype="image" @success="NewIdentityCardZScs">
				<image :src="NewIdentityCardZ" style="background-color: white;" mode="aspectFit"></image>
			</uni-file-picker>
		</view>
		<view style="display: flex;margin-left: 6%;margin-top: 5%;">
			<view style="margin-top: 21%;">持有人身份证(反)：</view>
			<uni-file-picker limit="1" :del-icon="false" disable-preview="false" :imageStyles="imageStyles"
				file-mediatype="image" @success="NewIdentityCardFScs">
				<image :src="NewIdentityCardF" style="background-color: white;" mode="aspectFit"></image>
			</uni-file-picker>
		</view>
		<view style="display: flex;margin-left: 6%;margin-top: 8%;">
			<view>经营内容：</view>
			<view style="width: 70%;">
				<uni-easyinput type="textarea" v-model="NewBusinessContent" placeholder="请输入主要经营内容" @blur="IFNewBusinessContentEmpty"></uni-easyinput>
			</view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 27%;" v-if="NewBusinessContentEmpty">经营内容不能为空</view>
		<view style="height: 150rpx;"></view>
		<view @click="SubmitForReview" style="display: flex;flex-direction: row;justify-content: center;">
			<button type="primary" style="width: 30%;">提交审核</button>
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
				NewMerchantPicture:"",
				imageStyles:{
					width:120,
					height:120,
					border:{
						color:"#a8a8a8"
					}
				},
				NewMerchantName:"",
				NewMerchantPicture:"../../static/images/DefaultFile.png",
				NewMerchantName:"",
				NewMerchantAddress:"",
				NewPossessor:"",
				NewPossessorPhone:"",
				NewBusinessContent:"",
				NewLicensePicture:"../../static/images/DefaultFile.png",
				NewSanitaryPermit:"../../static/images/DefaultFile.png",
				NewIdentityCardZ:"../../static/images/DefaultFile.png",
				NewIdentityCardF:"../../static/images/DefaultFile.png",
				NewMerchantNameEmpty:false,
				NewMerchantAddressEmpty:false,
				NewPossessorEmpty:false,
				NewBusinessContentEmpty:false,
				AuditListId:"",
				timer:null,
			}
		},
		onShow() {
			this.NewPossessorPhone=getApp().globalData.Account;
		},
		onHide() {
			if(this.timer) {  
				clearTimeout(this.timer);  
				this.timer = null;  
			}  
		},
		methods: {
			IFNewMerchantNameEmpty(){
				if(this.NewMerchantName==""){
					this.NewMerchantNameEmpty=true;
				}else{
					this.NewMerchantNameEmpty=false;
				}
			},
			IFMerchantAddressEmpty(){
				if(this.NewMerchantAddress==""){
					this.NewMerchantAddressEmpty=true;
				}else{
					this.NewMerchantAddressEmpty=false;
				}
			},
			IFPossessorEmpty(){
				if(this.NewPossessor==""){
					this.NewPossessorEmpty=true;
				}else{
					this.NewPossessorEmpty=false;
				}
			},
			IFNewBusinessContentEmpty(){
				if(this.NewBusinessContent==""){
					this.NewBusinessContentEmpty=true;
				}else{
					this.NewBusinessContentEmpty=false;
				}
			},
			NewMerPictureLoadScs(e){
				this.NewMerchantPicture=e.tempFilePaths[0];
			},
			NewLicensePictureScs(e){
				this.NewLicensePicture=e.tempFilePaths[0];
			},
			NewSanitaryPermitScs(e){
				this.NewSanitaryPermit=e.tempFilePaths[0];
			},
			NewIdentityCardZScs(e){
				this.NewIdentityCardZ=e.tempFilePaths[0];
			},
			NewIdentityCardFScs(e){
				this.NewIdentityCardF=e.tempFilePaths[0];
			},
			SubmitForReview(){
				if(this.NewMerchantNameEmpty==false&&
				this.NewMerchantAddressEmpty==false&&
				this.NewPossessorEmpty==false&&
				this.NewBusinessContentEmpty==false){
					let date=new Date();
					let year = date.getFullYear()
					let month = date.getMonth() + 1
					let day = date.getDate()
					month >= 1 && month <= 9 ? (month = "0" + month) : "";
					day >= 0 && day <= 9 ? (day = "0" + day) : "";
					var time=year + '-' + month + '-' + day
					
					uniCloud.callFunction({
						name:"AddToAuditList",
						data:{
							AuditType:"商家入驻",
							AuditState:"未处理",
							AuditMain:this.NewBusinessContent,
							Applicant:this.NewPossessor,
							ApplicantPhone:this.NewPossessorPhone,
							ApplicationTime:time,
						}
					}).then(res=>{
						console.log(res.result.id)
						this.AuditListId=res.result.id;
						uniCloud.callFunction({
							name:"AddToMerchantSettleAudit",
							data:{
								MerchantPicture:this.NewMerchantPicture,
								MerchantName:this.NewMerchantName,
								MerchantAddress:this.NewMerchantAddress,
								MerChantPossessor:this.NewPossessor,
								PossessorPhone:this.NewPossessorPhone,
								LicensePicture:this.NewLicensePicture,
								SanitaryPermit:this.NewSanitaryPermit,
								IdentityCardZ:this.NewIdentityCardZ,
								IdentityCardF:this.NewIdentityCardF,
								BusinessContent:this.NewBusinessContent,
								AuditListId:this.AuditListId,
								AuditState:"处理中",
								Handlers:"",
								HandlersPhone:"",
								Feedback:""
							}
						}).then(ress=>{
							uni.showToast({
								title:"提交成功",
								duration:1500
							})
							
							this.timer = setTimeout( () => {
							    console.log("11")
							    uni.switchTab({
							    	url:"/pages/Conditions/Conditions"
							    })	
							}, 1500)
						})
					})
				}else{
					this.$refs.message.open();
				}
			},
		}
	}
</script>

<style>

</style>
