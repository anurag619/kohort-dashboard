
angular.module('appLungeControllers').controller('optionsCtrl', ['$scope', '$state', '$stateParams', '$rootScope', '$filter','clientdata','$timeout','$location', '$localStorage','reverseGroup','processGroup','filter_groups_service','all_list','bucket_service' 
 	, function (a, state, stateParams, rootScope, $filter,clientdata,timeout,location,localStorage,reverseGroup,processGroup,filter_groups_service,all_list,bucket_service) {
	
	a.map_icon = function(currentGroup){
		icons = {
			'Date': "fa fa-calendar pull-right",
			'Acquisition': "fa fa-users pull-right",
			'Engagement': "fa fa-heart pull-right",
			'Events': "fa fa-filter pull-right",
			'Crashes': "fa fa-warning pull-right",
			'App version': "fa fa-file-text pull-right",
			'Competitors': "fa fa-briefcase pull-right",
			'Location': "fa fa-map-marker fa-lg pull-right",
			'Performance': "fa fa-line-chart pull-right",
			'Space Left on Device': "glyphicon glyphicon-hdd pull-right",
			'OS': "fa fa-life-ring pull-right",
			'Model': "glyphicon glyphicon-phone pull-right",
			'screen': "fa fa-arrows-alt pull-right",
			'Memory': "icon-ram pull-right",
			'Network': "icon-networksignalalt pull-right"
		}
		return icons[currentGroup];
	}
		
	rootScope.chkUrl =  rootScope.Sidebar_val //USED FOR GOOGLE ANALYTICS
	rootScope.histo_show = false;
	rootScope.groupBy = false;
	rootScope.bucket_numb = 8;
	a.event_text = false;
	//a.storage = localStorage;
	a.all_list = all_list;

	if(all_list.response.events){

		a.all_events = all_list.response.events;
		a.event_name = rootScope.eventName = a.all_events[0];

	}
	else{
		a.event_name = rootScope.eventName = ''
	}

	a.bucket_change = function(nmb){
		rootScope.bucket_numb = nmb;
		rootScope.page_set = 1;
		a.$broadcast('update', {'buckets': nmb })
	}

	a.bucket_size_change = function(size){

		rootScope.bucket_size = size;
		a.$broadcast('update', {'buckets': size })
	}

	a.$on('hideCompGroup', function () {
		 
		rootScope.hideCompGroup = false;

	})

	if (rootScope.apps.length > 0) {
		angular.forEach(rootScope.apps, function (app) {

			if (app._id == rootScope.apps[stateParams.appId]._id) {
				a.$parent.currentApp = app
			}
		})
	} 
	else {
		a.no_apps = true
	}

	rootScope.app_id = rootScope.apps[stateParams.appId]._id;

	rootScope.groupBy = false;
	rootScope.child_show = false;
	a.event_text = false;
	a.child_list = [];
	a.first_child = ''

	var optionList = ['aqua','engage','location','perform','screen','device','network','avg_internal_space_left','total_event_count'];

	var turls =  rootScope.path.match(/option\/(\w+)/)|| rootScope.path.match(/app\/(\d+)\/(\w+)/)  

	//a.groupVal = urls[3];
	rootScope.current = (turls[1]);

	rootScope.groupbyvalue = a.groupVal = a.storage.groupbyvalue|| 'date';

	if(a.groupVal == 'total_event_count'){
		a.event_text = true;
	}
	else{
		a.event_text = false;
	}

	var returns = reverseGroup.edit(a.groupVal);

	console.log(returns)

	// a.currentGroup = returns[0];
	// rootScope.child_show = returns[1];
	// a.child_group = returns[2];
	// a.first_child = returns[3];
	// rootScope.histo_show = returns[4];

	rootScope.bucket_size = bucket_service.change(a.groupVal);

	rootScope.group_toshow = a.currentGroup;

	a.filter_groups = function($event){

		
		rootScope.child_show = false;
		rootScope.histo_show = false;
		item = $event.currentTarget.dataset['value'];
		
		$.each(optionList, function (k) {

			if (optionList[k] == item) {
				rootScope.child_show = true;
			}

		});

		var backs = filter_groups_service.edit(item); 		//get values from the service.

		if(item == 'total_event_count'){
			a.event_text = true;
			backs[3] = a.all_list.response['events'];
			backs[4] = a.all_list.response['events'][0];
			rootScope.eventName = a.all_list.response['events'][0];
		}
		else{
			a.event_text = false;
		}

		a.currentGroup = backs[0];
		a.addgroupBy(backs[1]);
		rootScope.histo_show = backs[2];
		a.child_group = backs[3];
		a.first_child = backs[4];

		rootScope.group_toshow = a.currentGroup;
		rootScope.bucket_size = bucket_service.change(backs[1]);

	}

	a.send_event = function(event){

		rootScope.eventName = event;
		a.$broadcast('update', {'group': param })

	}

	a.process_group = function($event){

		id = $event.currentTarget.dataset['value'];

		a.first_child = id;
		var val = ''
		if (a.currentGroup == 'Events'){
			val = 'total_event_count';
			rootScope.eventName = id;
		}
		else{
			val = processGroup.edit(id); 
		}
		//get groupby keys from service.

		a.addgroupBy(val);
	}

	a.addgroupBy = function (param) {

		a.groupVal = param;
		rootScope.groupbyvalue = param;
		
		if(rootScope.groupbyvalue != 'date'){

			rootScope.groupBy = true;
		}
		else{
			rootScope.groupBy = false;
		}

		a.storage.groupbyvalue = param;		//store in local storage

		a.$broadcast('update', {'group': param })
	}


	a.$on('updateUrl', function (event, param) {

		rootScope.groupbyvalue = '';
		rootScope.Sidebar_val = param //FOR GOOGLE ANALYTICS
  
		if (param == 'funnel') {
		
			state.go("app.appId.funnel", {
				appId: stateParams.appId},
				{
					reload: true,
					notify: true
				})
		}

		if (param == 'register') {
			state.go("app.appId.register", {
				appId: stateParams.appId},
				{
					reload: true,
					notify: true
				})
		}

		if (param == 'setting') {
			state.go("app.appId.setting", {
				appId: stateParams.appId,
			},
			{
					reload: true,
					notify: true
				})
		}

		if (param == 'cohort') {
  
			state.go("app.appId.option.cohort", {
 
				appId: stateParams.appId}, {reload: true,notify: true})
		}

		if (param == 'analytics') {
			rootScope.current = 'analytics'; //to set session tab active
			rootScope.groupBy = false;

			state.go("app.appId.option.analytics", {appId: stateParams.appId}, {
				reload: true,
				notify: true
			})
		}

		if (param == 'retargeting') {

			console.log(stateParams.appId);
			
			rootScope.current = 'retargeting';
			rootScope.groupBy = false;

			state.go("app.appId.option.retargeting", {appId: stateParams.appId}, {
				reload: true,
				notify: true
			})
		}

		if (param == 'uninstalls') {
			rootScope.current = 'uninstalls'
			rootScope.groupBy = false;

			state.go("app.appId.option.uninstalls", {

				appId: stateParams.appId}, {
				reload: true,
				notify: true
			})
		}

		if (param == 'competitors') {
			rootScope.current = 'competitors'

			rootScope.groupbyvalue = 'date';
			a.storage.groupbyvalue = 'date';		//store in local storage
			rootScope.currentGroup = 'date'

			state.go("app.appId.option.competitors", {
				appId: stateParams.appId}, {
				reload: true,
				notify: true
			})
		}

		if (param == 'reactivation') {
			rootScope.current = 'reactivation';
			rootScope.groupBy = false;

			state.go("app.appId.option.reactivation", {appId: stateParams.appId}, {
				reload: true,
				notify: true
			})
		}

		//urls =  rootScope.path.match(/option\/(\w+)/)|| rootScope.path.match(/app\/(\d+)\/(\w+)/) 
	})

}])