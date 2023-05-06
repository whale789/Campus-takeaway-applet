'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let StoreId=event.StoreId;
	let ClassId=event.ClassId;
	let GoodsId=event.GoodsId;
	let GoodsName=event.GoodsName;
	var index=event.index;
	var index0=event.index0;
	let res=await db.collection("Restaurant").where({
		_id:StoreId,
		// 'GoodsClass.ClassID':ClassId,
		// 'GoodsClass.GoodsDetail.GoodsId':GoodsId
	}).update({
		['GoodsClass.'+index]:{
			['GoodsDetail.'+index0]:{
				GoodsName:GoodsName
			}
		}
	})
	return res;
};
