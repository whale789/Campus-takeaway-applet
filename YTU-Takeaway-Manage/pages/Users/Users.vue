<template>
	<view>
		<view>
			<view>
				<uni-segmented-control :current="current" :values="items" style-type="text"
					active-color="#007aff" @clickItem="onClickItem" />
			</view>
			<view>
				<view v-if="current === 0">
					<!-- <text class="content-text">选项卡1的内容</text> -->
					<uni-list :border="true">
						<uni-list-chat  title="uni-app" avatar="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" note="您收到一条新的消息" time="2020-02-02 20:20" ></uni-list-chat>
						<uni-list-chat  title="uni-app" avatar="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" note="您收到一条新的消息" time="2020-02-02 20:20" ></uni-list-chat>
					</uni-list>
				</view>
				<view v-if="current === 1">
					<uni-list :border="true">
						<uni-list-chat  title="uni-app" avatar="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" note="您收到一条新的消息" time="2020-02-02 20:20" ></uni-list-chat>
						<uni-list-chat  title="uni-app" avatar="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" note="您收到一条新的消息" time="2020-02-02 20:20" ></uni-list-chat>
					</uni-list>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				items: ['学生', '商家',],
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
		}
	}
</script>

<style>

</style>
