'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let AddressId=event.AddressId;
	let res=await db.collection("UserAddress").where({
		_id:AddressId
	}).get()
	return res
};
