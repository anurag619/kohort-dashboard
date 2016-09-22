'use strict';

/* Controllers */

var appLungeServices = angular.module('appLungeServices',['ngResource'])

	//var baseUrl = 'http://130.211.132.184'
	/*var baseUrl = 'http://54.218.19.56:8071'*/

	var baseUrl = '';

	var url = ''

appLungeServices.factory('Querydata',function($http, $log, $q){
	
	return { setquery: function(base,params){

		var url_query = '/static/mock-response/'+'date_series/'+base.base_url+'.json'

		if(base.base_url== 'sessions'){

			base.base_url = 'session';
		}

		if(base.base_url== 'installs'){

			url_query = '/static/mock-response/group_series/installs.json';
		}
			
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

appLungeServices.factory('Querydata1',function($http, $log, $q){
	
	return { setquery: function(base,params){

		url = '/static/mock-response/group_series/group.json';	

		
			var deferred = $q.defer();
			$http.get(url, {params: params})
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

appLungeServices.factory('analyticQuery',function($http, $log, $q){
	 
	return { query: function(base,params){
			url = '/static/mock-response/group_series/'+base.base_url+'.json'
			var deferred = $q.defer();
			 $http.get(url,{params:params})
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

appLungeServices.factory('compdata',function($http, $log, $q){
	 
	return { query: function(base,params){

		url = '/static/mock-response/date_series/competitors.json';

		if(params.group_by!='date'){
			url = '/static/mock-response/group_series/comgroup.json';
		}

			var deferred = $q.defer();
			 $http.get(url, {params: params})
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

appLungeServices.factory('callviewList',function($http, $log, $q){
	 
	return { query: function(appid, param){
		
			if(param == 'audience'){
				url = '/static/mock-response/audience.json';
			}
			if(param = 'segment'){
				url = '/static/mock-response/segment.json';
			}

			var deferred = $q.defer();
			 $http.get(url,{params: appid.random})
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
 

appLungeServices.factory('callAppsList',function($http, $log, $q){
	 
	return { query: function(id){

			var deferred = $q.defer();
			 $http.get('/static/mock-response/apps.json',{params:id.param})
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

 
appLungeServices.factory('clientdata',function($http, $log, $q){
	 
	return { query: function(id){

			var deferred = $q.defer();
			 $http.get('/static/mock-response/newapp.json',{params:id.param})
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


appLungeServices.factory('applist',['$resource',function($resource){
	    return $resource('/static/mock-response/apps.json', {
        query: {method:'GET', isArray:false},
        get: {method:'GET', isArray:false},
	});
}])

appLungeServices.factory('allcomp',function($http, $log, $q){
	 
	return { query: function(param){

		///api/segments_list/<app_id>/
			var deferred = $q.defer();
			 $http.get('/static/mock-response/complist.json', {})
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


appLungeServices.factory('addComp',function($http, $log, $q){
	 
	return { query: function(id,param){

		///api/segments_list/<app_id>/
			var deferred = $q.defer();
			 $http.post(baseUrl+'/api/add_competitor/'+id+'/', {app_name: param['app_name']})
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

appLungeServices.factory('delcomp',function($http, $log, $q){
	 
	return { query: function(id,param){
		
		var deferred = $q.defer();
			$http.post(baseUrl+'/api/delete_competitor/'+id+'/',{app_name: param['app_name']})
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


//to get all values of selected key in segments
appLungeServices.factory('allValues',function($http, $log, $q){
	 
	return { query: function(param){

		var url = ''
	
		if(param == 'device_model'){

			url = '/static/mock-response/segment/device.json'

		}
		if(param == 'os'){
			url = '/static/mock-response/segment/device.json'
			
		}
		if(param == ''){
			
		}
		if(param == ''){
			
		}
		if(param == ''){
			
		}
		if(param == ''){
			
		}

		if(param == ''){
			
		}
			var deferred = $q.defer();
			 $http.get(url, {})
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

//segment api call for post
appLungeServices.factory('Viewpost',function($http, $log, $q){
	 
	return { query: function( params, view){
		var deferred = $q.defer();

			console.log(params.filter.rules)

			$http.post('/api/add/'+ view +'/'+params.appid+'/',{_id: params.filter._id, name: params.filter.name, rules: params.rule })
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


//segment api call for delete
appLungeServices.factory('Viewdelete',function($http, $log, $q){
	 
	return { query: function(params, view){
		var deferred = $q.defer();
			console.log(params.filter.id)

			var t = parseInt(params.filter.id);

			$http.get('/api/delete/'+ view +'/'+params.appid+'/'+t+'/')
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

 

appLungeServices.factory('callTargettingList',['$resource',function($resource){
	    return $resource(baseUrl+'/api/list_segments/:appid', {}, {
	        query: {method:'GET',params:{}, isArray:false}
	});	    
}])

appLungeServices.factory('dummydata',function($http, $log, $q){
	 
	return { query: function(){
 		//url shoul be replaced
		var url = '/static/mock-response/uninstalls.json';

	 

			var deferred = $q.defer();
			 $http.get(url)
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


appLungeServices.factory('callaudienceList',function($http, $log, $q){
	 
	return { query: function(appid){
			url = '/static/mock-response/audience.json';

			var deferred = $q.defer();
			 $http.get(url,{})
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


appLungeServices.factory('user_settings',function($http, $log, $q){
	 
	return { query: function(){
 
		var url = '/static/mock-response/user_setting.json';
			 
			var deferred = $q.defer();
			 $http.get(url)
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
//report issue by user in setting page
appLungeServices.factory('user_post_req',function($http, $log, $q){
	 
	return { query: function(email){

		///api/segments_list/<app_id>/
		
			var deferred = $q.defer();
			 $http.post('/issue_report/'+email+'')
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
/*user new setting save request*/
appLungeServices.factory('user_new_setting',function($http, $log, $q){
	 
	return { query: function(email){

		///api/segments_list/<app_id>/
		debugger;
			var deferred = $q.defer();
			 $http.post('/issue_report/'+email+'')
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

//ga analytics
appLungeServices.factory('ga_analytics',function($http, $log, $q){
	 
	return { query: function(app_id){
		 
 
		var url = '/api/google_cient_data/';

			var deferred = $q.defer();
			 $http({
				    url:url  , 
				    method: "GET",
				    params: {app_id: app_id}
				 })
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


appLungeServices.factory('user_settings',function($http, $log, $q){
	 
	return { query: function(param){

		var url = 'static/mock-response/user_info.json';
			 
			var deferred = $q.defer();
			 $http.get(url,{params: param.param})
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

//email for audience
appLungeServices.factory('email_retargeting',function($http, $log, $q){
	 
	return { query: function(app_id,param){
		 
 
		var url = '/static/mock-response/audience_email.json';
			var deferred = $q.defer();
			 $http({
				    url:url  , 
				    method: "GET",
				    
				 })
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

appLungeServices.factory('ids_retargeting',function($http, $log, $q){
	 
	return { query: function(app_id,param){
		 
 
		var url = '/static/mock-response/audience_ids.json';
			var deferred = $q.defer();
			 $http({
				    url:url  , 
				    method: "GET",
				    
				 })
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
