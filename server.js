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
		path: '/XX', // TODO
		handler: function(request, reply){
				// TODO No view yet.
				return reply.view('xx');
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
				path: '/static/3rd/{file*}',
				handler: {
						directory: {
								path: 'bower_components'
						}
				}
		});

});

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

