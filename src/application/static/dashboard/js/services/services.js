'use strict';

/* Controllers */

var appLungeServices = angular.module('appLungeServices',['ngResource'])

	var url = '';
	 


appLungeServices.service('convertdata',function(){
	
	this.query =  function(datavalues){

			var segmentkey = [];

			if(datavalues=='Device Params'){

				segmentkey = ['Device Name', 'Ram','Screen Size','Screen Density','Aspect Ratio'];
				
			}

			if(datavalues=='Location'){
				
				segmentkey = ['Country','City'];
			}

			if(datavalues=='User Behaviour'){

				segmentkey = ['Push Notifications s ','session duration'];
			}

			if(datavalues=='OS Version'){

				segmentkey = ['Os version']
			}

			if(datavalues=='Network'){

				segmentkey = ['Network type','Network operator']
			}

			if(datavalues=='Performance'){

				segmentkey = ['Space Left on device','crashes','ANR','memory']
			}

			if(datavalues=='Uninstall'){

				segmentkey = ['uninstall',"Last Seen"]
			}

			if(datavalues=='Competitor'){

				segmentkey = ['competitors']
			}
			if(datavalues=='Events'){

				segmentkey = ['Events']
			}

			return segmentkey
		
	}
});

appLungeServices.service('reverse_value',function(){

	this.convert = function(val){

		var value = ''

		if(val=='device_model'){
			value = 'Device Name';

		}
		if(val=='device_mem'){
			value = 'Ram';

			
		}
		if(val=='device_screen_size'){
			value = 'Screen Size';
			
		}
		if(val=='device_screen_density'){
			value = 'Screen Density';
			
		}
		if(val=='device_screen_aspect'){
			value = 'Aspect Ratio';
			
		}
		if(val=='Events'){
			value = 'Events';
			
		}
		if(val=='location_country'){
			value = 'Country';
			
		}
		if(val=='location_city'){
			value = 'City';
			
		}
		if(val=='session_duration'){
			value = 'session duration';
			
		}
		if(val=='space_left_device'){
			value = 'Space Left on Device';
			
		}
		if(val=='push_notification_count'){
			value = 'Push Notifications s ';
			
		}
		if(val=='anr_count'){
			value = 'ANR';
			
		}
		if(val=='crash_count'){
			value = 'crashes';
			
		}
		if(val=='low_memory_count'){
			value = 'memory';
			
		}
		if(val=='uninstall'){
			value = 'uninstall';
			
		}
		if(val=='os'){
			value = 'Os version';
			
		}
		if(val=='network_ntype'){
			value = 'Network type';
			
		}
		if(val=='network_carrier'){
			value = 'Network Carrier';
			
		}

		if(val=='is_crash'){
			value = 'crashes';
			
		}
		if(val=='competitor'){
			value = 'competitors';
			
		}

		return value;
	}
});

appLungeServices.service('operator_val',function(){

	this.get = function(val){

		var ops = ''

		if(val=='Less Than'){
			ops = 'lt';
		}

		if(val=='true'){
			ops = 'true';
		}

		if(val=='false'){
			ops = 'false';
		}

		if(val=='equals'){
			ops = 'eq';
		}

		if(val=='Greater Than'){
			ops = 'gt';
		}

		return ops
	}
});

