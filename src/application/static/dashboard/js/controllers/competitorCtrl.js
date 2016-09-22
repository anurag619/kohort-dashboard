

appLungeControllers.controller('competitorCtrl', ['$scope', '$state', '$rootScope', '$stateParams', '$location', '$http', '$filter', '$modal', 'compdata', 'allcomp', 'addComp', 'delcomp', 'clientdata','all_list','limitToFilter','compGraphdata' ,  function (a, state, rootScope, stateParams, location, http, $filter, $modal, compdata, allcomp, addComp, delcomp, clientdata, all_list,limitToFilter,compGraphdata ) {
 
 	rootScope.api_error_comp = false
	rootScope.comp_group = false;
	rootScope.showgroup = true
	a.reload = false;
	rootScope.filter_show = true;
	rootScope.compToshow = false;
	a.compToShow = true;
	a.comp_error = false;
	a.comps= [''];
	a.comptable = {};
	
 
	a.compPDFConvert = function() {
		/*if(stateParams["group"] == "date"){*/
		if(rootScope.groupbyvalue == "date"){
			var chartobj = a.compchart.getHighcharts()
        	chartobj.exportChart({type: 'application/pdf', filename: rootScope.currentstate}, {subtitle: {text:''}});
		}else{
			var chartobj = a.compchart1.getHighcharts()
        	chartobj.exportChart({type: 'application/pdf', filename: rootScope.currentstate}, {subtitle: {text:''}});
		}
	}
  
	rootScope.competitors = all_list.response.competitors;
	//rootScope.competitors = []

	//a.storage.groupbyvalue = 'date'
	
	//rootScope.currentGroup = 'date';

	console.log(rootScope.groupbyvalue, rootScope.groupBy)


	if (rootScope.competitors==undefined || rootScope.competitors.length== 0){
		a.$broadcast('hideCompGroup');

		rootScope.showgroup = false;
		rootScope.filter_show1 = false;
		//rootScope.hideCompGroup = false;
	}
	else {
		rootScope.hideCompGroup = true;
	}  

	//rootScope.hideCompGroup = true;
	rootScope.currentstate = 'competitors';
	rootScope.current = 'competitors';
	rootScope.filter = true;

	var globalval = {};

	a.hideaddComp = false;

	a.setPage = function(page){

		rootScope.page_set = parseInt(page);
		//page = page -1;

		rootScope.currentPage = parseInt(page*10 -10);
		
		console.log(page, rootScope.currentPage)

		a.$broadcast('update', {'alert': 1 });

	}
	
	//To add new competitors
	rootScope.compModal = function () {
		
		rootScope.showgroup = false;
		a.compToShow = false;
		rootScope.histo_show = false;
		rootScope.child_show = false;
		rootScope.filter_show1 = false;

		a.storage.groupbyvalue = 'date'
	 
	};

	a.compchart = {

		options: {
			chart: {
				type: 'line'
			},
			title: {
				text: 'competitors data'
			},

			 legend: {
	            align: 'right',
	            verticalAlign: 'top',
	            layout: 'vertical',
	            x: 0,
	            y: 100,
            	useHTML:true
	        },
	     //    scrollbar: {
		    //     enabled: true
		    // },

		    exporting: { enabled: false },

			subtitle: {
				text: ''
			},
			xAxis: {
				type: 'datetime'
			},

			yAxis: {
				title: {
					text: 'number of users'
				},
				labels: {}
			},
			tooltip: {
				pointFormat: '{series.name} installs <b>{point.y}</b>',
				footerFormat: '</table>',
	            shared: true,
	            useHTML: true
			},
		},
		       noData: {
            // Custom positioning/aligning options
            position: {	
                //align: 'right',
                //verticalAlign: 'bottom'
            },
            // Custom svg attributes
            attr: {
                //'stroke-width': 1,
                stroke: '#cccccc'
            },
            // Custom css
            style: {                    
                //fontWeight: 'bold',     
                //fontSize: '15px',
                color: '#202030'        
            }
        },
		series: []
	};

	a.compchart1 = {

		options: {
			chart: {
				type: 'column',
				renderTo: 'compchart1',
			 
			},

			title: {
				text: ''
			},

			exporting: { enabled: false },
			// scrollbar: {
		 //        enabled: true
		 //    }
		},

		subtitle: {
			text: ''
		},
		xAxis: {
			categories: []
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Number of Users'
			}
		},
		tooltip: {
			headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				'<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
			footerFormat: '</table>',
			shared: true,
			useHTML: true
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0
			}
		},
		series: [],
		       noData: {
            // Custom positioning/aligning options
            position: {	
                //align: 'right',
                //verticalAlign: 'bottom'
            },
            // Custom svg attributes
            attr: {
                //'stroke-width': 1,
                stroke: '#cccccc'
            },
            // Custom css
            style: {                    
                //fontWeight: 'bold',     
                //fontSize: '15px',
                color: '#202030'        
            }
        },
		loading: false
	};

	a.comp = 'competitors';

	var temp_list = [];
	a.pages = [];
	rootScope.currentPage = parseInt(0);
	rootScope.page_set = 1;

	a.compfunction = function (val) {

			a.static_axis_list = [];
			var urls = {
				'base_url': 'competitors',
				'appid': rootScope.app_id,
			};

			var start = ''
			var end = ''
			if (val.dates) {
				start = val.dates[0];
				end = val.dates[1];
			}

			rootScope.compparam = rootScope.randomString(5);

			if (rootScope.groupBy == false) {

				var queryParams = {

					'date_start': start || rootScope.starts,
					'date_end': end || rootScope.ends,
					"filters": JSON.stringify(rootScope.master_segment) || [[]],
					'group_by': rootScope.groupbyvalue,
					'param': rootScope.compparam
				}
			}

			else{

				var queryParams = {

					'date_start': start || rootScope.starts,
					'date_end': end || rootScope.ends,
					"filters": JSON.stringify(rootScope.master_segment) || [[]],
					'group_by': rootScope.groupbyvalue,
					'param': rootScope.compparam,
					'event_name': rootScope.eventName,
					'sort_by': 'key',
					'order': 'decreasing',
					'offset': rootScope.currentPage,
					'limit': 10
				}
			}

			
			if (a.reload == true) {
				queryParams['reload'] = true;
			}

			compdata.query(urls, queryParams, rootScope.groupBy)

			.then(function (result) {
 
				a.compchart.series = [];
				a.pages = [];
				
				var response = result.response;

				if (rootScope.groupBy == false) {

					a.comptable = {}
					var data = compGraphdata.edit(response, rootScope.groupBy);
					//a.compchart.xAxis.categories = []

					// angular.forEach(data.series, function (series) {
					// 	a.compchart.series
					// })
					
					a.compchart.series = data.series;
					if (data.series.length == 0) {
						a.noCompetitors = true;
					}
				} 

				else {

					for(var h=1;h<=response.result.pages;h++){
						a.pages.push(h);
					}

					a.last_page = response.result.pages;

					a.compchart1.xAxis.categories = [];
					var data = compGraphdata.edit(response, rootScope.groupBy)
					a.data2 = {};

					a.data2 = data

					a.compchart1.xAxis.categories = a.data2.categories;

					console.log(a.data2.series)

					for (var i = 0; i < a.compchart1.xAxis.categories.length; i++) {
						x = {};
						x.id = i
						x.name = a.compchart1.xAxis.categories[i]
						a.static_axis_list.push(x)

					}

					a.compchart1.series = a.data2.series
					data = compGraphdata.edit(response, rootScope.groupBy);

					a.logs = []

					for (var k = 0; k < data.series.length; k++) {

						a.logs.push(data.series[k]['data'])
					}

					globalval = a.data2
						 
					a.assign = [];

					for (var x = 0; x < a.logs[0].length; x++) {
						var tempdataassign = [];
						for (var k = 0; k < a.logs.length; k++) {
							for (var j = k; j <= k; j++) {
								tempdataassign.push(a.logs[k][x])
								a.val = 3;
							}
						}
						a.assign.push(tempdataassign);

					}
					a.comptable = {}

					a.comptable['categories'] = data.categories;
					a.comptable['data'] = a.logs;

					a.comps = [];
					a.comps.push('GroupBy');

					for (var i = 0; i < data.series.length; i++) {
						a.comps.push(data.series[i]['name'])
					}
				}
			}, function (error) {
				rootScope.api_error_comp = true
				$("#success-alert-btn-comp").fadeTo(5000, 500).slideUp(500);
		 	
			});

		} //queryfunction ends
	
	a.compfunction({dates: [],group_by: stateParams.group,filters: [[]] });

	a.$on('update', function (event, vals) {

		for (k in vals){

			if(k=='dates'){

				urls.base_url = 'competitors';
				rootScope.dates_apply = true;
			}

			if(k=='group'){
				if(vals.group != 'date'){

					console.log('logged')
					rootScope.groupBy = true;
				}
			}

			if(k=='filter'){

				rootScope.filter_query = true;
			}

			if(k=='buckets'){

				a.buckets_applied = true;
			}

			if(k=='buckets_size'){

				a.buckets_applied = true;
			}
		} 


		a.compfunction(vals);
	})

	a.datalists = [];

	a.comp_query = function(name) {

		return allcomp.query({appid: rootScope.app_id, query: name}).then(function(data){

			return limitToFilter((data.response.result), 15);
		})
	};

	a.delComp = function (val) {

		a.comp_v = String(val.currentTarget.dataset.val);
		rootScope.compparam = a.comp_v;

		angular.forEach(rootScope.competitors,function(i){
			
			if(rootScope.competitors[i]==a.comp_v){
				rootScope.competitors.splice(i,1);
			}
		})
		
		var queryParams = {
			
			'app_name': a.comp_v
		}
		
		delcomp.query(rootScope.app_id, queryParams)

			.then(function(result){

				a.reload = true;

				//a.compfunction({dates:[] , group_by: stateParams.group , filters: [[]] });
				state.go("app.appId.segment.segmentId.option.competitors.group",
					{appId: stateParams.appId,segmentId:'0',group:'date'},
				{reload: true,  notify: true})

			},function(error){
				 rootScope.api_error_comp = true
				$("#success-alert-btn-comp").fadeTo(5000, 500).slideUp(500);
			})
	}

	a.addcompetitor = function (data1) {
        var data = a.comp_name;
		if(data){
			a.comp_error = false;

			rootScope.competitors.push(data)
			var queryParams = {'app_name': data}

			addComp.query(rootScope.app_id, queryParams)
				.then(function(result){

					a.reload = true;
					 
					state.go("app.appId.option.competitors",{appId: stateParams.appId},
					{reload: true,  notify: true})

				},function(error){
					rootScope.api_error_comp = true
					$("#success-alert-btn-comp").fadeTo(5000, 500).slideUp(500);
				})
		}
		else{

			a.comp_error = true;
    		$("#comp-alert").fadeTo(1000, 500).slideUp(500);
		}
	}

	a.compCSVConvert = function(){
		/*if(stateParams["group"] == "date"){*/
		if(rootScope.groupbyvalue == "date"){

			var chartobj = a.compchart.getHighcharts()
			var fileName = rootScope.currentstate;
			
		}else{
			var chartobj = a.compchart1.getHighcharts()
			var fileName = rootScope.currentstate+" Group by("+rootScope.groupbyvalue+")";

		}

		
			var uri = 'data:text/csv;charset=utf-8,' + escape(chartobj.getCSV());
			var link = document.createElement("a");    
			link.href = uri;
			   
		    link.style = "visibility:hidden";
		    link.download = fileName + ".csv";
		    
		    document.body.appendChild(link);
		    link.click();
		    document.body.removeChild(link)
	 	
	}
	a.compPNGConvert = function(){
		/*if(stateParams["group"] == "date"){*/
		if(rootScope.groupbyvalue == "date"){

			var chartobj = a.compchart.getHighcharts()
			var fileName = rootScope.currentstate;
			chartobj.exportChart({type: 'image/jpeg', filename: rootScope.currentstate}, {subtitle: {text:''}});
			
		}else{
			var chartobj = a.compchart1.getHighcharts()
			var fileName = rootScope.currentstate+" Group by("+rootScope.groupbyvalue+")";
			chartobj.exportChart({type: 'image/jpeg', filename: rootScope.currentstate}, {subtitle: {text:''}});
		}
		 
	}

}])