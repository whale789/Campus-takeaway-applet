'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	
	let StoreId=event.StoreId;
	let Account=event.Account;
	let res=await db.collection("MerchantCollection").where({
		StoreId:StoreId,
		Account:Account
	}).get()
	return res
};
