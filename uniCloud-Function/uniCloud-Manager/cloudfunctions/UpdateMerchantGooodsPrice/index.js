'use strict';

const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let StoreId=event.StoreId;
	let ClassId=event.ClassId;
	let GoodsId=event.GoodsId;
	var GoodsPrice=parseFloat(event.GoodsPrice);
	var index=event.index;
	var index0=event.index0;
	let res=await db.collection("Restaurant").where({
		_id:StoreId,
	}).update({
		['GoodsClass.'+index]:{
			['GoodsDetail.'+index0]:{
				GoodsPrice:GoodsPrice
			}
		}
	})
	return res
};
