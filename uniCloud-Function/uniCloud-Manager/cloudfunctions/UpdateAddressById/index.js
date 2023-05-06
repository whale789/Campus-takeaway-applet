'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	
	let AddressId=event.AddressId;
	let Address=event.Address;
	let Doorplate=event.Doorplate;
	let Contact=event.Contact;
	let Phone=event.Phone;
	let gender=event.gender;
	let res=db.collection("UserAddress").where({
		_id:AddressId
	}).update({
		Address:Address,
		Doorplate:Doorplate,
		Contact:Contact,
		Phone:Phone,
		gender:gender
	})
	return res
};