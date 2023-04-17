<template>
	<view v-if="Logged">
		<view style="background-color: #0099FF;">
			<view style="margin-left: 3%;display: flex;">
				<view style="flex-direction: row;margin-top: 20rpx;">
					<uni-file-picker limit="1" :del-icon="false" disable-preview="false" :imageStyles="imageStyles"
						file-mediatype="image" @success="FileLoadScs">
						<image :src="MerchantUserAvater" style="background-color: white;" mode="aspectFit"></image>
					</uni-file-picker>
				</view>
				<view style="flex-direction: row;width: 100%;margin-top:20rpx;margin-left: 3%;">
					<view style="height: 30px;width: 100%; font-weight:bold;font-size: 18px; margin-top: 2%;margin-left: 3%;">
						{{MerchantUserName}}
					</view>
					<view style="margin-left: 3%;font-size: 15px;display: flex;margin-top: 5rpx;">
						{{MerchantUserPhone}}
						<view style="flex-direction: row;margin-left: 5%;display: flex;width: 23%;
						border-radius: 20px;background-color: #ebebeb;background: rgba(0,0,0,0.2);">
							<uni-icons type="compose" style="margin-left: 10%;size: 5;"></uni-icons>
							<view style="flex-direction: row;margin-left: 5%;width: 30px;font-size: 12px;line-height: 20px;">修改</view>
						</view>
					</view>
				</view>
			</view>
	</view>
		<view>
			<view style="display: flex;width: 100%;margin-top: 5%;">
				<view @click="MyShop" style=" width: 33.33%; display: flex;flex-direction: row; justify-content: center;">
					<view style="width: 60%; background-color: #efeff4;border-radius: 5rpx;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0.1, 0.1);">
						<view style="display: flex;flex-direction: row; justify-content: center;height:90rpx;">
							<uni-icons type="shop-filled" size="50" color="#a2a2a2"></uni-icons>
						</view>
						<view style="text-align: center;color:gray;font-size: 25rpx">我的店铺</view>
						<view style="height: 10rpx;"></view>
					</view>
				</view>
				<view style=" width: 33.33%; display: flex;flex-direction: row; justify-content: center;">
					<view style="width: 60%;background-color: #efeff4;border-radius: 5rpx;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0.1, 0.1);">
						<view style="text-align: center;font-size: 35rpx;height: 90rpx;line-height: 100rpx;">{{MonthOrdersNumber}}</view>
						<view style="text-align: center;color:gray;font-size: 25rpx;">月订单量</view>
					</view>
				</view>
				<view style=" width: 33.33%; display: flex;flex-direction: row; justify-content: center;">
					<view style="width: 60%;background-color: #efeff4;border-radius: 5rpx;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0.1, 0.1);">
						<view style="text-align: center;font-size: 25rpx;height: 90rpx;line-height: 100rpx;">{{MonthOrdersMoneyFront+MonthOrdersMoney}}</view>
						<view style="text-align: center;color:gray;font-size: 25rpx">月销售额</view>
					</view>
				</view>
				
			</view>
			<view style="display: flex;margin-top: 5%;">
				<view style=" width: 33.33%; display: flex;flex-direction: row; justify-content: center;">
					<view style="width: 60%;background-color: #efeff4;border-radius: 5rpx;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0.1, 0.1);">
						<uni-tooltip :content="MonthBestSell">
							<view class="MaxGoodsNumber">{{MonthBestSell}}</view>
						</uni-tooltip>
						<view style="text-align: center;color:gray;font-size: 25rpx;">销售最多</view>
						<view style="height: 10rpx;"></view>
					</view>
				</view>
				<view style=" width: 33.33%; display: flex;flex-direction: row; justify-content: center;">
					<view style="width: 60%;background-color: #efeff4;border-radius: 5rpx;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0.1, 0.1);">
						<view style="text-align: center;font-size: 35rpx;height: 90rpx;line-height: 100rpx;">{{OverallRate}}</view>
						<view style="text-align: center;color:gray;font-size: 25rpx;">总体评分</view>
					</view>
				</view>
				<view style=" width: 33.33%; display: flex;flex-direction: row; justify-content: center;">
					<view style="width: 60%;background-color: #efeff4;border-radius: 5rpx;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0.1, 0.1);">
						<view style="text-align: center;font-size: 35rpx;height: 90rpx;line-height: 100rpx;">{{ComplaintsNumber}}</view>
						<view style="text-align: center;color:gray;font-size: 25rpx;">投诉数量</view>
					</view>
				</view>
			</view>
		</view>
		
		<view style="margin-top: 10%;">
			<view v-if="MerchantRunning" style="width: 100%;border-bottom: 1px solid #dedede;border-top: 1px solid #dedede;height: 100rpx;display: flex;">
				<view style="margin-left: 5%;font-size: 35rpx;line-height: 100rpx;width: 80%;">
					店铺处罚记录
				</view>
				<view style="width: 10%;margin-top: 3.5%;">
					<uni-icons type="forward" size="15" color="#9d9d9d"></uni-icons>
				</view>
			</view>
			
			<view v-if="NotHaveMerchant" @click="ApplyForOccupancy" style="width: 100%;border-bottom: 1px solid #dedede;border-top: 1px solid #dedede;height: 100rpx;display: flex;">
				<view style="margin-left: 5%;font-size: 35rpx;line-height: 100rpx;width: 80%;">
					店铺申请入驻
				</view>
				<view style="width: 10%;margin-top: 3.5%;">
					<uni-icons type="forward" size="15" color="#9d9d9d"></uni-icons>
				</view>
			</view>
			<view v-if="MerchantRunning" @click="ApplyMerchantExit" style="width: 100%;border-bottom: 1px solid #dedede;border-top: 1px solid #dedede;height: 100rpx;display: flex;">
				<view style="margin-left: 5%;font-size: 35rpx;line-height: 100rpx;width: 80%;">
					店铺申请退出
				</view>
				<view style="width: 10%;margin-top: 3.5%;">
					<uni-icons type="forward" size="15" color="#9d9d9d"></uni-icons>
				</view>
			</view>
			<view style="width: 100%;border-bottom: 1px solid #dedede;border-top: 1px solid #dedede;height: 100rpx;display: flex;">
				<view style="margin-left: 5%;font-size: 35rpx;line-height: 100rpx;width: 80%;">
					事务审核进度
				</view>
				<view style="width: 10%;margin-top: 3.5%;">
					<uni-icons type="forward" size="15" color="#9d9d9d"></uni-icons>
				</view>
			</view>
			<view @click="MerchantLoginOut" style="color: red;border-bottom:1px solid #dedede;border-top: 1px solid #dedede;text-align: center;
			font-size: 35rpx;height: 100rpx;line-height: 100rpx;margin-top: 25%;">退出登录</view>
		</view>
	</view>
	
	<!-- 未登录时的状态 -->
	<view v-else>
		<view style="background-color: #0099FF;">
			<view style="margin-left: 3%;display: flex;">
				<view style="flex-direction: row;margin-top: 20rpx;">
					<uni-file-picker limit="1" :del-icon="false" disable-preview="false" :imageStyles="imageStyles"
						file-mediatype="image" @success="FileLoadScs">
						<image src="../../static/images/PersonalAvatar.jpg" style="background-color: white;" mode="aspectFit"></image>
					</uni-file-picker>
				</view>
				<view style="flex-direction: row;width: 100%;margin-top:20rpx;margin-left: 3%;">
					<view @click="MerChantLogin" style="height: 30px;width: 100%; font-weight:bold;font-size: 18px; margin-top: 6%;margin-left: 3%;">
						请您先进行登录
					</view>
				</view>
			</view>
	    </view>
		<view>
			<view style="display: flex;width: 100%;margin-top: 5%;">
				<view style=" width: 33.33%; display: flex;flex-direction: row; justify-content: center;">
					<view @click="MerChantLogin" style="width: 60%; background-color: #efeff4;border-radius: 5rpx;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0.1, 0.1);">
						<view style="display: flex;flex-direction: row; justify-content: center;height:90rpx;">
							<uni-icons type="shop-filled" size="50" color="#a2a2a2"></uni-icons>
						</view>
						<view style="text-align: center;color:gray;font-size: 25rpx">我的店铺</view>
						<view style="height: 10rpx;"></view>
					</view>
				</view>
				<view @click="MerChantLogin" style=" width: 33.33%; display: flex;flex-direction: row; justify-content: center;">
					<view style="width: 60%;background-color: #efeff4;border-radius: 5rpx;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0.1, 0.1);">
						<view style="text-align: center;font-size: 35rpx;height: 90rpx;line-height: 100rpx;">*****</view>
						<view style="text-align: center;color:gray;font-size: 25rpx;">月订单量</view>
					</view>
				</view>
				<view @click="MerChantLogin" style=" width: 33.33%; display: flex;flex-direction: row; justify-content: center;">
					<view style="width: 60%;background-color: #efeff4;border-radius: 5rpx;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0.1, 0.1);">
						<view style="text-align: center;font-size: 30rpx;height: 90rpx;line-height: 100rpx;">*****</view>
						<view style="text-align: center;color:gray;font-size: 25rpx">月销售额</view>
					</view>
				</view>
				
			</view>
			<view style="display: flex;margin-top: 5%;">
				<view @click="MerChantLogin" style=" width: 33.33%; display: flex;flex-direction: row; justify-content: center;">
					<view style="width: 60%;background-color: #efeff4;border-radius: 5rpx;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0.1, 0.1);">
						<uni-tooltip :content="MonthBestSell">
							<view class="MaxGoodsNumber">*****</view>
						</uni-tooltip>
						<view style="text-align: center;color:gray;font-size: 25rpx;">销售最多</view>
						<view style="height: 10rpx;"></view>
					</view>
				</view>
				<view @click="MerChantLogin" style=" width: 33.33%; display: flex;flex-direction: row; justify-content: center;">
					<view style="width: 60%;background-color: #efeff4;border-radius: 5rpx;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0.1, 0.1);">
						<view style="text-align: center;font-size: 35rpx;height: 90rpx;line-height: 100rpx;">*****</view>
						<view style="text-align: center;color:gray;font-size: 25rpx;">总体评分</view>
					</view>
				</view>
				<view @click="MerChantLogin" style=" width: 33.33%; display: flex;flex-direction: row; justify-content: center;">
					<view style="width: 60%;background-color: #efeff4;border-radius: 5rpx;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0.1, 0.1);">
						<view style="text-align: center;font-size: 35rpx;height: 90rpx;line-height: 100rpx;">*****</view>
						<view style="text-align: center;color:gray;font-size: 25rpx;">投诉数量</view>
					</view>
				</view>
			</view>
		</view>
		
		<view style="margin-top: 10%;">
			<view @click="MerChantLogin" style="width: 100%;border-bottom: 1px solid #dedede;border-top: 1px solid #dedede;height: 100rpx;display: flex;">
				<view style="margin-left: 5%;font-size: 35rpx;line-height: 100rpx;width: 80%;color: #b6b6b6;">
					店铺处罚记录
				</view>
				<view style="width: 10%;margin-top: 3.5%;">
					<uni-icons type="forward" size="15" color="#9d9d9d"></uni-icons>
				</view>
			</view>
			
			<view @click="MerChantLogin" style="width: 100%;border-bottom: 1px solid #dedede;border-top: 1px solid #dedede;height: 100rpx;display: flex;">
				<view style="margin-left: 5%;font-size: 35rpx;line-height: 100rpx;width: 80%;color: #b6b6b6;">
					店铺申请入驻
				</view>
				<view style="width: 10%;margin-top: 3.5%;">
					<uni-icons type="forward" size="15" color="#9d9d9d"></uni-icons>
				</view>
			</view>
			<view @click="MerChantLogin" style="width: 100%;border-bottom: 1px solid #dedede;border-top: 1px solid #dedede;height: 100rpx;display: flex;">
				<view style="margin-left: 5%;font-size: 35rpx;line-height: 100rpx;width: 80%;color: #b6b6b6;">
					店铺申请退出
				</view>
				<view style="width: 10%;margin-top: 3.5%;">
					<uni-icons type="forward" size="15" color="#9d9d9d"></uni-icons>
				</view>
			</view>
			<view @click="MerChantLogin" style="width: 100%;border-bottom: 1px solid #dedede;border-top: 1px solid #dedede;height: 100rpx;display: flex;">
				<view style="margin-left: 5%;font-size: 35rpx;line-height: 100rpx;width: 80%;color: #b6b6b6;">
					事务审核进度
				</view>
				<view style="width: 10%;margin-top: 3.5%;">
					<uni-icons type="forward" size="15" color="#9d9d9d"></uni-icons>
				</view>
			</view>
			<view @click="MerChantLogin" style="color: red;border-bottom:1px solid #dedede;border-top: 1px solid #dedede;text-align: center;
			font-size: 35rpx;height: 100rpx;line-height: 100rpx;margin-top: 25%;color: #b6b6b6">退出登录</view>
		</view>
	</view>
	<uni-popup ref="message" type="message">
			<uni-popup-message type="error" :message="MerchantMessage" :duration="2000"></uni-popup-message>
	</uni-popup>
