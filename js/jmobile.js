			  
			  
			  
			  /* اعداد مكتبة الجوال */
			  var mobile = {}
			  
			  mobile = {};
			  
			  
			  /********************************* كائن الصفحة  *********************************/
			  /* إنشاء كائن الصفحة مع معلوماته الرئيسية */
			  mobile.page = { 
			  
			  /* مصفوفة الصفحة الحالية في كل قروب */
			  pres: [], 
			  
			  /* مصفوفة الصفحة السابقة في كل قروب */
			  prev: [], 
			  
			  /* معلومات الصفحات على هيئة مصفوفة، في كل مصفوفة كائن معلومات */
			  data: [],
			  
			   
			  /* عدد الصفحات التي تم تحميلها في كل قروب  */
			  loded: 0,
			  
			  /* عدد جميع الصفحات التي تم تحميلها */
			  total_loded: 0,
			  
			  /************* دالة إنشاء صفحة جديدة *************/
			  create: (function( data ){
			  $(document).ready(function(e) {
                
              
			   
			  /* إنشاء عنصر الصفحة وإلحاقه بالقروب الخاص به */
			  $("div#group_" + data.group ).append("<div class='page animated' id='page_"+ data.id +"' ></div>");
			  
			  /* if(1) في حال كانت هذه هي الصفحة الأولى */
			  if( data.first == true ){
			   
			  $("#page_" + data.id ).addClass("first_page");
			  mobile.page.pres[ data.group ] = data.id;
			  
			  $("div#group_" + data.group ).append('<div id="cover" ></div>');
			  
			  
			  }/*End If(1)*/
			  
			  
			  
			  /* تحميل الصفحة داخل عنصر الصفحة */
			  $.ajax({
			  method: "GET",
			  url:  data.view ,
			  success: function( result ){
			   
			  $("#page_" + data.id ).html('<table style="width:100%; height:100%; text-align:center"><tr><td valign="middle"> '  + result + '</td></tr></table>' );
			  mobile.page.loded ++;
			  			  
			  }
			  });/* End Ajax */
			  
			   
			  /* تخزين معلومات الصفحة */
			  mobile.page.data[ data.id ] = data ;
			  
			 
			  
			  
			   
			  
			  
			  
			  }); /* End Document Ready */
			  }), /* End Creat Function */
			  
			  /*************** دالة تغيير الصفحة ************/
			  change: (function( page_id ){
			  
			  
             			  
			  
			  /* تعيين متغير معلومات الصفحة المطلوبة  */
			  var presData = this.data[ page_id ];
			  
			  /* تعيين متغير معلومات الصفحة  السابقة */
			  var prevData = this.data[ this.pres[ presData.group ] ];
			  
			 
			  
			  /* الصفحة الحالية ستصبح صفحة سابقة */
			  this.prev[ prevData.group ]  = prevData.id ;
			  
			  /* الصفحة المطلوبة ستصبح صفحة حالية */
			  this.pres[ presData.group ] = presData.id;
			  
			    
			  if( presData.father != false ){
			  $("#segue_"+presData.group).show();
			  $("#segue_"+presData.group).animate({"top":"0px"},1000);
			  $("#segue_text_"+presData.group).text(  presData.title );
			  
			  }
			  else{
			  $("#segue_"+presData.group).animate({"top":"-500px"},1000);	
			  setTimeout(function(){ $("#segue_"+presData.group).hide();},250);
			  }
			  presData.start();
			  prevData.end();
			  
			  
			  
			  
			  
			  }),/* End Change Function */
			  
			  /*************** دالة العودة للخلف ************/
			  /* تأخذ هذه الدالة القروب، لتعرف تعود للخلف في أي قروب بالضبط */
			  back: (function( group_id ){
			  
			  var data = this.data[ this.pres[ group_id ] ];
			  
 			  this.change( data.father );
			  
			  
			  
			  
			  })
			  
			  }/* End Page Object */
			  
			  /************************************** كائن القروب *********************************/
			  
			  mobile.group = {
			  
			  /* متغير القروب الحالي */
			  pres: false, 
			  
			  /* متغير القروب السابق */
			  prev: false, 
			  
			
			  
			  
			  /* يُخزن في هذا المتغير معلومات كل قروب في مصفوفة مستقلة */
			  data: [],
			  
			  /*************** دالة إنشاء قروب ************/
			  
			  create: (function( data ){
			  	  
 
			  /* إنشاء القروب */ 
			  $("#master").append("<div class='group animated' id='group_"+ data.id +"' ></div>");
			  
			  /* if(1) في حال كان هذا هو القروب الأول */
			  if( data.first == true ){
			   
			  $("#group_" + data.id ).addClass("first_group");
			  mobile.group.pres = data.id;
			  
			  }/*End If(1)*/
			  
			  
			  /* إنشاء شريط العودة للخلف لهذا القروب */ 
			  $("#group_" + data.id ).append('<div class="segue" id="segue_'+data.id+'"><table><tr><td align="right" id="segue_text_'+data.id+'">  </td><td class="button_back"  data-group_id="'+data.id+'"  align="left" width="50"> <span class="icons fa fa-angle-left "></span> </td></tr></table></div>');
			  
			  
			  /* تخزين معلومات القروب */
			  mobile.group.data[ data.id ] = data ;
			  
 			  
			  mobile.page.total_loded++;
 			  
			 
			   
			  }),/* End Function Create */
			  
			  
			  /*************** دالة تغيير قروب ************/
			  change: (function( group_id ){
			  
			  
			  /* تعيين متغير معلومات القروب المطلوب */
			  var presData = this.data[ group_id ];
			  
			  /* تعيين متغير معلومات القروب السابق */
			  var prevData = this.data[ this.pres ];
			  
			  
			  
			  /* القروب الحالي سيصبح قروب سابق */
			  this.prev  = prevData.id ;
			  
			  /* القروب المطلوب سيصبح قروب حالي */
			  this.pres = presData.id;
			  
			 
			  
			  
			  
			  presData.start();
			  prevData.end();
			  
			 
			 
			   
			  
			  })
			  
			  } /* End Object Group */ 
			  
			  
			  			
			
			  /********************************* كائن الاستعداد  *********************************/
			  /* تسختدم هذه الدالة لمعرفة هل تم تحميل جميع الصفحات أو لا */
			  mobile.ready = ( function( fun ){
			   
			  
			  if(  mobile.page.loded == $(".page").length && $(".page").length != 0  ){
			  fun();
			  
			 
			  
			  }
			  
			  else
			  setTimeout( (function( ){ mobile.ready( fun );   }) , 100 );
			   
			  
			  
			  
			  });
			  
			  
			  
			  /**********************************************************************/
			  
			  
			  
			  
			  var Group = mobile.group;
			  var Page  = mobile.page ;
 			  
			
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
