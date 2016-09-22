
appLungeServices.service('convertdata',function(){
	this.query =  function(datavalues){

		segmentParams = {
			'Engagement' : ['Push Notifications','Session Duration','Last Used','Life Time'],
			'Device': ['Model','Os Version','RAM','Screen Size','Screen Density','Aspect Ratio'],
			'Screen': ['Screen Size','Screen Density','Aspect Ratio'],
			'Memory': ['Memory'],
			'Storage space': ['Storage Space'],
			'Location': ['Country','City'],
			'Crashes': ['Crashes'],
			'App Version': ['App Version'],
			'OS Version': ['Os Version'],
			'Network': ['Network Type','Network Operator'],
			'Performance': ['Application Not Responding','Device out of memory'],
			'Competitors': ['Competitors'],
			'Events': ['Events']
		}
		return segmentParams[datavalues]
	}
});		

appLungeServices.service('reverse_value',function(){
	this.convert = function(val){
		reverseValues = {
			'device_model': 'Model',
			'device_mem': 'RAM',
			'device_screen_size': 'Screen Size',
			'device_screen_density': 'Screen Density',
			'device_screen_aspect': 'Aspect Ratio',
			'Events': 'Events',
			'location_country': 'Country',
			'location_city': 'City',
			'session_duration': 'Session Duration',
			'user_last_used':'Last Used',
			'user_life_time':'Life Time',
			'space_left_device': 'Storage Space',
			'push_notification_count': 'Push Notifications',
			'anr_count': 'Application Not Responding',
			'crash_count': 'Crashes',
			'low_memory_count': 'Device out of memory',
			'uninstall': 'uninstall',
			'os': 'Os Version',
			'network_ntype': 'Network Type',
			'network_carrier': 'Network Carrier',
			'is_crash': 'crashes',
			'Competitor': 'competitors'
		}
		return reverseValues[val]
	}
});

appLungeServices.service('operator_val',function(){
	this.get = function(val){
		opVals = {
			'Less Than': 'lt',
			'true': 'true',
			'equals': 'eq',
			'false': 'false',
			'Greater Than': 'gt'
		}
		return opVals[val]
	}
});

appLungeServices.service('convert_key',function(){
	this.convert = function(val){
		segmentKeys = {
			'Model': 'device_model',
			'RAM': 'device_mem',
			'Screen Size': 'device_screen_size',
			'Screen Density': 'device_screen_density',
			'Aspect Ratio': 'device_screen_aspect',
			'Events': 'event',
			'Country': 'location_country',
			'City': 'location_city',
			'Session Duration': 'session_duration',
			'Storage space': 'space_left_device',
			'Push Notifications ': 'push_notification_count',
			'Application Not Responding': 'anr_count',
			'crashes': 'crash_count',
			'Device out of memory': 'low_memory_count',
			'uninstall': 'uninstall',
			'Os version': 'os',
			'Network type': 'network_ntype',
			'Network operator': 'network_carrer',
			'crashes': 'is_crash',
			'competitors': 'competitor',
			'App Version':'app_version',
			'Last Used' :'user_last_used',
			'Life Time':'user_life_time'
		}
 		return segmentKeys[val];
	}
});
appLungeServices.service('valueToInsertInSegment',function(){
	this.insertskey_values = function(SegmentVal,SegmentIndex){

		console.log(SegmentVal)

		keys= {

			'Model': ['device_model',['equals'],false,false,'','Device has',''],
			'RAM': ['device_mem',['Less Than','Greater Than','equals'],true,true,'MB','Device has',''],
			'Screen Size': ['device_screen_size', ['equals'],false,false,'','Device has',''],
			'Screen Density':['device_screen_density',['equals'],false,false,'','Device has',''],
			'Aspect Ratio': ['device_screen_aspect',['equals'],false,false,'','Device has',''],
			'Events': ['event',['equals'],false,false,'has occured','',''],
			'Country':['location_country',['equals'],false,false,'','User has',''],
			'City': ['location_city',['equals'],false,false,'','User has',''],
			'Session Duration': ['session_duration',['Less Than','Greater Than','equals'],true,true,'Sec','',''],
			'Storage Space': ['space_left_device',['Less Than','Greater Than','equals'],true,true,'MB','',''],
			'Push Notifications':['push_notification_count',['Less Than','Greater Than','equals'],true,false,'User has',''],
			'Application Not Responding':['anr_count',['Less Than','Greater Than','equals'],true,false,'times','','has occured'],
			//'crashes': ['crash_count',['Less Than','Greater Than','equals'],true,false,'','',''],
			'Device out of memory':['low_memory_count',['Less Than','Greater Than','equals'],true,true,'times','','has occured'],
			'uninstall': ['uninstall',['Less Than','Greater Than','equals'],false,false,'','',''],
			'Os Version':['os',['Less Than','Greater Than','equals'],false,false,'','Device has',''],
			'Network Type': ['network_ntype',['equals'],false,false,'','User has',''],
			'Network Operator': ['network_carrer',['equals'],false,false,'','User has',''],

			'Crashes': ['is_crash',['equals'],false,false,'times','','has occured'],
			'Competitors':['competitor',['equals'],false,false,'','User has installed',''],
			
			'App Version':['app_version',['equals'],false,false,'','User has',''],
			'Last Used' :['user_last_used', ['Less Than','Greater Than','equals'],true,false,'','','' ],
			'Life Time':['user_life_time',['Less Than','Greater Than','equals'],true,false,'','','']
		}
		return keys[SegmentVal]
	}
});
appLungeServices.service('allRules',function(){
	this.rules = function(allrules, nmbRules, i){

		var temp_dic = {};
		var obj = {};

		if(allrules.length>0){

			for(var k=0;k<allrules.length;k++){
				obj = allrules[k];

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
	var eqs = ''
	this.edit = function(seg, datavalues){
		var allrules = [] , nmbRules = {}, segCounter = []
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
					temp_obj.options = {'name' :seg.rules[k][h].val, 'index' :seg.rules[k][h].value};
					temp_obj.unit = seg.rules[k][h].unit;
					temp_obj.label1=seg.rules[k][h].label1;
					temp_obj.label2=seg.rules[k][h].label2;
					temp_obj.numvals = seg.rules[k][h].numvals;
					temp_obj.int_seg = seg.rules[k][h].int_seg;
					temp_obj.segmentList = seg.rules[k][h].segmentList
					var c = seg.rules[k][h].id;
					segCounter.push(temp_obj);
					//logic_ofrules(temp_obj); 	//add rules acc in currentsegment
				}
			}
		}
		seg = {}
		return ([segCounter, c, allrules, nmbRules])
	}

});



