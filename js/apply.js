			
			    
			  $(document).ready(function(e) {
              
			 
			  /** سيبدأ التنفيذ عند تحميل جميع الصفحات **/
			  mobile.ready( (function(){
			  
			  
			  
			  /******************* أمور يتم تنفيذها فور فتح التطبيق ***************/
			 
			  /* تنفيذ تحريك الخلفية */
			  //animate.background();
			  
			  
			  /* إعداد الزرّ المضغوط افتراضيًا وهو اختبر حفظك */
			  animate.toolbar.change_color( "quiz" );
			  
			  /* إعداد مصفوفة تخزين الدرجات على المتصفح */
			  if( localStorage.getItem("degree") === null )
			  localStorage.setItem("degree", "[]");
			  //localStorage.setItem("degree", "[]");
			  
			  /************************** عند تغيير القروب ************************/
			  
			  
			  $(".change_group").on( "touchstart", function( group ){
			 
			  /* if(1) التأكد بأن القروب المطلوب ليس نفس القروب الحالي*/
			  if( Group.pres != $(this).attr("data-group_id") ){
			  animate.toolbar.change_color( $(this).attr("id") );
			  
			  Group.change(  $(this).attr("data-group_id") );
			  }/* End if(1) */
			  
			  });/* end change group */
			  
			  
			  /************************** عند تغيير صفحة ************************/
			  
			  $(".change_page").on( "touchstart", function ( page ){
			 
			  var page = Page.data[ $(this).attr("data-page_id") ];
			  
			  /* if(1) التأكد بأنّ الصفحة المطلوبة ليست نفس الصفحة الحالية */
			  if( Page.pres[ page.group ] != page.id ){
			  
			  Page.change( page.id );
			  
			  can_back = false;
			  setTimeout(function(){ can_back = true },1000);
			  
			  
			  }/* end if(1) */
			  
			  
			  });/* end change page */
			  
			  /********************** عند العودة للخلف *************************/
			  
			  can_back = true;
			  $(".button_back").on( 'touchend', function ( e ){
			  
			  if( can_back == true ){
			  Page.back(  $(this).attr("data-group_id") );
			  
			  can_back = false;
			  
			  }
			  setTimeout(function(){ can_back = true },1000);
			 
			  
			  });/*end back*/
			  
	
	
			  
			  
			  }));/* end mobile.ready */
			  
			    
              });/* end document.ready */
			
			
			
			 
			  