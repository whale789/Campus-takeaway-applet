<template>
	<view style="background-color: #ffffff;">
		<view style="width: 25%;background-color:#ececec;margin-top:20rpx;" :style="'height:'+this.viewclass+'px'">
			<view style="height: 8%;font-size: 15px;font-weight: bold;text-align: center;line-height: 380%;">
				学生餐厅
			</view>
			<view style="height: 8%;font-size: 15px;font-weight: bold;text-align: center;line-height: 380%;background-color:#ffffff;">
				精致奶茶
			</view>
			<view style="height: 8%;font-size: 15px;font-weight: bold;text-align: center;line-height: 380%;"> 
				优质水果
			</view>
			<view style="height: 8%;font-size: 15px;font-weight: bold;text-align: center;line-height: 380%;">
				特色糕点
			</view>
			<view style="height: 8%;font-size: 15px;font-weight: bold;text-align: center;line-height: 380%;">
				地方小吃
			</view>
			<view style="height: 8%;font-size: 15px;font-weight: bold;text-align: center;line-height: 380%;">
				优惠套餐
			</view>
			<view style="height: 8%;font-size: 15px;font-weight: bold;text-align: center;line-height: 380%;">
				美味面食
			</view>
		</view>
		
		
		<!-- <view>
			<componentA>
				<text slot="ts">555</text>
			</componentA>
		</view> -->
	</view>
	
	
</template>

<script>
	// import componentA from './componentA.vue'
	export default {
		data() {
			return {
				viewclass:null
			};
		},
		// components:{
		// 	componentA
		// },
		onLoad(opt) {
			this.viewclass = uni.getSystemInfoSync().windowHeight
		}
	}
	
</script>

<style lang="scss">

</style>
