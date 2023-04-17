<template>
	<view>
		<view style="background-color: #0099FF;">
			<!-- <view style="text-align: center;font-size: 20px;height: 100px;line-height: 155px;">我的</view> -->
			<view style="margin-left: 2%;display: flex;">
				<view style="flex-direction: row;margin-top: 20px;">
					<uni-file-picker limit="1" :del-icon="false" disable-preview="false" :imageStyles="imageStyles"
						file-mediatype="image">
						<image src="../../static/images/avater-default.png" style="background-color: white;" mode="aspectFit"></image>
					</uni-file-picker>
				</view>
				<view style="flex-direction: row;width: 100%;margin-top: 20px;margin-left: 3%;">
					<view style="height: 30px;width: 100%; font-weight:bold;font-size: 18px; margin-top: 2%;margin-left: 3%;">
						用户名称
					</view>
					<view style="margin-left: 3%;font-size: 15px;display: flex;margin-top: 7px;">
						15130380905
						<view style="flex-direction: row;margin-left: 5%;display: flex;width: 23%;
						border-radius: 20px;background-color: #ebebeb;background: rgba(0,0,0,0.2);">
							<uni-icons type="compose" style="margin-left: 10%;size: 5;"></uni-icons>
							<view style="flex-direction: row;margin-left: 5%;width: 30px;font-size: 12px;line-height: 20px;">修改</view>
						</view>
					</view>
				</view>
			</view>
			<view style="height: 20px;"></view>
		</view>
		
		<view style="display: flex;flex-direction: column;">
			<view style="margin-left: 3%;width: 100%;height: 45px;">
				<view style="margin-top: 12px;font-size: 17px;">
					<uni-icons type="location" size="20"></uni-icons>
					我的地址
					<uni-icons type="forward" style="margin-left: 65%;"></uni-icons>
				</view>
			</view>
			<view style="border-bottom:1px solid #e7e7e7;width: 100%;"></view>
			<view style="margin-left: 3%; width: 100%;height: 45px;">
				<view style="margin-top: 12px;font-size: 17px;">
					<uni-icons type="star" size="20"></uni-icons>
					我的收藏
					<uni-icons type="forward" style="margin-left: 65%;"></uni-icons>
				</view>
			</view>
			<view style="border-bottom:1px solid #e7e7e7;width: 100%;"></view>
			<view style="margin-left: 3%; width: 100%;height: 45px;">
				<view style="margin-top: 12px;font-size: 17px;">
					<uni-icons type="list" size="20"></uni-icons>
					我的订单
					<uni-icons type="forward" style="margin-left: 65%;"></uni-icons>
				</view>
			</view>
			<view style="border-bottom:1px solid #e7e7e7;width: 100%;"></view>
			<view style="margin-left: 3%; width: 100%;height: 45px;">
				<view style="margin-top: 12px;font-size: 17px;">
					<uni-icons type="chat" size="20"></uni-icons>
					我的评价
					<uni-icons type="forward" style="margin-left: 65%;"></uni-icons>
				</view>
			</view>
			<view style="border-bottom:1px solid #e7e7e7;width: 100%;"></view>
			<view style="margin-left: 3%; width: 100%;height: 45px;">
				<view style="margin-top: 12px;font-size: 17px;">
					<uni-icons type="headphones" size="20"></uni-icons>
					客服反馈
					<uni-icons type="forward" style="margin-left: 65%;"></uni-icons>
				</view>
			</view>
			<view style="border-bottom:1px solid #e7e7e7;width: 100%;"></view>
			<view style="margin-left: 3%; width: 100%;height: 45px;">
				<view style="margin-top: 12px;font-size: 17px;">
					<uni-icons type="shop" size="20"></uni-icons>
					商家入驻
					<uni-icons type="forward" style="margin-left: 65%;"></uni-icons>
				</view>
			</view>
			<view style="border-bottom:1px solid #e7e7e7;width: 100%;"></view>
		</view>
		
	</view>
	<view style="text-align: center;height: 40px;margin-top: 25px;background-color: white;">
		<view style="line-height: 40px;">
			退出登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageStyles: {
					width: 80,
					height: 80,
					border: {
						radius: '50%'
					}
				},

			};
		}
	}
</script>

<style lang="scss">

</style>
