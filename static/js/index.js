// Requires JQuery
var init = function($){
		var initContextMenu = function(cssDescriptor){
			var menu = $(cssDescriptor);
			$(this).click(function(event){
					menu.attr(mouseOverAttrName, 'true');
					menu.css('display', 'inline-block')
							.position({
							my: "left-6 top-3",
							of: event,
							collision: "fit"
						  });
			});

			var mouseOverAttrName = 'data-mouseover';
			menu.mouseleave(function(){
					menu.attr(mouseOverAttrName, 'false');
					setTimeout(function(){
							var isOver = menu.attr(mouseOverAttrName);
							if( isOver === 'false' ) {
									menu.hide();
							}
					}, 900);
			});
			menu.mouseenter(function(){
					menu.attr(mouseOverAttrName, 'true');
			});
		};

		var source = $("#hand-card-template").html();
		var template = Handlebars.compile(source);

		var handCards = $.get('/deck/card/draw/5', function(data){
			var context = {hcl: data};
			var html = template(context);
			$("#hand-grid-placeholder").html(html);
			
			$("#hand-grid-placeholder .card").each(function(){
				initContextMenu('#hand-card-menu');
				$(this).draggable();
			});
		});
}
