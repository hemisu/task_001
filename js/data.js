//FileName:data.js
//Description:处理数据的增删改查
//----------------------------------------我是分隔线-------------------------
/*
 * id:分类ID
 * name:分类名称
 */
var categories = [{
	id: 0,
	name: "收入"
}, {
	id: 1,
	name: "支出"
}];
/*
 * id:子分类ID
 * name:子分类名称
 * className:子分类对应的类名
 * pid:分类ID
 */
var childCate = [{
	id: 0,
	name: "收入",
	className: "fa fa-usd",
	pid: 0
}, {
	id: 1,
	name: "住宿",
	className: "fa fa-home",
	pid: 1
}, {
	id: 2,
	name: "衣服",
	className: "fa fa-female",
	pid: 1
}, {
	id: 3,
	name: "饮食",
	className: "fa fa-coffee",
	pid: 1
}, {
	id: 4,
	name: "交通",
	className: "fa fa-plane",
	pid: 1
}, {
	id: 5,
	name: "购物",
	className: "fa fa-shopping-cart",
	pid: 1
}, {
	id: 6,
	name: "其它",
	className: "fa fa-heart",
	pid: 1
}];
/*
 * id:账单id
 * childID:子分类ID
 * money:金额
 * date:账单建立日期
 * isDeleted:标识是否已经删除
 */
var billList = [{
	id: 0,
	childCateID: 0,
	money: 1000,
	date: "15/7/21",
	isDeleted:false
}, {
	id: 1,
	childCateID: 4,
	money: 400,
	date: "15/7/21",
	isDeleted:true
}];
/**
 * 使用函数构造账单项目对象
 * @param {int} id
 * @param {int} childCateID
 * @param {float} money
 * @param {Date} date
 */
function item(id,childCateID,money,date){
	this.id=id;
	this.childCateID=childCateID;
	this.money=money;
	this.date=date;
	this.isDeleted=false;
}
//----------------------------------------我是分隔线-------------------------
/**
 * 根据id从查询对应的子分类
 * @param {int} id
 * @return {Object} category
 */
function getChildCateByID(id) {
	for (var i = 0; i < childCate.length; i++) {
		if (childCate[i].id === id) {
			return childCate[i];
		}
	}
}
/**
 * 根据父分类ID返回子分类集合
 * @param {int} pid
 * @return {Array<Object>} arr<category>
 */
