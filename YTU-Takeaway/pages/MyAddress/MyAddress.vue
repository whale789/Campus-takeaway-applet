<template>
	<view style="border-bottom: 1px solid #d5d5d5;border-top: 1px solid #d5d5d5;" v-for="(item,index) in AddressList" :key="index">
		<view style="height: 25rpx;"></view>
		<view style="margin-left: 5%;">
			<view style="display: flex;">
				<view style="display: flex;font-size: 30rpx;width: 84%;">
					<view>{{item.Address}}</view>
					<view>{{item.Doorplate}}</view>
				</view>
				<view style="width: 16%;margin-top: 2%;" @click="AddressDetail(item._id)">
					<uni-icons type="compose" size="28" color="#6c6c6c"></uni-icons>
				</view>
			</view>
			<view style="display: flex;margin-top: -2%;color: #6c6c6c;font-size: 27rpx;">
				<view style="width: 15%;">{{item.Contact}}</view>
				<view>{{item.gender}}</view>
				<view style="margin-left: 10%;">{{item.Phone}}</view>
			</view>
			<view style="height: 25rpx;"></view>
		</view>
	</view>
	<view style="margin-top: 5%; border-bottom: 1px solid #bebebe;border-top: 1px solid #bebebe;display: flex;flex-direction: row;justify-content: center;">
		<view @click="CreateAddress">
			<uni-icons type="plusempty" size="30" color="#00aaff"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Address:"烟台大学北校区12号楼",
				Doorplate:"A516",
				Contact:"张乾乾",
				gender:"先生",
				Phone:"15130380905",
				Account:"",
				AddressList:[],
			}
		},
		onShow() {
			let Account=getApp().globalData.Account;
			// let Account="15130380905"
			this.Account=Account;
			
			uniCloud.callFunction({
				name:"GetAddressByAccount",
				data:{
					Account:Account
				}
			}).then(res=>{
				// console.log(res)
				this.AddressList=res.result.data;
				for(var i=0;i<res.result.data.length;i++){
					let number=res.result.data[i].Phone;
					let mphone = number.substring(0, 3) + '****' + number.substring(7);
					this.AddressList[i].Phone=mphone;
				}
			})
		},
		methods: {
			AddressDetail(AddressId){
				uni.navigateTo({
					url:"/pages/AddressDetail/AddressDetail?Type=0&AddressId="+AddressId
				})
			},
			CreateAddress(){
				uni.navigateTo({
					url:"/pages/AddressDetail/AddressDetail?Type=1&AddressId=0"
				})
			},
		},
	}
</script>

<style>

</style>
