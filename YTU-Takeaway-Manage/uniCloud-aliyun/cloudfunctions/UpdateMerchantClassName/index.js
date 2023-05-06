'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let StoreId=event.StoreId;
	let ClassId=event.ClassId;
	let ClassName=event.ClassName;
	let res=await db.collection("Restaurant").where({
		_id:StoreId,
		'GoodsClass.ClassID':ClassId
	}).update({
		'GoodsClass.$.ClassName':ClassName
	})
	return res
};
