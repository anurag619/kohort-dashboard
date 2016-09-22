

appLungeControllers.controller('cohortCtrl', ['$scope', '$rootScope', '$state', '$stateParams','Querydata' , function (a, rootScope, state, stateParams,Querydata) {
	
	rootScope.hideCompGroup = false;
	rootScope.showgroup = false;
	rootScope.filter_show1 = false;
	a.onlyforHC = false;
	rootScope.comp_group = true;
	rootScope.child_show = false;

	var Reds = ['#cc4c02', '#ec7014', '#fe9929', '#fec44f', '#fee391',"#E6F2E6","#CCE6CC","#80C080","#4DA64D","#198D19"];
	var BrOrYl = ['#ffffcc','#ffeda0','#fed976','#feb24c','#fd8d3c','#fc4e2a','#e31a1c','#bd0026','#800026']
	var uninstall_colors = ['#f7f4f9','#e7e1ef','#d4b9da','#c994c7','#df65b0','#e7298a','#ce1256','#980043','#67001f']
	var install_colors = ['#fcfbfd','#efedf5','#dadaeb','#bcbddc','#9e9ac8','#807dba','#6a51a3','#54278f','#3f007d']
	var segment_type = "Uninstall";
	var installedOn = "date";
	var segmentsForLast = "date"
	var svg = [];
	var segment = [];
	var segmentText;
	var totalInstalls;
	var totalUnInstalls;
	var totalInstallsRects;
	var totalUnInstallsRects;
	var legend;
	var legendElementWidth = 70;
	var gridSize = 80 ;
	var margin = { top: 50, right: 10, bottom: 30, left: 10 },
	    width = 1500 - margin.left - margin.right,
	    height = 650 - margin.top - margin.bottom;
	var yAxisNames ;
	var xAxisNames ;
	var yAxisNames1 ;
	var file_names = {"Retention": "retention.json", "Churn": "churn.json", "Uninstall": "/static/mock-response/uninstall.json"}
	var colors = {"Retention": Reds, "Churn": BrOrYl, "Uninstall": BrOrYl}
	var xAxisLabels;
	var headingWidth;
	var url = '';
	
	a.cohort_type = 'Uninstalls';

	a.chartContent = {
    	options: {
    		title: {
                text: '' ,
                x: -20 //center
            },
            exporting: { enabled: false },
            chart:{
            	width:950
            },
            loading: false,
				//useHighStocks: true,
            xAxis:{
                title: {
                    text: ''
                } ,
                categories: []	
            },
            yAxis: {
                title: {
                    text: 'Percentage (%)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '%'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
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
    }
		
	function draw_chart() {
		var cohortquery = {
		    	"event_category" : installedOn,
		    	"date_range_type" : segmentsForLast,
		    	"date_start": rootScope.dates[0] || rootScope.starts,
		    	"date_end": rootScope.dates[1] || rootScope.ends,
		    	'filters': JSON.stringify( [[]] ),
				'group_by' : 'date',
				'order':'decreasing'
		};
		urls = {
			'base_url': 'uninstallCohort',
			'appid': rootScope.app_id 
		};
		Querydata.setquery(urls, cohortquery)
			.then(function (result) {
				$("tabContent").empty();
	    		$("chartContent").empty();
				var data = result.response;
				// var data = mydata;
	      		populate_axisNames(data)
	            tempData  = data["result"]["values"];
	            segmentSeries = [];
            	for(i = 1; i < tempData.length; i++){
                	segmentSeries.push({data: tempData[i], name: yAxisNames[i]})
            	}
        		xAxisNames.splice(0, 1);
	            categories_data = []
	            for ( i= 1;i<xAxisNames.length;i++){
	            	categories_data.push(xAxisNames[i])
	            }
	            if (installedOn == 'referrer'){
	            	mainTitle = 'Campaign'
	            }
	            else{
	            	mainTitle = 'Uninstall'
	            }
	            if (segmentsForLast == 'date'){
	            	xTitle = 'Days After'
	            }
	            else if(segmentsForLast == 'week'){
	            	xTitle = 'Weeks After'
	            }
	            else if(segmentsForLast == 'month'){
	            	xTitle = 'Months After'
	            }
	            a.chartContent['series'] = segmentSeries;
	            a.chartContent.options.xAxis.categories = categories_data;
	            a.chartContent.options.title.text = mainTitle;
	            a.chartContent.options.xAxis.title.text = xTitle;
	            a.chartContent.options.chart.width = xAxisNames.length *40;
	    	},function(error){
	    	rootScope.api_error = true
			$("#success-alert-btn").fadeTo(5000, 500).slideUp(500);
	    }); 
	}

	//segments Visualization Logic
	function draw_table() {      
		var queryParams = {
	    	"event_category" : installedOn,
	    	"date_range_type" : segmentsForLast,
	    	"date_start": rootScope.dates[0] || rootScope.starts,
	    	"date_end": rootScope.dates[1] || rootScope.ends,
	    	'filters': JSON.stringify([[]]),
			'group_by' : 'date',
			'order' : 'decreasing'
		};
		urls = {
			'base_url': 'uninstallCohort',
			'appid': rootScope.app_id 
		};
		Querydata.setquery(urls, queryParams)
			.then(function (result) {
			$("tabContent").empty();
	    	$("chartContent").empty();
			var d = result.response;
	      	populate_axisNames(d)
	        var data = [];
	        var temp = d.result.values;
			var modifiedData = []
			modifiedData.push(d.result.total_uninstalls)
			for (i=0;i<temp.length;i++){
				tempdata = []
				for (j=0;j<temp[i].length+1;j++){
					if (j==0){
						tempdata.push(d.result.total_installs)
					}
					else{
						tempdata.push(temp[i][j-1])
					}
				}
				modifiedData.push(tempdata)
			}
	        var total_installs = d.result.total_installs;
	        var total_uninstalls = d.result.total_uninstalls;
	        for (i = 0; i< temp.length; i++){   
	            for(j=0;j<temp[i].length; j++){   
	                newdata = {"row": i+1, "column": j+1, "val": temp[i][j]};
	                data.push(newdata);
	            }
	        }
	       	if (installedOn == 'referrer'){
	       		headingWidth = 2*gridSize;
	       	}
	       	else{
	       		headingWidth = gridSize +30;
	       	}
	       
	        width = xAxisNames.length * gridSize + margin.right+headingWidth;
	        height = yAxisNames.length * gridSize/2 + margin.top + margin.bottom + 3*gridSize;

	        svg = d3.select("tabContent").append("svg")
	            .attr("width", width + margin.left + margin.right)
	            .attr("height", height + margin.top + margin.bottom)
	            .append("g")
	            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	        var xAxis = svg.selectAll(".xAxis")
	            .data(xAxisNames)
	              .enter().append("g")
	              .attr("class", ".xAxis")

	        var xAxisRects = xAxis.append("rect")
	            .attr("x", function(d, i) { return ((i==0 || i==1) ? (i==0?0:headingWidth) : ((i-2)*gridSize + 2*headingWidth))})
	            .attr("y", function(d, i) { return (- gridSize/2); })
	            .attr("width", function(d, i) { return ((i==0 || i==1) ? headingWidth : gridSize)})
	            .attr("height", gridSize/2)
	            .attr("class", "xAxisRect border")
	            .attr("fill",function(d, i) { if (i==0) {return "#778899"} else {return "white"}; })

	        xAxisLabels = xAxis.append("text")
	            .attr("class", "mono xAxisText")
	            .attr('font-family', 'open Sans, sans-serif')
	            .style('font-weight','bold')
	            .html(function(d,i) { if (i==1){
	            							return xAxisNames[i]+' &darr;'
	            						}
	            						else{return xAxisNames[i]} })
	            .attr("x", function(d, i) { if (i==0) { 
	            								return 10 
	            							} 
	            							else if (i==1){
	            								return headingWidth+15;
	            							}
	            							else {
	            								return  (i-2)*gridSize +2*headingWidth+25
	            							}
	            						})
	            .attr("y", function(d, i) { return (- gridSize/2 +23); })
	            

	        var yAxis = svg.selectAll(".yAxis")
	            .data(yAxisNames)
	              .enter().append("g")
	              .attr("class", ".yAxis")

	        var yAxisRects = yAxis.append("rect")
	            .attr("x", function(d, i) { return 0; })
	            .attr("y", function(d, i) { return (i*gridSize/2); })
	            .attr("width", function(d,i) { return headingWidth })
	            .attr("height", gridSize/2)
	            .attr("class", "yAxisRect border")
	            .attr("fill","white")

	        var yAxisLabels = yAxis.append("text")
	            .attr("class", "mono yAxisText")
	            .attr('font-family', 'open Sans, sans-serif')
	            .style('font-weight','bold')
	            .html(function(d,i) { if (i==0){
	            							return yAxisNames[i]+' &rarr;';
	            						}
	            						else{return yAxisNames[i]} })
	            .attr("x", function(d, i) { return (i==0)?5:15})
	            .attr("y", function(d, i) { return (i * gridSize/2 + 23); })

	        totalInstalls = svg.selectAll(".totalInstalls")
	            .data(total_installs)
	              .enter().append("g")
	              .attr("class", ".totalInstalls")

	        totalInstallsRects = totalInstalls.append("rect")
	            .attr("x", function(d) { return headingWidth})
	            .attr("y", function(d,i) { return (i* gridSize/2) +gridSize/2;})
	            .attr("class", "totalInstalls bor")
	            .attr("width", headingWidth)
	            .attr("height", gridSize/2)
	            .attr("fill","white")

	        totalInstallsText = totalInstalls.append("text")
	            .attr("x", function(d) { return 1.2*headingWidth})
	            .attr("y", function(d,i) { return (i* gridSize/2) +gridSize -10})
	            .attr("class", "mono installsText")
	            .text(function(d,i) { return total_installs[i] ; });

	       	colorScheme_installs(total_installs)

	        totalUnInstalls = svg.selectAll(".totalUnInstalls")
	            .data(total_uninstalls)
	              .enter().append("g")
	              .attr("class", ".totalUnInstalls")

	        totalUnInstallsRects = totalUnInstalls.append("rect")
	            .attr("x", function(d,i) { return i*gridSize + 2*headingWidth})
	            .attr("y", function(d) { return 0;})
	            .attr("class", "totalUnInstalls bor")
	            .attr("width", gridSize)
	            .attr("height", gridSize/2)
	            .attr("fill","white")

	        totalUnInstallsText = totalUnInstalls.append("text")
	            .attr("x", function(d,i) { return i*gridSize + 2*headingWidth + 10})
	            .attr("y", function(d) { return gridSize/2 - 10;;})
	            .attr("class", "mono uninstallText")
	            .text(function(d,i) { return total_uninstalls[i] ; });

	        colorScheme_unInstalls(total_uninstalls)

	        segment = svg.selectAll(".segment")
	            .data(data)
	            .enter().append("rect")
	            .attr("x", function(d) { return (d.column -1) * gridSize + 2*headingWidth})
	            .attr("y", function(d) { return (d.row - 1) * gridSize/2 +gridSize/2; })
	            .attr("class", "segment bor")
	            .attr("width", gridSize)
	            .attr("height", gridSize/2)
	            .style("fill", colors[segment_type][0]);
	            
	        segmentText = svg.selectAll(".percentText")
	            .data(data)
	            .enter().append("text")
	            .attr("x", function(d) { return d.column * gridSize - 40 + 2*headingWidth;})
	            .attr("y", function(d) { return d.row * gridSize/2 -4 +gridSize/2})
	            .attr("class", "mono percentText")
	            .text(function(d) { return d.val+"%"; });

	        colorScheme_segment(data);

	        var horizontal_lines = svg.selectAll("lines")
	            .data(modifiedData)
	            .enter().append("line")
	            .attr("x1", function(d){ return headingWidth})
	            .attr("y1", function(d,i) { return (i+1) * gridSize/2 ; })
	            .attr("x2", function(d,i) { return  2*headingWidth + gridSize*((i==0)?(modifiedData[i].length):(modifiedData[i].length-1)) ;})
	            .attr("y2", function(d,i) { return (i+1) * gridSize/2; })
	            .attr("stroke", "gray")

	        var vertical_lines = svg.selectAll("lines")
	            .data(modifiedData)
	            .enter().append("line")
	            .attr("x1", function(d,i) { return  2*headingWidth + gridSize*((i==0)?(modifiedData[i].length):(modifiedData[i].length-1))})
	            .attr("y1", function(d,i) { return (i+1) * gridSize/2; })
	            .attr("x2", function(d,i) { return  2*headingWidth + gridSize*((i==0)?(modifiedData[i].length):(modifiedData[i].length-1))})
	            .attr("y2", function(d,i) { return i * gridSize/2; })
	            .attr("stroke", "gray")

	       	customData = total_installs
	       	customData.push(0)

	        var line_totalInstalls = svg.selectAll("lines")
	        	.data(customData)
	        	.enter().append("line")
	            .attr("x1", function(d,i) { return  2*headingWidth})
	            .attr("y1", function(d,i) { return i*gridSize/2; })
	            .attr("x2", function(d,i) { return  2*headingWidth})
	            .attr("y2", function(d,i) { return (i+1)* gridSize/2; })
	            .attr("stroke", "gray")

	        draw_legend('segment');
	        draw_legend('install');
	        draw_legend('uninstall');

	    }, function (error) {
		 		rootScope.api_error = true
				$("#success-alert-btn").fadeTo(5000, 500).slideUp(500);
			});
	}

	function colorScheme_segment(data){
	    segment_colorScale = d3.scale.quantile()
	                  .domain([50, colors[segment_type].length - 1, d3.max(data, function (d) { return d.val; })])
	                  .range(colors[segment_type]);
	    segment.transition().duration(10)
	                        .style("fill", function(d,i) { return segment_colorScale(data[i].val); });
	}

	function colorScheme_unInstalls(data){
	    uninstall_colorScale = d3.scale.quantile()
	                  .domain([0,(d3.min(data, function (d,i) { return data[i]; })+d3.max(data, function (d,i) { return data[i]; }))/2, d3.max(data, function (d,i) { return data[i]; })])
	                  .range(uninstall_colors);
	    totalUnInstallsRects.transition().duration(10)
	                        .style("fill", function(d,i) { return uninstall_colorScale(data[i]); });
	}

	function colorScheme_installs(data){
	    install_colorScale = d3.scale.quantile()
	                  .domain([ 0, (d3.min(data, function (d,i) { return data[i]; })+d3.max(data, function (d,i) { return data[i]; }))/2, d3.max(data, function (d,i) { return data[i]; })])
	                  .range(install_colors);
	    totalInstallsRects.transition().duration(10)
	                        .style("fill", function(d,i) { return install_colorScale(data[i]); });
	}

	function draw_legend(name){

		var values = {
			'segment': ['.legend','legend',segment_colorScale.quantiles(),1,colors[segment_type],"mono legendText",1.5,"mono legendText","Cohorts",1.2],
			'install': ['.installLegend','installLegend',install_colorScale.quantiles(),2,install_colors,"mono installlegendText",2.5,"mono installText","Total Installs",2.2],
			'uninstall': ['.uninstallLegend','uninstallLegend',uninstall_colorScale.quantiles(),3,uninstall_colors,"mono uninstalllegendText",3.5,"mono uninstallText","Total Uninstalls",3.2]
		}

		//values= [svg_class,attr_class,color_scale_quantiles,rect_yMultiple,rect_fill_color,text_class,text_yMultiple,heading_class,heading_text,heading_yMultiple]

		target_values = values[name];

		legend = svg.selectAll(target_values[0])
	                .data([0].concat(target_values[2]), function(d) { return d; })
	                .enter().append("g")
	                .attr("class", target_values[1]);

	    legend.append("rect")
	      .attr("x", function(d, i) { return headingWidth + legendElementWidth * i; })
	      .attr("y", (yAxisNames.length * gridSize/2) + target_values[3]*gridSize )
	      .attr("width", legendElementWidth)
	      .attr("height", gridSize / 4)
	      .style("fill", function(d, i) { return target_values[4][i]; });

	    legend.append("text")
	      .attr("class", target_values[5])
	      .text(function(d){ if (name == 'segment'){return Math.round(d)+"%";} else {return Math.round(d)} })
	      .attr("x", function(d, i) { return headingWidth + legendElementWidth * i ; })
	      .attr("y", (yAxisNames.length * gridSize/2) + target_values[6]*gridSize );

	    heading_segmentLegend = svg.append("text")
	      .attr("class", target_values[7])
	      .text(target_values[8])
	      .attr("x", 0)
	      .attr("y", (yAxisNames.length * gridSize/2) + target_values[9]*gridSize )
	      .style('font-weight','bold')
	}

	function populate_axisNames(data){
		//update x-axis names 
		xvals = data['result']['values']
		xAxisNames = [];
	    maxlen = 0;
	    for(i=0; i<xvals.length;i++){
	        if (xvals[i].length > maxlen){
	        	maxlen = xvals[i].length;
	        }
	    }
	    var prefix = 'W'
	    if (segmentsForLast == 'date'){
	    	prefix = 'D'
	    }
	    else if (segmentsForLast == 'month'){
	    	prefix = 'M'
	    }
	    if (installedOn == 'referrer'){
	    	xAxisNames.push('Campaign');
	    	xAxisNames.push('Total Installs');
	    	for (i=1;i<=maxlen;i++){
	    		xAxisNames.push(prefix+i);
	    	}
	    }
	    else{
	    	xAxisNames.push('Acq by '+segmentsForLast);
	    	xAxisNames.push('Total Installs');
	    	for (i=1;i<=maxlen;i++){
	    		xAxisNames.push(prefix+i)
	    	}
	    }
	    
	    //update y-axis names
	    yvals = data['result']['keys']
	    yAxisNames = [];
	    yAxisNames.push('Total Uninstalls')
	    if (installedOn == 'referrer'){
	    	for (i=0;i<yvals.length;i++){
	    		yval = JSON.parse(yvals[i]);
	    		campaign_val = yval['campaign'].replace(/_/g , " ");
	    		campaign_val = campaign_val.replace(/campaign/g,"");
	        	yAxisNames.push(yval['source']+' '+campaign_val);
	        }
	    }
        else{
        	for (i=0;i<yvals.length;i++){
        		yAxisNames.push(yvals[i])
        	}
        } 
	}

	a.cohort_type = 'uninstalls';
	
	a.update_cohorts_type = function(param){
		installedOn = param;
		a.cohort_type = param;
		if (param == 'uninstalls'){
			installedOn = segmentsForLast;
			a.cohort_type = 'Uninstalls'
		}
		if(param == 'referrer'){
			a.cohort_type = 'Campaign'
		}
		a.callcohort()
	}

	a.cohort_by = 'date';

	a.update_cohorts_by = function(param1){
		if(param1 == 'date'){
			a.cohort_by = 'Days'
		}
		if(param1 == 'week'){
			a.cohort_by = 'Weeks'
		}
		if(param1 == 'month'){
			a.cohort_by = 'Months'
		}
		segmentsForLast = param1;
		if (installedOn != 'referrer'){
			installedOn = segmentsForLast;
		}
		a.callcohort()
	}

	draw_table(); //Draw Default segments at First

	a.chart_clicked = false;
	a.table_clicked = true;

	a.callcohort = function(){
		if(a.table_clicked==true){
			draw_table();
		}
		if(a.table_clicked==false){

			draw_chart();
		}
	}

	$.ajaxSetup ({ cache: false });

	a.clicked_cli = function(res){
		console.log(res)
		if(res=='table'){
			a.table_clicked = true;
			a.chart_clicked = false;
			a.onlyforHC = false;

		}
		if(res=='chart'){
			a.chart_clicked = true;
			a.table_clicked = false;
			a.onlyforHC = true
		}
		a.callcohort();
	}

	//called when there is change of groupby,dates,filters
	a.$on('update', function (event, vals) {
		for (k in vals){
			if(k=='dates'){
				console.log(vals)
				rootScope.dates_apply = true;
				a.callcohort()
			}
		} 
	}) //update ends

	a.analysisPDFConvert = function() {
		var chartobj = a.chartContent.getHighcharts()
		        	chartobj.exportChart({type: 'application/pdf', filename: a.cohort_type}, {subtitle: {text:''}});
		var chartobj = a.chartContent.getHighcharts()
		    chartobj.exportChart({type: 'application/pdf', filename: a.cohort_type}, {subtitle: {text:''}});   		 
	    	}

	a.analysiscsvConvert = function(){
		var chartobj = a.chartContent.getHighcharts()
			var uri = 'data:text/csv;charset=utf-8,' + escape(chartobj.getCSV());
			var link = document.createElement("a");    
			link.href = uri;
			var filename = "Cohort Analysis"   
		    link.style = "visibility:hidden";
		    link.download = filename + ".csv";
		    document.body.appendChild(link);
		    link.click();
		    document.body.removeChild(link) 
	} 

	a.analysisPNGConvert = function(){
	 		var chartobj = a.chartContent.getHighcharts()
		    chartobj.exportChart({type: 'image/jpeg', filename: a.cohort_type}, {subtitle: {text:''}});	 
	 }   	
}])