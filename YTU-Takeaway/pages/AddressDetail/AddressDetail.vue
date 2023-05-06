<template>
	<view v-if="UpdataOrCreate">
		<view style="border-bottom: 1px solid #e8e8e8;border-top: 1px solid #e8e8e8;">
			<view style="height: 30rpx;"></view>
			<view style="display: flex;" @click="OpenChoose" >
				<view style="margin-left: 3%;width: 20%;">收货地址：</view>
				<view v-if="NotChoose">
					{{Address}}
				</view>
				<view v-else style="width: 60%;margin-top: -1.5%;">
					<uni-data-picker @change="SelectInOrder" v-model="Address" ref="chooseAddress" :localdata="AddressChoose" popup-title="请选择地址"></uni-data-picker>
				</view>
				<view v-if="NotChoose" style="margin-left:23%;">
					<uni-icons type="forward" size="20" color="#bebebe"></uni-icons>
				</view>
				<view v-else style="margin-left:5%;">
					<uni-icons type="forward" size="20" color="#bebebe"></uni-icons>
				</view>
			</view>
			<view style="height: 30rpx;"></view>
		</view>
		<view style="border-bottom: 1px solid #e8e8e8;">
			<view style="height: 30rpx;"></view>
			<view style="display: flex;">
				<view style="margin-left: 3%;width: 20%;margin-top: 1.5%;">宿舍号：</view>
				<view>
					<uni-easyinput v-model="Doorplate" :styles="styles"></uni-easyinput>
				</view>
			</view>
			<view style="height: 30rpx;"></view>
		</view>
		<view style="border-bottom: 1px solid #e8e8e8;">
			<view style="height: 30rpx;"></view>
			<view style="display: flex;">
				<view style="margin-left: 3%;width: 20%;margin-top: 1.5%;">联系人：</view>
				<view style="width: 40%;">
					<uni-easyinput v-model="Contact" :styles="styles"></uni-easyinput>
				</view>
				<view style="width: 38%;margin-top: 1.5%;margin-left: 2%;">
					<uni-data-checkbox v-model="value" :localdata="sex" @change="ChooseSex"></uni-data-checkbox>
				</view>
			</view>
			<view style="height: 30rpx;"></view>
		</view>
		<view style="border-bottom: 1px solid #e8e8e8;">
			<view style="height: 30rpx;"></view>
			<view style="display: flex;">
				<view style="margin-left: 3%;width: 20%;margin-top: 1.5%;">手机号：</view>
				<view>
					<uni-easyinput v-model="Phone" :styles="styles"></uni-easyinput>
				</view>
			</view>
			<view style="height: 30rpx;"></view>
		</view>
		<view style="width: 80%;margin-left: 10%;margin-top: 10%;">
			<button type="primary" @click="SaveAddress">保存该地址</button>
		</view>
		<view style="width: 80%;margin-left: 10%;margin-top: 3%;">
			<button type="warn" @click="DeleteAddress">删除该地址</button>
		</view>
	</view>
	
	<!-- 新建地址 -->
	<view v-else>
		<view style="border-bottom: 1px solid #e8e8e8;border-top: 1px solid #e8e8e8;">
			<view style="height: 30rpx;"></view>
			<view style="display: flex;" @click="OpenChoose" >
				<view style="margin-left: 3%;width: 20%;">收货地址：</view>
				<view v-if="NotChoose">
					{{Address}}
				</view>
				<view v-else style="width: 60%;margin-top: -1.5%;">
					<uni-data-picker @change="SelectInOrder" v-model="Address" ref="chooseAddress" :localdata="AddressChoose" popup-title="请选择地址"></uni-data-picker>
				</view>
				<view v-if="NotChoose" style="margin-left:23%;">
					<uni-icons type="forward" size="20" color="#bebebe"></uni-icons>
				</view>
				<view v-else style="margin-left:5%;">
					<uni-icons type="forward" size="20" color="#bebebe"></uni-icons>
				</view>
			</view>
			<view style="height: 30rpx;"></view>
		</view>
		<view style="border-bottom: 1px solid #e8e8e8;">
			<view style="height: 30rpx;"></view>
			<view style="display: flex;">
				<view style="margin-left: 3%;width: 20%;margin-top: 1.5%;">宿舍号：</view>
				<view>
					<uni-easyinput v-model="Doorplate" :styles="styles"></uni-easyinput>
				</view>
			</view>
			<view style="height: 30rpx;"></view>
		</view>
		<view style="border-bottom: 1px solid #e8e8e8;">
			<view style="height: 30rpx;"></view>
			<view style="display: flex;">
				<view style="margin-left: 3%;width: 20%;margin-top: 1.5%;">联系人：</view>
				<view style="width: 40%;">
					<uni-easyinput v-model="Contact" :styles="styles"></uni-easyinput>
				</view>
				<view style="width: 38%;margin-top: 1.5%;margin-left: 2%;">
					<uni-data-checkbox v-model="value" :localdata="sex" @change="ChooseSex"></uni-data-checkbox>
				</view>
			</view>
			<view style="height: 30rpx;"></view>
		</view>
		<view style="border-bottom: 1px solid #e8e8e8;">
			<view style="height: 30rpx;"></view>
			<view style="display: flex;">
				<view style="margin-left: 3%;width: 20%;margin-top: 1.5%;">手机号：</view>
				<view>
					<uni-easyinput v-model="Phone" :styles="styles"></uni-easyinput>
				</view>
			</view>
			<view style="height: 30rpx;"></view>
		</view>
		<view style="width: 80%;margin-left: 10%;margin-top: 10%;">
			<button type="primary" @click="CreateAddress">新建地址</button>
		</view>
	</view>
	
	
	
	
	
	<uni-popup ref="message" type="message">
			<uni-popup-message type="error" :message="ErrorMessage" :duration="2000"></uni-popup-message>
	</uni-popup>

	<uni-popup ref="alertDialog" type="dialog">
		<uni-popup-dialog type="warn" cancelText="关闭" confirmText="确定" title="通知" 
		content="确定删除该地址" @confirm="dialogConfirm"></uni-popup-dialog>
	</uni-popup>
