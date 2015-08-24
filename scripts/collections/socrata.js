var $ = require('jquery'),
	_ = require('underscore'),
	Backbone = require('backbone'),
	soda = require('soda-js');
	
module.exports = Backbone.Collection.extend({
	initialize: function(models, options) {
		// Save config to collection
		options = options || {};
		this.domain = options.domain || null;
		this.consumer = new soda.Consumer(this.domain);
		this.dataset = options.dataset || null;
		this.groupBy = options.groupBy || null;
		this.filter = options.filter || {};
	},
	sync: function(method, model, options) {
		console.log(arguments);
		
		this.consumer.query()
			.withDataset(this.dataset)
			.select('count(*), ' + this.groupBy)
			.where(this.filter)
			.group(this.groupBy)
			.order('count desc')
			.getRows()
			.on('success', options.success)
			.on('error', options.error);
	}
})