appLungeServices.service('reverseGroup',function(){
	this.edit = function(val){ 
					//currentGroup, child_show, child_group, first_child, histo_show
		reverseGroupVals = {
			'date': ['Date',false,[],'',false],
			'avg_internal_space_left': ['Space Left on Device',true,['Internal', 'Total', 'External'],'Internal',true],
			'avg_total_space_left': ['Space Left on Device',true,['Internal', 'Total', 'External'],'Total',true],
			'avg_external_space_left': ['Space Left on Device',true,['Internal', 'Total', 'External'],'External',true],
			'user_life_time': ['User Lifetime',false,[],'',true],
			'user_last_used': ['Last Used Time',false,[],'',true],
			'app_version': ['App Version',false,[],'',false],
			'session_count': ['Session Count',false,[],'',false],
			'total_event_count': ['Total Events',false,[],'',false],
			'os': ['OS',false,[],'',false],
			'competitors': ['Competitor',false,[],'',false],
			'campaign': ['Acquisition',true,['Campaign','Source'],'Campaign',false],
			'source': ['Acquisition',true,['Campaign','Source'],'Source',false],
			'total_session_duration': ['Session Duration',true,['Lifetime','Average'],'Lifetime',true],
			'avg_session_duration': ['Session Duration',true,['Lifetime','Average'],'Average',true],
			'total_pushnotification_events': ['Push Notifications ',true,['Lifetime','Per Session'],'Lifetime',true],
			'avg_pushnotification_events': ['Push Notifications ',true,['Lifetime','Per Session'],'Per Session',true],
			'location_city': ['Location',true,['City','Country'],'City',false],
			'location_country': ['Location',true,['City','Country'],'Country',false],
			'total_crashes': ['Performance',true,['Crashes','ANR','Out of Memory'],'Crashes',true],
			'total_anr': ['Performance',true,['Crashes','ANR','Out of Memory'],'ANR',true],
			'total_onLow_memory': ['Performance',true,['Crashes','ANR','Out of Memory'],'Out of Memory',true],
			'device_model': ['Device Paremeters',true,['Memory','Model','Screen Aspect','Screen Density','Screen Size'],'Model',false],
			'device_mem': ['Device Paremeters',true,['Memory','Model','Screen Aspect','Screen Density','Screen Size'],'Memory',false],
			'device_screen_aspect': ['Device Paremeters',true,['Memory','Model','Screen Aspect','Screen Density','Screen Size'],'Screen Aspect',false],
			'device_screen_density': ['Device Paremeters',true,['Memory','Model','Screen Aspect','Screen Density','Screen Size'],'Screen Density',false],
			'device_screen_size': ['Device Paremeters',true,['Memory','Model','Screen Aspect','Screen Density','Screen Size'],'Screen Size',false],
			'network_carrier': ['Network',true,['Network Carrier','Network Type'],'Network Carrier',false],
			'network_ntype':['Network',true,['Network Carrier','Network Type'],'Network Type',false]
		}
		return reverseGroupVals[val];
	}
});

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
});
appLungeServices.service('chartkeys',function(){
	this.keyconvert = function(val){
		keys = {
			'loyal':'Loyal Users',
			'Churned':'Churned Users',
			'Unengaged':'Unengaged Users',
			'users':'HighRisk Users',
			'newuser':'New Users',
			'uninstalls':'Uninstall Users',
			'installs':'Install Users',
			'activeuser':'Active Users',
			'total_installs':'Total Installs',
			'newuserquery':'New User',
			'installsquery':'Total Installs',
			'newuseruninstall':'Install Users',
			'installsuninstall':'Total Installs'

		}
		return keys[val]
	}
})
appLungeServices.service('bucket_service',function(){
	this.change= function(param){
		bucketSizes = {
			'total_session_duration': 10,
			'avg_pushnotification_events': 10,
			'total_crashes': 10,
			'session_count': 10,
			'user_life_time': 10,
			'user_last_used': 10,
			'total_anr': 10,
			'avg_internal_space_left': 10,
			'network_carrier': 10,
			'device_model': 10,
			'total_crashes': 10,
			'location_city': 10,
			'total_session_duration': 10,
			'total_event_count': 10,
			'campaign': 10,
			'app_version': 10,
			'os': 10
		}
		return bucketSizes[param];
	}
});

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
					} 
					else {
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
});