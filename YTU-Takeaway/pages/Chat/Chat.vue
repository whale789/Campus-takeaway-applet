<template>
	<view class="chat">
		<scroll-view  :style="{height: `${windowHeight-inputHeight}rpx`}"
		id="scrollview"
		scroll-y="true" 
		:scroll-top="scrollTop"
		class="scroll-view"
		@scrolltolower="UpdateMessage"
		>
			<!-- 聊天主体 -->
			<view id="msglistview" class="chat-body">
				<view style="display: flex;flex-direction: row;justify-content: center;">
					<view style="font-size: 25rpx;color: #9d9d9d;">
						{{FirstChatTime}}
					</view>
				</view>
				<!-- 聊天记录 -->
				<view v-for="(item,index) in MsgList" :key="index">
					<!-- 自己发的消息 -->
					<view v-if="item.IfTime" style="display: flex;flex-direction: row;justify-content: center;">
						<view style="font-size: 25rpx;color: #9d9d9d;">
							{{item.MessageTime}}
						</view>
					</view>
					<view class="item self" v-if="item.userContent != ''" >
						<!-- 文字内容 -->
						<view class="content right">
						{{item.userContent}}
						</view>
						<!-- 头像 -->
						<view class="avatar">
							<image :src="item.UserAvatar" mode="aspectFit"></image>
						</view>
					</view>
					<!-- 机器人发的消息 -->
					<view class="item Ai" v-if="item.botContent != ''">
						<!-- 头像 -->     
						<view class="avatar">
							<image :src="item.ManagerAvatar" mode="aspectFit"></image>
						</view>
						<!-- 文字内容 -->
						<view class="content left">
							{{item.botContent}}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 底部消息发送栏 -->
		<!-- 用来占位，防止聊天消息被发送框遮挡 -->
		<view class="chat-bottom" :style="{height: `${inputHeight}rpx`}">
			<view class="send-msg" :style="{bottom:`${keyboardHeight}rpx`}">
                <view class="uni-textarea">
					<textarea v-model="chatMsg"
					  maxlength="300"
					  confirm-type="send"
					  @confirm="handleSend"
					  :show-confirm-bar="false"
					  :adjust-position="false"
					  @linechange="sendHeight"
					  @focus="focus" @blur="blur"
					 auto-height></textarea>
				</view>
				<button @click="handleSend" class="send-btn">发送</button>
			</view>
		</view>
	</view>
	<uni-popup ref="message" type="message">
			<uni-popup-message type="error" message="不能发送空消息" :duration="2000"></uni-popup-message>
	</uni-popup>
