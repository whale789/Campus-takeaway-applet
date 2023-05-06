'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	let Address=event.Address;
	let Doorplate=event.Doorplate;
	let Contact=event.Contact;
	let Phone=event.Phone;
	let Possessor=event.Possessor;
	let gender=event.gender;
	
	let res=await db.collection("UserAddress").add({
		Address:Address,
		Doorplate:Doorplate,
		Contact:Contact,
		Phone:Phone,
		Possessor:Possessor,
		gender:gender
	})
	return res
};
