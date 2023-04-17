<template>
	<view>
		<uni-search-bar placeholder="请输入商家或者产品名称" bgColor="#ffffff" @confirm="search"/>
		<view>
			<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode" :dots-styles="dotsStyles">
				<swiper class="swiper-box" @change="change">
					<swiper-item v-for="(item ,index) in info" :key="index">
						<view class="swiper-item">
							{{item.content}}
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view style="font-size: 25px;font-weight: bold;margin-left: 3%;margin-top: 10px;">所有商家</view>
		<view style="display: flex;margin-left: 4%;margin-top: 5px;font-size: 13px;">
			<view style="flex-direction: row;">销量高</view>
			<view style="flex-direction: row;margin-left: 3%;">好评优先</view>
		</view>
		<view style="width: 100%;margin-top: -7px;">
			<uni-card :is-shadow="true" @click="onClick">
				<view style="display: flex;width: 100%; margin-left: -3%;">
					<image style="width: 23%;height: 80px;" 
					src="../../static/images/Classify-active.png"></image>
					<view style="flex-direction:row;width: 76%;margin-left: 4%;margin-top: 5px;">
						<view style="height: 22px;font-weight:bold;font-size: 35rpx;margin-left: 2px;">
							商家店名
						</view>
						<view style="display: flex;margin-top: 3px;">
							<uni-icons type="star-filled" size="15" color="#ffaa00"></uni-icons>
							<view style="flex-direction: row;font-size: 25rpx;">4.6</view>
							<view style="flex-direction: row;margin-left: 5%;font-size: 25rpx;">月售:</view>
							<view style="flex-direction: row;font-size: 25rpx;">1000+</view>
						</view>
						<view style="display: flex;margin-left: 2px;">
							<view style="flex-direction: row;font-size: 25rpx;">起送:</view>
							<view style="flex-direction: row;font-size: 25rpx;">￥18</view>
							<view style="flex-direction: row;font-size: 25rpx;margin-left: 5%;">配送:</view>
							<view style="flex-direction: row;font-size: 25rpx;">￥5</view>
						</view>
					</view>
				</view>
			</uni-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: [
				{content: '内容 A'}, 
				{content: '内容 B'}, 
				{content: '内容 C'},
				],
				current: 0,
				mode: 'round',
				dotsStyles:{
					backgroundColor: 'rgba(83, 200, 249,0.3)',
					border: '1px rgba(83, 200, 249,0.3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
					selectedBorder: '1px rgba(83, 200, 249,0.9) solid'
				},
				avatar: 'https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png',
				title:"山西刀削面"

			}
		},
		methods:{
			change(e) {
				this.current = e.detail.current;
			}
		}
	}
</script>

<style lang="scss">
	.search-result {
		padding-top: 10px;
		padding-bottom: 20px;
		text-align: left;
	}
</style>