function getChildCateByPID(pid) {
		var arr = new Array();
		for (var i = 0; i < childCate.length; i++) {
			if (childCate[i].pid === pid) {
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
function getChildCateByName(name) {
		var arr = new Array();
		for (var i = 0; i < childCate.length; i++) {
			if (childCate[i].name === name) {
				return childCate[i];
			}
		}
}
/**
 * 根据id获取账单项目
 * @param {int} id
 * @return {Object} item
 */
function getItemByID(id){
	for(var i=0;i<billList.length;i++){
		if(billList[i].id===id){
			return billList[i];
		}
	}
}
/**
 * 显示子分类图标
 */
function showChildCate() {
		var html = '';
		for (var i = 0; i < categories.length; i++) {
			var childs = getChildCateByPID(categories[i].id);
			html += '<ul class="row clearfix">';
			for (var j = 0; j < childs.length; j++) {
				if (j !== 0 && j % 4 === 0) {
					html += '</ul><ul class="row clearfix">';
				}
				html += '' + '<li>' + '<i class="' + childs[j].className + '"></i>' + '<span>' + childs[j].name + '</span>' + '<li>';
			}
			html += "</ul>";
		}
		$("#edit-wrapper").html(html);
	}
/**
 * 显示账单列表
 */
function showBillList() {
	var html = '';
	for (var i = 0; i < billList.length; i++) {
		if(!billList[i].isDeleted){
			var child = getChildCateByID(billList[i].childCateID);
			var fontColor = child.pid === 0 ? "income" : "payment";
			html += '' 
			+ '<li id=' + billList[i].id + '>' 
			+ 	'<div class="item">' 
			+ 		'<i class="' + child.className + '"></i>' 
			+ 		'<span class="cate">' + child.name + '</span>' 
			+ 		'<span class=' + fontColor + '>' + billList[i].money + '</span>' 
			+ 		'<span class="date">' + billList[i].date + '</span>' 
			+ 	'</div>' 
			+ 	'<div class="edit"></div>' 
			+ '</li>';
		}
		
	}

	$("#bill-wrapper .bill").html(html);

	addEditPanelToBillItems();
}

var _editPanelWidth; // protected variable indicating the width of editPanel of bill item
/**
 * 添加收支条目编辑界面(修改金额/删除)
 */
function addEditPanelToBillItems() {
	function getEditPanelWidth(el) {
		var income, payment;

		income = $(el).find(".income");
		if (income.length === 0) {
			payment = $(el).find(".payment");
		}

		return (payment || income).position().left;
	};

	var editPanelHtml = "<i class=\"fa fa-pencil modify\"></i><i class=\"fa fa-trash-o delete\"></i>";
	$(".bill .edit").each(function() {
		$(this).html(editPanelHtml);
		_editPanelWidth = _editPanelWidth || getEditPanelWidth($(this).prev()[0]);
		$(this).css("width", _editPanelWidth);
	});

	//编辑事件
	$(".edit .delete").on("tap click", function() {
		deleteItem(parseInt($(this).parent().parent().attr('id'), 10));
		showBillList();
	});

	$(".edit .modify").on("tap click", function() {
		var $item = $(this).parent().prev(), amount;
		if ($item.length > 0) {
			amount = ($item.children(".payment").length > 0) ? 
						$item.children(".payment").text() : $item.children(".income").text();

			showCalculator($item.children("i").attr("class"), $item.children(".cate").text(), amount, $item.parent().attr('id'));
		}
	});

	//滑动
	var startX, currX;
	$(".bill .item").on("touchmove", function(e) {
		e.preventDefault();
		currX = e.changedTouches[0].pageX;
		if (currX < startX) {
			$(this).addClass("displayEdit")
				// towards left
			$(this).animate({
				"margin-left": -getEditPanelWidth(this)
			}, "slow");
		} else {
			$(this).removeClass("displayEdit");
			//towards right
			$(this).animate({
				"margin-left": 0
			}, "slow");
		}
	});
	$(".bill .item").on("touchstart", function(e) {
		e.preventDefault();
		startX = e.changedTouches[0].pageX;
	});
}

/**
 * 添加新的账单项目 
 */
function addItem(){
	var id=billList[billList.length-1].id+1;
	var childCate=getChildCateByName($(".input-area").children("span").text());
	var money=$(".txt-amount").val();
	var today=new Date();
	var date=(today.getFullYear()%100)+"/"+(today.getMonth()+1)+"/"+today.getDate();
	var newItem=new item(id,childCate.id,money,date);
	billList.push(newItem);
	save();
	alert("添加成功");
}

/**
 * 软删除一个收支条目
 */
function deleteItem(id){
	if (id < 0 || id >= billList.length) {
		return false;
	}
	var item = getItemByID(id);
	if (item && !item.isDeleted) {
		item.isDeleted = true;
		save();
		alert("删除成功");
		return true;
	}

	return false;
}

/**
 * 修改一个收支条目的金额
 */
function editItem(id, money){
	if (id < 0 || id >= billList.length) {
		return false;
	}

	var item = billList[id];
	if (item && item.money !== money) {
		item.money = money;
		save();
		alert("修改成功");
		return true;
	}

	return false;
}
/**
 * 计算器键盘点击事件处理
 */
var result = "";
$(".keyboard").on("tap", function(e) {
	var $target = $(e.target);
	if ($target[0].tagName.toLowerCase() === "td"||$target.parent("td").length>0) {
		var $amount = $(".txt-amount");
		var $toggle = $("#toggle-save");
		if (RegExp("[0-9]").test($target.text())) {
			if ($target.text() === "0" && $amount.val().length < 1) {
				return;
			}
			$amount.val($amount.val() + $target.text());
		} else if ($target.text().toLowerCase() === "c") {
			$amount.val("");
			result = "";
		} else if ($target.text() === "+" && $amount.val().length > 0) {
			result += $amount.val();
			result += "+";
			$toggle.text("=");
			$toggle.css("color","#000");
			$amount.val("");
		} else if ($target.text() === "-" && $amount.val().length > 0) {
			result += $amount.val();
			result += "-";
			$toggle.text("=");
			$toggle.css("color","#000");
			$amount.val("");
		} else if ($target.text() === "=") {
			result += $amount.val();
			$amount.val(eval(result));
			$toggle.text("OK");
			$toggle.css("color","#e66b14");
			result = "";
		} else if ($target.text() === "OK") {
			var amount = eval($amount.val()), $item;
			if (amount && (amount * 100 === Math.floor(amount * 100))) {
				if ($("#edit-wrapper").css("display") !== "none") {
					addItem();
					wrapperToggle();
					showBillList();
				}
				else {
					var itemId = ($(this).parent().attr("id") || '').split('-')[2] || 0;
					if (editItem(itemId, amount)) {
						$(".calc").hide();
						$item = $("#" + itemId).children(".item");
						if ($item.children(".payment").length > 0) {
							$item.children(".payment").text(amount);
						}
						else {
							$item.children(".income").text(amount);
						}
						$item.css("marginLeft","0");
					}
				}
			}
			else {
				alert("您输入的金额好像不对 >_<");
			}
		} else if ($target.text() === "." && $amount.val().indexOf(".") < 0) {
			$amount.val($amount.val() + $target.text());
		} else if (($target.children("i").length > 0 && $target.children("i").hasClass("fa-long-arrow-left"))||$target.hasClass("fa-long-arrow-left")) {
			$amount.val($amount.val().substr(0, $amount.val().length - 1));
		}
	}
});
/*
 * 使用localStorage保存数据
 */
function save(){
	localStorage.setItem("categories",JSON.stringify(categories));
	localStorage.setItem("childCate",JSON.stringify(childCate));
	localStorage.setItem("billList",JSON.stringify(billList));
}
Zepto(function($) {
	if(!localStorage.getItem("billList")){
		save();
	}
	billList=JSON.parse(localStorage.getItem("billList"));
	categories=JSON.parse(localStorage.getItem("categories"));
	childCate=JSON.parse(localStorage.getItem("childCate"));
	showBillList();
	showChildCate();
})