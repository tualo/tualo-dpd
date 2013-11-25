Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Tualo.app.components', '/app/components');
Ext.Loader.setPath('Ext.tualo', '/tualo');


Ext.application({
	name: 'tualo testing',
	require: ['Tualo.app.components.Main'],
	launch: function() {
		Ext.tip.QuickTipManager.init();
		Ext.create('Tualo.app.components.Main', {});
	}
});