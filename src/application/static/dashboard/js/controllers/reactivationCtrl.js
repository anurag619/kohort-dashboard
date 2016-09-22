

//reactivation
appLungeControllers.controller('reactivationCtrl', ['$scope', '$rootScope', '$state', '$stateParams','dummydata','Querydata','reactivation','reverse_value','edited_rules','email_retargeting','ids_retargeting' ,'Viewpost', function (a, rootScope, state, stateParams,dummydata,Querydata, reactivation,reverse_value,edited_rules,email_retargeting,ids_retargeting,Viewpost) {
		
		rootScope.showgroup = false;
		rootScope.current = 'reactivation'
		var queryParams={};
		rootScope.histo_show = false;
		rootScope.filter_show = false;
		rootScope.comp_group = true;
		rootScope.filter_show1 = false;
		rootScope.child_show = false;
		a.audience_error = false;
		a.audience_list = []
		a.aud_open = false;

		a.aud_id = '';

		a.audience_list = reactivation.response.data;
		//a.audience_list = []



		if(a.audience_list.length>1){

			a.current_audience = a.audience_list[0].name;
			a.new_modal = true;
			a.aud_open = true;
		}
		else{
			a.new_modal = false;
			a.aud_open = false;
		}

		for(var r=0;r<a.audience_list.length;r++){

			a.aud_id = a.audience_list[r]._id;
		}

		var urls = {
				'base_url': 'uninstalls',
				'appid': rootScope.app_id,
			};

		a.retargeting_rules = JSON.parse(JSON.stringify(a.allrules));

		// a.fb_event = function(){
		// a.show_req = true;
  		// $("#fb-request").fadeTo(2000, 500).slideUp(500);   
		// }

		a.add_audience = function(){

			a.aud_open = true;
			a.new_modal = true;
		}

		a.close_audience = function(){

			a.aud_open = false;
		}

		a.tempAudience = function(val){

			a.temp_audience = {};

			if(val){

				console.log(a.aud_id)

				a.temp_audience.name = val;
				a.temp_audience.rules = a.currentSegment;
				a.temp_audience._id = parseInt(a.aud_id) +1;

				Viewpost.query({appid:rootScope.app_id, filter: a.temp_audience}, 'audience').then(function(data){

					console.log(data)

					if(data.response.status=="success"){
		
			 			state.go("app.appId.option.reactivation", 
			 				{appId: stateParams.appId},{reload: true,notify: true})

					}
				},function (error){
						console.log(error)
				})

			}
			else{
				a.audience_error = true;

				$("#audience-alert").fadeTo(1500, 500).slideUp(350); 
				
			}
			
		}

		//value inside table
		a.switchSegmentsAudience = function(seg){

			  
		 	var all_items_aud =  edited_rules.edit(seg, a.datavalues, a.allrules, a.nmbRules);
		 	a.retargeting_rules_table = JSON.parse(JSON.stringify(all_items_aud[2]));

			for(var t=0;t< a.retargeting_rules_table.length;t++){

					for(var u=0;u< a.retargeting_rules_table[t].rules.length;u++){

						var obj = a.retargeting_rules_table[t].rules[u];
						a.retargeting_rules_table[t].rules[u].key = reverse_value.convert(obj.key);

					}
				}

			 return a.retargeting_rules_table
			 
		}
	 
 		a.$on('update', function (event, vals) {

			a.retargeting_rules = JSON.parse(JSON.stringify(a.allrules));

			console.log(a.retargeting_rules) 
			 
			for(var t=0;t< a.retargeting_rules.length;t++){

				for(var u=0;u< a.retargeting_rules[t].rules.length;u++){

					var obj = a.retargeting_rules[t].rules[u];
					a.retargeting_rules[t].rules[u].key = reverse_value.convert(obj.key);
				}
			}
		})


 		a.csvExport_Audience=function(val){
 			var queryParams = {
				'date_start': rootScope.dates[0] || rootScope.starts,
				'date_end': rootScope.dates[1] || rootScope.ends,
				"filters":  [val.rules],
				 
				 
			}
 			email_retargeting.query(rootScope.app_id,queryParams).then(function(data){
 				console.log(data.response)
 				rootScope.JSONToCSVConvertor(data.response.result.values,"Values","Audience Emails")
 			})
 
 		}
 		
 		a.create_Audience = function(val){

 			var queryParams = {
				'date_start': rootScope.dates[0] || rootScope.starts,
				'date_end': rootScope.dates[1] || rootScope.ends,
				"filters":  [val.rules],
				 
				 
			}
 			ids_retargeting.query(rootScope.app_id,queryParams).then(function(data){
 				 
 				rootScope.JSONToCSVConvertor(data.response.result.values,"Values","Facebook ids")
 			})
 		}

		a.getCurrentCSV=function(currentCSV){
		 
		 	dummydata.query().then(function(result){
				 

				  data = result.response.result
				  rootScope.JSONToCSVConvertor(data,  false,currentCSV.options.name);
			})
			
		}
		//Convert to CSV Format

		rootScope.JSONToCSVConvertor = function(JSONData,  ShowLabel,filename) {
		    
		   var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
		    
		   var CSV = '';  
		     
		    for (var i = 0; i < arrData.length; i++) {
		        var row = "";
		       	row += '"' + arrData[i] + '",';
		     	row.slice(0, row.length - 1);
		        CSV += row + '\r\n';

		    }

		    if (CSV == '') {        
		        alert("No Data Found!!  Empty Result");
		        return;
		    }   
		   
		    var fileName = filename;
		    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
		   
		    var link = document.createElement("a");    
		    link.href = uri;
		    
		    link.style = "visibility:hidden";
		    link.download = fileName + ".csv";
		    
		    document.body.appendChild(link);
		    link.click();
		    document.body.removeChild(link);
		}

}])