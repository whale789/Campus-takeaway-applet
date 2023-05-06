'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let StoreId=event.StoreId;
	let GoodsId=event.GoodsId;
	let ClassId=event.ClassId;
	let res=await db.collection("Restaurant").where({
		_id:StoreId,
		'GoodsClass.ClassID':ClassId
	}).update({
		'GoodsClass.$.GoodsDetail':dbcmd.pull({
				GoodsId:GoodsId
		})
	})
	
	return res
};