appLungeServices.service('convert_key',function(){

	this.convert = function(val){

		var segmentkey = ''

		if(val=='Device Name'){

 			segmentkey = 'device_model';
 			
 		}
 		if(val=='Ram'){
 			
 			segmentkey = 'device_mem'
 			
 		}
 		if(val=='Screen Size'){
 			segmentkey = 'device_screen_size';
 			
 		}
 		if(val=='Screen Density'){
 			
 			segmentkey = 'device_screen_density';
 	
 		}
 		if(val=='Aspect Ratio'){
 			
 			segmentkey = 'device_screen_aspect';
 	
 		}
 		if(val=='Events'){
 			
 			segmentkey = 'event';
 		}
 		if(val=='Country'){
 			
 			segmentkey = 'location_country';
 			
 		}
 		if(val=='City'){
 			
 			segmentkey = 'location_city';
 			
 		}
 		if(val=='session duration'){
 			
 			segmentkey = 'session_duration';
 		}
 		if(val=='Space Left on device'){
 			
 			segmentkey = 'space_left_device';
 			
 		}
 		if(val=='Push Notifications s '){
 			
 			segmentkey = 'push_notification_count';
 			
 		}
 		if(val=='ANR'){
 			
 			segmentkey = 'anr_count';
 			
 		}
 		if(val=='crashes'){
 			
 			segmentkey = 'crash_count';
 			
 		}
 		if(val=='memory'){
 			
 			segmentkey = 'low_memory_count';
 		}
 		if(val=='uninstall'){
 			
 			segmentkey = 'uninstall';
 			
 		}

 		if(val=='Os version'){
 			
 			segmentkey = 'os';
 			
 		}
 		if(val=='Network type'){
 			
 			segmentkey = 'network_ntype';
 			
 		}
 		if(val=='Network operator'){
 			segmentkey = 'network_carrer';
 			
 		}
 		if(val=='crashes'){
 			
 			segmentkey = 'is_crash';
 		}
 		
 		if(val=='competitors'){
 			
 			segmentkey = 'competitor';
 		}

 		return segmentkey;

	}

})


appLungeServices.service('allRules',function(){

	this.rules = function(allrules, nmbRules, i){

		var temp_dic = {};
		var obj = {}
		
		if(allrules.length>0){
			for(var k=0;k<allrules.length;k++){
				obj = allrules[k]
				if(obj.parent==i.parent){
					obj.rules.push(i);
					nmbRules[i.parent] = obj.rules.length;
					break;
				}
				
				if(obj.parent!=i.parent && k==(allrules.length-1) ){
					temp_dic.parent = i.parent;
					temp_dic.rules = [i];
					nmbRules[i.parent] = temp_dic['rules'].length;

					allrules.push(temp_dic);
					break;
				}
			}
		}

		if(allrules.length==0){
			temp_dic.parent = i.parent;
			temp_dic.rules = [i];
			nmbRules[i.parent] = temp_dic['rules'].length;

			allrules.push(temp_dic);
		}

		return (allrules, nmbRules);
	}

});

appLungeServices.service('edited_rules',function(reverse_value, allRules){

	var clicked = '';
	var eqs = '';

	this.edit = function(seg, datavalues){

		var allrules = [] , nmbRules = {}, segCounter = [];

		for(var k=0;k<seg.rules.length;k++){
			for(var h=0;h<seg.rules[k].length;h++){

				allrules , nmbRules = allRules.rules(allrules, nmbRules ,seg.rules[k][h])


				//a.seg_parents.push(seg.rules[k][h].parent);

				if(seg.rules[k][h].parent==datavalues){

					var temp_obj = {};

					if(seg.rules[k][h].operator== 'eq'){
						eqs = 'equals'
					}
					if(seg.rules[k][h].operator== 'lt'){
						eqs = 'Less Than'
					}
					if(seg.rules[k][h].operator== 'gt'){
						eqs = 'Greater Than'
					}

					temp_obj.datavalues = reverse_value.convert(seg.rules[k][h].key);
					temp_obj.rule = seg.rules[k][h].rule;
					clicked = seg.rules[k][h].rule;
					temp_obj.id = seg.rules[k][h].id;
					temp_obj.operator = eqs;
					temp_obj.parent = datavalues;
					temp_obj.options = {'name' :seg.rules[k][h].val, 'index' :seg.rules[k][h].value}
					temp_obj.unit = seg.rules[k][h].unit;
					temp_obj.label1=seg.rules[k][h].label1;
					temp_obj.label2=seg.rules[k][h].label2;
					temp_obj.numvals = seg.rules[k][h].numvals;
					temp_obj.int_seg = seg.rules[k][h].int_seg;
					
					var c = seg.rules[k][h].id;
					segCounter.push(temp_obj);

					//logic_ofrules(temp_obj); 	//add rules acc in currentsegment
				}
			}
		}

		return ([segCounter, c, allrules, nmbRules])
	}

})

