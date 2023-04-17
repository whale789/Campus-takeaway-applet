'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	var Account=event.Account;
	let PassWord=event.PassWord;
	let name=event.name;
	let EmployeeNumber=event.EmployeeNumber;
	let WorkWithHistory=event.WorkWithHistory;
	var AccountState=event.AccountState;
	var LoginState=event.LoginState;
	let SecretQuestion=event.SecretQuestion;
	let SecretAnswer=event.SecretAnswer;
	let RegistrationTime=event.RegistrationTime;
	let res=await db.collection("Managers").add({
		Account:Account,
		PassWord:PassWord,
		name:name,
		EmployeeNumber:EmployeeNumber,
		WorkWithHistory:WorkWithHistory,
		AccountState:AccountState,
		LoginState:LoginState,
		SecretQuestion:SecretQuestion,
		SecretAnswer:SecretAnswer,
		RegistrationTime:RegistrationTime
	})
	return res
};
