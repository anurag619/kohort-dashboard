/* Controllers */

var appLungeControllers = angular.module('appLungeControllers',['highcharts-ng'])
	 
//ref: angular-ui.github.io/bootstrap/
var ModalInstanceCtrl = function ( $scope, $modalInstance) {
	$scope.app_name = ''
	$scope.ok = function () {
		$modalInstance.close(this["app_name"]);
	};
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
};
var newModalInstanceCtrl = function($scope,$modalInstance){
	$scope.ok = function () {
		$modalInstance.close();
	};
	$scope.cancel = function () {
		$modalInstance.dismiss();
	};
}
var errorModalInstanceCtrl = function($scope,$modalInstance){
	$scope.ok = function () {
		$modalInstance.close();
	};
	$scope.cancel = function () {
		$modalInstance.dismiss();
	};
}

//what all it do is 'load apps, give an option to add new app, tour controller'
appLungeControllers.controller('appsCtrl', ['$scope', '$rootScope', '$stateParams', '$state', '$http', '$filter', 'apps', '$modal', '$location', 'Querydata','user_settings','clientdata','$localStorage' ,
	function (a, rootScope, stateParams, state, http, filter, apps_obj, $modal, location, Querydata,user_settings,clientdata,localStorage) {
	
	rootScope.filter_show1 = true;
	rootScope.dates = ''
	a.temp_apps = apps_obj.response.apps
	rootScope.apps = [];
	rootScope.master_segment = [[]] 	//no filters at first
	rootScope.child_show = false;
	a.storage = localStorage;

	a.storage = localStorage;

	rootScope.randomString =  function (len, an){
	    an = an&&an.toLowerCase();
	    var str="", i=0, min=an=="a"?10:0, max=an=="n"?10:62;
	    for(;i++<len;){
	      var r = Math.random()*(max-min)+min <<0;
	      str += String.fromCharCode(r+=r>9?r<36?55:61:48);
	    }
	    return str;
	}

	var random = rootScope.randomString(3);
	rootScope.path = location.url()
           
	param = {}; 
 	param.param = random;

	/*user_settings.query(param).then(function(data){
		rootScope.username = data.response.user.first_name +' '+ data.response.user.last_name

	},function (error){
		console.log("error in  user info api")
	});*/

	rootScope.username = "John Disusa"

	rootScope.filter = true;
	angular.forEach(a.temp_apps, function (temp_app) {
		rootScope.apps.push(JSON.parse(temp_app))
	})


	//For selecting another App from dropdown list
	a.changeUrl = function (currentApp) {
	 
		for (var u = 0; u < rootScope.apps.length; u++) {

			if (rootScope.apps[u]._id == currentApp._id) {
				a.current_id = u;
			}
		}
		
		state.go("app.appId.option.uninstalls",
			{appId: a.current_id}, {reload: true,  notify: true})
	}

	a.logout = function(){		//logout and delete any localstorage.

		host = location.host();

		var ur = host+'/'+'logout'

		localStorage.$reset();

		window.location.href= 'logout';
	}

	var cb = function (start, end, label) {
		$('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
		 
	}

	var optionSet1 = {

		startDate: moment().subtract(29, 'days'),
		endDate: moment(),
		minDate: '01/12/2014',
		maxDate: moment(),
		//dateLimit: {days: 60},
		showDropdowns: true,
		showWeekNumbers: true,
		timePicker: false,
		timePickerIncrement: 1,
		timePicker12Hour: true,
		ranges: {
			// 'Today': [moment(), moment()],
			// 'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
			'Last 7 Days': [moment().subtract(6, 'days'), moment()],
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],
			'This Month': [moment().startOf('month'), moment().endOf('month')],
			'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
		},
		opens: 'left',
		buttonClasses: ['btn btn-default'],
		applyClass: 'btn-small btn-primary',
		cancelClass: 'btn-small',
		format: 'MM/DD/YYYY',
		separator: ' to ',
		locale: {
			applyLabel: 'Submit',
			cancelLabel: 'Clear',
			// fromLabel: 'From',
			// toLabel: 'To',
			//customRangeLabel: 'Custom',
			daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
			monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			firstDay: 1
		}
	};

	var optionSet2 = {
		startDate: moment().subtract(7, 'days'),
		endDate: moment(),
		opens: 'left',
		ranges: {
			
			'Last 7 Days': [moment().subtract(6, 'days'), moment()],
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],
			'This Month': [moment().startOf('month'), moment().endOf('month')],
			'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
		}
	};

	$('#reportrange span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
	$('#reportrange').daterangepicker(optionSet1, cb);

	$('#reportrange').on('apply.daterangepicker', function (ev, d) {

		var querydates = [d.startDate.toISOString().split('T')[0], d.endDate.toISOString().split('T')[0]]
		rootScope.dates = querydates;

		//send event call for updates
		a.$broadcast('update', {'dates': querydates }) 
	});

	 
	$('#options1').click(function () {
		$('#reportrange').data('daterangepicker').setOptions(optionSet1, cb);
	});

	$('#options2').click(function () {
		$('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
	});
	$('#destroy').click(function () {
		$('#reportrange').data('daterangepicker').remove();
	});

	rootScope.starts = optionSet1.startDate.toISOString().split('T')[0];
	rootScope.ends = optionSet1.endDate.toISOString().split('T')[0];

 	//To add new APP
	a.appModal = function () {

		var modalInstance = $modal.open({
			templateUrl: 'static/dashboard/partials/modal.html',
			controller: ModalInstanceCtrl,
		});

		modalInstance.result.then(function (app_name) {
			http.post("/api/apps/",{"app_name":app_name}).success(function(data){

				rootScope.apps.push(data)

				for(var u=0;u<rootScope.apps.length;u++){
			
					if(rootScope.apps[u]._id==data._id){
						a.current_id = u;
						
					}
				}

				if (rootScope.apps.length>0){

					state.go("app.appId.option.uninstall",{appId:a.current_id},
					{reload: true,  notify: true})
				}
				else{
					state.go("app.appId.setting",{appId:data._id},
					{reload: true,  notify: true})
				}
			})
		})
	};

	$(".toggle-min").click(function () {
		$("body").toggleClass("nav-min");
	});

	$(".heatmap-events-list .btn").on('click', function () {
		$(this).find('.fa').toggle();
	});

	$(".heatmap-device-list .btn").on('click', function () {
		$(this).parent().parent().find('button').removeClass('btn-primary')
		$(this).addClass('btn-primary')
	});

	a.localupdateUrl = function ($event) {

		var pre_data = $event.currentTarget.dataset['key'];
		a.$broadcast('updateUrl', pre_data);
	}

	a.dashboard = 'dashboard';
	a.analytics = 'analytics';
	a.uninstall = 'uninstalls';
	a.reactivation = 'Reactivation'
	a.comp = 'competitors';
	a.ux = 'ux';
	a.setting = 'setting';
	a.session = 'sessions';
	a.user = 'users';
	a.analysis = 'analysis';
	a.retargeting = 'Re-target';
	a.funnel = 'funnel';
}])