appLungeServices.service('reverseGroup',function(){

	this.edit = function(val){ 

		var currentGroup ='', histo_show = false, child_show = false,
			child_group = [], first_child = '';

		if( val =='date'){
		
			currentGroup = 'Date';
			child_show = false;
		}

		if( val =='avg_space_left_device'){
			currentGroup = 'Space Left on Device';
			child_show = false;
			histo_show = true;
			first_child = 'Internal'
			child_group = ['Internal', 'Total', 'External'];
		}

		if( val =='user_life_time'){
			currentGroup = 'User Lifetime';
			child_show = false;
			histo_show = true;
		}

		if( val =='user_last_used'){
			currentGroup = 'Last Used Time';
			child_show = false;
			histo_show = true;
			
		}

		if( val =='app_version'){
			currentGroup = 'App Version';
			child_show = false;
			histo_show = false;
			
		}
		if( val =='session_count'){
			currentGroup = 'Session Count';
			child_show = false;
			histo_show = false;
			
		}
		if( val =='total_event_count'){
			currentGroup = 'Total Events';
			child_show = false;
			histo_show = false;
		}

		if( val =='os'){
			currentGroup = 'OS';
			child_show = false;
			histo_show = false;
			
		}
		if( val =='competitors'){
			currentGroup = 'Competitor';
			child_show = false;
			histo_show = false;			
		}

		if( val=='campaign'){
			currentGroup = 'Acquisition';
			child_show = true;	
			child_group = ['Campaign','Source'];
			first_child = 'Campaign'
		}
		if( val=='source'){
			currentGroup = 'Acquisition';
			child_show = true;	
			child_group = ['Campaign','Source'];
			first_child = 'Source'
		}

		if( val=='total_session_duration'){
			child_show = true;
			currentGroup = 'Session Duration'
			child_group = ['Lifetime','Average'];
			first_child = 'Lifetime';
			histo_show = true;
		}

		if( val=='avg_session_duration'){
			child_show = true;
			currentGroup = 'Session Duration'
			child_group = ['Lifetime','Average'];
			first_child = 'Average';
			histo_show = true;
		}

		if( val=='total_pushnotification_events'){
			child_show = true;
			currentGroup = 'Push Notifications s ';
			child_group = ['Lifetime','Per Session'];
			first_child = 'Lifetime';
			histo_show = true;
		}

		if( val=='avg_pushnotification_events'){
			child_show = true;
			currentGroup = 'Push Notifications s ';
			child_group = ['Lifetime','Per Session'];
			first_child = 'Per Session';
			histo_show = true;
		}

		if( val=='location_city'){
			child_show = true;
			currentGroup = 'Location';
			child_group = ['City','Country'];
			first_child = 'City'
			histo_show = false;
		}

		if( val=='location_country'){
			child_show = true;
			currentGroup = 'Location';
			child_group = ['City','Country'];
			first_child = 'Country';
			histo_show = false;
		}

		if( val=='total_crashes'){
			currentGroup = 'Performance';
			child_show = true;
			child_group = ['Crashes','ANR','Out of Memory'];
			first_child = 'Crashes';
			histo_show = true;
		}

		if( val=='total_anr'){
			currentGroup = 'Performance';
			child_show = true;
			child_group = ['Crashes','ANR','Out of Memory'];
			first_child = 'ANR';
			histo_show = true;
		}

		if( val=='total_onLow_memory'){
			currentGroup = 'Performance';
			child_show = true;
			child_group = ['Crashes','ANR','Out of Memory'];
			first_child = 'Out of Memory';
			histo_show = true;
		}


		if( val=='device_model'){
			currentGroup = 'Device Paremeters';
			child_show = true;
			child_group = ['Memory','Model','Screen Aspect','Screen Density','Screen Size'];
			first_child = 'Model';
			histo_show = false;
		}

		if( val=='device_mem'){
			currentGroup = 'Device Paremeters';
			child_show = true;
			child_group = ['Memory','Model','Screen Aspect','Screen Density','Screen Size'];
			first_child = 'Memory';
			histo_show = false;
		}

		if( val=='device_screen_aspect'){
			currentGroup = 'Device Paremeters';
			child_show = true;
			child_group = ['Memory','Model','Screen Aspect','Screen Density','Screen Size'];
			first_child = 'Screen Aspect';
			histo_show = false;
		}

		if( val=='device_screen_density'){
			currentGroup = 'Device Paremeters';
			child_show = true;
			child_group = ['Memory','Model','Screen Aspect','Screen Density','Screen Size'];
			first_child = 'Screen Density';
			histo_show = false;
		}

		if( val=='device_screen_size'){
			currentGroup = 'Device Paremeters';
			child_show = true;
			child_group = ['Memory','Model','Screen Aspect','Screen Density','Screen Size'];
			first_child = 'Screen Size';
			histo_show = false;
		}

		if( val=='network_carrier'){
			currentGroup = 'Network';
			child_show = true;
			child_group = ['Network Carrier','Network Type'];
			first_child = 'Network Carrier';
			histo_show = false;
		}

		if( val=='network_ntype'){
			currentGroup = 'Network';
			child_show = true;
			child_group = ['Network Carrier','Network Type'];
			first_child = 'Network Type';
			histo_show = false;
		}

		return ([currentGroup, child_show, child_group, first_child, histo_show])
	}

})

