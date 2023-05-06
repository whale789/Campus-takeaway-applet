'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let OrderId=event.OrderId;
	let res=await db.collection("orders").where({
		_id:OrderId
	}).get()
	return res
};
