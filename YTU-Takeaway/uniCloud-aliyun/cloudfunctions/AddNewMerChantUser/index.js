'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let Avatar=event.Avatar;
	let Account=event.Account;
	let NickName=event.NickName;
	let SecretQuestion=event.SecretQuestion;
	let SecretAnswer=event.SecretAnswer;
	let PassWord=event.PassWord;
	var AccountState=event.AccountState;
	var LoginState=event.LoginState;
	let RunningStoreId=event.RunningStoreId;
	let RunningStore=event.RunningStore;
	let res=await db.collection("MerchantUsers").add({
		Account:Account,
		PassWord:PassWord,
		NickName:NickName,
		AccountState:AccountState,
		LoginState:LoginState,
		SecretQuestion:SecretQuestion,
		SecretAnswer:SecretAnswer,
		Avatar:Avatar,
		RunningStoreId:RunningStoreId,
		RunningStore:RunningStore
	})
	return {
		msg:"注册成功",
		res
	}
};