appLungeServices.service('processGroup',function(){

	this.edit = function(id){

		var group = ''

		if(id=='Campaign'){

			group = ('campaign');

		}
		if(id=='Source'){
			group = ('source');
			
		}
		if(id=='Lifetime'){
			if(a.currentGroup == 'Push Notifications s '){

				group = ('total_pushnotification_events');
			}
			if(a.currentGroup == 'Session Duration'){
				
				group = ('total_session_duration');
			}
		}
		if(id=='Average'){
			
			group = ('avg_session_duration');
		}

		if(id=='Per Session'){
			group = ('avg_pushnotification_events');
			
		}

		if(id=='City'){
			group = ('location_city');
			
		}
		if(id=='Country'){
			group = ('location_country');
			
		}
		if(id=='Crashes'){
			group = ('total_crashes');
			
		}
		if(id=='ANR'){
			group = ('total_anr');
			
		}
		if(id=='Out of Memory'){
			group = ('total_onLow_memory');
			
		}
		if(id=='Memory'){
			group = ('device_mem');
			
		}
		if(id=='Model'){
			group = ('device_model');
			
		}
		if(id=='Screen Aspect'){
			group = ('device_screen_aspect');
			
		}
		if(id=='Screen Density'){
			group = ('device_screen_density');
			
		}
		if(id=='Screen Size'){
			group = ('device_screen_size');
			
		}
		if(id=='Network Carrier'){
			group = ('network_carrier');
			
		}
		if(id=='Network Type'){
			group = ('network_ntype');
			
		}

		return group;

	}

})

appLungeServices.service('getgraphdata',function(){

	this.query = function(res){

		var log = [];
		for (var i = 0; i < res.result.values.length; i++) {

			var myDate = new Date(res.result.values[i][0])
			var uc_date = Date.UTC(myDate.getUTCFullYear(), myDate.getUTCMonth(), myDate.getUTCDate());
			log.push([uc_date, parseInt(res.result.values[i][1])])

			log.sort()
		}
		return log

	}
	
})