</template>

<script>
	export default {
		data() {
			return {
				MerchantUserName:"Imaginary",
				MerchantUserPhone:"15130380905",
				MerchantUserAvater:"../../static/images/PersonalAvatar.jpg",
				imageStyles: {
					width: 80,
					height: 80,
					border: {
						radius: '50%'
					}
				},
				MonthOrdersNumber:0,
				MonthOrdersMoneyFront:"￥",
				MonthOrdersMoney:0,
				MonthBestSell:"*****",
				OverallRate:0,
				ComplaintsNumber:0,
				Logged:false,
				jsCode:"",
				openid:"",
				unionid:"",
				session_key:"",
				Account:"",
				MerchantMessage:"",
				MerchantRunning:false,
				NotHaveMerchant:true,
			}
		},
		onShow(){
			let Account=getApp().globalData.Account;
			console.log(Account);
			this.Account=Account;
			if(Account=="0"){
				this.Logged=false;
			}else{
				this.Logged=true;
				uniCloud.callFunction({
					name:"GetMerchantUserMsg",
					data:{
						Account:this.Account
					}
				}).then(res=>{
					this.MerchantUserAvater=res.result.data[0].Avatar;
					this.MerchantUserName=res.result.data[0].NickName;
					this.MerchantUserPhone=res.result.data[0].Account;
				})
				
				uniCloud.callFunction({
					name:"GetRTTAllInUser",
					data:{
						PossessorPhone:this.Account
					}
				}).then(res=>{
					console.log(res);
					if(res.result.data.length==0){
						this.NotHaveMerchant=true;
						this.MerchantRunning=false;
						this.MonthOrdersNumber=0;
						this.MonthOrdersMoney=0;
						this.MonthBestSell="*****";
						this.OverallRate=0;
						this.ComplaintsNumber=0;
					}else{
						if(res.result.data[0].OnboardingStatus==1){
							this.NotHaveMerchant=false;
							this.MerchantRunning=true;
							getApp().globalData.storeId = res.result.data[0]._id;
							// this.MonthOrdersMoney=res.result.data[0].MonthMoney;
							this.OverallRate=res.result.data[0].OverallRate;
							this.ComplaintsNumber=res.result.data[0].ComplaintNumber;
							var max=-1;
							for(var i=0;i<res.result.data[0].GoodsClass.length;i++){
								for(var j=0;j<res.result.data[0].GoodsClass[i].GoodsDetail.length;j++){
									this.MonthOrdersNumber=this.MonthOrdersNumber+res.result.data[0].GoodsClass[i].GoodsDetail[j].GoodsSoldNumber;
									var num=res.result.data[0].GoodsClass[i].GoodsDetail[j].GoodsSoldNumber*res.result.data[0].GoodsClass[i].GoodsDetail[j].GoodsPrice;
									num=Math.floor(num * 100) / 100 
									this.MonthOrdersMoney=this.MonthOrdersMoney+num;
									if(res.result.data[0].GoodsClass[i].GoodsDetail[j].GoodsSoldNumber>max){
										max=res.result.data[0].GoodsClass[i].GoodsDetail[j].GoodsSoldNumber;
										this.MonthBestSell=res.result.data[0].GoodsClass[i].GoodsDetail[j].GoodsName;
									}
								}
							}
							this.MonthOrdersMoney=Math.floor(this.MonthOrdersMoney*100)/100;
						}else{
							this.MonthOrdersNumber=0;
							this.MonthOrdersMoney=0;
							this.MonthBestSell="*****";
							this.OverallRate=0;
							this.ComplaintsNumber=0;
						}
					}
				})
			}
		},
		methods: {
			FileLoadScs(e){
				console.log(e)
			},
			MerChantLogin(){
				uni.navigateTo({
					url:"/pages/MerChantLogin/MerChantLogin"
				})
			},
			MerchantLoginOut(){
				uniCloud.callFunction({
					name:"UpdateMerchantLoginState",
					data:{
						Account:this.Account,
                        State:0,
					}
				}).then(res=>{
					this.Logged=false;
					getApp().globalData.Account ="0";
				})
			},
			MyShop(){
				uniCloud.callFunction({
					name:"GetRTTAllInUser",
					data:{
						PossessorPhone:this.Account
					}
				}).then(res=>{
						if(res.result.data.length==0){
							this.MerchantMessage="您未拥有入驻店铺";
							this.$refs.message.open();
						}else{
							if(res.result.data[0].OnboardingStatus==0){
								this.MerchantMessage="店铺已经退出外卖平台或因违规被封号"
								this.$refs.message.open();
							}else{
								uni.navigateTo({
									url:"/pages/StoreDetails/StoreDetails"
								})
							}
						}
						
					})
			},
			OpenShop(){
				uni.navigateTo({
					url:"/pages/StoreDetails/StoreDetails",
				})
			},
			
			ApplyForOccupancy(){
				uni.navigateTo({
					url:"/pages/MerchantSettle/MerchantSettle"
				})
			},
			ApplyMerchantExit(){
				uni.navigateTo({
					url:"/pages/MerchantExit/MerchantExit"
				})
			}
		}
	}
</script>


<style>
.MaxGoodsNumber{
	width: 80%;
	margin-left: 10%;
	text-align: center;
	font-size: 27rpx;
	height: 90rpx;
	line-height: 100rpx;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	word-break: break-all;
	text-overflow:ellipsis;
	overflow: hidden;
}
</style>
