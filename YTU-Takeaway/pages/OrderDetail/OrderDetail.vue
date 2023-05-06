<template>
	
	<scroll-view scroll-y="true">
		<view style="height: 50rpx;"></view>
		<view style="background-color: white;width: 90%;margin-left: 5%;border-radius: 10rpx; border: 1px solid white;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);">
			<view v-if="NotChoose" style="display: flex;border-bottom: 1px solid #dddddd;margin-top: 30rpx;" @click="ChooseMyAddress">
				<view style="margin-left: 5%;width: 10%;">
					<uni-icons type="plus-filled" size="30" color="#ffaa00"></uni-icons>
				</view>
				<view style="width: 75%; margin-top: 5rpx;color: #ffaa00;margin-bottom: 30rpx;">
					立即填写收货地址
				</view>
				<view style="width: 10%;">
					<uni-icons type="forward" size="25" color="#dddddd"></uni-icons>
				</view>
			</view>
			
			<view v-else style="border-bottom: 1px solid #dddddd;margin-top: 20rpx;" @click="ChooseMyAddress">
				<view style="display: flex;margin-left: 4%;font-size: 35rpx;">
					<view>{{Address}}</view>
					<view>{{Doorplate}}</view>
					<view style="margin-left: 20%;">
						<uni-icons type="forward" size="25" color="#dddddd"></uni-icons>
					</view>
				</view>
				<view style="display: flex;margin-top: 2%;margin-left: 4%;color:#9c9c9c;width: 100%;">
					<view style="width: 15%;">{{Contact}}</view>
					<view style="width: 15%;">{{gender}}</view>
					<view style="width: 50%;">{{Phone}}</view>
				</view>
				<view style="height: 20rpx;"></view>
			</view>
			
			
			<view>
				<view style="margin-top: 20rpx;margin-left: 5%;">立即送出(商家自配)</view>
				<view style="height: 20rpx;"></view>
			</view>
		</view>
		
		<view style="background-color: white;width: 90%;margin-left: 5%;border-radius: 10rpx;margin-top: 5%;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);">
			<view style="border-bottom: 1px solid #d0d0d0;width: 100%;">
				<view style="height: 15rpx;"></view>
				<view style="margin-left: 5%;">{{MerchantName}}</view>
				<view style="height: 15rpx;"></view>
			</view>
			
			<view style="display: flex;margin-top: 2%;margin-left: 3%;" v-for="(item,index) in ListGoods" :key="index">
				<view v-if="isOpen||index<max" style="display: flex;width: 100%;">
					<view style="width: 15%;">
						<image :src="item.GoodsPicture" style="width: 100rpx;height: 100rpx;" mode="aspectFit"></image>
					</view>  
					<view style="width: 85%;">
						<view style="display: flex;margin-left: 5%;margin-top: 1%;">
							<view class="text">{{item.GoodsName}}</view>
							<view style="width: 5%;"></view>
							<view style="width: 25%;text-align: center;">￥{{item.GoodsPrice}}</view>
						</view>
						<view style="margin-left: 5%;margin-top: 2%;font-size: 25rpx;color: black;">x{{item.NumberInCart}}</view>
					</view>
				</view>
			</view>
			<view class="bottomAdd" v-show="!isOpen && ListGoods.length >max" @click="isOpen = !isOpen">查看更多</view>
			<view class="bottomAdd" v-show="isOpen && ListGoods.length > max" @click="isOpen = !isOpen">收起</view>
			<view style="display: flex;width: 100%;margin-top: 3%;">
				<view style="margin-left: 3%;width: 80%;">
					配送费：
				</view>
				<view style="width: 17%;text-align: center;">
					￥{{DeliveryFees}}
				</view>
			</view>
			<view style="border-bottom: 1px solid #d0d0d0;height: 30rpx;"></view>
			<view style="height: 25rpx;"></view>
			<view style="display: flex;">
				<view style="width: 60%;"></view>
				<view style="margin-top: 1%;">
					小计：
				</view>
				<view style="font-size: 37rpx;">
					￥{{(DeliveryFees+TotalMoney).toFixed(2)}}
				</view>
			</view>
			<view style="height: 25rpx;border-bottom: 1px solid #d0d0d0;"></view>
		</view>
		
		<view style="background-color: white;width: 90%;margin-left: 5%;border-radius: 10rpx;margin-top: 5%;box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);">
			<view style="height: 30rpx;"></view>
			<view style="display: flex;width: 100%;">
				<view style="width: 70%;margin-left:5%">支付方式：</view>
				<view style="width: 25%;text-align: center;">在线支付</view>
			</view>
			<view style="height: 20rpx;border-bottom: 1px solid #d0d0d0;"></view>
			<view style="height: 30rpx;"></view>
			<view style="display: flex;width: 100%;">
				<view style="width: 15%;margin-left: 5%;">备注：</view>
				<view class="remark" style="width: 75%;" @click="OpenRemarkPopup">
					{{RemarkText}}
				</view>
				<view style="width: 10%;">
					<uni-icons type="forward" size="25" color="#dedede"></uni-icons>
				</view>
			</view>
			<view style="height: 20rpx;border-bottom: 1px solid #d0d0d0;"></view>
			<view style="height: 30rpx;"></view>
			<view style="display: flex;width: 100%;">
				<view style="margin-left: 5%;width: 50%;">需要餐具：</view>
				<view style="width: 35%;">
					<picker @change="bindPickerChange" :value="num" :range="NumberOfCutlery">
						<view style="text-align: center;">{{NumberOfCutlery[num]}}</view>
					</picker>
				</view>
				<view>
					<view style="width: 10%;">
						<uni-icons type="forward" size="25" color="#dedede"></uni-icons>
					</view>
				</view>
			</view>
			<view style="height: 20rpx;border-bottom: 1px solid #d0d0d0;"></view>
			<view style="height: 30rpx;"></view>
			<view style="display: flex;width: 100%;">
				<view style="margin-left: 5%;width: 15%;">发票：</view>
				<view style="width: 85%;text-align: center;color: #9c9c9c">该店不支持线上开票，请电话联系商户</view>
			</view>
			<view style="height: 20rpx;border-bottom: 1px solid #d0d0d0;"></view>
			
			
		</view>
		
		<view style="height: 100rpx;"></view>
	</scroll-view>
	<view style="position: absolute;z-index: 2;width: 100%;">
		<view style="display: flex; position: absolute;height: 80rpx;border-radius: 100rpx;background-color: #000000;width: 90%;margin-left: 5%;">
			<view style="margin-top: 2.5%;margin-left: 5%;color: white;width: 70%;font-size: 35rpx;">
				￥{{(DeliveryFees+TotalMoney).toFixed(2)}}
			</view>
			<view style="width: 30%;">
				<button style="border-radius: 0 100rpx 100rpx 0;height: 80rpx;" type="primary" @click="GoToPay">去支付</button>
			</view>
		</view>
		<view style="height: 150rpx;"></view>
	</view>
	
	
		<uni-popup ref="AddressListPupop" background-color="#fff">
			<view style="height: 20rpx;"></view>
			<view style="border-bottom: #9c9c9c;width: 100%;text-align: center;">我的收货地址</view>
			<view style="border-bottom: 1px solid #d5d5d5;border-top: 1px solid #d5d5d5;" v-for="(item,index) in AddressList" :key="index" @click="SelectedAddress(item.Address,item.Doorplate,item.Contact,item.gender,item.Phone)">
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
			<view style="height: 50rpx;"></view>
			<view style="margin-top: 5%; border-bottom: 1px solid #bebebe;border-top: 1px solid #bebebe;display: flex;flex-direction: row;justify-content: center;">
				<view @click="CreateAddress" style="display: flex;">
					<view>
						<uni-icons type="plusempty" size="24" color="#ffaa00"></uni-icons>
					</view>
					<view style="color: #ffaa00;font-size: 33rpx;">新建地址</view>
				</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="RemarkPupop" background-color="#fff">
			<view style="height: 20rpx;"></view>
			<view style="border-bottom: #9c9c9c;width: 100%;text-align: center;">订单备注</view>
			<view style="height: 25rpx;"></view>
			<view style="width: 90%;margin-left: 5%;">
				<uni-easyinput type="textarea" v-model="RemarkInPop" placeholder="请输入备注"></uni-easyinput>
			</view>
			<view style="height: 50rpx;"></view>
			<view style="width: 60%;margin-left: 20%;">
				<button type="primary" @click="CompleteNote">完成</button>
			</view>
		</uni-popup>
		
		<view style="width: 100%;border-radius: 30rpx;">
			<uni-popup ref="PayPupop" background-color="#fff" style="border-radius: 10rpx;">
				<view style="height: 15rpx;"></view>
				<view style="margin-left: 3%;" @click="ClosePay">
					<uni-icons type="closeempty" size="20" color="#747474"></uni-icons>
				</view>
				<view style="height: 30rpx;"></view>
				<view style="width: 100%;text-align: center;font-size: 26rpx;">付款给{{MerchantName}}({{MerchantUser}})</view>
				<view style="font-size: 50rpx;width: 100%;text-align: center;font-weight: bold;">￥{{(DeliveryFees+TotalMoney).toFixed(2)}}</view>
				<view style="height: 80rpx;"></view>
				<view style="display: flex;">
					<view style="color: #9c9c9c;font-size: 25rpx;margin-left: 6%;width: 76%;">支付方式</view>
					<view>
						<image style="width: 25rpx;height: 25rpx;" src="../../static/images/Money.png"></image>
					</view>
					<view style="color: #9c9c9c;font-size: 25rpx;">零钱</view>
					<view style="margin-top: -2rpx;">
						<uni-icons type="forward" size="16" color="#9c9c9c"></uni-icons>
					</view>
				</view>
				<view style="height: 70rpx;"></view>
				<view style="width: 40%;margin-left: 30%;height: 60rpx;">
					<button type="primary" style="height: 80rpx;" @click="OrderSuccess">确认支付</button>
				</view>
				<view style="height: 70rpx;"></view>
			</uni-popup>
		</view>
		<uni-popup ref="message" type="message">
				<uni-popup-message type="error" :message="OrdersMessage" :duration="2000"></uni-popup-message>
		</uni-popup>
