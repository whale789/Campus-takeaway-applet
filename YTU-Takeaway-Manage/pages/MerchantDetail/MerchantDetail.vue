<template>
	<view style="width: 100%;">
		<view style="height: 25rpx;"></view>
		<view style="width: 100%;">
			<view style="display: flex;flex-direction: row;justify-content: center;">
				<image :src="StorePicture" style="width: 130rpx;height: 130rpx;" mode="aspectFit"></image>
			</view>
			<view style="height: 30rpx;"></view>
			<view style="margin-left: 30%;display: flex;">
				<view>店铺名称：</view>
				<view>{{StoreName}}</view>
			</view>
			<view style="height: 30rpx;"></view>
			<view style="margin-left: 30%;display: flex;">
				<view>店长姓名：</view>
				<view>{{Possessor}}</view>
			</view>
			<view style="height: 30rpx;"></view>
			<view style="margin-left: 30%;display: flex;">
				<view>店铺电话：</view>
				<view>{{PossessorPhone}}</view>
			</view>
			<view style="height: 30rpx;"></view>
			<view style="margin-left: 30%;display: flex;">
				<view>店铺地址：</view>
				<view>{{Address}}</view>
			</view>
			<view style="height: 30rpx;"></view>
			<view style="margin-left: 30%;display: flex;width: 100%;">
				<view>经营内容：</view>
				<view style="width: 45%;">{{BusinessContent}}</view>
			</view>
			<view style="height: 30rpx;"></view>
			<view style="margin-left: 30%;display: flex;">
				<view>营业状态：</view>
				<view :style="BussinessStyle">{{BussinessState}}</view>
			</view>
			<view style="height: 30rpx;"></view>
			<view style="margin-left: 30%;display: flex;">
				<view>店铺状态：</view>
				<view :style="StoreStyle">{{StoreState}}</view>
			</view>
			<view style="height: 30rpx;"></view>
			<view v-if="IfPunish" style="margin-left: 41%;display: flex;">
				<view>
					<button type="warn" size="mini" @click="OpenPunishref">处罚</button>
				</view>
			</view>
			<view v-else style="width: 100%;">
				<view style="display: flex;margin-left: 26.3%;">
					<view>处理人账号：</view>
					<view>{{ManagerAccount}}</view>
				</view>
				<view style="height: 30rpx;"></view>
				<view style="display: flex;margin-left: 26.3%;">
					<view>处理人姓名：</view>
					<view>{{ManagerName}}</view>
				</view>
				<view style="height: 30rpx;"></view>
				<view style="margin-left: 30%;display: flex;width: 100%;">
					<view>处罚原因：</view>
					<view style="width: 45%;">{{PunishReason}}</view>
				</view>
				<view style="height: 30rpx;"></view>
				<view style="margin-left: 30%;display: flex;">
					<view>处罚时间：</view>
					<view>{{PunishTime}}</view>
				</view>
				<view style="height: 30rpx;"></view>
				<view style="margin-left: 30%;display: flex;">
					<view>处罚名称：</view>
					<view>{{PunishName}}</view>
				</view>
				<view style="height: 30rpx;"></view>
				<view style="margin-left: 30%;display: flex;">
					<view>剩余时间：</view>
					<view>
						<uni-countdown :day="days" :hour="hours" :minute="minutes" :second="seconds"  @timeup="PunishTimeOut"/>
					</view>
				</view>
				<view style="height: 30rpx;"></view>
				<view style="margin-left: 40%;">
					<button type="primary" size="mini" @click="PunishTimeOut">提前解除</button>
				</view>
			</view>
		</view>
	</view>
	
	<uni-popup ref="ChoosePunish" background-color="#fff">
		<view style="height: 30rpx;"></view>
		<view style="margin-left: 3.5%;">
			<uni-data-checkbox selectedColor="red" mode="tag" v-model="PunishValue" :localdata="PunishList" @change="changePunish"></uni-data-checkbox>
		</view>
		<view style="height: 30rpx;"></view>
		<view style="width: 90%;margin-left: 5%;">
			<uni-easyinput type="textarea" v-model="PunishReason" placeholder="请输入处罚原因"></uni-easyinput>
		</view>
		<view style="height: 30rpx;"></view>
		<view style="margin-left: 42.5%;">
			<button size="mini" type="primary" @click="FinishPunish">完成</button>
		</view>
		<view style="height: 35rpx;"></view>
	</uni-popup>
	<uni-popup ref="message" type="message">
			<uni-popup-message type="error" message="请填写处罚理由" :duration="2000"></uni-popup-message>
	</uni-popup>
</template>

