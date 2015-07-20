Zepto(function($) {
	var display = false;
	//展开菜单
	$("#menu-toggle").on("tap", function() {
		var $menu=$(".menu");
		if (!display) {
			$menu.css("display","block");
			$menu.height("50px");
		} else {
			$menu.height("0");
			setTimeout(function(){$menu.css("display","none");},300);
		}
		$(this).toggleClass("fa-bars");
		$(this).toggleClass("fa-times");
		display=!display;
	});
	
})