</template>

<script>
	export default {
		data() {
			return {
				ListGoods:[],
				avatar:"https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/503aec21-87f4-42bf-8571-e71981c91cb4.png",
				Account:"",
				AddressList:[],
				NotChoose:true,
				Address:"",
				Doorplate:"",
				Contact:"",
				gender:"",
				Phone:"",
				max:3,
				isOpen:false,
				MerchantName:"山西刀削面",
				DeliveryFees:0,
				TotalMoney:0,
				num:0,
				NumberOfCutlery:["无需餐具","一份","两份","三份","四份","五份","五份以上"],
				RemarkText:"",
				RemarkInPop:"",
				MerchantUser:"张乾",
				OrdersMessage:"",
				StoreId:"",
				MerchantPicture:"",
				GoodsTotal:0,
			}
		},
		onLoad(option) {
			
			this.ListGoods=JSON.parse(decodeURIComponent(option.CartList))
			this.StoreId=this.ListGoods[0].StoreId;
			uniCloud.callFunction({
				name:"GetRTTMsgById",
				data:{
					StoreId:this.ListGoods[0].StoreId
				}
			}).then(res=>{
				console.log(res)
				this.MerchantName=res.result.data[0].StoreName;
				this.DeliveryFees=res.result.data[0].DeliveryFees;
				this.MerchantPicture=res.result.data[0].StorePicture;
				this.MerchantUser=res.result.data[0].Possessor;
				let Name=this.MerchantUser;
				let NewName="**"+Name.substring(Name.length-1, 2)
				// Name=Name.substring(0,1) + new Array(Name.length).join('*');
				this.MerchantUser=NewName;
			})
			var num=0;
			for(var i=0;i<this.ListGoods.length;i++){
				this.TotalMoney=this.TotalMoney+(this.ListGoods[i].NumberInCart*this.ListGoods[i].GoodsPrice);
				num=num+this.ListGoods[i].NumberInCart;
			}
			this.GoodsTotal=num;
			
			
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
			})
			this.TotalMoney=this.TotalMoney+this.DeliveryFees
		},
		methods: {
			ChooseMyAddress(){
				this.$refs.AddressListPupop.open("bottom");
			},
			AddressDetail(AddressId){
				uni.navigateTo({
					url:"/pages/AddressDetail/AddressDetail?Type=0&AddressId="+AddressId
				})
			},
			CreateAddress(AddressId){
				uni.navigateTo({
					url:"/pages/AddressDetail/AddressDetail?Type=1&AddressId=0"
				})
			},
			SelectedAddress(Address,Doorplate,Contact,gender,Phone){
				this.NotChoose=false;
				this.$refs.AddressListPupop.close();
				this.Address=Address;
				this.Doorplate=Doorplate;
				this.Contact=Contact;
				this.gender=gender;
				this.Phone=Phone;
			},
			bindPickerChange: function(e) { 
				this.num = e.detail.value
		    },
			OpenRemarkPopup(){
				this.RemarkInPop=this.RemarkText
				this.$refs.RemarkPupop.open("bottom");
			},
			CompleteNote(){
				this.RemarkText=this.RemarkInPop;
				this.$refs.RemarkPupop.close();
			},
			GoToPay(){
				if(this.NotChoose==true){
					this.OrdersMessage="请先填写地址";
					this.$refs.message.open("center");
				}
				else{
					var Deliver=this.DeliveryFees;
					this.DeliveryFees=Deliver;
					this.$refs.PayPupop.open("bottom");
				}
				
			},
			ClosePay(){
				this.$refs.PayPupop.close();
			},
			OrderSuccess(){
				let now=new Date();
				let y = now.getFullYear()
				let m = now.getMonth() + 1
				let d = now.getDate();
			    let nowtime=y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
				// console.log(nowtime)
				
				uniCloud.callFunction({
					name:"AddToOrderList",
					data:{
						StoreId:this.StoreId,
						StoreName:this.MerchantName,
						StorePicture:this.MerchantPicture,
						GoodsList:this.ListGoods,
						TotalMoney:this.DeliveryFees+this.TotalMoney,
						GoodsTotal:this.GoodsTotal,
						OrderState:"未接单",
						Address:this.Address,
						Doorplate:this.Doorplate,
						Contact:this.Contact,
						gender:this.gender,
						Phone:this.Phone,
						OrderUserPhone:this.Account,
						RemarkText:this.RemarkText,
						Cutlery:this.NumberOfCutlery[this.num],
						TimeOfOrder:nowtime,
						isOpen:false,
					}
				}).then(res=>{
					console.log(res);
					this.$refs.PayPupop.close();
					uni.switchTab({
						url:"/pages/Orders/Oreders"
					})
				})
			},
		}
	}
</script>

<style>
.bottomAdd {
	display: flex;
	justify-content: center;
	color: rgb(157, 157, 157);
	padding-bottom: 10px;
	font-size: 12px;
}
.text{
	width: 70%; 
	height: 40rpx;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	text-overflow:ellipsis;
	overflow: hidden;
	color: black;
}
.remark{
	position: relative;
	
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	text-overflow:ellipsis;
	overflow: hidden;
}
</style>
