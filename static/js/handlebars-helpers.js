var registerHandleBarsHelpers = function(Handlebars){
	Handlebars.registerHelper('list', function(items, options){
			var count = items.length;
			var out = '<div class="pure-g road-grid">';

			for(var i=0; i<count; i++) {
					out = out + '<div class="pure-u-1 pure-u-md-1-' + count + ' card-slot">';
					out = out + options.fn(items[i]) + '</div>';
			}
			return out + '</div>';
	});
}