appLungeServices.service('filter_groups_service',function(){


	//app_version , session count, event count

	this.edit = function(item){

		var currentGroup = '', child_show = false, histo_show = false,
					child_group = [], group_by = '', first_child= '';

		if(item =='date'){
			
			currentGroup = 'Date';
			child_show = false;
			child_group = [];
			histo_show = false;
			group_by = (item);
		}

		if(item =='avg_internal_space_left'){
			 
			currentGroup = 'Space Left on Device';
			child_show = true;
			histo_show = true;
			first_child = 'Internal'
			child_group = ['Internal', 'Total', 'External'];
			group_by = (item);
		}

		if(item =='app_version'){
			 
			currentGroup = 'App version';
			child_show = false;
			histo_show = false;
			child_group = [];
			group_by = (item);
		}

		if(item =='session_count'){
			 
			currentGroup = 'Session Count';
			child_show = false;
			histo_show = false;
			child_group = [];
			group_by = (item);
		}

		if(item =='total_event_count'){
			 
			currentGroup = 'Total Events';
			child_show = false;
			histo_show = false;
			child_group = [];
			group_by = (item);
		}

		if(item =='os'){
			 
			currentGroup = 'OS';
			child_group = [];
			histo_show = false;
			child_show = false;
			group_by = (item);
 
		}
		if(item =='competitors'){
			 
			currentGroup = 'Competitor';
			child_show = false;
			histo_show = false;
			child_group = [];
			group_by = (item)	
		}

		if(item=='aqua'){
			 
			currentGroup = 'Acquisition Channel';
			child_show = true;
			group_by = ('campaign');
			child_group = ['Campaign','Source'];
			first_child = 'Campaign'
			histo_show = false;
		}

		if(item=='sessions'){
		 
			group_by = ('total_session_duration');
			child_show = true;
			currentGroup = 'Session Duration'
			child_group = ['Lifetime','Average'];
			first_child = 'Lifetime';
			histo_show = true;
		}
		if(item=='push'){
			 
			currentGroup = 'Push Notifications s ';
			child_show = true;
			group_by = ('avg_pushnotification_events');
			child_group = ['Lifetime','Per Session'];
			first_child = 'Lifetime';
			histo_show = true;
		}
		if(item=='location'){
			 
			currentGroup = 'Location';
			child_show = true;
			group_by = ('location_city');
			child_group = ['City','Country'];
			first_child = 'City';
			histo_show = false;
		}

		if(item=='user_last_used'){
			 
			currentGroup = 'Last Used Time';
			child_show = false;
			group_by = 'user_last_used';
			histo_show = false;
			child_group = [];
			first_child = ''
		}

		if(item=='user_life_time'){
			 
			currentGroup = 'User Lifetime';
			child_show = false;
			group_by = 'user_life_time';
			histo_show = false;
			child_group = [];
			first_child = ''
		}

		if(item=='perform'){
			 
			currentGroup = 'Performance';
			child_show = true;
			group_by = 'total_crashes';
			histo_show = true;
			child_group = ['Crashes','ANR','Out of Memory'];
			first_child = 'Crashes'
		}

		if(item=='device'){
		 
			currentGroup = 'Device Paremeters';
			group_by = ('device_model');
			child_show = true;
			histo_show = false;
			child_group = ['Memory','Model','Screen Aspect','Screen Density','Screen Size'];
			first_child = 'Model'
		}
		if(item=='network'){
			 
			currentGroup = 'Network';
			group_by = ('network_carrier');
			child_show = true;
			histo_show = false;
			child_group = ['Network Carrier','Network Type'];
			first_child = 'Network Carrier'
		}

		return ([currentGroup, group_by, histo_show, child_group, first_child,child_show])
	}

})

appLungeServices.service('bucket_service',function(){

	this.change= function(param){

		var bucket = 10

		if( param == 'total_session_duration'){
			bucket = 10;

		}
		if( param == 'avg_pushnotification_events'){
			bucket = 10;
			
		}
		if( param == 'total_crashes'){
			bucket = 10;
			
		}
		if( param == 'session_count'){
			bucket = 10;
			
		}
		if( param == 'user_life_time'){
			bucket = 10;
			
		}
		if( param == 'user_last_used'){
			bucket = 10;
			
		}
		if( param == 'total_anr'){
			bucket = 10;
			
		}
		if( param == 'avg_internal_space_left'){
			bucket = 10;
			
		}
		if( param == 'app_version'){
			bucket = 10;
			
		}
		if( param == 'network_carrier'){
			bucket = 10;
			
		}
		if( param == 'device_model'){
			bucket = 10;
			
		}
		if( param == 'total_crashes'){
			bucket = 10;
			
		}
		if( param == 'location_city'){
			bucket = 10;
			
		}
		if( param == 'total_session_duration'){
			bucket = 10;
		}

		if( param == 'total_event_count'){
			bucket = 10;
			
		}
		if( param == 'campaign'){
			bucket = 10;
			
		}
		if( param == 'app_version'){
			bucket = 10;
			
		}
		if( param == 'os'){
			bucket = 10;
			
		}

		return bucket;
	}
})

