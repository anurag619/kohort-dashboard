
appLungeServices.service('filter_groups_service',function(){
	this.edit = function(item){
		mapData = {
		  	'date': ['Date','date',false,[],'',false],
		  	'aqua': ['Acquisition','campaign',false,['Channel','Source'],'Channel',true],
		  	'engage': ['Engagement','user_life_time',true,['Total Time Spent in App','Time Spent per Session','Number of Sessions'],'Total Time Spent in App',true],
		  	'total_event_count': ['Events','total_event_count',false,[],'',false],
		  	'total_crashes': ['Crashes','total_crashes',false,[],'',false],
		  	'app_version': ['App version','app_version',false,[],'',false],
		  	'location': ['Location','location_city',false,['City','Country'],'City',true],
		  	'perform': ['Performance','total_anr',true,['ANR'],'ANR',true],
		  	'avg_internal_space_left': ['Space Left on Device','avg_internal_space_left',true,['Internal', 'Total', 'External'],'Internal',true],
		  	'os': ['OS','os',false,[],'',false],
		  	'device_model': ['Model','device_model',false,[],'',false],
		  	'screen': ['screen','device_screen_aspect',false,['Aspect','Density','Size'],'Aspect',true],
		  	'device_mem': ['Memory','device_mem',false,[],'',false],
		  	'competitors': ['Competitors','competitors',false,[],'',false],
		  	'user_last_used': ['Last Used Time','user_last_used',false,[],'',false],
		  	'user_life_time': ['User Lifetime','user_life_time',false,[],'',false],
		  	'network': ['Network','network_carrier',false,['Network Carrier','Network Type'],'Network Carrier',true],
		  	'total_event_count': ['Events','total_event_count',true,[],'',true]
		}
		// return ([currentGroup, group_by, histo_show, child_group, first_child,child_show])
		return mapData[item]
	}
})

appLungeServices.service('processGroup',function(){
	this.edit = function(name){
		mapData = {
			'Campaign': 'campaign',
			'Source': 'source',
			'Total Time Spent in App': 'total_session_duration',
			'Time Spent per Session': 'avg_session_duration',
			'Number of Sessions': 'session_count',
			'City': 'location_city',
			'Country': 'location_country',
			'ANR': 'total_anr',
			'Out of Memory': 'total_onLow_memory',
			'Memory': 'device_mem',
			'Model': 'device_model',
			'Aspect': 'device_screen_aspect',
			'Density': 'device_screen_density',
			'Size': 'device_screen_size',
			'Network Carrier': 'network_carrier',
			'Network Type': 'network_ntype',
			'Internal': 'avg_internal_space_left',
			'External': 'avg_external_space_left',
			'Total': 'avg_total_space_left',
			'Stop': 'total_event_count'
		}
		return mapData[name];
	}
})
