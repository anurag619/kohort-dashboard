

angular.module('appLungeControllers').controller('settingCtrl', ['$scope', '$state', '$stateParams', '$rootScope','usersetting','user_post_req','update_user','update_password','update_settings','invitemail','$location', '$localStorage' ,
'getinvite_id','getstatus','$modal',  function (a, state, stateParams, rootScope,usersetting,user_post_req,update_user,update_password,update_settings,invitemail,getinvite_id,getstatus,$modal, location, localstorage ) {
  	
  	a.user = false
 	rootScope.showgroup = false
 	rootScope.filter_show1 = false
 	a.onclickedval = false
 	a.offclickedval = true
 	a.events =[]
  	a.track_event = false
 	 
 	a.settings = false
 	a.facebook_events = false
 	a.trueval = true
 	a.send_email =false
 	a.downloadsdk = false
 	a.email = false
 	a.message = false
 	a.home = true
	a.profile =false
 	a.fbclicked = false
 	 
 	a.sendfb_email = false
 	a.user_anchor = true
 	a.company_anchor = true
 	a.email_anchor = true
 	a.usercompanyval = true
 	a.password_anchor = true
 	a.usernameval = true
 	a.useremailval = true
 	a.userpasswordval = true
 	a.password = false
 	
 	a.already_google_events =true
 	a.google_events_data = false
 	 
 	a.report ={}
 	 
 	a.status =true
 	a.mymodel = []
 	console.log(usersetting.response.user)
 	 
  	a.useraccount_model  = usersetting.response.user
  	rootScope.username = usersetting.response.user.first_name+' '+usersetting.response.user.last_name
	a.applist = usersetting.response.apps	
	a.copydata = angular.copy(usersetting.response.user)

	a.appmodel = a.applist[0]//select first app default
	if(a.appmodel.event_tracking== "Google Analytics" || a.appmodel.event_tracking=="Retention.ai"){
		a.onflag=true
		a.offflag=false
	}else{
		a.onflag=false
		a.offflag=true
	}
	if(a.appmodel.targetting== "Facebook"){
		a.fbflag_on = true
		a.fbflag_off = false
	}else{
		a.fbflag_on = false
		a.fbflag_off = true
	}
	a.onfbclicked = function(){
	 	a.sendfb_email = true
	 	
	 	var data = {}
	 	data["targetting"] = "Facebook"
	 	a.fbflag_on = true
	 	a.fbflag_off = false
	 	update_settings.query(a.appmodel['app_id'],data).then(function(data){
				  a.appmodel.targetting="Facebook"
				 
		},function (error){
			console.log(error)
		})
		 
 	}


 	a.offfbclicked = function(){
	 	a.sendfb_email = false
	 	
	 	var data = {}
	 	data["targetting"] = ""
	 	a.fbflag_off = true
	 	a.fbflag_on = false
		update_settings.query(a.appmodel['app_id'],data).then(function(data){
				  a.appmodel.targetting=""
				 
		})
	  
 	}
 

	a.onclicked = function(){
	 	a.track_event = true
	 	a.send_email =true
	 	 
	 	a.onflag=true
		a.offflag=false
	 	var data ={}
	 	if(a.events[0]["event"]=="I want to define events using Retention.ai"){
	 		data["event_tracking"] = "Retention.ai" ;

 			update_settings.query(a.appmodel['app_id'],data).then(function(data){
				  a.appmodel.event_tracking="Retention.ai"
			},function (error){
				console.log(error)
			})
 		}
 		 

 		if(a.events[0]["event"]=="I already use Google Analytics")	{
 			data["event_tracking"] = "Google Analytics";
 			update_settings.query(a.appmodel['app_id'],data).then(function(data){
				 a.appmodel.event_tracking="Google Analytics"
			
			},function (error){
				console.log(error)
			})
 		}
	 	
	 	
	 	
	 }

	a.offclicked = function(){
		a.track_event = false
		var data ={}
	  
		data["event_tracking"] = "";
		update_settings.query(a.appmodel['app_id'],data).then(function(data){
			a.appmodel.event_tracking=""
		})	
		a.onflag=false
		a.offflag=true
		a.track_event = false
	  	a.send_email =false
	  	 
	 	 
	}
	   
	a.integration_step = function(){
		 
		if(a.appmodel.event_tracking=="Retention.ai"){
			a.events =[{"event":'I want to define events using Retention.ai'},{"event":'I already use Google Analytics'}]
			 
			a.selectga = a.events[0]
			a.onclicked();
	 		
		}else if(a.appmodel.event_tracking=="Google Analytics"){
			a.events =[{"event":'I already use Google Analytics'},{"event":'I want to define events using Retention.ai'}]
			 
			a.selectga = a.events[0]
			a.onclicked();
	 		 
		}else if(a.appmodel.event_tracking==""){
			a.events =[{"event":'I already use Google Analytics'},{"event":'I want to define events using Retention.ai'}]
			a.selectga = a.events[0]
			 
			a.offclicked();
			 
			
		}
 
		if(a.appmodel.targetting=="Facebook"){
			 
			a.onfbclicked() 
		}else{
			 
			a.offfbclicked() 
		}
	}
 

 	a.edit = function(event){
 	 
 		if(event.currentTarget.dataset.value=='username'){
	 		a.user = true;
	 		a.user_anchor = false
	 		a.usernameval = false
 		}else if(event.currentTarget.dataset.value=='email'){
	 		a.email = true;
	 		a.email_anchor = false
	 		a.useremailval = false
 		}else if(event.currentTarget.dataset.value=='company'){
 			a.company = true;
	 		a.company_anchor = false;
	 		a.usercompanyval = false
 		}else if(event.currentTarget.dataset.value=='password'){
 			a.password = true;
	 		a.password_anchor = false;
	 		a.userpasswordval = false
 		}else if(event.currentTarget.dataset.value=='event_track'){
 			a.event_ga= true;
	 		 
	 		 
 		}else if(event.currentTarget.dataset.value=='already_google_events'){
 			 a.change_ga_data = true
 			 a.already_google_events=false

 			  
	 		 
 		}


 		 
 		 
 		 
 	}
 	 
 	a.canceluser = function(event){
 		if(event.currentTarget.dataset.value=='username'){
	 		a.user = false;
	 		a.user_anchor = true
	 	 	a.usernameval = true
	 		a.useraccount_model.first_name = a.copydata.first_name
	 		a.useraccount_model.last_name = a.copydata.last_name
 		}else if(event.currentTarget.dataset.value=='email'){
 			a.email = false;
	 		a.email_anchor = true
	 	 	a.useremailval = true
	 		a.useraccount_model.email = a.copydata.email
 		}else if(event.currentTarget.dataset.value=='company'){
 			a.company = false
	 		a.company_anchor = true
	 	 	a.usercompanyval = true
	 		a.useraccount_model.company = a.copydata.company
 		}else if(event.currentTarget.dataset.value=='password'){
 			a.password = false;
 			a.useraccount_model.newpass=''
 			a.useraccount_model.confirmpass=''
 			a.useraccount_model.pass=''
	 		a.password_anchor = true
	 	 	a.userpasswordval = true
	 		 
	 		a.match_problem = false
	 	 	a.wrong_password = false
	 		 
 		} 
		  
		  

 	}
 	a.saveuser = function(event){
	 		switch(event.currentTarget.dataset.value) {
				    case 'username':
				       a.user = false;
				 		a.user_anchor = true
				 		a.usernameval = true
				 		if(a.useraccount_model.first_name=='' || a.useraccount_model.last_name=='' ){
				 			a.useraccount_model.first_name = a.copydata.first_name
				 			a.useraccount_model.last_name = a.copydata.last_name
				 			rootScope.username = a.useraccount_model.first_name+' '+a.useraccount_model.last_name
				 		}else{
				 		 	update_user.query({first_name:a.useraccount_model.first_name,last_name:a.useraccount_model.last_name}).then(function(data){
				 		 		rootScope.username = a.useraccount_model.first_name+' '+a.useraccount_model.last_name
				 		 		 a.copydata.first_name = a.useraccount_model.first_name
				 		 		 a.copydata.last_name = a.useraccount_model.last_name
							},function (error){
								console.log(error)
							})	
							state.go('app.appId.setting')
							 
						}
				        break;
				     case 'email':
				     	a.email = false;
				 		a.email_anchor = true;
				 	 	a.useremailval = true
				 	 	if(a.useraccount_model.email==''){
				 			a.useraccount_model.email = a.copydata.email
				 		}else{
					 	 	 
					 	 	update_user.query({email:a.useraccount_model.email}).then(function(data){
							 a.copydata.email = a.useraccount_model.email
						},function (error){
							console.log(error)
						})	
							state.go('app.appId.setting') 
						}
	 		 			break;
	 		 		case 'company':	
	 		 			a.company = false;
				 		a.company_anchor = true
				 	 	a.usercompanyval = true
				 	 	if(a.useraccount_model.email==''){
				 			a.useraccount_model.company = a.copydata.company
				 		}else{
				 	 	
					 	 	update_user.query({company:a.useraccount_model.company}).then(function(data){
								 a.copydata.company = a.useraccount_model.company
							},function (error){
								console.log(error)
							})	
							state.go('app.appId.setting')
						}
						break;
					case 'password':
							if(a.useraccount_model.newpass==''||a.useraccount_model.confirmpass==''||a.useraccount_model.pass == ''){
		 						a.match_problem = true
		 					}else{

		 			 		if(a.useraccount_model.newpass==a.useraccount_model.confirmpass){
		 			 			a.match_problem = false
		 			 			a.wrong_password = false
			 			 		update_password.query({current_password:a.useraccount_model.pass,new_password:a.useraccount_model.newpass}).then(function(data){
							 		 
							 		if(data.response.status=="incorrect current password"){
							 			 
							 			a.wrong_password = true
				 			 			a.useraccount_model.pass = ''
				 			 			a.useraccount_model.newpass=''
				 			 			a.useraccount_model.confirmpass = ''
							 		}else{
							 			a.password = false;
							 			a.useraccount_model.newpass=''
							 			a.useraccount_model.confirmpass=''
							 			a.useraccount_model.pass=''
								 		a.password_anchor = true
								 	 	a.userpasswordval = true
			 		 
								 		a.match_problem = false
								 	 	a.wrong_password = false
							 			
							 		}
							 		 
							 	},function (error) {
				 				console.log(error)
				 			});	
		 			 		}else{
		 			 			a.match_problem = true
		 			 			a.wrong_password = false
		 			 			a.useraccount_model.pass = ''
		 			 			a.useraccount_model.newpass=''
		 			 			a.useraccount_model.confirmpass = ''


		 			 		}
		 			 		state.go('app.appId.setting')
		 			 	}
		 				break;
					case 'ga_setup':
						if(a.appmodel.getemail_ga==undefined||a.appmodel.getemail_ga==''){
		 					var newmodalInstance = $modal.open({
								templateUrl: 'static/dashboard/partials/error.html',
								controller: errorModalInstanceCtrl,
							});
		 				}else{	 
		 				  	getinvite_id.query(a.appmodel.app_id).then(function(data){
		 				 		var detail ={}
		 				  		detail["app_id"] =a.appmodel.app_id
		 				  		detail["inviteId"] = data.response.inviteId
		 				  		detail["addr"] = "ga_setup"
		 				  		detail["email"] = a.appmodel.getemail_ga
		 				  		invitemail.query(detail).then(function(data){
									console.log(data)
									a.appmodel.getemail_ga = ''
									var newmodalInstance = $modal.open({
										templateUrl: 'static/dashboard/partials/custom_alert_model.html',
										controller: newModalInstanceCtrl,
									});

								})

		 				  });
		 			}
		 			break;	
		 		case 'fb_setup':
		 			if(a.appmodel.getemail_fb==undefined||a.appmodel.getemail_fb==''){
		 				var newmodalInstance = $modal.open({
							templateUrl: 'static/dashboard/partials/error.html',
							controller: errorModalInstanceCtrl,
						});
 					}else{ 
 					getinvite_id.query(a.appmodel.app_id).then(function(data){
 				 

 				  		var detail ={}
 				  		detail["app_id"] =a.appmodel.app_id
 				  		detail["inviteId"] = data.response.inviteId
 				  		detail["addr"] = "fb_setup"
 				  		detail["email"] = a.appmodel.getemail_fb
 				  		invitemail.query(detail).then(function(data){
							console.log(data)
							a.appmodel.getemail_fb = ''
							var newmodalInstance = $modal.open({
								templateUrl: 'static/dashboard/partials/custom_alert_model.html',
								controller: newModalInstanceCtrl,
							});
						})

 				  }); 
 				}		

				    default:
				        console.log('Somthing goes wrong')
				        break;
				}
			 
			 
			}



 		 
 			 


 	a.google_click = function(){
 		a.classval  = true
 		a.fbclicked =false
 		 
 		a.facbook_events = false
 		a.already_google_events = true
 	}
 	a.facebook_click = function(){
 		a.classval  = false
 		a.fbclicked =true
 		 
 		 
 		a.facbook_events = true
 		a.already_google_events = false
 		if(a.appmodel.targetting =="Facebook"){
 			 
	 		 a.onfbclicked()
	 		  

	 	}else{
	 		 
	 		a.offfbclicked()
	 		 
	 		 
	 	}


 	}
 	a.integration = function(event){
 		if(event.currentTarget.dataset.value=='home'){
 			a.message = false
 			a.settings =false
 			a.home = true
 			a.downloadsdk = false
			a.profile =false
 
 		}else if(event.currentTarget.dataset.value=='profile'){
 			a.message = false
 			a.settings =false
 			a.downloadsdk = false
 			a.already_google_events = true
 			a.home = false
			a.profile =true
			
			a.integration_step();
			/*setting defaults*/

 		}else if(event.currentTarget.dataset.value=='messages'){
 			a.message = true
 			a.settings =false
 			a.downloadsdk = false
 			a.home = false
			a.profile =false
			getstatus.query(a.appmodel.app_id).then(function(data){
				a.status = data.response.status
				console.log(data)
			},function (error){
				console.log(error)
			})

 		}else if(event.currentTarget.dataset.value=='settings'){
 			a.message = false
 			a.settings =true
 			a.downloadsdk = false
 			a.home = false
			a.profile =false

 		}
 		a.classval =true
 		a.fbclicked =false
 		a.facbook_events = false
 	}
 	a.send_report = function(){

 		 
 		user_post_req.query({report:a.report}).then(function(data) {
 			console.log(data)
 			a.report =''
 			var newmodalInstance = $modal.open({
								templateUrl: 'static/dashboard/partials/custom_alert_model.html',
								controller: newModalInstanceCtrl,
							});
 		},function (error){
			console.log(error)
		})
 		console.log(a.report)
 		 
 	}
 	a.reset_report = function(){
 		a.report =''
 		 
 	}
  
 	a.selectapp = function(event){
 		console.log(event)
 		a.views = true
 		a.bttns = true
 		if(event==null){
 			a.bttns = false
 		}
 	}

 	a.appselected = function(list){
 		console.log(list)

 		//google events
	 	if(list.event_tracking=="Retention.ai"){
			a.events =[{"event":'I want to define events using Retention.ai'},{"event":'I already use Google Analytics'}]
			a.selectga = a.events[0]
			
			
		 
	 		a.onclicked();

		}else if(list.event_tracking=="Google Analytics"){
			a.events =[{"event":'I already use Google Analytics'},{"event":'I want to define events using Retention.ai'}]
			a.selectga = a.events[0]
		 
	 		a.onclicked();
		}else{
			a.events =[{"event":'I already use Google Analytics'},{"event":'I want to define events using Retention.ai'}]
			a.selectga = a.events[0]
			a.track_event = false;
			a.send_email = false
			 
	 		a.offclicked();
		}

 		//fb events
		if(list.targetting=="Facebook"){
			
	 		 a.onfbclicked()

		}else if (list.targetting==""){
			 
			a.offfbclicked()
		} 
 

 	}

  	a.viewsapp = function(event){
  		console.log(event)
  		if(event==null){
 			a.bttns = false
 		}
  	} 

  	a.selectanalytics=function(event){
  	 	 var data ={}
  		if(event.event =='I already use Google Analytics'){
  			data["event_tracking"] = "Google Analytics";
  			 a.appmodel.event_tracking="Google Analytics"
 			update_settings.query(a.appmodel['app_id'],data).then(function(data){
			},function (error){
				console.log(error)
			})
  		}
  		if(event.event =='I want to define events using Retention.ai'){
  			data["event_tracking"] = "Retention.ai";
  			 a.appmodel.event_tracking="Retention.ai"
  			update_settings.query(a.appmodel['app_id'],data).then(function(data){
			},function (error){
				console.log(error)
			})
  		}

  	}
 
//on off button toggled
}])