/**
 * FileName:data.js
 * Description:处理数据的增删该查
 */

/*
 * id:分类ID
 * name:分类名称
 */
var categories=[
	{
		id:0,
		name:"收入"
	},
	{
		id:1,
		name:"支出"
	}
];
/*
 * id:子分类ID
 * name:子分类名称
 * className:子分类对应的类名
 * pid:分类ID
 */
var childCate=[
	{
		id:0,
		name:"收入",
		className:"fa fa-usd",
		pid:0
	},
	{
		id:1,
		name:"住宿",
		className:"fa fa-home",
		pid:1
	},
	{
		id:2,
		name:"衣服",
		className:"fa fa-female",
		pid:1
	},
	{
		id:3,
		name:"饮食",
		className:"fa fa-coffee",
		pid:1
	},
	{
		id:4,
		name:"交通",
		className:"fa fa-plane",
		pid:1
	},
	{
		id:5,
		name:"购物车",
		className:"fa fa-shopping-cart",
		pid:1
	},
	{
		id:6,
		name:"其它",
		className:"fa fa-heart",
		pid:1
	}
];
/*
 * id:账单id
 * childID:子分类ID
 * money:金额
 * date:账单建立日期
 */
var billList=[
	{
		id:0,
		childCateID:0,
		money:1000,
		date:"15/7/21"
	},
	{
		id:1,
		childCateID:4,
		money:400,
		date:"15/7/21"
	}
];
//----------------------------------------我是分隔线-------------------------
/**
 * 根据id从查询对应的子分类
 * @param {int} id
 * @return {Object} category
 */
function getChildCateByID(id){
	for(var i=0;i<childCate.length;i++){
		if(childCate[i].id===id){
			return childCate[i];
		}
	}
}
/**
 * 根据父分类ID返回子分类集合
 * @param {int} pid
 * @return {Array<Object>} arr<category>
 */
function getChildCateByPID(pid){
	var arr=new Array();
	for(var i=0;i<childCate.length;i++){
		if(childCate[i].pid===pid){
			arr.push(childCate[i]);
		}
	}
	return arr;
}
/**
 * 根据名字查询对应的子分类
 * @param {String} name
 * @return {Object} category
 */
function getChildCateByName(name){
	var arr=new Array();
	for(var i=0;i<childCate.length;i++){
		if(childCate[i].name===name){
			return childCate[i];
		}
	}
}
/**
 * 显示子分类图标
 */
function showChildCate(){
	var html='';
	for(var i=0;i<categories.length;i++){
		var childs=getChildCateByPID(categories[i].id);
		html+='<ul class="row clearfix">';
		for(var j=0;j<childs.length;j++){
			if(j!==0&&j%4===0){
				html+='</ul><ul class="row clearfix">';
			}
			html+=''
			+'<li>'
			+	'<i class="'+childs[j].className+'"></i>'
			+	'<span>'+childs[j].name+'</span>'
			+'<li>';
		}
		html+="</ul>";
	}
	$("#edit-wrapper").html(html);
}
/**
 * 显示账单列表
 */
function showBillList(){
	var html='<ul class="bill">';
	for(var i=0;i<billList.length;i++){
		var child=getChildCateByID(billList[i].childCateID);
		var fontColor=child.pid===0?"income":"payment";
		html+=''
		+'<li>'
		+	'<div class="item">'
		+		'<i class="'+child.className+'"></i>'
		+		'<span class="cate">'+child.name+'</span>'
		+		'<span class='+fontColor+'>'+billList[i].money+'</span>'
		+		'<span class="date">'+billList[i].date+'</span>'
		+	'</div>'
		+	'<div class="edit"></div>'
		+'</li>';
	}
	html+="</ul>";
	$("#bill-wrapper").html(html);
}
Zepto(function($){
	showBillList();
	showChildCate();
})
	

