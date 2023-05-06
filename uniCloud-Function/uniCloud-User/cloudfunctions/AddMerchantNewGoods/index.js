'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let StoreId=event.StoreId;
	let ClassId=event.ClassId;
	let GoodsId=new Date().getTime() + Math.random().toString(36).substr(2);
	let res=await db.collection("Restaurant").where({
		_id:StoreId,
		'GoodsClass.ClassID':ClassId
	}).update({
		'GoodsClass.$.GoodsDetail':dbcmd.push({
				GoodsId:GoodsId,
				GoodsName:"默认",
				GoodsPrice:0,
				GoodsPicture:"../../static/images/DefaultFile.png",
				GoodsSoldNumber:0,
		})
	})
	
	return res
};
