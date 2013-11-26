Ext.define('Tualo.app.components.Grid', {
	extend: 'Ext.panel.Panel',
	requires: [
		'Ext.grid.Panel'
	],
	layout: 'fit',
	constructor: function (config) {
		this.callParent([ config ]);
	},
	load: function(){
		var scope =this;
		scope.grid.getStore().load({
			params:{
				cmp: 'cmp_sv_web_erfassung',
				sid: scope.sid,
				TEMPLATE: 'NO',
				page: 'paketliste'
			}
		})
	},
	print: function(index,range){
		
		if (index==0){Ext.MessageBox.wait('wird gedruckt ...');}
		
		if (index<range.length){
			
			var str = range[index].get('strasse');
			if (str.indexOf('(')!=-1){
				str=str.substr(0,str.indexOf('('));
			}
			
			var o = {
				id: range[index].get('id'),
				name: range[index].get('name'),
				strasse: str,
				hn: range[index].get('hn'),
				plz: range[index].get('plz'),
				ort: range[index].get('ort'),
				gewicht: range[index].get('gewicht')
			};
			
			Ext.Ajax.request({
				url: './print',
				scope: {
					scope: this,
					range: range,
					index: index
				},
				params: o,
				success: function(response){
					this.scope.print(this.index+1,this.range);
				},
				failure: function(response){
					Ext.MessageBox.hide();
					Ext.MessageBox.alert('Fehler','Es ist ein Fehler aufgetreten');
				}
			});
		}else{
			Ext.MessageBox.hide();
		}
	},
	initComponent: function () {
		var scope =this;
		
		scope.sessionID = "";
		scope.xid = Ext.id();
		
		var store = Ext.create('Ext.data.Store',{
			pageSize: 5000,
			proxy: {
				type: 'ajax',
				timeout: 600000,
				url: location.href+'/post',
				reader: {
					type: 'json',
					root: 'data',
					totalProperty: 'total'
				}
			},
			fields: [
				{name:'id'},
				{name:'name'},
				{name:'strasse'},
				{name:'plz'},
				{name:'hn'},
				{name:'ort'},
				{name:'datum',type:'date'},
				{name:'kundennummer'},
				{name:'login'}
			]
		});
		
		scope.grid = Ext.create('Ext.grid.Panel',{
			title: "letzte Pakete",
			store: store,
			selModel: Ext.create('Ext.selection.RowModel',{
				mode: 'MULTI'
			}),
			columns: [
				{text:'ID',dataIndex:'id'},
				{text:'Name',dataIndex:'name'},
				{text:'Strasse',dataIndex:'strasse'},
				{text:'HN',dataIndex:'hn'},
				{text:'PLZ',dataIndex:'plz'},
				{text:'Ort',dataIndex:'ort'},
				{text:'Kunde',dataIndex:'kundennummer'},
				{text:'Erfasser',dataIndex:'login'},
				{text:'Datum',dataIndex:'datum',xtype: 'datecolumn',format: 'd.m.Y'}
			],
			// Reset and Submit buttons
			// scope.Window
			buttons: [{
				text: "Neu Laden",
				disabled: false,
				scope: scope,
				handler: function() {
					var scope = this;
					scope.load();
				}
			},{
				text: "Erfassen",
				disabled: false,
				scope: scope,
				handler: function() {
					var scope = this;
					
					scope.Window = Ext.create('Ext.window.Window',{
						title: 'Paket Erfassen',
						autoScroll: true,
						width: scope.getWidth()*0.8,
						height: scope.getHeight()*0.8,
						layout: 'fit',
						modal: true,
						items:[
							scope.Form = Ext.create('Tualo.app.components.Form',{
								sid: scope.sid
							})
						]
					});
					scope.Form.wnd=scope.Window;
					scope.Window.show();
				}
			},'->',{
				text: "Abbrechen",
				disabled: true,
				handler: function() {
				}
			}, {
				text: "Drucken",
				scope: scope,
				handler: function() {
					var scope = this;
					//scope.submit();
					var range = scope.grid.getSelectionModel().getSelection();
					scope.print(0,range);
					/*
					
					*/
				}
			},'-', {
				text: "Abmelden",
				scope: scope,
				handler: function() {
					var scope = this;
					Ext.MessageBox.confirm('Abmelden','Wirklich Abmelden?',function(btn){
						if (btn=='yes'){
							Ext.Ajax.request({
									url: 'post',
								scope: this,
									params: {
										sid: this.sid,
										cmp: 'cmp_logout',
										TEMPLATE: 'NO'
									},
									success: function(response){
										this.fireEvent('logout');
									},
									failure: function(response){
										this.fireEvent('logout');
									}
							});
						}
					},scope);
				}
			}]
		});
		
		
		
		
		scope.items = [
			scope.grid 
		]
		scope.callParent(arguments);
	},
	submit: function(){
	}
});