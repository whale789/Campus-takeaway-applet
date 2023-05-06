'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	var Account=event.Account;
	let Password=event.Password;
	let res=db.collection("Managers").where({
		Account:Account
	}).update({
		PassWord:Password
	})
	return{
		msg:"修改成功",
		res
	}
};
