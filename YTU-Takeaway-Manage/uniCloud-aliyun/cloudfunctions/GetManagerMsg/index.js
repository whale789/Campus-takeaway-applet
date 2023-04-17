'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	var Account=event.Account;
	// console.log(event);
	let res=await db.collection("Managers").where({
		Account:Account
	}).get()
	return res
};
