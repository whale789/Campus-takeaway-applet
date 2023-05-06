'use strict';
const db=uniCloud.database()
const dbcmd=db.command
exports.main = async (event, context) => {
	
	let StoreName=event.StoreName;
	let StorePicture=event.StorePicture;
	var MonthOrders=event.MonthOrders;
	var ComplainNumber=event.ComplainNumber;
	var OverallRate=event.OverallRate;
	let SettledDate=event.SettledDate;
	let Possessor=event.Possessor;
	let PossessorPhone=event.PossessorPhone;
	let GoodsClass=event.GoodsClass;
	
	let GoodsId = new Date().getTime() + Math.random().toString(36).substr(2);
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	var h = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	let ClassID = y + m + d + h + minute + second + Math.random().toString(36).substr(2);00
	var MonthMoney=event.MonthMoney;
	let Address=event.Address;
	var BusinessStatus=event.BusinessStatus;
	var OnboardingStatus=event.OnboardingStatus;
	var AllMoney=event.AllMoney;
	var AllOrders=event.AllOrders;
	let IdentityCardF=event.IdentityCardF;
	let IdentityCardZ=event.IdentityCardZ;
	let LicensePicture=event.LicensePicture;
	let SanitaryPermit=event.SanitaryPermit;
	let BusinessContent=event.BusinessContent;
	let ClassName="默认";
	let res=await db.collection("Restaurant").add({
		StoreName:StoreName,
		StorePicture:StorePicture,
		MonthOrders:MonthOrders,
		ComplainNumber:ComplainNumber,
		OverallRate:OverallRate,
		SettledDate:SettledDate,
		Possessor:Possessor,
		PossessorPhone:PossessorPhone,
		GoodsClass:[
			{
				ClassID:ClassID,
				ClassName:ClassName,
				GoodsDetail:[
					{
						GoodsId:GoodsId,
						GoodsName:"默认",
						GoodsPrice:0,
						GoodsPicture:"../../static/images/DefaultFile.png",
						GoodsSoldNumber:0,
					}
				]
			}
		],
		MonthMoney:MonthMoney,
		Address:Address,
		BusinessStatus:BusinessStatus,
		OnboardingStatus:OnboardingStatus,
		AllMoney:AllMoney,
		AllOrders:AllOrders,
		IdentityCardF:IdentityCardF,
		IdentityCardZ:IdentityCardZ,
		LicensePicture:LicensePicture,
		SanitaryPermit:SanitaryPermit,
		BusinessContent:BusinessContent
	})
	return res
};
