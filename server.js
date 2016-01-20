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
		path: '/',
		handler: function(request, reply){
				return reply('Hello æ <');
		}
});

// Static files served from here
server.register(require('inert'), (err) => {
		if (err){
				throw err;
		}

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

