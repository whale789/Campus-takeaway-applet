<template>
	<view>
		<view v-for="(item,index) in ListAudit">
			<view @click="AuditDetail(item._id,item.AuditState,item.AuditType)">
				<uni-card :title="item.AuditType" :extra="item.AuditState">
					<template v-slot:title>
						<view style="display: flex;margin-top: 3%;margin-left: 3%;">
							<view style="width: 80%">{{item.AuditType}}</view>
							<view style="width: 20%;" :style="item.color">{{item.AuditState}}</view>
						</view>
						<view style="height: 20rpx;border-bottom: 1px solid #ececec;"></view>
					</template>
					<view>{{item._id}}</view>
					<view class="TypeMain" style="display: flex;">申请内容:
						<view style="color: black;">{{item.AuditMain}}</view> 
					</view>
					<view style="display: flex;">申请人：
						<view style="color: black;">
							{{item.Applicant}}
						</view> 
					</view>
					<view style="display: flex;">申请时间：
						<view style="color: black;">
							{{item.ApplicationTime}}
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
				ListAudit:[],
				AuditState:"",
				Account:0,
			}
		},
		onShow(){
			var Account=getApp().globalData.Account;
			// var Account=2640055850001;
			this.Account=Account;
			uniCloud.callFunction({
				name:"GetAuditsByAccount",
				data:{
					Account:this.Account
				}
			}).then(res=>{
				for(var i=0;i<res.result.data.length;i++){
					if(res.result.data[i].AuditState=="未处理"){
						res.result.data[i].color="color:#1296db";
					}
					if(res.result.data[i].AuditState=="处理中"){
						res.result.data[i].color="color:#ffaa00";
					}
					if(res.result.data[i].AuditState=="已通过"){
						res.result.data[i].color="color:#00aa00";
					}
					if(res.result.data[i].AuditState=="已驳回"){
						res.result.data[i].color="color:#ff0000";
					}
				}
				this.ListAudit=res.result.data;
				// console.log(res)
			})
		},
		methods: {
			AuditDetail(AuditId,AuditState,AuditType){
				// console.log(getApp().globalData.Account)
				
				// var Account=getApp().globalData.Account;
				let Handlers;
				if(AuditType=="商家入驻"){
					if(AuditState=="未处理"){
						uniCloud.callFunction({
							name:"UpdateAuditListState",
							data:{
								AuditListId:AuditId,
								AuditState:"处理中"
							}
						})
						
						uniCloud.callFunction({
							name:"GetManagerMsg",
							data:{
								Account:this.Account
							}
						}).then(res=>{
							Handlers=res.result.data[0].name;
							// console.log(AuditId)
							uniCloud.callFunction({
								name:"UpdateHandlersInAudit",
								data:{
									AuditListId:AuditId,
									AuditState:"处理中",
									Handlers:Handlers,
									HandlersPhone:this.Account
								}
							}).then(res=>{
								// console.log(res)
								uni.navigateTo({
									url:"/pages/AuditDetail/AuditDetail?AuditId="+AuditId
								})
							})
						})
					}else{
						uni.navigateTo({
							url:"/pages/AuditDetail/AuditDetail?AuditId="+AuditId
						})
					}
				}else{
					if(AuditType=="商家退出"){
						if(AuditState=="未处理"){
							uniCloud.callFunction({
								name:"UpdateAuditListState",
								data:{
									AuditListId:AuditId,
									AuditState:"处理中"
								}
							})
							
							uniCloud.callFunction({
								name:"GetManagerMsg",
								data:{
									Account:this.Account
								}
							}).then(res=>{
								Handlers=res.result.data[0].name;
								// console.log(AuditId)
								uniCloud.callFunction({
									name:"UpdateHandlersInExitAudit",
									data:{
										AuditListId:AuditId,
										AuditState:"处理中",
										Handlers:Handlers,
										HandlersPhone:this.Account
									}
								}).then(res=>{
									uni.navigateTo({
										url:"/pages/AudtiExit/AudtiExit?AuditId="+AuditId
									})
								})
							})
						}else{
							uni.navigateTo({
								url:"/pages/AudtiExit/AudtiExit?AuditId="+AuditId
							})
						}
					}else{
						
					}
				}
				
			},
		}
	}
</script>

<style>
.TypeMain{
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	word-break: break-all;
	text-overflow:ellipsis;
	overflow: hidden;
}
</style>
