<template>
	<view>
		<view v-for="(item,index) in ListAudit">
			<view>
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
					<view v-if="item.NotProcessed">
						<view style="display: flex;">处理人：
							<view style="color: black;">
								{{item.Handlers}}
							</view> 
						</view>
					</view>
					<view v-if="item.HaveProcessed" style="display: flex;">处理时间：
						<view style="color: black;">
							{{item.ApplicationTime}}
						</view> 
					</view>
					<view v-if="item.HaveProcessed" style="display: flex;">处理结果：
						<view style="color: black;">
							{{item.Feedback}}
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
				MerchantPhone:"",
				NotProcessed:false,
				color:"",
			}
		},
		onLoad() {
			this.MerchantPhone=getApp().globalData.Account;
			uniCloud.callFunction({
				name:"GetAuditByMerchantPhone",
				data:{
					MerchantPhone:this.MerchantPhone
				}
			}).then(res=>{
				
				
				for(var i=0;i<res.result.data.length;i++){
					if(res.result.data[i].AuditState=="未处理"){
						res.result.data[i].color="color:#1296db";
						res.result.data[i].NotProcessed=false;
						res.result.data[i].HaveProcessed=false;
					}
					if(res.result.data[i].AuditState=="处理中"){
						res.result.data[i].color="color:#ffaa00";
						res.result.data[i].NotProcessed=true;
						res.result.data[i].HaveProcessed=false;
					}
					if(res.result.data[i].AuditState=="已通过"){
						res.result.data[i].color="color:#00aa00";
						res.result.data[i].NotProcessed=true;
						res.result.data[i].HaveProcessed=true;
					}
					if(res.result.data[i].AuditState=="已驳回"){
						res.result.data[i].color="color:#ff0000";
						res.result.data[i].NotProcessed=true;
						res.result.data[i].HaveProcessed=true;
					}
				}
				this.ListAudit=res.result.data;
				console.log(res)
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
