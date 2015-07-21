Zepto(function($) {
	/**
	 * 显示或隐藏编辑页面方法
	 */
	function wrapperToggle(){
		var time=500;
		//获取编辑页面容器
		var $wrapper=$("#edit-wrapper");
		if($wrapper.css("display")==="none"&&$(this).hasClass("fa-pencil")){
			$("#bill-wrapper").hide();
			$wrapper.slideDown(time);
			$(".header").css({
				"background-color":"#eee",
				"color":"#999"
			});
			$(".header span").text("记一笔")
			$("#menu-toggle").removeClass("fa-bars");
			$("#menu-toggle").addClass("fa-times");
		}
		else{
			$wrapper.slideUp(time);
			$(".header").css({
				"background-color":"#8ed498",
				"color":"#fff"
			});
			$(".header span").text("记账本");
			setTimeout(function(){
				$("#bill-wrapper").show();
			},time);
		}
		$(".header .fa-pencil").toggle();
		$(".header .btn-publish").toggle();
	}
	//展开菜单
	$("#menu-toggle").on("tap click", function() {
		var $menu = $(".menu");
		if ($("#bill-wrapper").css("display")!=="none") {
			$menu.slideToggle(300);
		}
		//隐藏编辑页面
		if($("#edit-wrapper").css("display")!=="none"){
			wrapperToggle();			
		}
		$(this).toggleClass("fa-bars");
		$(this).toggleClass("fa-times");
	});
	//显示编辑页面
	$(".fa-pencil").on("tap click",wrapperToggle);
})