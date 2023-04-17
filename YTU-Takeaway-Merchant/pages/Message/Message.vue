<template>
	<view>
		<uni-list :border="true">
			<view v-for="(item,index) in ListMessgae" :key="index">
				<!-- <view>
					<uni-badge custom-style="margin-top: 10rpx;"  :text="value" absolute="rightTop" size="small" :offset="[10, 10]" max-num=99>
						<image :src="item.UserAvater" mode="aspectFit" style="border-radius: 50%;width: 120rpx;height: 120rpx;"></image>
					</uni-badge>
				</view>
				<view style="border-bottom: 1px solid #cecece;width: 100%;margin-left: 2%;">
					<view style="display: flex;">
						<view class="ChatingName">
							{{item.UserChatName}}
						</view>
						<view style="margin-top: 2%;width: 30%;text-align:end;color: #cecece;">
							{{item.ChatingTime}}
						</view>
					</view>
					<view class="ChatingEndWord" style="margin-top: 3%;">
						{{item.LastMessage}}
					</view>
				</view> -->
				<uni-list-chat :avatar-circle="true" :title="item.UserChatName" :avatar="item.UserAvater" 
								:note="item.LastMessage" 
								:time="item.ChatingTime" 
								badge-positon="right" 
								badge-text="99"
								:clickable="true"></uni-list-chat>
			</view>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:1,
				ListMessgae:[{
					UserAvater:"https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
					UserChatName:"Imaginaries",
					LastMessage:"大约什么时候送到",
					ChatingTime:"16:15"
				},
				{
					UserAvater:"https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
					UserChatName:"Imaginarie",
					LastMessage:"餐以送达",
					ChatingTime:"17:55"
				}
				],
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.ChatingName{
	position: relative;
	width: 65%;
	margin-top: 2%;
	font-size: 35rpx;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	word-break: break-all;
	text-overflow:ellipsis;
	overflow: hidden;
}
.ChatingEndWord{
	color: #cecece;
	font-size: 27rpx;
	margin-top: 1%;
	width: 80%;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	word-break: break-all;
	text-overflow:ellipsis;
	overflow: hidden;
}
</style>