</template>

<script>
	export default {
		data() {
			return {
				sex: [{
					text: '先生',
					value: 0
				}, {
					text: '女士',
					value: 1
				}],
				value:0,
				Address:"烟台大学北校区12号楼",
				Doorplate:"A516",
				Contact:"张乾",
				Phone:"15130380905",
				gender:"",
				styles: {
					borderColor: '#FFFFFF'
				},
				AddressId:"",
				AddressChoose: [{
				  text: "烟台大学北校区",
				  value: "1-0",
				  children: [
					{
					  text: "1号楼",
					  value: "1-1"
					},
					{
					  text: "2号楼",
					  value: "1-2"
					},
					{
					  text: "3号楼",
					  value: "1-3"
					},
					{
					  text: "4号楼",
					  value: "1-4"
					},
					{
					  text: "5号楼",
					  value: "1-5"
					},
					{
					  text: "6号楼",
					  value: "1-6"
					},
					{
					  text: "7号楼",
					  value: "1-7"
					},
					{
					  text: "8号楼",
					  value: "1-8"
					}
				  ]
				},
				{
				  text: "烟台大学南校区",
				  value: "2-0",
				  children: [
					{
					  text: "1号楼",
					  value: "2-1"
					},
					{
					  text: "2号楼",
					  value: "2-2"
					},
					{
					  text: "3号楼",
					  value: "2-3"
					},
					{
					  text: "4号楼",
					  value: "2-4"
					},
					{
					  text: "5号楼",
					  value: "2-5"
					},
					{
					  text: "6号楼",
					  value: "2-6"
					},
					{
					  text: "7号楼",
					  value: "2-7"
					},
					{
					  text: "8号楼",
					  value: "2-8"
					}
				  ]
				}],
				NotChoose:true,
				ErrorMessage:"",
				UpdataOrCreate:true,
				Account:"",
				Type:0,
			}
		},
		onLoad(option) {
			let Account=getApp().globalData.Account;
			// let Account="15130380905"
			this.Account=Account;
			this.Type=option.Type;
			if(option.Type==0){
				this.AddressId=option.AddressId;
				this.UpdataOrCreate=true;
				uniCloud.callFunction({
					name:"GetAddressDetailById",
					data:{
						AddressId:this.AddressId
					}
				}).then(res=>{
					// console.log(res)
					this.Address=res.result.data[0].Address;
					this.Doorplate=res.result.data[0].Doorplate;
					this.Contact=res.result.data[0].Contact;
					this.Phone=res.result.data[0].Phone;
					if(res.result.data[0].gender=="先生"){
						this.value=0;
						this.gender="先生";
					}else{
						this.value=1;
						this.gender="女士"
					}
				})
			}else{
				this.UpdataOrCreate=false;
				this.Address="烟台大学北校区1号楼";
				this.Doorplate="";
				this.Contact="";
				this.Phone="";
				this.value=0;
				this.gender="先生";
			}
		},
		methods: {
			OpenChoose(){
				this.NotChoose=false;
			},
			SelectInOrder(e){
				var first=e.detail.value[0].text;
				var second=e.detail.value[1].text
				this.Address=first+second;
			},
			ChooseSex(e){
				console.log(e.detail.data.text)
				this.gender=e.detail.data.text
			},
			SaveAddress(){
				if(this.Contact==""){
					this.ErrorMessage="联系人不能为空";
					this.$refs.message.open("center");
				}else{
					if(this.Phone==""){
						this.ErrorMessage="手机号不能为空";
						this.$refs.message.open("center");
					}else{
						// console.log(this.Doorplate,this.Contact,this.Phone)
						uniCloud.callFunction({
							name:"UpdateAddressById",
							data:{
								AddressId:this.AddressId,
								Address:this.Address,
								Doorplate:this.Doorplate,
								Contact:this.Contact,
								Phone:this.Phone,
								gender:this.gender
							}
						}).then(res=>{
							// console.log(res)
							// uni.navigateTo({
							// 	url:"/pages/MyAddress/MyAddress"
							// })
							
							uni.navigateBack({
								delta:1,//返回层数，2则上上页
							})
							

						})
					}
				}
			},
			DeleteAddress(){
				this.$refs.alertDialog.open();
			},
			dialogConfirm(){
				uniCloud.callFunction({
					name:"DeleteAddressById",
					data:{
						AddressId:this.AddressId
					}
				}).then(res=>{
					// uni.navigateTo({
					// 	url:"/pages/MyAddress/MyAddress"
					// })
					uni.navigateBack({
						delta:1,//返回层数，2则上上页
					})
					

				})
			},
			CreateAddress(){
				if(this.Contact==""){
					this.ErrorMessage="联系人不能为空";
					this.$refs.message.open("center");
				}else{
					if(this.Phone==""){
						this.ErrorMessage="手机号不能为空";
						this.$refs.message.open("center");
					}else{
						uniCloud.callFunction({
							name:"AddNewAddress",
							data:{
								Address:this.Address,
								Doorplate:this.Doorplate,
								Contact:this.Contact,
								Phone:this.Phone,
								Possessor:this.Account,
								gender:this.gender
							}
						}).then(res=>{
							// uni.navigateTo({
							// 	url:"/pages/MyAddress/MyAddress"
							// })
							uni.navigateBack({
								delta:1,//返回层数，2则上上页
							})
						})
					}
				}
			},
		}
	}
</script>

<style>

</style>
