/**
 * FileName:page.js
 * Description:页面之间的切换动画以及元素的展示和隐藏。
 */
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
			$(".menu").hide();
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
	$("#menu-toggle").on("tap", function() {
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
	$(".fa-pencil").on("tap",wrapperToggle);

    function getEditPanelWidth(el) {
        var income, payment;

        income = $(el).find(".income");
        if (income.length === 0) {
            payment = $(el).find(".payment");
        }

        return (payment || income).position().left;
    };

    var editPanelHtml = "<i class=\"fa fa-pencil\"></i><i class=\"fa fa-trash-o\"></i>";
    $(".bill .edit").each(function() {
        $(this).html(editPanelHtml);
        $(this).css("width", getEditPanelWidth($(this).prev()[0]));
    });

    //滑动
    var startX, currX;
    $(".bill .item").on("touchmove", function(e) {
        e.preventDefault();
        currX = e.changedTouches[0].pageX;
        if (currX < startX) {
            $(this).addClass("displayEdit")
            // towards left
            $(this).animate({"margin-left": -getEditPanelWidth(this)}, "slow");
        }
        else {
            $(this).removeClass("displayEdit");
            //towards right
            $(this).animate({"margin-left": 0}, "slow");
        }
    });
    $(".bill .item").on("touchstart", function(e) {
        e.preventDefault();
        startX = e.changedTouches[0].pageX;
    });
    //显示项目金额输入区域
    $(".row").on("tap",function(e){
    	var parent=$(e.target).parent();
    	if(parent[0].tagName.toLowerCase()==="li"){
    		var $input=$(".input-area");
    		$input.children("i")[0].className=parent.children("i")[0].className;
    		$input.children("span").text(parent.children("span").text());
    		$(".txt-amount").val('');
    		$input.show();
    		$(".txt-amount").trigger("focus");
    	}
    });
    //隐藏项目金额输入区域
    $(".txt-amount").on("blur",function(){
    	$(".input-area").hide();
    });
})