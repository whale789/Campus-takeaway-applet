<template>
	<view>
		<view v-for="(item,index) in ListPunish" @click="GoToDetail(item.StoreId)">
			<view>
				<uni-card :title="item.AuditType" :extra="item.AuditState">
					<template v-slot:title>
						<view style="display: flex;margin-top: 3%;margin-left: 3%;">
							<view style="width: 80%">{{item.StoreName}}</view>
							<view style="width: 20%;" :style="item.color">{{item.PunishState}}</view>
						</view>
						<view style="height: 20rpx;border-bottom: 1px solid #ececec;"></view>
					</template>
					<view>{{item._id}}</view>
					<view class="TypeMain" style="display: flex;">处罚原因：
						<view style="color: black;">{{item.PunishReason}}</view> 
					</view>
					<view style="display: flex;">处罚时间：
						<view style="color: black;">
							{{item.PunishTime}}
						</view> 
					</view>
					<view style="display: flex;">处罚内容：
						<view style="color: black;">
							{{item.PunishName}}
						</view> 
					</view>
				</uni-card>
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				ListPunish:[],
				Account:0,
			}
		},
		onShow() {
			var Account=getApp().globalData.Account;
			// console.log(Account);
			// var Account=2640055850001;
			this.Account=Account;
			uniCloud.callFunction({
				name:"GetPunishByAccount",
				data:{
					Account:this.Account
				}
			}).then(res=>{
				this.ListPunish=res.result.data;
				for(var i=0;i<res.result.data.length;i++){
					if(res.result.data[i].PunishState==1){
						this.ListPunish[i].PunishState="处罚中";
						this.ListPunish[i].color="color:red"
					}else{
						this.ListPunish[i].PunishState="已解除";
						this.ListPunish[i].color="color:green"
					}
				}
			})
		},
		methods: {
			GoToDetail(StoreId){
				uni.navigateTo({
					url:"/pages/MerchantDetail/MerchantDetail?StoreId="+StoreId
				})
			}
		}
	}
</script>

<style>

</style>