appLungeServices.service('compGraphdata',function(){

	this.edit= function(response, param){

			var resp = {},log = [], series = [] ,categories = [], y = {};

			var mths = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July",
		    		"Aug", "Sep", "Oct", "Nov", "Dec"];

			for (var i = 0; i < 1; i++) {
				for (var j = 0; j < 1; j++) {

					if (param == false) {


						for (var k = 0; k < response.result.values[i][1].length; k++) {

							var d = new Date(response.result.values[i][1][k][0]);
							var curr_date = d.getDate();
							var curr_month = d.getMonth();
							log.push(curr_date + '/' + mths[curr_month])

							//var uc_date = Date.UTC(myDate.getUTCFullYear(),myDate.getUTCMonth(),myDate.getUTCDate());

						}
					} else {
						for (var k = 0; k < response.result.values[i][1].length; k++) {

							log.push(response.result.values[i][1][k][0])
						}

					}
				}
			}

			resp.categories = log;
			var comp_group = [];
			for (var i = 0; i < response.result.values.length; i++) {
				y = {};

				comp_group.push(response.result.values[i][0])
				y.name = (response.result.values[i][0])

				for (var j = 0; j < 1; j++) {
					var sum = []

					for (var k = 0; k < response.result.values[i][1].length; k++) {
						var d = new Date(response.result.values[i][1][k][0]);
						var uc_date = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
						if (param == false) {
							sum.push([uc_date, parseInt(response.result.values[i][1][k][1])])
						} else {
							sum.push(response.result.values[i][1][k][1])
						}

					}

					y.data = sum;
					series.push(y)

				}
			}
		resp.series = series
				 
		return resp
	}
})

appLungeServices.factory('Querydata',function($http, $log, $q){
	//console.log('query made')
	return { setquery: function(base,params){

		var url_query = '/api/'+base.base_url+'/'+base.appid+'/' ;

			var deferred = $q.defer();
			$http.get(url_query, {params: (params)})
				.success(function(data) {
					deferred.resolve({
						response: data});
				}).error(function(msg, code) {
		          deferred.reject(msg);
		          $log.error(msg, code);
		       });

			return deferred.promise; 	
		}
	}
});

appLungeServices.factory('Querydata1',function(apiCallHandler){
	return { 
		setquery: function(base,params){
			return apiCallHandler.call_api('get','/api/'+base.base_url+'/'+base.appid+'/', {params: params})
		}
	}
});

appLungeServices.factory('analyticQuery',function(apiCallHandler){
	return { 
		query: function(base,params){
			return apiCallHandler.call_api('get','/api/'+base.base_url+'/'+base.appid+'/',{params:params})	
		}
	}
});

appLungeServices.factory('compdata',function(apiCallHandler){
	return { 
		query: function(base,params){
			return apiCallHandler.call_api('get','/api/'+base.base_url+'/'+base.appid+'/', {params: params});
		}
	}
});

appLungeServices.factory('callAppsList',function(apiCallHandler){
	return { query: function(id){
			return apiCallHandler.call_api('get','/api/apps/',{params:id.param});	
		}
	}
});

appLungeServices.factory('callviewList',function(apiCallHandler){
	return { 
		query: function(appid,param){
			return apiCallHandler.call_api('get','/api/list/'+ param +'/'+ appid.appid ,{params: appid.random});
		}
	}
});

appLungeServices.factory('clientdata',function(apiCallHandler){
	return { 
		query: function(id, param){
			return apiCallHandler.call_api('get','/api/list_collections/'+id.appid+'/',{params: param});
		}
	}
});

appLungeServices.factory('targettingList',function(apiCallHandler){
	return { 
		query: function(id, params){
			return apiCallHandler.call_api('get','/api/list_segments/'+id+'/', {param: params})
		}
	}
});

appLungeServices.factory('allcomp',function(apiCallHandler){
	return { 
		query: function(param){
			return apiCallHandler.call_api('get','/api/competitors_list/'+ param.appid + '/', {params: {query: param.query},ignoreLoadingBar: true})	
		}
	}
});	

