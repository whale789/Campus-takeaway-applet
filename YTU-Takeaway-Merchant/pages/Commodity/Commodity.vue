<template>
	<view style="width: 100%;">
		<view style="width:100%;height: 250rpx;z-index: -1;">
			<image style="width: 100%;height: 250rpx;" :src="GoodsSrc" mode="scaleToFill"></image>
		</view>
		<view style="margin-top: -16%;">
			<uni-card :title="SellerName"  :sub-title="SellerMonth+SellerMonthNumber" :extra="BusinessStatus" :thumbnail="SellerPicture">
				<text class="uni-body">店铺位于{{SellerLocate}},于{{SellerJoinTime}}入驻，共经营{{SellerLastTime}}天</text>
			</uni-card>
		</view>
		<view style="width: 40%;margin-left: 5%;">
			<button type="primary" size="mini" @click="AddClass">新增类别</button>
		</view>
		<view>
			<view v-for="(item,index) in ListCategory" :key="index">
				<uni-card title="基础卡片" sub-title="副标题" extra="额外信息" padding="10px 0" >
					<template v-slot:title>
						<view style="width: 120%;border-bottom:1px solid #ececec ;margin-left: -3%;display: flex;">
							<view style="width: 55%;">
								<view style="height: 70rpx;margin-left: 7%;line-height: 70rpx;width: 45%;" @click="AddNewClass(item.ClassID,item.ClassName)">
									{{item.ClassName}}
								</view>
							</view>
							<view style="width: 35%;display: flex;flex-direction: column;justify-content: center;">
								<button type="primary" size="mini" @click="AddGoods(item.ClassID)">新增商品</button>
							</view>
						</view>
					</template>
					<view v-for="(item0,index0) in item.GoodsDetail" :key="index0">
						<view style="display: flex;">
							<view style="width: 20%;margin-left: 5%;">
								<uni-file-picker limit="1" :del-icon="false" disable-preview="false" :imageStyles="imageStyles"
									file-mediatype="image" @success="UpdatePictureLoadScs($event,item.ClassId,item0.GoodsId,index,index0)">
									<image :src="item0.GoodsPicture"  mode="aspectFit"></image>
								</uni-file-picker>
							</view>  
							<view style="width: 85%;">
								<view style="margin-left: 5%;margin-top: 3%;">
									<view style="width: 70%;">
										<view style="margin-left: 5%;" @click="AddNewGoodsName(item.ClassID,item0.GoodsId,item0.GoodsName,index,index0)">
											{{item0.GoodsName}}
										</view>
										<!-- <uni-easyinput type="text" placeholder="商品名称" :value="item0.GoodsName" @blur="AddNewGoodsName(item.ClassID,item0.GoodsId,item0.GoodsName)" ></uni-easyinput> -->
									</view>
									<view style="display: flex;">
										<view style="margin-top: 3%;margin-left: 2%;" @click="AddNewGoodsPrice(item.ClassID,item0.GoodsId,item0.GoodsPrice,index,index0)">￥{{item0.GoodsPrice}}</view>
										<!-- <view style="width: 50%;margin-top: 3%;display: flex;"> -->
											<!-- <uni-easyinput placeholder="商品价格" confirmType="done" :value="item0.GoodsPrice" trim="all" @blur="AddNewGoodsPrice($event,index,index0)"></uni-easyinput> -->
										<!-- </view> -->
									</view>								
								</view>
							</view>
							<view style="margin-top: 7%;">
								<uni-icons type="clear" size="30" color="red" @click="DeleteGoods(item.ClassID,item0.GoodsId)"></uni-icons>
							</view>
						</view>
						<view style="height: 20rpx;border-top: 1px solid #ececec;margin-top: 20rpx;"></view>
					</view>
					<view style="width: 120%;display: flex;">
						<view style="width: 53%;"></view>
						<view style="width: 35%;display: flex;flex-direction: column;justify-content: center;">
							<button type="warn" size="mini" @click="DeleteClassWay(item.ClassID)">删除类别</button>
						</view>
					</view>
				</uni-card>
			</view>
			<view>
				<uni-popup ref="alertDialog" type="dialog">
					<uni-popup-dialog type="warn" cancelText="关闭" confirmText="确定" title="通知" 
					:content="DeletePromptFront+DeletePrompt" @confirm="dialogConfirm"></uni-popup-dialog>
				</uni-popup>
				<uni-popup ref="DeleteClassRef" type="dialog">
					<uni-popup-dialog type="warn" cancelText="关闭" confirmText="确定" title="通知" 
					:content="DeleteClassFront+DeleteClass" @confirm="DeleteClassConfirm"></uni-popup-dialog>
				</uni-popup>
				<uni-popup ref="message" type="message">
						<uni-popup-message type="error" :message="PromptMessage" :duration="2000"></uni-popup-message>
				</uni-popup>
				<uni-popup ref="inputDialog" type="dialog">
					<uni-popup-dialog ref="inputClose"  mode="input" title="修改种类名" :value="ContentNeedUpdate"
						placeholder="请输入内容" @confirm="UpdateNewClassName"></uni-popup-dialog>
				</uni-popup>
				<uni-popup ref="inputGoodsName" type="dialog">
					<uni-popup-dialog ref="inputClose"  mode="input" title="修改商品名" :value="ContentNeedUpdate"
						placeholder="请输入内容" @confirm="UpdateNewGoodsName"></uni-popup-dialog>
				</uni-popup>
				<uni-popup ref="inputGoodsPrice" type="dialog">
					<uni-popup-dialog ref="inputClose"  mode="input" title="修改商品价格" :value="ContentNeedUpdate"
						placeholder="请输入内容" @confirm="UpdateNewGoodsPrice"></uni-popup-dialog>
				</uni-popup>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StoreId:"",
				value:"",
				GoodsSrc:"../../static/images/GoodsBackgroundTest.jpg",
				avatar: 'https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png',
				SellerName:"山西刀削面",
				BusinessStatus:"营业中",
				SellerLocate:"七餐三楼",
				SellerMonth:"月售：",
				SellerMonthNumber:800,
				SellerPicture:"/static/images/conditions-active.png",
				SellerJoinTime:"2023年4月6日",
				SellerLastTime:23,
				GoodsPriceIcon:"￥",
				DeletePrompt:"",
				DeletePromptFront:"是否确定删除商品",
				DeleteClass:"",
				DeleteClassFront:"是否删除类别",
				ListCategory:[],
				PromptMessage:"",
				ClassId:"",
				GoodsId:"",
				timer:null,
				ClassName:"",
				GoodsName:"",
				ContentNeedUpdate:"",
				Updatecontent:"",
				index:0,
				index0:0,
				GoodsPrice:0,
				imageStyles:{
					width:120,
					height:70
				},
				GoodsPicture:"",
			}
		},
		onHide() {
			if(this.timer) {  
				clearTimeout(this.timer);  
				this.timer = null;  
			}  
		},
		onShow() {
			
			// let StoreId=getApp().globalData.StoreId;
			clearInterval(this.timer);
			this.timer = null;
			this.StoreId="6437e58ef5cf3a3e090eab85";
			if(this.StoreId==0){
				
			}else{
				uniCloud.callFunction({
					name:"GetRTTMsgById",
					data:{
						StoreId:this.StoreId
					}
				}).then(res=>{
					// console.log(res)
					this.SellerPicture=res.result.data[0].StorePicture;
					this.SellerName=res.result.data[0].StoreName;
					if(res.result.data[0].BusinessStatus==1){
						this.BusinessStatus="营业中";
					}else{
						this.BusinessStatus="休息中";
					}
					this.SellerLocate=res.result.data[0].Address;
					this.SellerJoinTime=res.result.data[0].SettledDate;
					let date1=new Date();
					let date2=new Date(Date.parse(res.result.data[0].SettledDate.replace(/-/g,"/")));
					let iDays = parseInt(Math.abs(date1.getTime()- date2.getTime()) /1000/60/60/24);
					this.SellerLastTime=iDays;
					this.SellerMonthNumber=0;
					this.ListCategory=res.result.data[0].GoodsClass;
					for(var i=0;i<res.result.data[0].GoodsClass.length;i++){
						for(var j=0;j<res.result.data[0].GoodsClass[i].GoodsDetail.length;j++){
							this.SellerMonthNumber=this.SellerMonthNumber+res.result.data[0].GoodsClass[i].GoodsDetail[j].GoodsSoldNumber;
						}
					}
				})
			}
		},
		methods: {
			DeleteGoods(ClassId,GoodsId){   //删除商品，打开弹窗
				this.GoodsId = GoodsId;
				this.ClassId=ClassId;
				this.$refs.alertDialog.open()
			},
			dialogConfirm() {   //删除商品弹窗
				uniCloud.callFunction({
					name:"DeleteMerchantGoods",
					data:{
						StoreId:this.StoreId,
						GoodsId:this.GoodsId,
						ClassId:this.ClassId
					}
				}).then(res=>{
					uni.showToast({
						title:"删除成功",
						duration:1500
					})
					
					this.timer = setTimeout( () => {
					    console.log("定时器循环")
					    let pages= getCurrentPages();
					    let page = pages[pages.length-1];  
					    uni.redirectTo({url:page.$page.fullPath});	
					}, 1500)
				})
			},
			DeleteClassWay(ClassId){  //删除类别，打开弹窗
				this.ClassId=ClassId
				this.$refs.DeleteClassRef.open()
			},
			DeleteClassConfirm(){  //删除类别弹窗
				uniCloud.callFunction({
					name:"DeleteMerchantGoodsClass",
					data:{
						StoreId:this.StoreId,
						ClassId:this.ClassId
					}
				}).then(res=>{
					uni.showToast({
						title:"删除成功"
					})
					this.timer = setTimeout( () => {
					    console.log("定时器循环")
					    let pages= getCurrentPages();
					    let page = pages[pages.length-1];  
					    uni.redirectTo({url:page.$page.fullPath});	
					}, 1500)
					
				})
				
				
			},
			AddGoods(ClassId){   //增加商品列
				uniCloud.callFunction({
					name:"AddMerchantNewGoods",
					data:{
						StoreId:this.StoreId,
						ClassId:ClassId
					}
				}).then(res=>{
					let pages= getCurrentPages();  
					let page = pages[pages.length-1];  
					uni.redirectTo({url:page.$page.fullPath});
				})
			},
			AddClass(){  //增加种类
				uniCloud.callFunction({
					name:"AddMerchantNewClass",
					data:{
						StoreId:this.StoreId
					}
				}).then(res=>{
					console.log(res);
					let pages= getCurrentPages();
					let page = pages[pages.length-1];  
					uni.redirectTo({url:page.$page.fullPath});
				})
			},
			AddNewClass(ClassId,ClassName){     //类别输入框失去焦点
				this.ClassId=ClassId;
				this.ClassName=ClassName;
				this.ContentNeedUpdate=ClassName;
				this.$refs.inputDialog.open();
			},
			UpdateNewClassName(val){
				// console.log(val)
				let value=val;
				if(value==''){
					value=this.ClassName;
				}//数据库部分
				uniCloud.callFunction({
					name:"UpdateMerchantClassName",
					data:{
						StoreId:this.StoreId,
						ClassId:this.ClassId,
						ClassName:value
					}
				}).then(res=>{
					// console.log(res)
					let pages= getCurrentPages();
					let page = pages[pages.length-1];  
					uni.redirectTo({url:page.$page.fullPath});
				})
			},
			AddNewGoodsName(ClassId,GoodsId,GoodsName,index,index0){  //商品名字输入框失去焦点
				this.ClassId=ClassId;
				this.GoodsId=GoodsId;
				this.GoodsName=GoodsName;
				this.ContentNeedUpdate=GoodsName;
				this.index=index;
				this.index0=index0;
				this.$refs.inputGoodsName.open();
			},
			UpdateNewGoodsName(val){
				let value=val;
				if(value==""){
					value=this.GoodsName;
				}
				// console.log(this.index,this.index0);
				uniCloud.callFunction({
					name:"UpdateMerchantGoodsName",
					data:{
						StoreId:this.StoreId,
						ClassId:this.ClassId,
						GoodsId:this.GoodsId,
						index:this.index,
						index0:this.index0,
						GoodsName:value
					}
				}).then(res=>{
					let pages= getCurrentPages();
					let page = pages[pages.length-1];  
					uni.redirectTo({url:page.$page.fullPath});
				})
				
			},
			AddNewGoodsPrice(ClassId,GoodsId,GoodsPrice,index,index0){  //商品价格输入框失去焦点
				this.ClassId=ClassId;
				this.GoodsId=GoodsId;
				this.GoodsPrice=GoodsPrice;
				this.ContentNeedUpdate=GoodsPrice;
				this.index=index;
				this.index0=index0;
				this.$refs.inputGoodsPrice.open();
			},
			UpdateNewGoodsPrice(val){
				let value=val;
				if(value==""){
					value=this.GoodsPrice
				}else{
					const inputRule =/[^\d.]/g
					let val=value.replace(inputRule , '');
					if(!val){
						value=this.GoodsPrice
					}else{
						uniCloud.callFunction({
							name:"UpdateMerchantGooodsPrice",
							data:{
								StoreId:this.StoreId,
								ClassId:this.ClassId,
								GoodsId:this.GoodsId,
								index:this.index,
								index0:this.index0,
								GoodsPrice:value
							}
						}).then(res=>{
							let pages= getCurrentPages();
							let page = pages[pages.length-1];  
							uni.redirectTo({url:page.$page.fullPath});
						})
					}
				}
			},
			UpdatePictureLoadScs(e,ClassId,GoodsId,index,index0){
				this.GoodsPicture=e.tempFilePaths[0];
				uniCloud.callFunction({
					name:"UpdateMerchantGoodsPicture",
					data:{
						StoreId:this.StoreId,
						ClassId:ClassId,
						GoodsId:GoodsId,
						index:index,
						index0:index0,
						GoodsPicture:this.GoodsPicture
					}
				}).then(res=>{
					console.log(res)
				})
			},
		}
	}
</script>

<style>
@import "@/static/iconfont.css";
</style>
