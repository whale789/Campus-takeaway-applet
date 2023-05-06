'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let StoreId=event.StoreId;
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	var h = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	var ClassId= y + m + d + h + minute + second + Math.random().toString(36).substr(2);
	var GoodsId=new Date().getTime() + Math.random().toString(36).substr(2);
	let res=await db.collection("Restaurant").where({
		_id:StoreId
	}).update({
		GoodsClass:dbcmd.push({
			ClassID:ClassId,
			ClassName:"默认",
			GoodsDetail:[{
				GoodsId:GoodsId,
				GoodsName:"默认",
				GoodsPrice:0,
				GoodsPicture:"../../static/images/DefaultFile.png",
				GoodsSoldNumber:0,
			}],
		})
	})
	
	return res
};
