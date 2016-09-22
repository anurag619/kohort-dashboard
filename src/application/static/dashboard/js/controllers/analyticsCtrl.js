

appLungeControllers.controller('analyticsCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$filter', 'Querydata', 'analyticQuery','Querydata1','getgraphdata','$localStorage','DTOptionsBuilder','DTColumnDefBuilder','chartkeys',
	function (a, rootScope, state, stateParams, $filter, Querydata, analyticQuery,Querydata1,getgraphdata,localStorage,DTOptionsBuilder,DTColumnDefBuilder,chartkeys) {
  		
		rootScope.filter_query = true;
		rootScope.currentstate = rootScope.current;
		rootScope.api_error = false;

    	//var eventval = stateParams.detail || 'uninstall'
    	var groupval = 'date'

		rootScope.dates_apply = false;
		rootScope.tempfilters = []
		rootScope.hideCompGroup = true;
		rootScope.filter_query = false;
		rootScope.showgroup = true;
		a.uninstall_items = [];
		rootScope.filter_show = true;
		a.buckets_applied = false;
		var custom_bucket = '';
		a.previous_page = true;
		
		if(rootScope.histo_show == true){
			a.buckets_applied = true
		}

		if(rootScope.current== 'analytics'){

			rootScope.comp_group = false;
		}
		else{
			rootScope.comp_group = true;
		}

		a.uninstall_items.push('uninstalls');
		a.show_uninstall = true;
		a.show_session = true;
		rootScope.currentPage = parseInt(0);
		rootScope.page_set = 1;
		a.pre_page = true;
		a.next_page = false;

		a.setPage = function(page){

			rootScope.page_set = parseInt(page);
			//page = page -1;

			rootScope.currentPage = parseInt(page*10 -10);
			
			a.$broadcast('update', {'alert': 1 });

		}

		var urls = {
				'base_url': rootScope.current,
				'appid': rootScope.app_id,
			};

		if(rootScope.current== 'analytics'){

			urls.base_url = 'loyal'
		}

		if(rootScope.groupbyvalue != 'date'){

			rootScope.groupBy = true;
		}
		else{
			rootScope.groupBy = false;
		}

		rootScope.filter_query = false; //toggles  when filter is added/deleted/edited 

		var temp_vals = [];
		var chart_color = '';
		var cat = [];
		var data = [];
		var custom_len = 6;

		//removes a duplicate entry from the graph
		rootScope.SortOut = function(vals){

			$.each(a.chartConfig["series"], function (k) {
				if (a.chartConfig["series"][k].k == vals) {
					a.chartConfig["series"].splice(k, 1);
					rootScope.duplicate = true;
					//return false;
				}
			});

			$.each(a.columnchart["series"], function (k) {
				if (a.columnchart["series"][k].k == vals) {
					a.columnchart["series"].splice(k, 1);
					rootScope.duplicate = true;
					//return false;
				}
			});
		}

		var queryfunction = function (vals) {

			a.show_installs = false;
			a.show_newuser = false;
			a.show_activeuser = false;
			a.show_uninstall = true;
			a.show_session = true;
			a.show_user = false;
			a.show_churn = false
			a.show_unmerge = false;

			var queryParams = {
				'date_start': rootScope.dates[0] || rootScope.starts,
				'date_end': rootScope.dates[1] || rootScope.ends,
				"filters": JSON.stringify(rootScope.master_segment) || [[]],
				'group_by': rootScope.groupbyvalue,
				'event_name': rootScope.eventName,

			}

			Querydata.setquery(urls, queryParams)
				.then(function (result) {
					
					var response = result.response;
					rootScope.resultQuery_downloadCSV = result.response;

					var data = getgraphdata.query(response);

					console.log(data)

					if(rootScope.dates_apply==true ){
						chart_color = '#00a2e3';

						// labels: {
			   //              enabled: false
			   //          }

						a.chartConfig["series"] = [{
							"name": urls.base_url,
							"k": "",
							'color': chart_color,
							"data": data,
							"lineWidth": 4
						}]
					}

					if (rootScope.groupBy == false && rootScope.filter_query == false 
							&& rootScope.dates_apply==false) 
					{
					 
						if(urls.base_url=='uninstalls'){
							chart_color = '#00a2e3'
						}
						
						if(urls.base_url=='session'){
							chart_color = '#7b2b80'
						}
						if(urls.base_url=='user'){
							chart_color = '#f47b1e'
							
						}

						a.chartConfig["series"].push({
							"name": urls.base_url,
							"k": urls.base_url,
							'color': chart_color,
							"data": data,
							"lineWidth": 4
						})
					}

					if (rootScope.groupBy == false && rootScope.filter_query == true) {

						console.log('fiilter entered')
	
						a.chartConfig["series"] = [{
							"name": urls.base_url,
							"k": urls.base_url,
							"data": data,
							"lineWidth": 4
						}]
					}

				},function (error){
					rootScope.api_error = true

	                $("#success-alert-btn").fadeTo(5000, 500).slideUp(500);
					 
				});
		} //queryfunction ends

		var allGroup = function(){

			rootScope.bucket_numb = 8;
			var turls =  rootScope.path.match(/option\/(\w+)/)|| rootScope.path.match(/app\/(\d+)\/(\w+)/)  
			rootScope.current = (turls[1]);
			urls.base_url = rootScope.current;

			a.show_installs = false;
			a.show_newuser = false;
			a.show_activeuser = false;
			a.show_uninstall = true;
			a.show_session = true;
			a.show_user = false;
			a.show_churn = false;
			a.show_unmerge = false;

			var un_rate =''
			cat = [];
			data = [];

			if(rootScope.current == 'analytics'){
				urls.base_url = chartkeys.keyconvert('loyal')
			}

			var queryParam = {
				'date_start': rootScope.dates[0] || rootScope.starts,
				'date_end': rootScope.dates[1] || rootScope.ends,
				"filters": JSON.stringify(rootScope.master_segment)|| [[]],
				'group_by': rootScope.groupbyvalue,
				'buckets_size': rootScope.bucket_size,
				'event_name': rootScope.eventName,
				'sort_by': 'value',
				'order': 'decreasing',
				'offset': rootScope.currentPage,
				'limit': 10
				
			}


			var graph_name = ''
			var catz =[];
			a.pages = [];

			Querydata1.setquery(urls, queryParam).then(function (result1) {

				var res = result1.response;
				for(var h=1;h<= parseInt(res.result.pages);h++){

					a.pages.push(h);
				}

				console.log(res)

				a.last_page = parseInt(res.result.pages);
				
				//res.result.values = res.result.values.sort()
				a.dtOptions = DTOptionsBuilder.newOptions().withOption('aaSorting', []);

				//a.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(10);
			    

				rootScope.tablecontent = res;
				
				for (var j = 0; j < rootScope.tablecontent.result.values.length; j++) {


					cat.push(rootScope.tablecontent.result.values[j][0]);
					data.push(rootScope.tablecontent.result.values[j][1]);
				}

				graph_name = urls.base_url;

				if(urls.base_url=='uninstalls'){
						chart_color = '#00a2e3'
				}
				
				if(urls.base_url=='loyal'){
					chart_color = '#7b2b80'
				}
				if(urls.base_url=='users'){
					chart_color = '#f47b1e'
					
				}
				
				a.columnchart.series = [{"name": graph_name, 'color': chart_color, data: data }];
				a.columnchart.xAxis = {categories: cat}
				
				console.log(rootScope.tablecontent)
				
			},function(error){
				rootScope.api_error = true

	            $("#success-alert-btn").fadeTo(5000, 500).slideUp(500);
			});
		}

		if(rootScope.groupBy==true){

			urls.base_url = 'uninstalls';

			allGroup();			
		}

		if(rootScope.groupBy==false){

			queryfunction({ dates: [], group_by: stateParams.group, filters: [[]] });
		}

		a.show_installs = false;
		a.show_newuser = false;
		a.show_activeuser = false;
		a.show_churn = false;
			a.show_unmerge = false;

		//handles new uer, installs, active user click
		a.anotherquery = function(vals){

				var queryParams = {
					'date_start': rootScope.dates[0] || rootScope.starts,
					'date_end': rootScope.dates[1] || rootScope.ends,
					"filters":  JSON.stringify(rootScope.master_segment),
					'group_by': rootScope.groupbyvalue||'date',
					'num_buckets': rootScope.bucket_numb,
					'sort_by': 'custom',
					
				}

				if(rootScope.groupBy==true){

					queryParams.custom_buckets = JSON.stringify(custom_bucket);

				}
				
				rootScope.duplicate = false;

				if(vals=='loyal'){
						a.new_param = 'loyal';

						//rootScope.current = 'sessions';
						a.show_session = !a.show_session;
						chart_color = '#7b2b80'

					}
					if(vals=='Churned'){
						a.new_param = 'churn';
						//rootScope.current = 'sessions';
						a.show_churn = !a.show_churn;
						chart_color = '#336600'

					}
					if(vals=='Unengaged'){
						a.new_param = 'unengaged';
						//rootScope.current = 'sessions';
						a.show_unmerge = !a.show_unmerge;
						chart_color = '#660033'

					}


				if(vals=='users'){
						a.new_param = 'highRisk';
						//rootScope.current = 'users';
						a.show_user = !a.show_user;
						chart_color = '#f47b1e'

					}

				if(vals=='newuseruninstall'){
						a.new_param = 'newuser';
						//rootScope.current = 'newuser';
						a.show_newuser = !a.show_newuser;
						chart_color = '#f47b1e' 

					}

				if(vals=='uninstalls'){
						a.new_param = 'uninstalls';
						//rootScope.current = 'uninstalls';
						a.show_uninstall = !a.show_uninstall;
						chart_color = '#00a2e3'
					}

				if(vals=='installsuninstall'){
					a.new_param = 'installs';
					//rootScope.current = 'installs';
					a.show_installs = !a.show_installs;
					chart_color = '#b2bb20'

				}
				 
				if(vals=='installsquery'){
					a.new_param = 'installs';
					//rootScope.current = 'installs';
					a.show_installs = !a.show_installs;
					chart_color = '#b2bb20'

				}
				if(vals=='activeuser'){
					a.new_param = 'users';
					//rootScope.current = 'activeuser';
					a.show_activeuser = !a.show_activeuser;
					chart_color = '#8b0a50'

				}
				if(vals=='newuserquery'){
					a.new_param = 'users';
					//rootScope.current = 'activeuser';
					a.show_activeuser = !a.show_activeuser;
					chart_color = '#8b0a50'

				}


				urls.base_url = a.new_param;
				
				//to remove duplicate entries from the graph
				rootScope.SortOut(vals);

				if (rootScope.duplicate==false){

					analyticQuery.query(urls, queryParams).then(function (result) {

						cat = [];
						data = [];
						var response = result.response;
						
						if( rootScope.groupBy==false){

							var datas = getgraphdata.query(response);
				
							a.chartConfig["series"].push({
								"k": vals,
								"name": chartkeys.keyconvert(vals),
								'color': chart_color,
								"data": datas,
								"lineWidth": 4
							})
						}

						if(rootScope.groupBy==true){


							for (var j = 0; j <  response.result.values.length; j++) {

								cat.push(response.result.values[j][0]);
								data.push(response.result.values[j][1]);
							}
							
							a.columnchart.series.push({"name": chartkeys.keyconvert(vals),'color': chart_color, 'data': data, 'k': vals });
							a.columnchart.xAxis = {categories: cat};
				
						}
					 
					},function (error){
						rootScope.api_error = true
						$("#success-alert-btn").fadeTo(5000, 500).slideUp(500);
					});

				}				
		}


		//called when there is change of groupby,dates,filters
		a.$on('update', function (event, vals) {

			//a.$broadcast('update', {'filter': rootScope.master_segment })

			for (k in vals){

				if(k=='dates'){

					rootScope.dates_apply = true;
				}

				if(k=='group'){
					if(vals.group != 'date'){

						urls.base_url = 'uninstalls';
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

			if (a.chartConfig["series"].length > 1) {
				a.chartConfig["series"] = [a.chartConfig["series"][0]]
			}

			if(rootScope.groupBy==false){
				queryfunction('q');
			}
			if(rootScope.groupBy==true){
				allGroup();
			}

		}) //update ends
 
		//main chart without groupby data.
		a.chartConfig = {

			options: {
				chart: {
					type: 'line',
					zoomType: 'x',
					height: 400,
					
				},
				 
					// scrollbar: {
				 //        enabled: true
				 //    },
				tooltip: {
					shared: true,
					useHTML: true,
					headerFormat: '<small>{point.key}</small><table>',
					pointFormat: '<tr><td style="color: {series.color}">{series.name}:<t> </td>' +
						'<td style="text-align: right"><b>{point.y}</b></td></tr>',
					footerFormat: '</table>',

				},
				legend: {
	                enabled: false,
	                align: 'top',
	                verticalAlign: 'top',
            		
	                x: 380,
	                y:20
	            },
	           exporting: { enabled: false }
			},
			
			series: [],
			xAxis: {
					startOnTick: true,
					type: 'datetime',
					dateTimeLabelFormats: {
						month: '%b %e, %Y'
					},
					title: {
						text: 'Date'
					},
					
			},
			yAxis: {
				title: {
					text: ''
				}
			},
			title: {
			 	text: ''
			 },
			loading: false,
			background2: '#E0E0E8'
			
			//useHighStocks: true
		};
		
		
		//groupby chart
		a.columnchart = {

			options : {chart: {
			            type: 'column',
			            zoomType: 'x',
			            renderTo: 'chart2',
			       		},
			       	rangeSelector: {
						selected: 1
					},
					tooltip: {
						shared: true,
						useHTML: true,
						headerFormat: '<small>{point.key}</small><table>',
						pointFormat: '<tr><td style="color: {series.color}">{series.name}:<t> </td>' +
							'<td style="text-align: right"><b>{point.y}</b></td></tr>',
						footerFormat: '</table>',

					},

			       	title: {
			            text: ''
			        },
			        exporting: { enabled: false },
			     //    scrollbar: {
				    //     enabled: true
				    // }

				},
			
	        
	        xAxis: {
	            categories: [ ]
	        },
	        yAxis: {
	            // title: {  text: }
	        },
	        
	        plotOptions: {
	            column: {
	                pointPadding: 0.2,
	                borderWidth: 0
	            }
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

}])