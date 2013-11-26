Ext.define('Tualo.app.components.Login', {
	extend: 'Ext.panel.Panel',
	requires: [
		'Ext.form.Panel'
	],
	layout: {
		type: 'vbox',
		align: 'center',
		pack: 'center'
	},
	constructor: function (config) {
		this.callParent([ config ]);
	},
	initComponent: function () {
		var scope =this;
		
		scope.sessionID = "";
		scope.xid = Ext.id();
		
		scope.form = Ext.create('Ext.form.Panel',{
			title: "Anmelden",
			width: 400,
			height: 200,
			layout: 'anchor',
			url: location.href+'/post',
			bodyPadding: 15,
			defaults: {
					anchor: '100%'
			},
			defaultType: 'textfield',
			items: [{
				fieldLabel: "Mandant",
				id: scope.xid+'-mandant',
				name: 'mandant',
				allowBlank: false,
				enableKeyEvents: true,
				listeners: {
					scope: scope,
					keydown: function(fld,e,eopts){
						var scope = this;
						if(e.getKey()===13){
							Ext.getCmp(scope.xid+'-username').focus();
							return false;
						}
					}
				}
			},{
				fieldLabel: "Login",
				id: scope.xid+'-username',
				name: 'username',
				allowBlank: false,
				enableKeyEvents: true,
				listeners: {
					scope: scope,
					keydown: function(fld,e,eopts){
						var scope = this;
						if(e.getKey()===13){
							Ext.getCmp(scope.xid+'-password').focus();
							return false;
						}
					}
				}
			},{
				fieldLabel: "Passwort",
				name: 'password',
				id: scope.xid+'-password',
				inputType: 'password',
				allowBlank: false,
				enableKeyEvents: true,
				listeners: {
					scope: scope,
					keydown: function(fld,e,eopts){
						var scope = this;
						if(e.getKey()===13){
							scope.submit();
							return false;
						}
					}
				}
			},{
				xtype: 'hidden',
				name: 'return',
				value: 'json'
			}],
			
			// Reset and Submit buttons
			buttons: [{
				text: "Abbrechen",
				handler: function() {
					this.up('form').getForm().reset();
				}
			}, {
				text: "Anmelden",
				scope: scope,
				formBind: true, //only enabled once the form is valid
				handler: function() {
					var scope = this;
					scope.submit();
				}
			}]
		});
		
		scope.items = [
			scope.form
		]
		scope.callParent(arguments);
	},
	submit: function(){
		var scope = this;
		var form = scope.form.getForm();
		if (form.isValid()) {
			form.submit({
				scope: scope,
				success: function(form, action) {
					var scope = this;
					scope.result = action.result;
					scope.fireEvent('loggedin',scope.result);
				},
				failure: function(form, action) {
					Ext.MessageBox.alert('Failed', (action.result.msg)?action.result.msg:'unkown');
				}
			});
		}
	}
});