'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let res=await db.collection("Audit").get();
	return res
};
