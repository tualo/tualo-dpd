Ext.define('Tualo.app.components.Form', {
	extend: 'Ext.panel.Panel',
	requires: [
		'Ext.form.Panel'
	],
	
	layout: 'fit',
	constructor: function (config) {
		this.callParent([ config ]);
	},
	initComponent: function () {
		var scope =this;
		
		scope.xid = Ext.id();
		
		
		scope.form = Ext.create('Ext.form.Panel',{
			layout: 'column',
			url: './post',
			bodyPadding: 15,
			defaults: {
				anchor: '100%'
			},
			defaultType: 'textfield',
			items: [
				{
					// Fieldset in Column 1 - collapsible via toggle button
					xtype:'fieldset',
					title: 'Absender',
					defaultType: 'textfield',
					defaults: {anchor: '100%'},
					layout: 'anchor',
					columnWidth: 0.5,
					items: [
						{
							fieldLabel: "Kunde",
							id: scope.xid+'-absenderkunde',
							name: 'absenderkunde',
							allowBlank: true,
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
									url: './post',
									extraParams:{
									cmp: 'cmp_sv_web_erfassung',
									sid: scope.sid,
									TEMPLATE: 'NO',
									p: 'kunden'
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
									{name:'oname'},
									{name:'strasse'},
									{name:'plz'},
									{name:'ort'}
								],
								listeners:{
									scope: scope,
									beforeload: function(st,opt){
									}
								}
							}),
								
							listeners: {
								scope: scope,
								change: function(fld){
									 
								},
								collapse: function(fld){
									var v = Ext.getCmp(scope.xid+'-absenderkunde').getValue();
									var r = fld.getStore().findRecord('id',v);
									//console.log(r);
									if (r!=null){
										Ext.getCmp(scope.xid+'-absendername').setValue(r.get('oname'));
										Ext.getCmp(scope.xid+'-absenderplz').setValue(r.get('plz'));
										Ext.getCmp(scope.xid+'-absenderort').setValue(r.get('ort'));
										Ext.getCmp(scope.xid+'-absenderstrasse').setValue(r.get('strasse'));
									}
									Ext.getCmp(scope.xid+'-name').focus();
										Ext.getCmp(scope.xid+'-name').selectText();
									return false;
								},
								keydown: function(fld,e,eopts){
									var scope = this;
									if(e.getKey()===13){
										Ext.getCmp(scope.xid+'-name').focus();
										Ext.getCmp(scope.xid+'-name').selectText();
										return false;
									}
								}
							}
						},
						{
							fieldLabel: "Name",
							id: scope.xid+'-absendername',
							name: 'absendername',
							allowBlank: true,
							enableKeyEvents: true,
							listeners: {
								scope: scope,
								keydown: function(fld,e,eopts){
									var scope = this;
									if(e.getKey()===13){
										Ext.getCmp(scope.xid+'-absenderplz').focus();
										Ext.getCmp(scope.xid+'-absenderplz').selectText();
										return false;
									}
								}
							}
						},
						{
							fieldLabel: "PLZ",
							id: scope.xid+'-absenderplz',
							name: 'absenderplz',
							allowBlank: true,
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
									url: './post',
									extraParams:{
									cmp: 'cmp_sv_web_erfassung',
									sid: scope.sid,
									TEMPLATE: 'NO',
									p: 'dpplz'
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
									var v = Ext.getCmp(scope.xid+'-absenderplz').getValue();
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
										Ext.getCmp(scope.xid+'-absenderort').selectText();
								},
								keydown: function(fld,e,eopts){
									var scope = this;
									if(e.getKey()===13){
										Ext.getCmp(scope.xid+'-absenderort').focus();
										Ext.getCmp(scope.xid+'-absenderort').selectText();
										return false;
									}
								}
							}
						},
						{
							fieldLabel: "Ort",
							id: scope.xid+'-absenderort',
							name: 'absenderort',
							allowBlank: true,
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
									url: './post',
									extraParams:{
									cmp: 'cmp_sv_web_erfassung',
									sid: scope.sid,
									TEMPLATE: 'NO',
									p: 'dport'
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
									scope: scope,
									beforeload: function(st,opt){
										opt.params.plz = Ext.getCmp(scope.xid+'-absenderplz').getValue();
									}
								}
							}),
								
							listeners: {
								scope: scope,
								change: function(fld){
									 
								},
								collapse: function(fld){
									 
									Ext.getCmp(scope.xid+'-absenderstrasse').focus();
										Ext.getCmp(scope.xid+'-absenderstrasse').selectText();
									return false;
								},
								keydown: function(fld,e,eopts){
									var scope = this;
									if(e.getKey()===13){
										Ext.getCmp(scope.xid+'-absenderstrasse').focus();
										Ext.getCmp(scope.xid+'-absenderstrasse').selectText();
										return false;
									}
								}
							}
						},
						{
							fieldLabel: "Stra&szlige",
							id: scope.xid+'-absenderstrasse',
							name: 'absenderstrasse',
							allowBlank: true,
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
									url: './post',
									extraParams:{
									cmp: 'cmp_sv_web_erfassung',
									sid: scope.sid,
									TEMPLATE: 'NO',
									p: 'dpstra'
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
									scope: scope,
									beforeload: function(st,opt){
										opt.params.plz = Ext.getCmp(scope.xid+'-absenderplz').getValue();
									}
									
								}
							}),
								
							listeners: {
								scope: scope,
								change: function(fld){
									 
								},
								collapse: function(fld){
									 
									Ext.getCmp(scope.xid+'-absenderhausnummer').focus();
										Ext.getCmp(scope.xid+'-absenderhausnummer').selectText();
									return false;
								},
								keydown: function(fld,e,eopts){
									var scope = this;
									if(e.getKey()===13){
										Ext.getCmp(scope.xid+'-absenderhausnummer').focus();
										Ext.getCmp(scope.xid+'-absenderhausnummer').selectText();
										return false;
									}
								}
							}
						},
						{
							fieldLabel: "Hausnummer",
							id: scope.xid+'-absenderhausnummer',
							name: 'absenderhausnummer',
							allowBlank: true,
							enableKeyEvents: true,
							listeners: {
								scope: scope,
								keydown: function(fld,e,eopts){
									var scope = this;
									if(e.getKey()===13){
										Ext.getCmp(scope.xid+'-absendertelefon').focus();
										
										Ext.getCmp(scope.xid+'-absendertelefon').selectText();
										return false;
									}
								}
							}
						},
						{
							fieldLabel: "Telefon",
							id: scope.xid+'-absendertelefon',
							name: 'absendertelefon',
							allowBlank: true,
							enableKeyEvents: true,
							listeners: {
								scope: scope,
								keydown: function(fld,e,eopts){
									var scope = this;
									if(e.getKey()===13){
										Ext.getCmp(scope.xid+'-name').focus();
										
										Ext.getCmp(scope.xid+'-name').selectText();
										return false;
									}
								}
							}
						}]
					
				},
				
				{
					// Fieldset in Column 1 - collapsible via toggle button
					xtype:'fieldset',
					title: 'Emfänger',
					defaultType: 'textfield',
					defaults: {anchor: '100%'},
					layout: 'anchor',
					columnWidth: 0.5,
					items: [
						
						{
							fieldLabel: "Name",
							id: scope.xid+'-name',
							name: 'name',
							allowBlank: true,
							enableKeyEvents: true,
							listeners: {
								scope: scope,
								keydown: function(fld,e,eopts){
									var scope = this;
									if(e.getKey()===13){
										Ext.getCmp(scope.xid+'-plz').focus();
										Ext.getCmp(scope.xid+'-plz').selectText();
										return false;
									}
								}
							}
						},
						{
							fieldLabel: "Zusatz",
							id: scope.xid+'-zusatz',
							name: 'zusatz',
							allowBlank: true,
							enableKeyEvents: true,
							listeners: {
								scope: scope,
								keydown: function(fld,e,eopts){
									var scope = this;
									if(e.getKey()===13){
										Ext.getCmp(scope.xid+'-zusatz').focus();
										Ext.getCmp(scope.xid+'-zusatz').selectText();
										return false;
									}
								}
							}
						},
						{
							fieldLabel: "PLZ",
							id: scope.xid+'-plz',
							name: 'plz',
							allowBlank: true,
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
									url: './post',
									extraParams:{
									cmp: 'cmp_sv_web_erfassung',
									sid: scope.sid,
									TEMPLATE: 'NO',
									p: 'dpplz'
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
									var v = Ext.getCmp(scope.xid+'-plz').getValue();
									var r = fld.getStore().findRecord('id',v);
									//console.log(r);
									if (r!=null){
										Ext.getCmp(scope.xid+'-ort').setValue(r.get('oname'));
									}
								},
								collapse: function(fld){
									var v = Ext.getCmp(scope.xid+'-plz').getValue();
									var r = fld.getStore().findRecord('id',v);
									//console.log(r);
									if (r!=null){
										Ext.getCmp(scope.xid+'-ort').setValue(r.get('oname'));
									}
									Ext.getCmp(scope.xid+'-ort').focus();
										Ext.getCmp(scope.xid+'-ort').selectText();
								},
								keydown: function(fld,e,eopts){
									var scope = this;
									if(e.getKey()===13){
										Ext.getCmp(scope.xid+'-ort').focus();
										Ext.getCmp(scope.xid+'-ort').selectText();
										return false;
									}
								}
							}
						},
						{
							fieldLabel: "Ort",
							id: scope.xid+'-ort',
							name: 'ort',
							allowBlank: true,
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
									url: './post',
									extraParams:{
									cmp: 'cmp_sv_web_erfassung',
									sid: scope.sid,
									TEMPLATE: 'NO',
									p: 'dport'
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
									scope: scope,
									beforeload: function(st,opt){
										opt.params.plz = Ext.getCmp(scope.xid+'-plz').getValue();
									}
								}
							}),
								
							listeners: {
								scope: scope,
								change: function(fld){
									 
								},
								collapse: function(fld){
									 
									Ext.getCmp(scope.xid+'-strasse').focus();
										Ext.getCmp(scope.xid+'-strasse').selectText();
									return false;
								},
								keydown: function(fld,e,eopts){
									var scope = this;
									if(e.getKey()===13){
										Ext.getCmp(scope.xid+'-strasse').focus();
										Ext.getCmp(scope.xid+'-strasse').selectText();
										return false;
									}
								}
							}
						},
						{
							fieldLabel: "Stra&szlige",
							id: scope.xid+'-strasse',
							name: 'strasse',
							allowBlank: true,
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
									url: './post',
									extraParams:{
									cmp: 'cmp_sv_web_erfassung',
									sid: scope.sid,
									TEMPLATE: 'NO',
									p: 'dpstra'
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
									scope: scope,
									beforeload: function(st,opt){
										opt.params.plz = Ext.getCmp(scope.xid+'-plz').getValue();
									}
									
								}
							}),
								
							listeners: {
								scope: scope,
								change: function(fld){
									 
								},
								collapse: function(fld){
									 
									Ext.getCmp(scope.xid+'-hausnummer').focus();
									Ext.getCmp(scope.xid+'-hausnummer').selectText();
									return false;
								},
								keydown: function(fld,e,eopts){
									var scope = this;
									if(e.getKey()===13){
										Ext.getCmp(scope.xid+'-hausnummer').focus();
										Ext.getCmp(scope.xid+'-hausnummer').selectText();
										return false;
									}
								}
							}
						},
						{
							fieldLabel: "Hausnummer",
							id: scope.xid+'-hausnummer',
							name: 'hausnummer',
							allowBlank: true,
							enableKeyEvents: true,
							listeners: {
								scope: scope,
								keydown: function(fld,e,eopts){
									var scope = this;
									if(e.getKey()===13){
										Ext.getCmp(scope.xid+'-telefon').focus();
										Ext.getCmp(scope.xid+'-telefon').selectText();
										return false;
									}
								}
							}
						},
						{
							fieldLabel: "Telefon",
							id: scope.xid+'-telefon',
							name: 'telefon',
							allowBlank: true,
							enableKeyEvents: true,
							listeners: {
								scope: scope,
								keydown: function(fld,e,eopts){
									var scope = this;
									if(e.getKey()===13){
										Ext.getCmp(scope.xid+'-gewicht').focus();
										Ext.getCmp(scope.xid+'-gewicht').selectText();
										return false;
									}
								}
							}
						}]
					
				},
				
				{
					// Fieldset in Column 1 - collapsible via toggle button
					xtype:'fieldset',
					title: 'Paket',
					defaultType: 'textfield',
					defaults: {anchor: '100%'},
					layout: 'anchor',
					columnWidth: 1,
					items: [
						{
							fieldLabel: "Gewicht",
							name: 'gewicht',
							id: scope.xid+'-gewicht',
							allowBlank: false,
							enableKeyEvents: true,
							listeners: {
								scope: scope,
								keydown: function(fld,e,eopts){
									var scope = this;
									if(e.getKey()===13){
										Ext.getCmp(scope.xid+'-typ').focus();
										Ext.getCmp(scope.xid+'-typ').selectText();
										return false;
									}
								}
							}
						},
						{
							fieldLabel: "Typ",
							name: 'typ',
							id: scope.xid+'-typ',
							allowBlank: false,
							value: 'N',
							enableKeyEvents: true,
							listeners: {
								scope: scope,
								keydown: function(fld,e,eopts){
									var scope = this;
									if(e.getKey()===13){
										//Ext.getCmp(scope.xid+'-typ').focus();
										scope.submit();
										return false;
									}
								}
							}
						}
						
											]
				},
				{
					// Fieldset in Column 1 - collapsible via toggle button
					xtype:'fieldset',
					title: 'Info',
					defaultType: 'textfield',
					defaults: {anchor: '100%'},
					layout: 'anchor',
					columnWidth: 1,
					items: [
						scope.Label=Ext.create('Ext.panel.Panel',{
							border: false,
							height: 100,
							html: '<div id="'+scope.xid+'-label" style="font-weight: bold; font-size: 18pt"></div>'
						})]
				}
			],
			buttons:[
				{
				
					text: 'Abbrechen',
					scope: scope,
					handler: function(){
						this.wnd.close();
					}
				},'->',
				
				{
				
					text: 'Speichern',
					scope: scope,
					handler: function(){
						scope.submit();
					}
				}
			],
			autoScroll: true
		});
		
		scope.items = [
			scope.form
		]
	
		scope.callParent(arguments);
	},
	submit: function(){
		var scope = this;
		var form = scope.form.getForm();
		var values = form.getValues();
		if (form.isValid()) {
			
			var data=[];
			data.push({name:'Barcode',wert: 'P'+(new Date()).getTime()});
			data.push({name:'Kundennummer',wert: values.absenderkunde});
			data.push({name:'Name',wert: values.name});
			data.push({name:'Zusatz',wert: values.zusatz});
			data.push({name:'PLZ',wert: values.plz});
			data.push({name:'Strasse',wert: values.strasse});
			data.push({name:'HN',wert: values.hausnummer});
			data.push({name:'Gewicht',wert: values.gewicht});
			data.push({name:'Telefon',wert: values.telefon});
			data.push({name:'Pakettyp',wert:  values.typ});

			data.push({name:'absendername',wert: values.absendername });
			data.push({name:'absenderstrasse',wert: values.absenderstrasse });
			data.push({name:'absenderhausnummer',wert: values.absenderhausnummer });
			data.push({name:'absenderplz',wert: values.absenderplz });
			data.push({name:'absenderort',wert: values.absenderort });
			data.push({name:'absendertelefon',wert: values.absendertelefon });
			
			var o = {
				cmp: 'cmp_sv_web_erfassung',
				sid: scope.sid,
				TEMPLATE: 'NO',
				p: 'ajax/save',
				regiogruppe: 'paket',
				modell: 'paket',
				sortiergang: '1',
				data: Ext.JSON.encode(data)
			}
			
			Ext.Ajax.request({
				url: './post',
				scope: {
					scope: this,
					param: data,
					values: values
				},
				params: o,
				success: function(response){
					//console.log(response.responseText);
					var o = Ext.JSON.decode(response.responseText);
					
					Ext.getCmp(this.scope.xid+'-absenderkunde').focus();
					Ext.getCmp(this.scope.xid+'-absenderkunde').selectText();
					
					window.document.getElementById(scope.xid+'-label').innerHTML = '<b>'+o.sf+'</b> ('+o.stk+' STK sortiert <i>ID:'+this.param[0].wert+'</i>)';
					
					if ((o.sf=='SF: GLS')||(o.sf=='SF: DPD')){
					//this.scope.print(this.index+1,this.range);
					var sp = values.strasse.split(' (');
					var str = sp[0];
					var o = {
						id: this.param[0].wert,
						kunde: Ext.getCmp(this.scope.xid+'-absenderkunde').getValue(),
						name: values.name,
						zusatz: values.zusatz,
						strasse: str,
						hn: values.hausnummer,
						plz: values.plz,
						ort: values.ort,
						gewicht: values.gewicht
					};
					Ext.Ajax.request({
						url: './print',
						scope: {
							scope: this
						},
						params: o,
						success: function(response){
							//this.scope.print(this.index+1,this.range);
						},
						failure: function(response){
							Ext.MessageBox.hide();
							Ext.MessageBox.alert('Fehler','Es ist ein Fehler aufgetreten');
						}
					});
					}
							
				},
				failure: function(response){
					Ext.MessageBox.hide();
					Ext.MessageBox.alert('Fehler','Es ist ein Fehler aufgetreten');
				}
			});
			
		}
	}
});