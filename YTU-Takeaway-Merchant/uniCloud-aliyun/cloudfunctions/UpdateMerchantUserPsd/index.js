'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let Account=event.Account;
	let Password=event.Password;
	let res=db.collection("MerchantUsers").where({
		Account:Account
	}).update({
		PassWord:Password
	})
	return{
		msg:"修改成功",
		res
	}
};
