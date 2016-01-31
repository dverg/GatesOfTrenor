'use strict'

const Hapi = require('hapi');
const Good = require('good');

const server = new Hapi.Server();
server.connection({
		host: 'localhost',
		port: 8000
});

// Routes (more to come)
server.route({
		method: 'GET',
		path: '/deck/card/draw/{num?}',
		handler: function(request, reply){
				var cards = [];
				const drawNum = request.params.num ?
						request.params.num :
						1;
				for( var i=0; i < drawNum; i++ ) {
						cards.push({
								title: "Random card",
								cardId: Math.ceil(Math.random()*56),
								strength: Math.ceil(Math.random()*10),
								speed: Math.ceil(Math.random()*10),
						});
				}
				reply(cards);
		}
});

// Views served from here
server.register(require('vision'), (err) => {
		if(err){
				throw err;
		}

		server.views({
				engines: {
						html: require('handlebars')
				},
				path: 'views'
			});
});

// Static files served from here
server.register(require('inert'), (err) => {
		if (err){
				throw err;
		}

		server.route({
				method: 'GET',
				path: '/',
				handler: function(request, reply){
						return reply.file('views/index.html');
				}
		});
		server.route({
				method: 'GET',
				path: '/static/3rd/b/{file*}',
				handler: {
						directory: {
								path: 'bower_components'
						}
				}
		});
		server.route({
				method: 'GET',
				path: '/static/{file*}',
				handler: {
						directory: {
								path: 'static'
						}
				}
		});
});
// End inert

server.register({
		register: Good,
		options: {
				reporters: [{
						reporter: require('good-console'),
						events: {
								response: '*',
								log: '*'
						}
				}]
		}
}, (err) => {
		if (err) {
				throw err;
		}

		server.start(() => {
				console.log('info', 'Server running at :', server.info.uri);
		});
});