</template>
<script>
	export default {
		data() {
			return {
				ChatId:"",
				//键盘高度
				keyboardHeight:0,
				//底部消息发送高度
				bottomHeight: 0,
				//滚动距离
				scrollTop: 0,
				userId:'',
				//发送的消息
				chatMsg:"",
				
				MsgList:[],
				UserId:"",
				UserNickName:"",
				UserAvatar:"",
				ManagerId:"",
				ManagerName:"",
				ManagerAvatar:"",
				FirstChatTime:"",
				IfTime:true,
				timer: null,
			}
		},
		updated(){
			//页面更新时调用聊天消息定位到最底部
			this.scrollToBottom();
		},
		computed: {
			windowHeight() {
			    return this.rpxTopx(uni.getSystemInfoSync().windowHeight)
			},
			// 键盘弹起来的高度+发送框高度
			inputHeight(){
				return this.bottomHeight+this.keyboardHeight
			}
		},
		onLoad(option){
			// uni.onKeyboardHeightChange(res => {
			// 	//这里正常来讲代码直接写
			// 	//this.keyboardHeight=this.rpxTopx(res.height)就行了
			// 	//但是之前界面ui设计聊天框的高度有点高,为了不让键盘和聊天输入框之间距离差太大所以我改动了一下。
			// 	this.keyboardHeight = this.rpxTopx(res.height-30)
			// 	if(this.keyboardHeight<0)this.keyboardHeight = 0;
			// })
			this.ChatId=option.ChatId;
			// console.log(this.ChatId)
			// uniCloud.callFunction({
			// 	name:"GetChatById",
			// 	data:{
			// 		ChatId:this.ChatId
			// 	}
			// }).then(res=>{
			// 	this.UserId=res.result.data[0].UserId;
			// 	this.UserNickName=res.result.data[0].UserNickName;
			// 	this.UserAvatar=res.result.data[0].UserAvatar;
			// 	this.ManagerId=res.result.data[0].ManagerId;
			// 	this.ManagerName=res.result.data[0].ManagerName;
			// 	this.ManagerAvatar=res.result.data[0].ManagerAvatar;
			// 	this.MsgList=res.result.data[0].MsgList
			// 	this.FirstChatTime=res.result.data[0].MsgList[0].MessageTime;
			// 	for(var i=0;i<res.result.data[0].MsgList.length;i++){
			// 		uniCloud.callFunction({
			// 			name:"UpdateMessageState",
			// 			data:{
			// 				ChatId:ChatId,
			// 				index:i
			// 			}
			// 		}).then(ress=>{
			// 			// console.log(ress)
			// 		})
			// 	}
				// console.log(res.result.data)
			// })
		},
		onPullDownRefresh(){
			this.UpdateMessage()
		},
		onShow() {
			let ChatId=this.ChatId
			// this.timer = setInterval(function() {
				
				// console.log(ChatId)
				uniCloud.callFunction({
					name:"GetChatById",
					data:{
						ChatId:ChatId
					}
				}).then(res=>{
					this.UserId=res.result.data[0].UserId;
					this.UserNickName=res.result.data[0].UserNickName;
					this.UserAvatar=res.result.data[0].UserAvatar;
					this.ManagerId=res.result.data[0].ManagerId;
					this.ManagerName=res.result.data[0].ManagerName;
					this.ManagerAvatar=res.result.data[0].ManagerAvatar;
					this.MsgList=res.result.data[0].MsgList
					this.FirstChatTime=res.result.data[0].MsgList[0].MessageTime;
					// console.log(res.result.data)
					// 	for(var i=0;i<res.result.data[0].MsgList.length;i++){
					// 		uniCloud.callFunction({
					// 			name:"UpdateMessageState",
					// 			data:{
					// 				ChatId:ChatId,
					// 				index:i
					// 			}
					// 		}).then(ress=>{
					// 			// console.log(ress)
					// 		})
					// 	}
					
				})
				
				
			// }, 500);
			
			
		},
		onUnload(){
			uni.offKeyboardHeightChange()
		},
		methods: {
			UpdateMessage(){
				let ChatId=this.ChatId
				// this.timer = setInterval(function() {
					
					// console.log(ChatId)
					uniCloud.callFunction({
						name:"GetChatById",
						data:{
							ChatId:ChatId
						}
					}).then(res=>{
						this.UserId=res.result.data[0].UserId;
						this.UserNickName=res.result.data[0].UserNickName;
						this.UserAvatar=res.result.data[0].UserAvatar;
						this.ManagerId=res.result.data[0].ManagerId;
						this.ManagerName=res.result.data[0].ManagerName;
						this.ManagerAvatar=res.result.data[0].ManagerAvatar;
						this.MsgList=res.result.data[0].MsgList
						this.FirstChatTime=res.result.data[0].MsgList[0].MessageTime;
						// console.log(res.result.data)
						
						
					})
			},
			focus(){
				this.scrollToBottom()
			},
			blur(){
				this.scrollToBottom()
			},
			// px转换成rpx
			rpxTopx(px){
				let deviceWidth = wx.getSystemInfoSync().windowWidth
				let rpx = ( 750 / deviceWidth ) * Number(px)
				return Math.floor(rpx)
			},
			// 监视聊天发送栏高度
			sendHeight(){
				setTimeout(()=>{
					let query = uni.createSelectorQuery();
					query.select('.send-msg').boundingClientRect()
					query.exec(res =>{
						this.bottomHeight = this.rpxTopx(res[0].height)
					})
				},10)
			},
			// 滚动至聊天底部
			scrollToBottom(e){
				setTimeout(()=>{
					let query = uni.createSelectorQuery().in(this);
					query.select('#scrollview').boundingClientRect();
					query.select('#msglistview').boundingClientRect();
					query.exec((res) =>{
						if(res[1].height > res[0].height){
							this.scrollTop = this.rpxTopx(res[1].height - res[0].height)
						}
					})
				},15)
			},
			// 发送消息
			handleSend() {
				//如果消息不为空
				if(!this.chatMsg||!/^\s+$/.test(this.chatMsg)){
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
					
					let LastMsgTime=this.MsgList[this.MsgList.length-1].MessageTime;
					// console.log(LastMsgTime)
					let date1=new Date(LastMsgTime.replace(/-/g, '/'))
					var minute0 = 1000 * 60;
					var hour0 = minute * 60;
					var day0 = hour * 24;
					var week0 = day * 7;
					var month0 = day * 30;
					var year0 = month * 12;
					var time1=new Date().getTime();
					var time2=new Date(date1).getTime();
					var time=time1-time2;
					
					if(time / minute0 >= 15){
						this.IfTime=true;
					}else{
						this.IfTime=false;
					}
					
					let obj = {
						botContent: "",
						ManagerId: this.ManagerId,
						ManagerName: this.ManagerName,
						ManagerAvatar:this.ManagerAvatar,
						userContent: this.chatMsg,
						UserId: this.UserId,
						UserAvatar:this.UserAvatar,
						UserNickName:this.UserNickName,
						MessageState:0,
						MessageTime:timer,
						IfTime:this.IfTime
					}
					uniCloud.callFunction({
						name:"AddNewMessage",
						data:{
							ChatId:this.ChatId,
							NewMsg:obj
						}
					}).then(res=>{
						console.log(res)
					})
					this.MsgList.push(obj);
					this.chatMsg = '';
					this.scrollToBottom()
				}else {
					this.$refs.message.open("center")
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
	
	$chatContentbgc: #C2DCFF;
	$sendBtnbgc: #4F7DF5;
	
	view,button,text,input,textarea {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	/* 聊天消息 */
	.chat {
		.scroll-view {
			::-webkit-scrollbar {
					    display: none;
					    width: 0 !important;
					    height: 0 !important;
					    -webkit-appearance: none;
					    background: transparent;
					    color: transparent;
					  }
			
			// background-color: orange;
			background-color: #F6F6F6;
			
			.chat-body {
				display: flex;
				flex-direction: column;
				padding-top: 23rpx;
				// background-color:skyblue;
				
				.self {
					justify-content: flex-end;
				}
				.item {
					display: flex;
					padding: 23rpx 30rpx;
					// background-color: greenyellow;

					.right {
						background-color: $chatContentbgc;
					}
					.left {
						background-color: #FFFFFF;
					}
                    // 聊天消息的三角形
					.right::after {
						position: absolute;
						display: inline-block;
						content: '';
						width: 0;
						height: 0;
						left: 100%;
						top: 10px;
						border: 12rpx solid transparent;
						border-left: 12rpx solid $chatContentbgc;
					}

					.left::after {
						position: absolute;
						display: inline-block;
						content: '';
						width: 0;
						height: 0;
						top: 10px;
						right: 100%;
						border: 12rpx solid transparent;
						border-right: 12rpx solid #FFFFFF;
					}

					.content {
						position: relative;
						max-width: 486rpx;
						border-radius: 8rpx;
						word-wrap: break-word;
						padding: 24rpx 24rpx;
						margin: 0 24rpx;
						border-radius: 5px;
						font-size: 32rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						line-height: 42rpx;
					}

					.avatar {
						display: flex;
						justify-content: center;
						width: 78rpx;
						height: 78rpx;
						// background: $sendBtnbgc;
						border-radius: 8rpx;
						overflow: hidden;
						
						image {
							align-self: center;
						}

					}
				}
			}
		}

		/* 底部聊天发送栏 */
		.chat-bottom {
			width: 100%;
			height: 177rpx;
			background: #F4F5F7;
			transition: all 0.1s ease;
			

			.send-msg {
				display: flex;
				align-items: flex-end;
				padding: 16rpx 30rpx;
				width: 100%;
				min-height: 177rpx;
				position: fixed;
				bottom: 0;
				background: #EDEDED;
				transition: all 0.1s ease;
			}

			.uni-textarea {
				padding-bottom: 70rpx;
                
				textarea {
					width: 537rpx;
					min-height: 75rpx;
					max-height: 500rpx;
					background: #FFFFFF;
					border-radius: 8rpx;
					font-size: 32rpx;
					font-family: PingFang SC;
					color: #333333;
					line-height: 43rpx;
					padding: 5rpx 8rpx;
				}
			}
            
			.send-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 70rpx;
				margin-left: 25rpx;
				width: 128rpx;
				height: 75rpx;
				background: $sendBtnbgc;
				border-radius: 8rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 28rpx;
			}
		}
	}
</style>
