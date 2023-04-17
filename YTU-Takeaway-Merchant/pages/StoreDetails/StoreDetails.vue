<template>
	<view>
		<view style="display: flex;flex-direction: row;justify-content: center;margin-top: 5%;">
			<view>
				<uni-file-picker limit="1" :del-icon="false" disable-preview="false" :imageStyles="imageStyles"
					file-mediatype="image" @success="MerPictureLoadScs">
					<image :src="MerchantPicture" style="background-color: white;" mode="aspectFit"></image>
				</uni-file-picker>
			</view>
		</view>
		<view style="display: flex;flex-direction: row;justify-content: center;margin-top: 5%;width: 100%;">
			<view style="margin-top: 1.5%;">店铺名称：</view>
			<view style="width: 50%;">
				<uni-easyinput trim="all" v-model="MerchantName" placeholder="请输入店铺名称" @blur="IFMerchantNameEmpty"></uni-easyinput>
			</view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 35%;" v-if="MerchantNameEmpty">店铺名称不能为空</view>
		<view style="display: flex;flex-direction: row;justify-content: center;margin-top: 3%;">
			<view style="margin-top: 1.5%;">店铺地址：</view>
			<view style="width: 50%;">
				<uni-easyinput trim="all" v-model="MerchantAddress" placeholder="请输入店铺地址,例七餐1楼" @blur="IFMerchantAddressEmpty"></uni-easyinput>
			</view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 35%;" v-if="MerchantAddressEmpty">店铺地址不能为空</view>
		<view style="display: flex;margin-left: 12%;margin-top: 3%;">
			<view>店铺持有人：</view>
			<view>{{Possessor}}</view>
		</view>
		<view style="display: flex;margin-left: 12%;margin-top: 3%;">
			<view>持有人手机：</view>
			<view>{{PossessorPhone}}</view>
		</view>
		<view style="display: flex;margin-left: 15.5%;margin-top: 3%;">
			<view>入驻日期：</view>
			<view>{{SettledDate}}</view>
		</view>
		<view style="display: flex;margin-left: 15.5%;margin-top: 3%;">
			<view>总订单数：</view>
			<view>{{AllOrders}}</view>
		</view>
		<view style="display: flex;margin-left: 19%;margin-top: 3%;">
			<view>总收入：</view>
			<view>{{AllMoney}}</view>
		</view>
		<view style="display: flex;margin-left: 6%;margin-top: 3%;">
			<view>经营内容：</view>
			<view style="width: 70%;">
				<uni-easyinput type="textarea" v-model="BusinessContent" placeholder="请输入主要经营内容" @blur="IFBusinessContentEmpty"></uni-easyinput>
			</view>
		</view>
		<view style="color: red;font-size: 20rpx;margin-left: 27%;" v-if="BusinessContentEmpty">经营内容不能为空</view>
		<view style="display: flex;flex-direction: row;justify-content: center;margin-top: 15%;">
			<button type="primary" @click="SubmitUpdate">提交审核</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				PossessorPhone:"",
				imageStyles: {
					width: 120,
					height: 120,
				},
				MerchantPicture:"",
				MerchantName:"山西刀削面",
				MerchantAddress:"七餐三楼",				
				Possessor:"张三",
				PossessorPhone:"15130380905",
				SettledDate:"2023-04-14",
				BusinessContent:"主要经营山西特色刀削面",
				AllOrders:999,
				AllMoney:1000000,
				MerchantAddressEmpty:false,
				MerchantNameEmpty:false,
				BusinessContentEmpty:false,
			}
		},
		onShow(){
			// let PossessorPhone=getApp().globalData.Account;
			this.PossessorPhone="15130380905";
			uniCloud.callFunction({
				name:"GetRTTAllInUser",
				data:{
					PossessorPhone:this.PossessorPhone
				}
			}).then(res=>{
				this.MerchantPicture=res.result.data[0].StorePicture;
				this.MerchantName=res.result.data[0].StoreName;
				this.Possessor=res.result.data[0].Possessor;
				this.PossessorPhone=res.result.data[0].PossessorPhone;
				this.SettledDate=res.result.data[0].SettledDate;
				this.AllOrders=res.result.data[0].AllOrders;
				this.AllMoney=res.result.data[0].AllMoney
			})
			// console.log(this.PossessorPhone)
		},
		methods: {
			IFMerchantNameEmpty(){
				if(this.MerchantName==""){
					this.MerchantNameEmpty=true;
				}else{
					this.MerchantNameEmpty=false;
				}
			},
			IFMerchantAddressEmpty(){
				if(this.MerchantAddress==""){
					this.MerchantAddressEmpty=true;
				}else{
					this.MerchantAddressEmpty=false;
				}
			},
			IFBusinessContentEmpty(){
				if(this.BusinessContent==""){
					this.BusinessContentEmpty=true;
				}else{
					this.BusinessContentEmpty=false;
				}
			},
			MerPictureLoadScs(e){
				console.log(e.tempFilePaths[0])
			},
			SubmitUpdate(){
				
			},
		}
	}
</script>

<style>
	.title {
		font-size: 14px;
		font-weight: bold;
		margin: 20px 0 5px 0;
	}

	.data-pickerview {
		height: 400px;
		border: 1px #e5e5e5 solid;
	}

	 .popper__arrow {
    top: -6px;
    left: 50%;
    margin-right: 3px;
    border-top-width: 0;
    border-bottom-color: #EBEEF5;
}
 .popper__arrow {
    top: -6px;
    left: 50%;
    margin-right: 3px;
    border-top-width: 0;
    border-bottom-color: #EBEEF5;
}
</style>

