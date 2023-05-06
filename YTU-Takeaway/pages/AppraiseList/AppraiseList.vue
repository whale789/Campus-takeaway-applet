<template>
	<view style="margin-top: 30rpx;" v-for="(item,index) in AppraiseList" :key="index">
		<view style="background-color: white;width: 90%;margin-left: 5%;border-radius: 10rpx;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);">
			<view style="height: 20rpx;"></view>
			<view style="display: flex;margin-left: 5%;width: 100%;">
				<image mode="aspectFit" style="width: 100rpx;height: 100rpx;border-radius: 5rpx;" :src="StoreMessage[index].StorePicture"></image>
				<view style="width: 100%;">
					<view style="display: flex;width: 100%;margin-left: 4%;font-size: 33rpx;">
						<view style="width: 55%;">{{StoreMessage[index].StoreName}}</view>
						<view style="font-size: 25rpx;color: #767676;width: 30%;text-align: center;margin-top: 1%;">{{item.AppraiseTime}}</view>
					</view>
					<view style="display: flex;color: #767676;font-size: 25rpx;margin-top: 2%;margin-left: 4%;">
						<view>商家:</view>
						<view>
							<uni-rate size="17" :readonly="true" allow-half :value="item.FirstRate"  />
						</view>
						<view style="margin-left: 3%;">口味:</view>
						<view>{{item.SecondRate}}星</view>
						<view style="margin-left: 3%;">包装:</view>
						<view>{{item.ThirdRate}}星</view>
					</view>
				</view>
			</view>
			<view style="height: 30rpx;"></view>
			<view style="width: 90%;margin-left: 5%;">
				{{item.AppraiseText}}
			</view>
			<view style="height: 20rpx;"></view>
			<view style="display: flex;width: 90%;margin-left: 3.5%;">
				<view style="margin-left: 3%;" v-for="(item0,index0) in item.PictureList" :key="index0">
					<image mode="aspectFill" style="width: 155rpx;height: 155rpx;" :src="item0"></image>
				</view>
			</view>
			<view style="height: 35rpx;"></view>
			<view v-if="item.IsReply" style="border-radius: 8rpx; width: 90%; margin-left: 5%;color: #767676;font-size: 25rpx;background-color: #efefef;">
				<view style="height: 20rpx;"></view>
				<view style="display: flex;margin-left: 3%;">
					<view>商家回复</view>
					<view style="width: 58%;"></view>
					<view>{{item.ReplyDate}}</view>
				</view>
				<view style="height: 7rpx;"></view>
				<view style="width: 95%;margin-left: 3%;">
					{{item.ReplyText}}
				</view>
				<view style="height: 25rpx;"></view>
			</view>
			<view style="height: 45rpx;"> </view>
			<view style="display: flex;margin-left: 5%;">
				<view v-if="item.IsChecked" style="font-size: 26rpx;color: #767676;">已匿名</view>
				<view v-else style="width: 13%;"></view>
				<view style="width: 67%;"></view>
				<view style="display: flex;" @click="DeleteMyAppraise(item._id)">
					<view>
						<uni-icons type="trash-filled" size="20" color="#767676"></uni-icons>
					</view>
					<view>
						删除
					</view>
				</view>
			</view>
			<view style="height: 35rpx;"></view>
		</view>
	</view>
	<view style="height: 90rpx;"></view>
	<uni-popup ref="DeleteSure" type="dialog">
		<uni-popup-dialog :type="msgType" cancelText="关闭" confirmText="同意" title="通知" content="确定删除该评价吗？" @confirm="dialogConfirm"
			></uni-popup-dialog>
	</uni-popup>

</template>

<script>
	export default {
		data() {
			return {
				AppraiseList:[],
				StorePicture:"https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/7ccea677-5716-405d-bcc7-4af2448bed60.jpg",
				PictureList:[
					"https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/7ccea677-5716-405d-bcc7-4af2448bed60.jpg",
					"https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/46ae90b3-d7ff-4612-a5d9-52de6bd0ecbe.png",
					"https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/aee982e5-a48e-4d72-86e7-8ea6e8128a81.jpg",
				],
				StoreName:"山西刀削面",
				AppraiseTime:"2023-04-25",
				AppraiseText:"啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
				ReplyText:"啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
				StoreMessage:[],
				AppraiseId:"",
			}
		},
		onShow() {
			let Account=getApp().globalData.Account;
			// this.Account="15130380905";
			this.Account=Account;
			let that=this;
			uniCloud.callFunction({
				name:"GetAppraiseByUserPhone",
				data:{
					CustomerPhone:this.Account
				}
			}).then(res=>{
				// console.log(res)
				this.AppraiseList=res.result.data;
				for(var i=0;i<that.AppraiseList.length;i++){
					uniCloud.callFunction({
						name:"GetRTTMsgById",
						data:{
							StoreId:this.AppraiseList[i].StoreId
						}
					}).then(ress=>{
						this.StoreMessage.push({
							"StoreName":ress.result.data[0].StoreName,
							"StorePicture":ress.result.data[0].StorePicture
						})
					})
				}
				// console.log(this.StoreMessage)
			})
		},
		methods: {
			DeleteMyAppraise(id){
				this.AppraiseId=id;
				this.$refs.DeleteSure.open();
			},
			dialogConfirm(){
				uniCloud.callFunction({
					name:"DeleteAppraise",
					data:{
						AppraiseId:this.AppraiseId
					}
				}).then(res=>{
					this.$refs.DeleteSure.close();
					let pages= getCurrentPages();
					let page = pages[pages.length-1];  
					uni.redirectTo({url:page.$page.fullPath});
				})
			},
		}
	}
</script>

<style>

</style>
