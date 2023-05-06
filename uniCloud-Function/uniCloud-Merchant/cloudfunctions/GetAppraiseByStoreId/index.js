'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let StoreId=event.StoreId;
	let res=await db.collection("Appraise").where({
		StoreId:StoreId
	}).get()
	return res
};
