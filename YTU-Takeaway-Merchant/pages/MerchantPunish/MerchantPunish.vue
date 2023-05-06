<template>
	<view>
		<view v-for="(item,index) in ListPunish">
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
					<view style="display: flex;">解除时间：
						<view style="color: black;">
							{{item.UnblockingTime}}
						</view> 
					</view>
					<view style="display: flex;">处罚内容：
						<view style="color: black;">
							{{item.PunishName}}
						</view> 
					</view>
					<view style="display: flex;">处罚人：
						<view style="color: black;">
							{{item.ManagerName}}
						</view> 
					</view>
					
					<view style="display: flex;flex-direction: row;justify-content: flex-end;width: 100%;">
						<view>
							<button size="mini" type="primary" @click="GoToChat(item.ManagerAccount)">平台反馈</button>
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
				StoreId:"",
				Account:"",
				UserId:"",
				NickName:"",
				Avatar:"",
				ManagerAccount:0,
				ChatId:"",
			}
		},
		onShow() {
			var StoreId=getApp().globalData.StoreId;
			// console.log(Account);
			// var StoreId="6437e58ef5cf3a3e090eab85";
			this.StoreId=StoreId;
			// var Account=getApp().globalData.Account
			var Account="15130380905";
			this.Account=Account;
			
			uniCloud.callFunction({
				name:"GetMerchantUserMsg",
				data:{
					Account:Account
				}
			}).then(res=>{
				this.UserId=res.result.data[0]._id;
				this.NickName=res.result.data[0].NickName;
				this.Avatar=res.result.data[0].Avatar
			})
			
			uniCloud.callFunction({
				name:"GetPunishByStoreId",
				data:{
					StoreId:this.StoreId
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
			GoToChat(ManagerAccount){
				
				
				uniCloud.callFunction({
					name:"GetChatByUserId",
					data:{
						UserId:this.UserId
					}
				}).then(res=>{
					
					if(res.result.data.length==0){
						uniCloud.callFunction({
							name:"GetManagerMsg",
							data:{
								Account:ManagerAccount
							}
						}).then(res1=>{
							let ManagerId=res1.result.data[0]._id;
							let ManagerName=res1.result.data[0].name;
							let date2 = new Date();//当前时间
							let year = date2.getFullYear()
							let month = date2.getMonth() + 1
							let day = date2.getDate()
							let hour = date2.getHours() < 10 ? "0" + date2.getHours() : date2.getHours()
							let minute = date2.getMinutes() < 10 ? "0" + date2.getMinutes() : date2.getMinutes();
							let second = date2.getSeconds() < 10 ? "0" + date2.getSeconds() : date2.getSeconds();
							month >= 1 && month <= 9 ? (month = "0" + month) : "";
							day >= 0 && day <= 9 ? (day = "0" + day) : "";
							var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
							uniCloud.callFunction({
								name:"AddNewChat",
								data:{
									UserId:this.UserId,
									UserNickName:this.NickName,
									UserAvatar:this.Avatar,
									ManagerId:ManagerId,
									ManagerName:ManagerName,
									ManagerAvatar:"../../static/images/PersonalAvatar.jpg",
									MsgList:[
										{
											botContent: "hello，请问我有什么可以帮助你的吗？",
											ManagerId:ManagerId,
											ManagerName:ManagerName,
											ManagerAvatar:"../../static/images/PersonalAvatar.jpg",
											userContent: "",
											UserId: this.UserId,
											UserAvatar:this.Avatar,
											UserNickName:this.NickName,
											MessageState:0,
											MessageTime:timer,
											IfTime:false,
										}
									],
									LastMessage:"",
									LastTime:"",
									NotReadNum:0,
								}
							}).then(res2=>{
								// console.log(res2)
								uni.navigateTo({
									url:"/pages/ChatDetail/ChatDetail?ChatId="+res2.result.id
								})
							})
						})
						
						
						
					}else{
						this.ChatId=res.result.data[0]._id;
						// console.log(this.ChatId)
						uni.navigateTo({
							url:"/pages/ChatDetail/ChatDetail?ChatId="+this.ChatId
						})
					}
				})
				
				
				
				
			},
		}
	}
</script>

<style>

</style>
