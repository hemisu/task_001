//FileName:page.js
//Description:页面之间的切换动画以及元素的展示和隐藏。

/**
 * 显示或隐藏编辑页面方法
 */
function wrapperToggle() {
	var time = 500;
	//获取编辑页面容器
	var $wrapper = $("#edit-wrapper");
	if ($wrapper.css("display") === "none" && $(this).hasClass("fa-pencil")) {
		$("#bill-wrapper").hide();
		$(".menu").hide();
		$wrapper.slideDown(time);
		$(".header").css({
			"background-color": "#eee",
			"color": "#999"
		});
		$(".header span").text("记一笔")
		$("#menu-toggle").removeClass("fa-bars");
		$("#menu-toggle").addClass("fa-times");
	} else {
		$wrapper.slideUp(time);
		$(".header").css({
			"background-color": "#8ed498",
			"color": "#fff"
		});
		$(".header span").text("记账本");
		$(".calc").hide();
		setTimeout(function() {
			$("#bill-wrapper").show();
		}, time);
		$("#menu-toggle").toggleClass("fa-bars");
		$("#menu-toggle").toggleClass("fa-times");
	}
	$(".header .fa-pencil").toggle();
}

/**
 * 显示项目金额输入键盘
 */
function showCalculator(icon, childCate, amount) {
  var $input = $(".input-area");
  $input.children("i").attr("class", icon);
  $input.children("span").text(childCate);
  $(".txt-amount").val(amount);
  $(".calc").show();
  $(".txt-amount").triggerHandler("focus");
}

Zepto(function($) {

  //展开菜单
  $("#menu-toggle").on("tap", function() {
    var $menu = $(".menu");
    if ($("#bill-wrapper").css("display") !== "none") {
      $menu.slideToggle(300);
      $(this).toggleClass("fa-bars");
      $(this).toggleClass("fa-times");
    }
    //隐藏编辑页面
    if ($("#edit-wrapper").css("display") !== "none") {
      wrapperToggle();
    }
  });
  //显示编辑页面
  $(".fa-pencil").on("tap", wrapperToggle);

  //显示项目金额输入区域
  $("#edit-wrapper .row").on("tap", function(e) {
    var parent = $(e.target).parent();
    if (parent[0].tagName.toLowerCase() === "li") {
      showCalculator(parent.children("i").attr("class"), parent.children("span").text(), '');
    }
  });
})