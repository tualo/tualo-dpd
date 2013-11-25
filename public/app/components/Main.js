Ext.define('Tualo.app.components.Main', {
	extend: 'Ext.container.Viewport',
	requires: [
		'Ext.panel.Panel',
		'Ext.grid.Panel',
		'Ext.data.Store',
		'Tualo.app.components.Login',
		'Tualo.app.components.Form'
	],
	layout: 'card',
	constructor: function (config) {
		this.callParent([ config ]);
	},
	initComponent: function () {
		var scope =this;
		
		scope.items = [
			scope.LoginForm = Ext.create('Tualo.app.components.Login',{
				listeners: {
					scope: scope,
					loggedin: function(result){
						var scope =this;
						scope.sid = result.sid;
						scope.Grid.sid = scope.sid;
						scope.getLayout().setActiveItem(scope.Grid);
						scope.Grid.load();
					}
				}
			}),
			scope.Grid = Ext.create('Tualo.app.components.Grid',{
				listeners: {
					scope: scope,
					logout: function(result){
						var scope =this;
						scope.getLayout().setActiveItem(scope.LoginForm);
					}
				}
			})
		];
		
		
		
		scope.callParent(arguments);
	}
})