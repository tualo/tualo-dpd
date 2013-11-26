Ext.define('Tualo.app.components.Combo', {
	extend: 'Ext.form.field.ComboBox',
	requires: [
		 
	],
	constructor: function (config) {
		var scope = this;
		this.xid = Ext.id();
		var xconfig = {
			fieldLabel: "PLZ",
			id: scope.xid+'-absender'+config.name,
			name: 'absenderplz',
			allowBlank: false,
			enableKeyEvents: true,
			xtype: 'combobox',
			displayField: 'name',
			valueField: 'id',
			queryMode: 'remote',
			minChars: 3,
			store: Ext.create('Ext.data.Store', {
				pageSize: 5000,
				proxy: {
					type: 'ajax',
					timeout: 600000,
					url: location.href+'/post',
					extraParams:{
						cmp: 'cmp_sv_web_erfassung',
						sid: scope.sid,
						TEMPLATE: 'NO',
						p: config.qpage
					},
					reader: {
						type: 'json',
						root: 'data',
						idProperty: 'id',
						totalProperty: 'total'
					}
				},
				fields: [
					{name:'id'},
					{name:'name'},
					{name:'oname'}
				],
				listeners:{
					scope: scope
				}
			}),
			
			listeners: {
				scope: scope,
				change: function(fld){
					var v = Ext.getCmp(scope.xid+'-absender'+config.name).getValue();
					var r = fld.getStore().findRecord('id',v);
					//console.log(r);
					if (r!=null){
						Ext.getCmp(scope.xid+'-absenderort').setValue(r.get('oname'));
					}
				},
				collapse: function(fld){
					var v = Ext.getCmp(scope.xid+'-absenderplz').getValue();
					var r = fld.getStore().findRecord('id',v);
					//console.log(r);
					if (r!=null){
						Ext.getCmp(scope.xid+'-absenderort').setValue(r.get('oname'));
					}
					Ext.getCmp(scope.xid+'-absenderort').focus();
				},
				keydown: function(fld,e,eopts){
					var scope = this;
					if(e.getKey()===13){
						Ext.getCmp(scope.xid+'-absenderort').focus();
						return false;
					}
				}
			}
		}
		this.callParent([ config ]);
	},
	initComponent: function () {
		var scope = this;
		scope.callParent(arguments);
	}
})