			  
			  
			  var animate = {
			  
			  
			  /* تحريك الخلفية */
			  body_right: 0, body_deg:0, 
			  
			  background: (function(){
			  
			  setInterval(function(){
			  $("body").css("background","url(img/background.png)  "+ animate.body_right +"px 0px  repeat ,linear-gradient( "+animate.body_deg+"deg,#00f48a, #008567)");
			  
			  animate.body_right--;
			  if( animate.body_right == -1000 ) animate.body_right = 0;
			  
			  
			  
			  },50);
			  
			  
			  setInterval(function(){
			  $("body").css("background","url(img/background.png)  "+ animate.body_right +"px 0px  repeat ,linear-gradient( "+animate.body_deg+"deg,#00f48a, #008567)");
			  
			  animate.body_deg = animate.body_deg + 1  ;
			  
			  if( animate.body_deg == 360 ) animate.body_deg = 0;
			  
			  
			  },30);
			  
			  }),	  
			  
			  /***************************************************/	
			  
			  /* مؤثرات التولبار */
			  toolbar : {
			  
			  /********* القيم الافتراضية لأزرار التولبار ********/
			  pres_button: null , prev_button: null,
			  
			  
			  /********* دالة تغيير لون الزرّ بعد الضغط *********/
			  change_color: (function( button ){
			  
			  
			  
			  /* جعل الزر الحالي هو الزرّ السابق */
			  this.prev_button = this.pres_button ;
			  
			  
			  /* جعل الزرّ الجديد هو الزر الحالي */
			  this.pres_button = button ;
			  
			  /* تغيير لون الزر الجديد */
			  $( "#" + this.pres_button ).removeClass("buttonTool")     ;
			  $( "#" + this.pres_button ).addClass("buttonTool_clicked");
			  
			  
			  
			  /* تغيير لون الزر السابق */
			  $( "#" + this.prev_button ).removeClass("buttonTool_clicked")     ;
			  $( "#" + this.prev_button ).addClass("buttonTool");
			  
			  })/* End change_color Function */
			  
			  },
			  
			  /***************************************************/  
			  
			  /* مؤثرات الأزرار */
			  button_deg: 0,
			  button: (function(){
			  
			  setInterval(function(){
			  $(".button").css("background"," linear-gradient( "+ animate.button_deg +"deg, rgba(255,255,255,0.3) , rgba(255,255,255,0.0)) ");
			  
			  animate.button_deg = animate.button_deg + 1  ;
			  
			  if( animate.button_deg == 360 ) animate.button_deg = 0;
			  
			  
			  },100);
			  
			  }),
			  
			  
			  /***************************************************/  
			  page_in: (function(){
			  
			  
			  $( this.presPage() ).addClass("zoomIn");
			  
			  setTimeout( (function(){
			  $(  animate.presPage() ).removeClass("zoomIn");
			  $(  animate.presPage() ).css("z-index","99");
			  $(  animate.presPage() ).css("opacity","1");
			  
			  }),1000); 
			  
			  
			  }),/* end page in */
			  
			  /*****************************/
			  
			  page_out: (function(){
			  
			  $( this.prevPage() ).addClass("zoomOut");
			  $(  animate.prevPage() ).css("z-index","1");
			  setTimeout( (function(){
			  $(  animate.prevPage() ).removeClass("zoomOut");
			  
			  $(  animate.prevPage() ).css("opacity","0");
			  
			  
			  }),1000); 
			  
			  }),/* end page out */
			  
			  /*****************************/
			  
			  group_in: (function(){
			  
			  $( this.presGroup() ).fadeIn(100);
			  
			  }),/* end group in */
			  
			  /*****************************/
			  group_out: (function( id ){
			  
			  $( this.prevGroup() ).fadeOut(100);
			
			  }),/*end group out*/
			  
			  /*****************************/
			  
			  prevPage: (function(){
			  return "#page_" + mobile.page.prev['quiz'];
			  }),
			  
			  presPage: (function(){
			  return "#page_" + mobile.page.pres['quiz'];
			  }),
			  
			  prevGroup: (function(){
			  return "#group_" + mobile.group.prev;
			  }),
			  
			  presGroup: (function(){
			  return "#group_" + mobile.group.pres;
			  }),
			  
			  dir: [],
			  
			  
			  
			  }