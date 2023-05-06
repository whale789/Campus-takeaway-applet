<template>
	<view v-for="(item,index) in ColllectionList" style="background-color:white;border-radius: 10rpx;width: 95%;margin-left: 2.5%;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);">
		<view style="height: 20rpx;"></view>
		<view style="display: flex;background-color: white;border-radius: 10rpx;">
			<view style="margin-left: 5%;">
				<image mode="aspectFit" style="width: 120rpx;height: 120rpx;border-radius: 10rpx;" :src="item.StorePicture"></image>
			</view>
			<view style="margin-left: 3%;width: 100%;">
				<view style="display: flex;" @click="GoToMerchant(item.StoreId)">
					<view style="font-size: 33rpx;">
						{{item.StoreName}}
					</view>
					<view style="margin-top: 1%;">
						<uni-icons type="forward" size="20"></uni-icons>
					</view>
				</view>
				<view style="width: 100%;">
					<view style="height: 5rpx;"></view>
					<view style="color: #7f7f7f;font-size: 25rpx;">
						{{item.Address}}
					</view>
					<view style="height: 7rpx;"></view>
					<view style="display: flex;color: #838383;font-size: 26rpx;width: 100%;">
						<view>起送：￥{{item.DropOffee}}</view>
						<view style="margin-left: 5%;">配送：￥{{item.DeliveryFees}}</view>
					</view>
				</view>
			</view>
			
		</view>
		
		<view style="height: 20rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StorePicture:"https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/dc678af8-928b-42bd-b4dc-babf7e970091.jpg",
				StoreName:"土豆粉",
				Address:"七餐三楼",
				DeliveryFees:1,
				DropOffee:5,
				Account:"",
				ColllectionList:[],
			}
		},
		onShow() {
			let Account=getApp().globalData.Account;
			// this.Account="15130380905";
			this.Account=Account;
			uniCloud.callFunction({
				name:"GetCollectionByPhone",
				data:{
					Account:this.Account
				}
			}).then(res=>{
				this.ColllectionList=res.result.data;
				// console.log(this.ColllectionList)
			})
		},
		methods: {
			GoToMerchant(StoreId){
				uni.navigateTo({
					url:"/pages/MerchantDetail/MerchantDetail?id="+StoreId
				})
			},
		}
	}
</script>

<style>

</style>
