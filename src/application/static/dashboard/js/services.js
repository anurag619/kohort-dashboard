'use strict';

/* Controllers */

var appLungeServices = angular.module('appLungeServices',['ngResource'])

	var url = '';


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


appLungeServices.factory('Querydata1',function($http, $log, $q){
	//console.log('query made')
	return { setquery: function(base,params){

		 
		url = '/api/'+base.base_url+'/'+base.appid+'/' ;
		
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

			url = '/api/'+base.base_url+'/'+base.appid+'/' ;
			   

			var deferred = $q.defer();
			 /*$http.get(url,{params:params})*/
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

appLungeServices.factory('compdata',function($http, $log, $q){
	 
	return { query: function(base,params){

			var deferred = $q.defer();
			 $http.get('/api/'+base.base_url+'/'+base.appid+'/', {params: params})
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
			 $http.get('/api/apps',{params:id.param})
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
	 
	return { query: function(appid,param){

			var deferred = $q.defer();
			 $http.get('/api/list/'+ param +'/'+ appid.appid ,{params: appid.random})
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
	 
	return { query: function(id, param){

		/*var url = '/api/list_collections/'+id.appid+'/'*/
			var url = '/static/mock-response/newapp.json'
			var deferred = $q.defer();
			 $http.get(url ,{params: param})
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

appLungeServices.factory('targettingList',function($http, $log, $q){
	 
	return { query: function(id, params){

		//$http.get(+'/api/'+base.base_url+'/'+base.appid+'/', {params: params})

			//var url = '/static/mock-response/'+base+'.json';
			var url = '/api/list_segments/'+id+'/'
			var deferred = $q.defer();
			 $http.get(url, {param: params})
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


appLungeServices.factory('allcomp',function($http, $log, $q){
	 
	return { query: function(param){

		///api/segments_list/<app_id>/
			var deferred = $q.defer();
			 $http.get('/api/competitors_list/'+ param.appid + '/', {params: {query: param.query},ignoreLoadingBar: true})
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
			 $http.post('/api/add_competitors/'+id+'/', {app_name: param['app_name']})
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
		//console.log(param)
		var deferred = $q.defer();
			$http.post('/api/delete_competitor/'+id+'/',{app_name: param['app_name']})
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
	

	///api/typeahead/<api-id>, 
		//params: query: 'words'/api/segments_list/<app_id>/

			var deferred = $q.defer();
			 $http.get('/api/typeahead/'+ param.appid + '/', {params: {'query': param.value, 'key': param.key},ignoreLoadingBar: true})
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
	 
	return { query: function(params,view){
		var deferred = $q.defer();

	     var rule1 = JSON.stringify(params.filter.rules)
			$http.post('/api/add/'+ view +'/'+params.appid+'/',{_id: params.filter._id, name: params.filter.name, rules: rule1 })
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


appLungeServices.factory('dummydata',function($http, $log, $q){
	 
	return { query: function(){
 
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

appLungeServices.factory('callaudienceList',['$resource',function($resource){
	    
	    return $resource('/api/list_segments/:appid', {}, {
	        query: {method:'GET',params:{}, isArray:false}

	});	    
}])


appLungeServices.factory('user_settings',function($http, $log, $q){
	 
	return { query: function(param){

		var url = '/user_info';
			 
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
//report issue by user in setting page
appLungeServices.factory('user_post_req',function($http, $log, $q){
	 
	return { query: function(data){
		console.log("data")

		console.log(data)

		///api/segments_list/<app_id>/
		
			var deferred = $q.defer();
			 $http.post('/issue_report')
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
appLungeServices.factory('update_user',function($http, $log, $q){
	 
	return { query: function(data){

		 
			var deferred = $q.defer();
			 $http.post('/update_user',data)
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

 
 
//get applist for current user
 
 
//password change
appLungeServices.factory('update_password',function($http, $log, $q){
	 
	return { query: function(password){

		 
			var deferred = $q.defer();
			 $http.post('/update_password',password)
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

appLungeServices.factory('update_settings',function($http, $log, $q){
	 
	return { query: function(app_id,data){

		 	 
			var deferred = $q.defer();
			 $http.post('api/settings/'+app_id+'/',data)
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
//send mail
appLungeServices.factory('invitemail',function($http, $log, $q){
	 
	return { query: function(data){

		 	 console.log(data)

			var deferred = $q.defer();
			 $http.get('/invite_mail',{params:data})
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
//get invite id
appLungeServices.factory('getinvite_id',function($http, $log, $q){
	 
	return { query: function(app_id){

		 	 
			var deferred = $q.defer();
			 $http.get('/get_inviteId/'+app_id+'/')
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
 

appLungeServices.factory('getstatus',function($http, $log, $q){
	 
	return { query: function(app_id){

		 
			var deferred = $q.defer();
			 $http.get('/api/get_status/'+app_id+'/')
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

appLungeServices.factory('email_retargeting',function($http, $log, $q){
	 
	return { query: function(app_id,param){

		var url = '/api/emails/'+app_id+'/';
			var deferred = $q.defer();
			$http.get(url,{params: param})
 
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
		 
 
 
		var url = '/api/adid/'+app_id+'/';
			 
			var deferred = $q.defer();
			$http.get(url,{params: param})
 
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