appLungeServices.factory('addComp',function(apiCallHandler){
	return { 
		query: function(id,param){
			return apiCallHandler.call_api('post','/api/add_competitors/'+id+'/', {app_name: param['app_name']})
		}
	}
});

appLungeServices.factory('delcomp',function(apiCallHandler){
	return { 
		query: function(id,param){
			return apiCallHandler.call_api('post','/api/delete_competitor/'+id+'/',{app_name: param['app_name']}); 	
		}
	}
});

//to get all values of selected key in segments
appLungeServices.factory('allValues',function(apiCallHandler){
	return { 
		query: function(param){
			return apiCallHandler.call_api('get','/api/typeahead/'+ param.appid + '/', {params: {'query': param.value, 'key': param.key},ignoreLoadingBar: true});
		}
	}
});	

//segment api call for post
appLungeServices.factory('Viewpost',function(apiCallHandler){
	return { 
		query: function(params,view){
	     	var rule1 = JSON.stringify(params.filter.rules)
			return apiCallHandler.call_api('post','/api/add/'+ view +'/'+params.appid+'/',{_id: params.filter._id, name: params.filter.name, rules: rule1 });
		}
	}
});

//segment api call for delete
appLungeServices.factory('Viewdelete',function(apiCallHandler){
	return { 
		query: function(params, view){
			console.log(params.filter.id)
			var t = parseInt(params.filter.id);
			return apiCallHandler.call_api('get','/api/delete/'+ view +'/'+params.appid+'/'+t+'/');	
		}
	}
});

appLungeServices.factory('dummydata',function(apiCallHandler){
	return { 
		query: function(){
			return apiCallHandler.call_api('get','/static/mock-response/uninstalls.json',{})	
		}
	}
});

appLungeServices.factory('user_settings',function(apiCallHandler){
	return { 
		query: function(param){
			return apiCallHandler.call_api('get','/user_info',{params: param.param});
		}
	}
});

//report issue by user in setting page
appLungeServices.factory('user_post_req',function(apiCallHandler){
	return { 
		query: function(data){
			return apiCallHandler.call_api('post','/issue_report',{});	
		}
	}
});

/*user new setting save request*/
appLungeServices.factory('update_user',function(apiCallHandler){
	return { 
		query: function(data){
			return apiCallHandler.call_api('post','/update_user',data);	
		}
	}
});

//password change
appLungeServices.factory('update_password',function(apiCallHandler){ 
	return { 
		query: function(password){
			return apiCallHandler.call_api('post','/update_password',password);
		}
	}
});

appLungeServices.factory('update_settings',function(apiCallHandler){
	return { 
		query: function(app_id,data){
			return apiCallHandler.call_api('post','api/settings/'+app_id+'/',data);
		}
	}
});

//send mail
appLungeServices.factory('invitemail',function(apiCallHandler){
	return { 
		query: function(data){
			return apiCallHandler.call_api('get','/invite_mail',{params:data}); 	
		}
	}
});

//get invite id
appLungeServices.factory('getinvite_id',function(apiCallHandler){
	return { 
		query: function(app_id){
			return apiCallHandler.call_api('get','/get_inviteId/'+app_id+'/');
		}
	}
});

appLungeServices.factory('getstatus',function(apiCallHandler){
	return { 
		query: function(app_id){
			return apiCallHandler.call_api('get','/api/get_status/'+app_id+'/');
		}
	}
});

appLungeServices.factory('email_retargeting',function(apiCallHandler){
	return { 
		query: function(app_id,param){
			return apiCallHandler.call_api('get','/api/emails/'+app_id+'/',{params: param});
		}
		 
	}
});

appLungeServices.factory('ids_retargeting',function(apiCallHandler){
	return { 
		query: function(app_id,param){
			return apiCallHandler.call_api('get','/api/adid/'+app_id+'/',{params: param});
		}
	}
});

appLungeServices.factory('callaudienceList',['$resource',function($resource){
	return $resource('/api/list_segments/:appid', {}, {
	    query: {method:'GET',params:{}, isArray:false}
	});	    
}]);
