

appLungeControllers.controller('segmentCtrl', ['$scope', '$state', '$stateParams', '$rootScope', '$filter', '$location', 'clientdata', 'segments','Viewpost','$modal','callviewList','$timeout','convertdata','reverse_value' , 'operator_val','edited_rules','allRules','Viewdelete','allValues','convert_key','limitToFilter','valueToInsertInSegment' , function (a, state, stateParams, rootScope, $filter, location, clientdata,segments_obj, Viewpost,modal,callviewList,timeout,convertdata,reverse_value,operator_val,edited_rules,allRules, Viewdelete,allValues,convert_key,limitToFilter,valueToInsertInSegment) {
 	
 	a.map_icon =["fa fa-heart pull-left","fa fa-filter pull-left","fa fa-map-marker fa-lg pull-left","fa fa-warning pull-left","fa fa-arrows-alt pull-left","glyphicon glyphicon-phone pull-left","glyphicon glyphicon-hdd pull-left","fa fa-line-chart pull-left","fa fa-signal pull-left"]
 	a.key_icon=["Engagement", "Events", "Location", "App Version", "Competitors", "Device", "Storage space ", "Performance", "crashes"]

	a.check_child=['Events','Competitors','App Version','Storage space','Model','Memory','OS Version','Crashes']
	
	var appid = stateParams.app_id;
	a.labelFuncop = true
	rootScope.showgroup = true
	a.del_seg = true;
 	a.labelFunc = false;
	a.operator_check= false
 	rootScope.segmentShow = false; 		//onclick displys all segments
 	rootScope.segments = [];
 	a.segParentVal = 'Push Notifications ';
 	a.segmentkey = ['Push Notifications ','Session Duration','Last Used','Life Time'];
 	a.segmentList = [];
 	a.currentSegment = [];
 	var seg_ids = '';
 	a.editclicked = false; 	//toggles when edit is clicked
 	a.numvals = ['Less Than','Greater Than','equals','true','false'];		//changes acc to datavalues
 	var eqs = '' 		//rendom var
 	a.units = false; 		//units for 3rd dropdown
 	a.save_warning = false;
 	rootScope.filter_show = true;
 	
 	a.availableData = a.all_list.response;
 	a.items = a.availableData["ParameterList"];
 	console.log(a.items)
 	 //maping for icons
 	for(var i = 0; i<a.map_icon.length;i++){
 		a.tem = a.map_icon[i]
 	}
 	a.counter = 0;		//for id of every rule.

	var segId = '0'


 	angular.forEach(segments_obj.response.data ,function(obj){
			rootScope.segments.push((obj));
		})
 	a.getIcons =  function(item){
 		 
 		for(var i =0 ;i<a.key_icon.length;i++){
 			if(item==a.key_icon[i]){
 				return a.map_icon[i]
 			}
 		}
 	}

 	var turls =  rootScope.path.match(/option\/(\w+)/)|| rootScope.path.match(/app\/(\d+)\/(\w+)/);

 	rootScope.seg_applied = rootScope.segments[segId].name;
 	a.nmbRules = {};	//shows numb of rules in every saved segment
 	a.cancel_clicks = 0;
 	a.show_error = false;

 	//function to show/hide segments
 	rootScope.initialize = function(opt){

 		if(opt=='delete'){
 			a.del_seg = true;

 			var temp_segment = {};

 			console.log(a.editnmb)

 			temp_segment.name = a.segment_name;
 			temp_segment.id = a.editnmb;

 			Viewdelete.query({appid:rootScope.app_id, filter: temp_segment }, 'segment').then(function(data){

				if(data.response.status=="success"){
					rootScope.segmentShow = false;
					a.segCounter = [];
					//a.currentsegment = [];
					a.nmbRules = {};
					a.allrules = [];
					a.counter = 0;
					a.segParentVal = 'Push Notifications ';
					a.segmentkey = ['Push Notifications ','Session Duration','Last Used','Life Time'];
					rootScope.seg_applied = rootScope.segments[0].name;

					for(var t=0; t<rootScope.segments.length;t++){
						if(rootScope.segments[t]._id == a.editnmb){
							rootScope.segments.splice(t, 1)
							break;
						}
					}

					rootScope.master_segment = [[]] ;
					a.storage.filters = rootScope.master_segment;

					console.log(rootScope.segments)
					a.$broadcast('update', {'filter': rootScope.master_segment })		//now change state
					rootScope.segmentShow = false; 		//onclick displays all segments
				 	
				}
			},function (error){
				console.log(error)
			})

		}

 		if(opt=='showsegments'){
 			a.segment_name = ''
 			a.del_seg = false;
           
 			a.counter =0;

 			//console.log(a.counter)

 			var datas = a.segParentVal;
 			a.editclicked = false;
 			rootScope.segmentShow = true; 
 			a.nmbRules = {};
 			a.segParentVal = 'Engagement';
 			a.operator='equals'
 			a.segmentList = ''
 			segmentkey = 'push_notification_count';
 			a.numvals = ['Less Than','Greater Than','equals']; 		
 			a.int_seg = false;
 			a.units = false; 
 			a.unit = ''
 			a.operator = 'equals';
 			a.segmentkey = convertdata.query(a.segParentVal); 

 			console.log(a.segmentkey)
 		
	 		a.segCounter[0] = {'datavalues': a.segmentkey[0],
 				 'options': '', 'id': 0, 'rule': '', 'parent': a.segParentVal,
 				  "numvals": a.numvals,'segmentparams': a.segmentkey,
 				  'segmentList': a.segmentList,'operator':a.operator, 'label1': 'User Has'}
 		}
 		if(opt=='hidesegments'){
 			a.del_seg = false;

 			if(a.currentSegment.length>0){

 				if(a.cancel_clicks%2==0){

	 				a.show_error = true;
	                $("#success-alert").fadeTo(2000, 500).slideUp(500);   
	 			}

	 			if(a.cancel_clicks%2==1){

	 				a.show_error = false;

	 				a.save_warning = false;
					rootScope.segmentShow = false;
		 			a.segCounter = [];
		 			a.segCounter1 = [];
		 			a.currentSegment = [];	 
		 			a.segParentVal = 'Push Notifications ';
		 			a.segmentkey = ['Push Notifications ','Session Duration','Last Used','Life Time'];
		 			a.nmbRules = {};
 					a.allrules = [];
 					//c = 0;
	 			}

	 			a.cancel_clicks = a.cancel_clicks +1;
	 		}
	 		if(a.currentSegment.length==0){

	 			a.show_error = false;
 				a.save_warning = false;
				rootScope.segmentShow = false;
	 			a.segCounter = [];
	 			a.currentSegment = [];
	 			a.segParentVal = 'Push Notifications ';
		 		a.segmentkey = ['Push Notifications ','Session Duration ','Last Used','Life Time'];
	 			a.nmbRules = {};
 				a.allrules = [];
 				//c = 0;

	 		}
 		}
 	}
	var numValues = ['Session Duration','Last Used','Life Time'];

 	var segmentkey = '';
 	var random_trigger = false; 	//toggles in case of edit feature
 	var temp_rules_added = [];
 	var temp_obj = {};
 	var temp_parent = [];
 	var only_text = true;
 	a.type_list = []
 	var type_obj = {};
 	var temp_seg_list = [];
	var temp_seg = {};
	a.segCounter = [];
	a.clicked = 'or'
	a.allrules = [];	//stores categories wise rules
	a.ops = 'eq';
	a.seg_parents = [];
	var duplicate = false;

	a.total = 100;

	a.value_query = function(val, key){


		var key_send = convert_key.convert(key)
		
		return allValues.query({'appid': rootScope.app_id, 'key':key_send, 'value': val })
			.then(function(data){

			return limitToFilter((data.response.result), 15);
		})
		
	}

	//check menu options and create new rules acc
 	a.valuechange = function (key) {

 		for(var i=0;i<a.check_child.length;i++){

		    if(key==a.check_child[i]){
		        a.labelFunc=true;
		        labelFuncop = false
		        a.operator_check = false
		        break;
		    }else{ 
		        a.labelFunc = false;
		        labelFuncop = true
				a.operator_check= false
		    }
		}


		if(!a.labelFunc){
			a.labelFunc_operator = true
		}
 		temp_parent = [];
 		a.counter=0;
 
		a.clicked = 'and';

		a.segCounter = [];
		a.segParentVal = String(key);

		a.segmentkey = convertdata.query(a.segParentVal); 	//get params from service.
				

		var random_trigger = false;
		temp_rules_added = [];

		
		//insert datavalues and their rules in separate obj to show in add
		if(a.editclicked==false){

			for(var i=0;i<a.allrules.length;i++){
				
				if(a.allrules[i].parent==a.segParentVal){
					temp_parent.push(a.allrules[i].parent)

					for(var j=0;j<a.allrules[i].rules.length;j++){

						temp_obj = {};
						temp_obj[a.segParentVal] = a.allrules[i].rules[j];	
						temp_rules_added.push(temp_obj)	
					}
				}
			}

			if($.inArray( a.segParentVal, temp_parent ) === -1){

				a.segCounter = [];
				if(a.segParentVal=='Location' || a.segParentVal=='Memory' || a.segParentVal=='Storage space' || a.segParentVal=='Crashes'|| a.segParentVal=='Competitors'|| a.segParentVal=='Events'){
					a.segCounter.push({

						"datavalues": a.segmentkey[0],
						"operator": 'equals',
						"id":a.counter,
						"options": '',
						'segmentparams': a.segmentkey,
						"parent": a.segParentVal
					})
				}else{
					a.segCounter.push({

					"datavalues": a.segmentkey[0],
					"operator": a.numvals,
					"id":a.counter,
					"options": '',
					'segmentparams': a.segmentkey,
					"parent": a.segParentVal
					})
				}

				a.segmentChange(a.segmentkey[0], a.segCounter.length-1) 	//WHY???????????
			}

			if($.inArray( a.segParentVal, temp_parent ) != -1){

				var temp_ob = {}
		 		a.segCounter = [];

		 		angular.forEach(temp_rules_added,function(obj){

					for(k in obj){
						if(k==a.segParentVal){
							temp_ob = {};

							if(obj[k].operator== 'eq'){
								eqs = 'equals'
							}
							if(obj[k].operator== 'true'){
								eqs = 'true'
							}
							if(obj[k].operator== 'false'){
								eqs = 'false'
							}
							if(obj[k].operator== 'lt'){
								eqs = 'Less Than'
							}
							if(obj[k].operator== 'gt'){
								eqs = 'Greater Than'
							}
							
													
							temp_ob = {
								"datavalues": reverse_value.convert(obj[k].key),
								"segmentparams": a.segmentkey,
								"operator": eqs,
								'numvals': obj[k].numvals,
								"options": {'index': obj[k].value, 'name': obj[k].val},
								"id": obj[k].id,
								"rule": obj[k].rule,
								"segmentList" : obj[k].segmentList,
								"parent": obj[k].parent,
								"unit": obj[k].unit,
								"int_seg": obj[k].int_seg,
								"label1":obj[k].label1
							} 
							
							a.counter = obj[k].id;

							console.log(temp_ob)
							a.segCounter.push(temp_ob)
						}
					}		
				})
			}
		}

		if(a.editclicked==true){

			a.seg_parents1 = [];
			a.segCounter = [];
			
			for(var y=0;y<a.allrules.length;y++){

				a.seg_parents1.push(a.allrules[y].parent )
			}

			for(var i=0;i<a.seg_parents1.length;i++){
				if(a.segParentVal==a.seg_parents1[i]){

					random_trigger = true; 		//true when datavalues matches any parent present in the rules.

					for(var k=0;k<a.currentSegment.length;k++){
						for(var h=0;h<a.currentSegment[k].length;h++){

							if(a.currentSegment[k][h].parent==a.segParentVal){
								temp_obj = {};

								if(a.currentSegment[k][h].operator== 'eq'){
									eqs = 'equals'
								}
								if(a.currentSegment[k][h].operator== 'lt'){
									eqs = 'Less Than'
								}
								if(a.currentSegment[k][h].operator== 'gt'){
									eqs = 'Greater Than'
								}
								
								temp_obj.datavalues = reverse_value.convert(a.currentSegment[k][h].rule);
								temp_obj.datavalues = segmentkey;
								temp_obj.rule = a.currentSegment[k][h].rule;
								temp_obj.id = a.currentSegment[k][h].id;
								temp_obj.numvals = a.currentSegment[k][h].numvals
								a.counter = a.currentSegment[k][h].id ;
								temp_obj.operator = eqs;
						 
								temp_obj.options = {'index': a.currentSegment[k][h].value, 'name':a.currentSegment[k][h].val};
								temp_obj.parent = a.segParentVal;
								temp_obj.unit = a.currentSegment[k][h].unit;
								temp_obj.label1 = a.currentSegment[k][h].label1;
								temp_obj.label2 = a.currentSegment[k][h].label2;
								temp_obj.int_seg = a.currentSegment[k][h].int_seg;
								temp_obj.segmentList = a.currentSegment[k][h].segmentList;
								
								a.segCounter.push(temp_obj);
							}
						}
					}
				}

			}

			if(random_trigger==false){

				temp_obj = {};

				temp_obj.datavalues = a.segmentkey[0];
				temp_obj.segmentparams = a.segmentkey;
				//temp_obj.rule = '';
				temp_obj.id = a.counter;
				temp_obj.ops = a.numvals;
				temp_obj.options = '';
				temp_obj.parent = a.segParentVal

				a.segCounter.push(temp_obj);
			}
 		}

 		// var new_obj = {};

 		// new_obj.segmentparams = a.segmentkey;
 		// new_obj.datavalues = a.segmentkey[0]

 		// a.segCounter.push(new_obj)

	}		//a.valuechange ends


 	//1st dropdown values
 	a.segmentChange= function(val, index){

 		//console.log(val, index)
 		a.units = false;
 		a.unit = '';
 		a.labelFuncop =true
 		a.label1 = ''
 		a.label2 = ''
 		
 		//change operator when edit isnt clicked.
 		if(a.segCounter.length==0){

 			for(var i=0;i<numValues.length;i++){
 				if(val == numValues[i]){
 					a.numvals = ['Less Than','Greater Than','equals'];
 				}
 			}
 		}
 
 		resultlistfromservice= valueToInsertInSegment.insertskey_values(val,index)

 			console.log(resultlistfromservice)

			segmentkey = resultlistfromservice[0]
			a.numvals = resultlistfromservice[1]
			a.int_seg = resultlistfromservice[2]
			a.units =resultlistfromservice[3]
			a.unit = resultlistfromservice[4]
			a.label1=resultlistfromservice[5]
			a.label2=resultlistfromservice[6]

 		angular.forEach(a.segCounter, function(obj){

 			if(obj.id == index && obj.parent== a.segParentVal){

 				only_text = false;
 				obj.options = '';
 				obj.numvals = a.numvals;
 				obj.unit = a.unit;
 				obj.int_seg = a.int_seg;
 				obj.label1=a.label1
 				obj.label2 = a.label2
 				
 			}
 		})
 	}

	//function to switch between segments
	rootScope.switchSegments = function(seg){

		a.currentActiveSegment = seg.name;
		a.segParentVal = "Engagement";
		a.currentSegment = seg.rules;
		rootScope.master_segment = a.currentSegment;
		rootScope.filter_query = true;
		a.allrules = [];
		a.nmbRules = {};

		for(var i=0;i<rootScope.segments.length;i++){
			if(rootScope.segments[i]._id==seg._id){
				if(rootScope.segments[i].rules.length==0){
					rootScope.master_segment = [[]]
					break;
				}

			}
		}
		/*if(rootScope.segments[seg._id].rules.length==0){
				rootScope.master_segment = [[]]
	 		
	 	}*/

	 	var all_items =  edited_rules.edit(seg, a.segParentVal, a.allrules, a.nmbRules);
			
		//a.segCounter = all_items[0];
		//c = all_items[1];
		a.allrules = all_items[2];
		a.nmbRules = all_items[3];

		a.storage.filters = rootScope.master_segment;

	 	a.$broadcast('update', {'filter': rootScope.master_segment })

		rootScope.seg_applied = seg.name;
	}

	// or, and logic
	a.decideSegments = function(event,val){

		a.editclicked = false;
		a.edits = true;
		a.loop = true;
		a.decideIndex = a.segCounter.length;

		// for(var h=0;h<a.currentSegment.length;h++){
		// 	for(var t=0;t<a.currentSegment[h].length;t++){
		// 		if(a.currentSegment[h][t].parent==a.segParentVal){
		// 			c = a.currentSegment[h][t].id
		// 		}
		// 	}
		// }
		a.counter = a.counter +1;

		var temp_obj = {};
		var temp_label1= '';
		a.segmentkey = convertdata.query(a.segParentVal);
		temp_label1 =  valueToInsertInSegment.insertskey_values(a.segmentkey[0], val)
		
		temp_obj.id = a.counter;
		temp_obj.rule = event.currentTarget.dataset.value;
		temp_obj.options = '';
		temp_obj.parent = a.segParentVal;
		temp_obj.segmentparams = a.segmentkey;
		temp_obj.datavalues = a.segmentkey[0];

		if(a.segParentVal=="Engagement" || a.segParentVal=="Performance"){
			temp_obj.numvals = ['Less Than','Greater Than','equals'];
		}

		temp_obj.unit = val.unit;			
		temp_obj.operator = 'equals'
		temp_obj.label1 = temp_label1[5]
		temp_obj.label2 = temp_label1[6]

		a.check_prev=false;
		var r=a.segCounter.length-1;

		if(a.segCounter[r].options==""){	
			a.check_prev=true;
			$("#fill-alert").fadeTo(1000,300).slideUp(1500);												 
					  	
		}
		else{
			a.segCounter.push(temp_obj);
		}

		console.log(a.segCounter)
		
 		if(val=='or'){
 			a.clicked = 'or';
 		}

 		if(val=='and'){
 			a.clicked = 'and';

 		}
	}

	//make currentsegment accingdly.
	var logic_ofrules = function(ele){

		temp_seg = {};

		if(a.clicked=='or'){
				 
			temp_seg_list.push(ele);
			a.currentSegment.splice(-1,1)		//remove the last element and insert
			a.currentSegment.push(temp_seg_list);
		}

		if(a.clicked=='and'){
			temp_seg_list = [];
			temp_seg_list.push(ele);
			a.currentSegment.push(temp_seg_list);
		}
	}

	rootScope.editSegments = function(segs){

		a.del_seg = true;
		console.log(segs)
		a.allrules = []
		a.currentSegment = []
		/*a.segParentVal = "Device Params";*/
		a.segParentVal = "Engagement";
		a.segCounter1 = [];
		a.seg_parents = [];
		a.segCounter = [];		//empty adding counter before editing
		a.segment_name = segs.name

		a.editnmb = segs._id;

		a.numvals = ['Less Than','Greater Than','equals','true','false'];

		a.editclicked = true;		//edit is clicked
		rootScope.segmentShow = true;
		a.nmbRules = {}
		a.currentSegment= JSON.parse(JSON.stringify(segs.rules)); 		//empty master storing list

		temp_obj = {};

		temp_obj.datavalues = a.segmentkey;
		//temp_obj.rule = '';
		temp_obj.id = a.counter;
		temp_obj.ops = a.numvals;
		temp_obj.options = '';

		a.segCounter1.push(temp_obj);

		if(segs.rules.length>0){

			a.segCounter = []
			
			//service call to decide edited items
			var all_items =  edited_rules.edit(segs, a.segParentVal, a.allrules, a.nmbRules);
			
			a.segCounter = all_items[0];
			a.counter = all_items[1];
			a.allrules = all_items[2];
			a.nmbRules = all_items[3];
		}
		if(segs.rules.length==0){
			temp_obj = {};

			temp_obj.datavalues = a.segmentkey;
			//temp_obj.rule = '';
			temp_obj.id = c;
			temp_obj.operator = a.numvals;
			temp_obj.options = '';

			a.segCounter.push(temp_obj);
		}

		if(a.segCounter.length==0){
			a.segCounter = a.segCounter1;
		}

		console.log(a.segCounter)
		segs = {}
		a.valuechange("Engagement");
	}

	a.operator_val = function(e, index){


		a.ops = operator_val.get(e)		//convert to code to send
	}

	a.formatLabel = function(nam){

		return nam.name;
	}

	a.type_values = ['device_model','device_screen_aspect', 'device_screen_density','space_left_device',
		'device_screen_size','os','event', 'competitor','location_country','location_city','network_carrier','network_ntype','app_version']

	a.typeahead_func = function(val , id,label1,label2){
		
		a.createSegment(val, id,label1,label2)
	}

	a.type_func = function(val, ids){
	 
		var trig = false;
		var obh = {}

		for(var t=0;t<a.type_values.length;t++){

			if(a.type_values[t] == segmentkey){

				trig = true;

				return
			}
		}

		if(trig == false){
			obh.index = val;
			obh.name = val;

			a.createSegment(obh, ids)
		}
	}
	
 	//creating segments from diff rules
	a.createSegment = function(seg_obj, index,label1,label2){

		duplicate =false;

		console.log(seg_obj, index)

		if(a.segCounter[index]){
			
			for(var h=0;h<a.currentSegment.length;h++){

				if(a.currentSegment[h].length==1){

					if(a.currentSegment[h][0].id==index && a.currentSegment[h][0].parent ==a.segParentVal){

						if(only_text == true){

							a.currentSegment[h][0].value = seg_obj.index;
							a.currentSegment[h][0].val = seg_obj.name;
						}
						if(only_text == false){

							a.currentSegment[h][0].key = segmentkey;
							a.currentSegment[h][0].value = seg_obj.index;
							a.currentSegment[h][0].val = seg_obj.name;
							a.currentSegment[h][0].operator = a.ops;
							a.currentSegment[h][0].parent = a.segParentVal;
							a.currentSegment[h][0].rule = a.clicked;
							a.currentSegment[h][0].unit = a.unit_used;
							a.currentSegment[h][0].label1 = label1
							a.currentSegment[h][0].label2 = label2
							a.currentSegment[h][0].int_seg = a.int_seg;
							a.currentSegment[h][0].segmentList = a.segmentList;

						}

						duplicate = true;
						break;
					}
					
				}
				if(a.currentSegment[h].length>1){

					for(var j=0;j<a.currentSegment[h].length;j++){

						if(a.currentSegment[h][j].id==index && a.currentSegment[h][0].parent ==a.segParentVal){

							if(only_text == true){

								a.currentSegment[h][0].value = seg_obj.index;
								a.currentSegment[h][0].val = seg_obj.name;
							}
							if(only_text == false){

								a.currentSegment[h][j].key = segmentkey;
								a.currentSegment[h][j].value = seg_obj.index;
								a.currentSegment[h][j].val = seg_obj.name;
								a.currentSegment[h][j].operator = a.ops;
								a.currentSegment[h][j].parent = a.segParentVal;
								a.currentSegment[h][j].rule = a.clicked;
								a.currentSegment[h][j].unit = a.unit_used;
								a.currentSegment[h][j].int_seg = a.int_seg;
								a.currentSegment[h][j].segmentList = a.segmentList;
								a.currentSegment[h][0].label1 = label1
								a.currentSegment[h][0].label2 = label2
							}
							
							duplicate = true;
							break;
						}
					}

				}
			}
			only_text = true;
		}
		
		if(duplicate==false){

			var temp_seg = {}

			rules_created = true;
			temp_seg.id = a.counter;
			temp_seg.key = segmentkey,
			temp_seg.value = seg_obj.index;
			temp_seg.val = seg_obj.name;
			temp_seg.parent = a.segParentVal;
			temp_seg.operator = a.ops;
			temp_seg.rule = a.clicked;
			temp_seg.unit = a.unit;
			temp_seg.label1 = a.label1;
			temp_seg.label2 = a.label2;
			temp_seg.numvals = a.numvals;
			temp_seg.int_seg = a.int_seg;
			
			logic_ofrules(temp_seg); 	//add rules acc in currentsegment on OR/AND
			
			a.allrules, a.nmbRules = allRules.rules(a.allrules, a.nmbRules ,temp_seg)
		}
		
		a.segs_parents = [];
		//rootScope.master_segment.push(a.currentSegment);
		
		//to show num of rules of each category
		for(var h=0;h<a.currentSegment.length;h++){
		
			for(var k=0;k<a.currentSegment[h].length;k++){

				elems = a.currentSegment[h][k].parent;
				a.segs_parents.push(elems);
			}
		}

		rootScope.filter_query = true;
		a.counter +=1;

		//console.log(a.currentSegment)
		
		//a.$broadcast('update', {'filters': rootScope.master_segment}) //segment created
	}

	var new_segment = true;
	var params = {};
	seg_ids = parseInt(rootScope.segments[(rootScope.segments.length) -1]._id) ;

	//create segment for post
	a.tempSegment = function(seg){   // to save segment
		new_segment = true;
		a.temp_segment = {};

		if(a.editclicked==true){

			for(var y=0;y<rootScope.segments.length;y++){
				if(seg == rootScope.segments[y].name){
					new_segment = false;
					a.temp_segment._id = rootScope.segments[y]._id; 
				}
			}

			if(new_segment == true){
				a.temp_segment._id = seg_ids +1; 
			}
		}
		else{
			a.temp_segment._id = seg_ids+1; 
		}

		a.temp_segment.name = a.segment_name;
		a.temp_segment.rules = (a.currentSegment);

		Viewpost.query({appid:rootScope.app_id, filter: a.temp_segment}, 'segment').then(function(data){

			if(data.response.status=="success"){

				rootScope.segmentShow = false;
	 			a.segCounter = [];
	 			a.nmbRules = {};
				a.allrules = [];
				
	 			rootScope.seg_applied = a.temp_segment.name;

	 			if(new_segment==true){

	 				rootScope.segments.push(a.temp_segment)
	 			}
	 			else{
 	
	 				for(var y=0;y<rootScope.segments.length;y++){
 					   if(a.temp_segment._id == rootScope.segments[y]._id){
 							rootScope.segments[y] = a.temp_segment;
 						}
 					}
 	 			}
	 			rootScope.master_segment = a.temp_segment.rules;

	 			var all_items =  edited_rules.edit(a.temp_segment, a.segParentVal, a.allrules, a.nmbRules);
			
				//a.segCounter = all_items[0];
				//c = all_items[1];
				a.allrules = all_items[2];
				a.nmbRules = all_items[3];

				console.log(rootScope.master_segment)
				a.storage.filters = rootScope.master_segment;

	 			a.$broadcast('update', {'filter': rootScope.master_segment });

			}
		},function (error){
			console.log(error)
		})
	}
	
	//code to delete segments
	a.deleteSeg = function(id){

		if(id==0){

			if(a.segCounter.length==1){

				a.segCounter[0] = {'datavalues': a.segmentkey, 'ops':a.numvals,
	 				 'options': '', 'id': 0, 'rule': '', 'parent': a.segParentVal,'label1':a.currentSegment.label1,
	 				 'label2':a.currentSegment.label2,'unit':a.currentSegment.unit}

	 			for(var h=0;h<a.currentSegment.length;h++){
				
					for(var j=0;j<a.currentSegment[h].length;j++){
						
						if(a.currentSegment[h][j].id==id && a.currentSegment[h][j].parent==a.segParentVal){

							a.currentSegment.splice(h,1);

							var ina = a.seg_parents.indexOf(a.segParentVal);
							if (ina > -1) {
							    a.seg_parents.splice(ina, 1);
							}

							for(var i=0;i<temp_seg_list.length;i++){

								if(temp_seg_list[i].id==id){
									temp_seg_list.splice(i,1);
								}
							}

							break;
						}
					}
				}

			}
			else{

				for(var k=0;k<a.segCounter.length;k++){
			
					if(a.segCounter[k].id==id && a.segCounter[k].parent==a.segParentVal){
						a.segCounter.splice(k,1);
						break;
					}
				}

				//cannot understand this code. //----------------
				if(id>0){

					for(var e=0; e<a.segCounter.length; e++){
								
						a.segCounter[e].id = id+e;			 		
					}
				}

				//----------------

				for(var h=0;h<a.currentSegment.length;h++){
				
					for(var j=0;j<a.currentSegment[h].length;j++){
						
						if(a.currentSegment[h][j].id==id && a.currentSegment[h][j].parent==a.segParentVal){

							if(a.currentSegment[h].length==1){
								a.currentSegment.splice(h,1);

								for(var i=0;i<temp_seg_list.length;i++){

									if(temp_seg_list[i].id==id){
										temp_seg_list.splice(i,1);
									}
								}

								break;
							}
							else{
								a.currentSegment[h].splice(j,1);
								
								for(var i=0;i<temp_seg_list.length;i++){

									if(temp_seg_list[i].id==id){
										temp_seg_list.splice(i,1);
									}
								}

								if(a.currentSegment[h][j] != (a.currentSegment[h][-1]) ){
							 		a.currentSegment[h][j].id = id;
							 	}
								break;
							}
						}
					}
				}
			}

		}

		else{

			for(var k=0;k<a.segCounter.length;k++){
			
				if(a.segCounter[k].id==id && a.segCounter[k].parent==a.segParentVal){
					a.segCounter.splice(k,1);
					

					if(a.segCounter[k] != (a.segCounter[-1]) ){
					 		a.segCounter[k].id = id;
					 }
					break;
				}
			}

			for(var h=0;h<a.currentSegment.length;h++){
				
				for(var j=0;j<a.currentSegment[h].length;j++){
					
					if(a.currentSegment[h][j].id==id && a.currentSegment[h][j].parent==a.segParentVal){

						if(a.currentSegment[h].length==1){
							a.currentSegment.splice(h,1);

							for(var i=0;i<temp_seg_list.length;i++){

								if(temp_seg_list[i].id==id){
									temp_seg_list.splice(i,1);
								}
							}

							break;
						}
						else{
							a.currentSegment[h].splice(j,1);
							
							for(var i=0;i<temp_seg_list.length;i++){

								if(temp_seg_list[i].id==id){
									temp_seg_list.splice(i,1);
								}
							}

							if(a.currentSegment[h][j] != (a.currentSegment[h][-1]) ){
						 		a.currentSegment[h][j].id = id;
						 	}
							break;
						}
					}
				}
			}
		}

		for(var k=0;k<a.allrules.length;k++){

			for(var j=0;j<a.allrules[k]['rules'].length;j++){

				obj = a.allrules[k]['rules'][j];
				if(a.allrules[k]['rules'][j].id==id && a.allrules[k]['rules'][j].parent==a.segParentVal){

					
					if(a.allrules[k]['rules'].length ==1){

						a.allrules.splice(k,1);
						a.nmbRules[a.segParentVal] = 0
					}
					else{

						a.allrules[k]['rules'].splice(j,1);
						a.nmbRules[a.segParentVal] = a.allrules[k]['rules'].length;
					}

					
					if(a.nmbRules[a.segParentVal] == 0){

						a.nmbRules[a.segParentVal] = '';
					}
					break;
				}
			}
		}
		
		rootScope.master_segment = a.currentSegment;

		console.log(a.currentSegment);
		console.log(a.nmbRules)
		
		//a.$broadcast('update', {'filters': rootScope.master_segment}) //segment created
	}

}])
