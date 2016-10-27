require.config({
	paths: {
		jquery: "../../libs/jquery",
		swiper: "../../plugs/swiper.min",
		diqu: "../js/diqu2",
		commonObj: "../js/commonobj"
	}
})
require(['jquery', 'swiper', 'commonObj', 'diqu'], function($, swiper, commonObj, diqu) {
	$(function() {
		var topSlider = new Swiper('#topSlider', {
			slidesPerView: 1,
			centeredSlides: true,
			autoplay: 3000,
			loop: true,
			autoplayDisableOnInteraction: true
		});
		commonObj.loadCanvas();
		commonObj.set_address();
		$(window).scroll(commonObj.scrollHandler);
		$("#productul").on("touchmove", commonObj.scrollHandler);
		$(".add").on("click", commonObj.addnums);
		$(".reduce").on("click", commonObj.reducenums);
		$(".addcart").on("click", commonObj.addcartAnimate);
		if($(".cartnums").val() < 1) {
			$(".cartnums").hide();
		} else {
			$(".cartnums").show();
		}
		//购物车小计与总价
		var totalPrice = 0;
		$('.itnums').each(function() {
			var item = $(this).val() * $(this).parents('li').find('.danjia').data('price');
			totalPrice += item;
		});
		$('#totalPrice').text("￥" + totalPrice);
		$('.itnums').on('change', function() {
			var $danjia = $(this).parents('li').find('.danjia');
			//单项商品的单价
			var itemPrice = $danjia.data('price');
			var itemTotal = itemPrice * $(this).val();
			$danjia.text("￥" + itemTotal);
			var totalPrice = 0;
			$('.itnums').each(function() {
				var item = $(this).val() * $(this).parents('li').find('.danjia').data('price');
				totalPrice += item;
			});
			$('#totalPrice').text("￥" + totalPrice);
		});
		$(".delbtn").on("click", function() {
			$(this).parents("li").remove();
			if($(".cartlist").children("li").length < 1) {
				$(".cartlist").hide();
				$(".onthebottom").hide();
				$(".null_shopping").show();
			}
		})
		//清空购物车
		$(".clearcart").on("click", function() {
			$(".cartlist").find("li").each(function() {
				$(this).remove();
			});
			$(".cartlist").hide();
			$(".onthebottom").hide();
			$(".null_shopping").show();
		})
		
		if($("select[name='sheng']").length > 0) {
			new PCAS("sheng", "shi", "qu", "", "", "");
		}
		$('input[name=address_options]').change(function() {
			if($(this).val() == 0) {
				$('#address_form').show();
			} else {
				$('#address_form').hide();
			}
		});
		$(".ifvoicenot").on("click", function() {
			$(this).parent().next().toggle();
		});

		$(".address_item").on("click", function() {
			$(this).children().eq(0).children().eq(0).attr('checked', 'checked')
			commonObj.set_address();
		});

		$("#addresslist").on("click", ".delete", function() {
			$(this).parents("li").remove();

		})
		$("#addresslist").on("click", ".edit", commonObj.address_huitian);
		$(".submit_address").on("click", commonObj.addAddresslist);
		$(".order_action_cancel").on("click", function() {
			$(this).parents(".order_form").remove();
			if($(".order_form").length < 1) {
				$(".null_order").show();
			}
		})

		$("#login_user").on("click", commonObj.loginin);

	})
})