<script>
	export default {
		data() {
			return {
				Account:0,
				ManagerName:"",
				StoreId:"",
				StorePicture:"https://mp-15be003a-e292-4e97-86ed-f0163836fd3d.cdn.bspapp.com/cloudstorage/dc678af8-928b-42bd-b4dc-babf7e970091.jpg",
				StoreName:"土豆粉",
				Possessor:"李四",
				PossessorPhone:"15130380905",
				Address:"七餐三楼",
				BussinessState:"营业中",
				BussinessStyle:"color:green",
				StoreState:"正常",
				StoreStyle:"color:green",
				BusinessContent:"主要经营山西特色刀削面为主",
				PunishValue:0,
				PunishList:[{"value": 0,"text": "警告"	},{"value": 1,"text": "封禁1天"},{"value": 2,"text": "封禁3天"},{"value": 3,"text": "封禁7天"},{"value": 4,"text": "永久封禁"}],
				PunishReason:"",
				IfPunish:true,
				ManagerAccount:"",
				ManagerName:"",
				PunishTime:"",
				PunishName:"",
				PunishReason:"",
				days:0,
				hours:0,
				minutes:0,
				seconds:0,
				PunishId:"",
			}
		},
		onLoad(option){
			this.StoreId=option.StoreId;
			this.Account=getApp().globalData.Account
			// this.Account=2640055850001;
			
			// console.log(this.StoreId)
			uniCloud.callFunction({
				name:"GetRTTMsgById",
				data:{
					StoreId:this.StoreId
				}
			}).then(res=>{
				this.StorePicture=res.result.data[0].StorePicture;
				this.StoreName=res.result.data[0].StoreName;
				this.Possessor=res.result.data[0].Possessor;
				this.PossessorPhone=res.result.data[0].PossessorPhone;
				this.Address=res.result.data[0].Address;
				if(res.result.data[0].BusinessStatus==1){
					this.BussinessState="营业中";
					this.BussinessStyle="color:green";
				}else{
					this.BussinessState="休息中";
					this.BussinessStyle="color:grey";
				}
				if(res.result.data[0].OnboardingStatus==1){
					this.StoreState="正常";
					this.StoreStyle="color:green";
				}else{
					this.StoreState="禁用";
					this.StoreStyle="color:red";
				}
				this.BusinessContent=res.result.data[0].BusinessContent;
			})
			
			uniCloud.callFunction({
				name:"GetPunishByStoreId",
				data:{
					StoreId:this.StoreId
				}
			}).then(res=>{
				if(res.result.data.length==0){
					this.IfPunish=true
				}else{
					for(var i=0;i<res.result.data.length;i++){
						if(res.result.data[i].PunishState==1){
							let Undate=res.result.data[i].UnblockingTime;
							let NowDate = new Date().getTime();
							let StimeDate = new Date(Undate).getTime();
							if(NowDate<StimeDate){
								this.IfPunish=false;
								this.PunishId=res.result.data[i]._id;
								this.ManagerAccount=res.result.data[i].ManagerAccount;
								this.ManagerName=res.result.data[i].ManagerName;
								this.PunishTime=res.result.data[i].PunishTime;
								this.PunishName=res.result.data[i].PunishName;
								this.PunishReason=res.result.data[i].PunishReason;
								
								let date2=new Date();
								let date1 = new Date(Date.parse(Undate.replace(/-/g,"/")));
								let iDays = parseInt(Math.abs(date1.getTime()- date2.getTime()) /1000/60/60/24);
								let dateDiff = (StimeDate - NowDate)
								let residue1 = dateDiff % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
								let hours = Math.floor(residue1 / (3600 * 1000));
								let residue2 = residue1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
								let minutes = Math.floor(residue2 / (60 * 1000))
								let residue3 = residue2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
								let seconds = Math.round(residue3 / 1000);
								this.days=iDays;
								this.hours=hours;
								this.minutes=minutes;
								this.seconds=seconds;
								break;
							}else{
								this.IfPunish=true;
								this.PunishId=res.result.data[i]._id;
								this.ManagerAccount=res.result.data[i].ManagerAccount;
								this.ManagerName=res.result.data[i].ManagerName;
								this.PunishTime=res.result.data[i].PunishTime;
								this.PunishName=res.result.data[i].PunishName;
								this.PunishReason=res.result.data[i].PunishReason;
								let Undate=res.result.data[i].UnblockingTime;
								let date2=new Date();
								let date1 = new Date(Date.parse(Undate.replace(/-/g,"/")));
								let iDays = parseInt(Math.abs(date1.getTime()- date2.getTime()) /1000/60/60/24);
								this.PunishTimeOut();
								break;
							}
						}
					}
					
				}
			})
		},
		methods: {
			OpenPunishref(){
				this.$refs.ChoosePunish.open("bottom");
			},
			changePunish(){
				console.log(this.PunishValue)
			},
			FinishPunish(){
				if(this.PunishReason==""){
					this.$refs.message.open("center");
				}else{
					uniCloud.callFunction({
						name:"GetManagerMsg",
						data:{
							Account:this.Account
						}
					}).then(res=>{
						this.ManagerName=res.result.data[0].name;
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
						var PunishLastTime=0;
						let PunishName="";
						if(this.PunishValue==0){
							PunishLastTime=0;
							PunishName="警告";
							uniCloud.callFunction({
								name:"AddNewPunish",
								data:{
									StoreId:this.StoreId,
									StoreName:this.StoreName,
									StorePicture:this.StorePicture,
									Possessor:this.Possessor,
									PossessorPhone:this.PossessorPhone,
									Address:this.Address,
									ManagerAccount:this.Account,
									ManagerName:this.ManagerName,
									PunishTime:timer,
									PunishLastTime:PunishLastTime,
									UnblockingTime:timer1,
									PunishName:PunishName,
									PunishReason:this.PunishReason,
									PunishState:0
								}
							}).then(res=>{
								this.$refs.ChoosePunish.close();
								let pages= getCurrentPages();
								let page = pages[pages.length-1];  
								uni.redirectTo({url:page.$page.fullPath});
							})
						}else{
							
						
							if(this.PunishValue==1){
								PunishLastTime=1;
								PunishName="封禁1天";
							}
							if(this.PunishValue==2){
								PunishLastTime=3;
								PunishName="封禁3天";
							}
							if(this.PunishValue==3){
								PunishLastTime=7;
								PunishName="封禁7天";
							}
							if(this.PunishValue==4){
								PunishLastTime=3650;
								PunishName="永久封禁";
							}
							var now = new Date();
							let date=new Date(now.getTime() + PunishLastTime * 24 * 3600 * 1000);
							let year1 = date.getFullYear()
							let month1 = date.getMonth() + 1
							let day1 = date.getDate()
							let hour1 = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
							let minute1 = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
							let second1 = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
							month1 >= 1 && month1 <= 9 ? (month1 = "0" + month1) : "";
							day1 >= 0 && day1 <= 9 ? (day1 = "0" + day1) : "";
							var timer1 = year1 + '-' + month1 + '-' + day1 + ' ' + hour1 + ':' + minute1 + ':' + second1;
							
							// console.log(this.Account)
							uniCloud.callFunction({
								name:"AddNewPunish",
								data:{
									StoreId:this.StoreId,
									StoreName:this.StoreName,
									StorePicture:this.StorePicture,
									Possessor:this.Possessor,
									PossessorPhone:this.PossessorPhone,
									Address:this.Address,
									ManagerAccount:this.Account,
									ManagerName:this.ManagerName,
									PunishTime:timer,
									PunishLastTime:PunishLastTime,
									UnblockingTime:timer1,
									PunishName:PunishName,
									PunishReason:this.PunishReason,
									PunishState:1
								}
							}).then(res=>{
								uniCloud.callFunction({
									name:"UpdateMerchantStateById",
									data:{
										StoreId:this.StoreId,
										BusinessStatus:0
									}
								}).then(ress=>{
									uniCloud.callFunction({
										name:"UpdateMerchantOnboardingStatus",
										data:{
											StoreId:this.StoreId,
											OnboardingStatus:0
										}
									}).then(resss=>{
										this.$refs.ChoosePunish.close();
										let pages= getCurrentPages();
										let page = pages[pages.length-1];  
										uni.redirectTo({url:page.$page.fullPath});
									})
								})
							})
							}
						})
						
					
				}
			},
			PunishTimeOut(){
				uniCloud.callFunction({
					name:"UpdatePunishState",
					data:{
						PunishId:this.PunishId,
						PunishState:0
					}
				}).then(res=>{
					uniCloud.callFunction({
						name:"UpdateMerchantStateById",
						data:{
							StoreId:this.StoreId,
							BusinessStatus:0
						}
					}).then(ress=>{
						uniCloud.callFunction({
							name:"UpdateMerchantOnboardingStatus",
							data:{
								StoreId:this.StoreId,
								OnboardingStatus:1
							}
						}).then(resss=>{
							this.IfPunish=true;
							let pages= getCurrentPages();
							let page = pages[pages.length-1];  
							uni.redirectTo({url:page.$page.fullPath});
						})
					})
				})
			},
		}
	}
</script>

<style>

</style>
