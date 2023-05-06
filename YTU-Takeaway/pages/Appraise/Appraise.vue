<template>
	<view style="height: 1500rpx;background-color: white;">
		<view style="height: 25rpx;"></view>
		<view style="display: flex;margin-left: 5%;">
			<image style="width: 100rpx;height: 100rpx;border-radius: 10rpx;" mode="aspectFill" :src="StorePicture"></image>
			<view style="margin-left: 5%;font-size: 35rpx;margin-top: 3%;">{{StoreName}}</view>
		</view>
		<view style="width: 90%;margin-left: 5%; height: 30rpx;border-bottom: 1px solid #bababa;"></view>
		<view style="height: 20rpx;"></view>
		<view style="display: flex;margin-left: 5%;">
			<view>商家：</view>
			<view>
				<uni-rate allow-half :value="FirstRate" @change="HaveFirstRate" />
			</view>
		</view>
		<view style="height: 20rpx;"></view>
		<view style="display: flex;margin-left: 5%;">
			<view>包装：</view>
			<view>
				<uni-rate allow-half :value="SecondRate" @change="HaveSecondRate" />
			</view>
		</view>
		<view style="height: 20rpx;"></view>
		<view style="display: flex;margin-left: 5%;">
			<view>口味：</view>
			<view>
				<uni-rate allow-half :value="ThirdRate" @change="HaveThirdtRate" />
			</view>
		</view>
		<view style="display: flex;width: 100%;margin-top: 5%;margin-left: 5%;">
			<view style="width: 13%;margin-top: 110rpx;">
				晒图：
			</view>
			<view style="width: 80%;">
				<uni-file-picker limit="3" :imageStyles="imageStyles"  title="最多选择3张图片" @success="PushPicToList" @delete="RemoveFromList"></uni-file-picker>
			</view>
		</view>
		<view style="height: 35rpx;"></view>
		<view style="width: 90%;margin-left: 5%;">
			<uni-easyinput type="textarea" v-model="AppraiseText" placeholder="请输入您的评价" ></uni-easyinput>
		</view>
		<view style="height: 50rpx;"></view>
		<view style="margin-left: 5%;width: 10%;">
			<uni-fav bgColorChecked="#a7a7a7" :content-text="contentText" :checked="IsChecked" :star="false" class="favBtn" @click="favClick" />
		</view>
		<view style="height: 80rpx;"></view>
		<view style="width: 45%;margin-left: 27.5%;">
			<button type="default" style="background-color: gold;" @click="SumbitAppraise">提交评价</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				OrderId:"",
				StoreId:"",
				CustomerPhone:"",
				CustomerName:"",
				CustomerAvatar:"",
				StorePicture:"",
				StoreName:"",
				FirstRate:1,
				SecondRate:1,
				ThirdRate:1,
				AppraiseText:"",
				IsChecked:false,
				contentText: {
					contentDefault: '匿名评价',
					contentFav: '已匿名'
				},
				imageStyles:{
					width:100,
					height:100
				},
				PictureList:[],
			}
		},
		onLoad(option) {
			console.log(option.OrderId)
			this.OrderId=option.OrderId;
			uniCloud.callFunction({
				name:"GetOrderById",
				data:{
					OrderId:this.OrderId
				}
			}).then(res=>{
				this.StoreId=res.result.data[0].StoreId;
				this.UserPhone=res.result.data[0].OrderUserPhone;
				uniCloud.callFunction({
					name:"GetRTTMsgById",
					data:{
						StoreId:this.StoreId
					}
				}).then(ress=>{
					this.StorePicture=ress.result.data[0].StorePicture;
					this.StoreName=ress.result.data[0].StoreName;
					
					uniCloud.callFunction({
						name:"GetUserMsg",
						data:{
							Account:this.UserPhone
						}
					}).then(resss=>{
						this.CustomerName=resss.result.data[0].NickName;
						this.CustomerAvatar=resss.result.data[0].Avatar;
					})
				})
			})
		},
		methods: {
			favClick(){
				this.IsChecked=!this.IsChecked;
			},
			PushPicToList(e){
				// console.log(e.tempFilePaths[0])
				this.PictureList.push(e.tempFilePaths[0])
				// console.log(this.PictureList)
			},
			RemoveFromList(e){
				// console.log(e.tempFilePath)
				var index;
				for(var i=0;i<this.PictureList.length;i++){
					if(this.PictureList[i]==e.tempFilePath){
						index=i;
						break;
					}
				}
				this.PictureList.splice(index,1);
				// console.log(this.PictureList)
			},
			HaveFirstRate(e){
				// console.log(e.value)
				this.FirstRate=e.value;
			},
			HaveSecondRate(e){
				this.SecondRate=e.value;
			},
			HaveThirdtRate(e){
				this.ThirdRate=e.value;
			},
			SumbitAppraise(){
				var Rate=(this.FirstRate+this.SecondRate+this.ThirdRate)/3;
				let date2 = new Date();
				let year = date2.getFullYear()
				let month = date2.getMonth() + 1
				let day = date2.getDate()
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var time=year + '-' + month + '-' + day;
				
				
				if(this.IsChecked==false){
					uniCloud.callFunction({
						name:"AddToAppraise",
						data:{
							OrderId:this.OrderId,
							StoreId:this.StoreId,
							FirstRate:this.FirstRate,
							SecondRate:this.SecondRate,
							ThirdRate:this.ThirdRate,
							Rate:Rate,
							AppraiseText:this.AppraiseText,
							PictureList:this.PictureList,
							CustomerPhone:this.UserPhone,
							CustomerName:this.CustomerName,
							CustomerAvatar:this.CustomerAvatar,
							AppraiseTime:time,
							IsChecked:this.IsChecked,
							IsReply:false,
						}
					}).then(res=>{
						uniCloud.callFunction({
							name:"UpdateOrderStateById",
							data:{
								OrderId:this.OrderId,
								 OrderState:"已评价"
							}
						}).then(ress=>{
							uni.switchTab({
								url:"/pages/Orders/Oreders"
							})
						})
					})
				}else{
					uniCloud.callFunction({
						name:"AddToAppraise",
						data:{
							OrderId:this.OrderId,
							StoreId:this.StoreId,
							FirstRate:this.FirstRate,
							SecondRate:this.SecondRate,
							ThirdRate:this.ThirdRate,
							Rate:Rate,
							AppraiseText:this.AppraiseText,
							PictureList:this.PictureList,
							CustomerPhone:this.UserPhone,
							CustomerName:"匿名用户",
							CustomerAvatar:"https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/ed7de8be-0096-41b4-bdd4-f58a00ef21e4.png",
							AppraiseTime:time,
							IsChecked:this.IsChecked,
							IsReply:false,
						}
					}).then(res=>{
						uniCloud.callFunction({
							name:"UpdateOrderStateById",
							data:{
								OrderId:this.OrderId,
								 OrderState:"已评价"
							}
						}).then(ress=>{
							uni.switchTab({
								url:"/pages/Orders/Oreders"
							})
						})
					})
				}
			},
		}
	}
</script>

<style>
.favBtn {
	margin: 0 20rpx 20rpx 0;
}
</style>
