			 
			 
			  /************************** كائن الأسئلة حسب الأجزاء **************************/
			  var guessQ = {
			  type: "guess",
			  
			  /* الأجزاء الافتراضية تبدأ من */
			  from: 1,
			  
			  /* الأجزاء الافتراضية تنتهي إلى */
			  to: 30,
			  
			  /* عدد الأسئلة الافتراضية */
			  num: 10,
			  
			  /* متغير يُخزن فيه مكان آية السؤال الحالي  */
			  presI: null,
			  
			  /* متغير يُخزن فيه رقم الصفحة الحالية   */
			  presT: null,
			  
			  
			  /* مصفوفة تُخزن فيها الإجابات */
			  answers: [],
			  
			  /* مصفوفة يُخزن فيها جميع الأسئلة السابقة لكي لا تُعاد مرة أخرى */
			  allQ: [{t: false, i: false}],
			  
			  /**************************************/
			  getData: (function( guess , i ){
			  return Q.getData( this , guess , i );
			  }),
			  /**************************************/
			  getRandom: (function( from , to ){
			  return Q.getRandom( this , from , to );
			  }),
			  /**************************************/
			  getNext: (function( t , i ){
			  if( t === undefined ) var t = this.presT;
			  if( i === undefined ) var i = this.presI;
			  return Q.getNext( this , t , i );
			  }),
			  /**************************************/
			  getPrev: (function( t , i ){
			  if( t === undefined ) var t = this.presT;
			  if( i === undefined ) var i = this.presI;
			  return Q.getPrev( this , t , i );
			  }),
			  /***************************************/
			  clean:(function(){
			  this.from = 1;
			  this.to = 30;
			  this.num = 10;
			  this.presI = 1;
			  this.presT = null;
			  this.answers = [];
			  this.allQ = [{t: false, i: false}];
			  })
			  }/* End Object guessQ */
			  
			  
			  
			  /**************************** كائن تنفيذ الأسئلة ********************/
			  var guessAction = {
				  
			  type: "guess", from: null, to: null, num: null, presNum: null,true_surah: null, 
			  
			  /***************************************/
			  Q: (function(){
			  return guessQ;
			  }),

			  /***************************************/

			  setting: (function(){
				  
			  /* إعداد القيم الأساسية لدورة الأسئلة القادمة */	  
			  this.from = parseInt( $( "#" + this.type + "_from" ).val() );
			  this.to   = parseInt( $( "#" + this.type + "_to"   ).val() );
			  this.num  = parseInt( $( "#" + this.type + "_num"  ).val() );
			  this.presNum  = 1; 
			  
			  }),
			  
			  
			  /***************************************/

			  /** دالة مهمتها تنظيم خيارات الأجوبة المحتملة **/

			  option:(function( id ){
			  
			  
			  /* تخزين الإجابة الصحيحة */
			  this.true_surah = id;
			  
			  
			  /* متغير المصفوفة الذي ستخزن فيها مجموعة السور المحتملة */
			  var option_list = [];
			  
			  /* متغير نقطة البدء ونقطة الانتهاء بتوليد أرقام سور عشوائية */
			  var start_point , end_point ;
			  
			  /* عملية تحديد نقطة البداية ونقطة النهاية */
			  if( id <= 15 ) start_point = 2;
			  else if( id >= 100 ) start_point = 100;
			  else start_point = id - 7 ;
			  end_point = start_point + 14;
			  
			  /* for(1) عملية تخزين أرقام الإجابات المحتملة في المصفوفة  */
			  for( var i = start_point; i <= end_point ; i++ ){
			  /* إذا كان الاحتمال هو نفسه الإجابة الصحيحة لن يخزنه
			   لأن المصفوفة مخصصة للاحتمالات الخاطئة */
			  if( i != id ) option_list.push( i ); 
			  }/* end for(1) */
			  
			 
			  
			  
			  /* متغير تخزن فيه قيمة عشوئاية لمكان الإجابة الصحيحة */
			  var true_place = Math.floor(Math.random() *  5 )  ;
			  
			  
			  
			  /* إلحاق اسم السورة الصحيحة في الزرّ */
			  $(".button_guess").eq( true_place ).text( surah_data.getName( id ) );
			  
			  /* إلحاق آي دي السورة الصحيحة */
			  $(".button_guess").eq( true_place ).attr("data-surah_id", id );
			  
			  
			  
			  /* متغير سيتم استخدامه في اللوب القادم، سيخزن فيه رقم سورة عشوائي */
			  var idop , tmp_idop;
			  
			   
			  /*for(2) عملية توزيع 6 إجابات محتملة في خاناتها - جميعها خاطئة */
			  for( i = 0; i < 6; i++ ){
			  
 			  if( true_place == i ){  i++;  }
			  
			 
			  /* توليد رقم مصفوفة عشوائي */
			  idop = Math.floor(Math.random() *  option_list.length ) - 1;
			  tmp_idop = idop;
			  
			  /* رقم آي دي السورة */
			  idop = option_list[idop];
			  
			  /* حذف السورة لعدم تكريرها */
			  option_list.splice( tmp_idop , 1 );
			  
			  /* إلحاق اسم السورة في الزرّ */
			  $(".button_guess").eq( i ).text( surah_data.getName( idop ) );
			  
			  /* إلحاق آي دي السورة */
			  $(".button_guess").eq( i ).attr("data-surah_id", idop );
			   
			  
			   
			  }/* end for(2)*/
			  
			  
			  }), /* end option function  */
			  
			  
			  
			  /***************************************/
			  start: (function(){
			  
			  /* إلحاق قيمة رقم السؤال الحالي */	  
			  $( "#" + this.type + "_q_presNum" ).text( this.presNum );
			  
			  /* إلحاق قيمة مجموع الأسئلة في هذه الدورة */
			  $( "#" + this.type + "_q_num" ).text( this.num );
			 
			  /* توليد أول سؤال عشوائي للاستناد عليه في هذه الدورة */
			  var data = this.Q().getRandom( this.from , this.to );
			   
			  
			  /* اعداد رقم السورة الحالية */
			  var surah_id = data.surah;
			  			  
			  /* إلحاق محتوى الآية الحالية */
			  $( "#" + this.type + "_verse" ).text( data.verse );
			  
			  /* إلحاق رقم الآية الحالية */
			  $( "#" + this.type + "_number_ayah" ).text( data.ayah );
			  
			 
			  
			  $( "#" + this.type + "_are_you_ready" ).fadeOut();
			  $( "#" + this.type + "_main_box_question" ).fadeIn();
			  
			  this.option( surah_id );
			  
			  
			  
			  
			  }),
			  
			  
			  /***************************************/
			  correction: (function( answer ){
			  
			  
			  /* الانتقال لصندوق تصحيح الإجابة */
			  $( "#" + this.type + "_main_box_question" ).fadeOut();
			  $( "#" + this.type + "_box_correction" ).fadeIn();
			  
			  
			  /* if(1) إذا كانت الإجابة صحيحة */
			  if( answer == this.true_surah ){
			  
			  /* إظهار جملة الإجابة صحيحة */
			  $( "#" + this.type + "_false_statement" ).hide();
			  $( "#" + this.type + "_true_statement" ).show();
			  
			  /* إعطاء درجة على الإجابة الصحيحة */
			  this.Q().answers.push( 1 );
			  
			  }/* end if(1) */
			  
			  
			  /* else(1) إذا لم تكن الإجابة صحيحة */
			  else{
				  
			  /* إظهار جملة الإجابة خاطئة */
			  $( "#" + this.type + "_true_statement" ).hide();
			  $( "#" + this.type + "_false_statement" ).show();
			  
			  $( "#" + this.type + "_true_surah_name" ).text( surah_data.getName( this.true_surah ) );
			  
			  /* إعطاء صفر على الإجابة الخاطئة */
			  this.Q().answers.push( 0 );	
			  }/* end else(1) */
			  
			  
			  }),
			  
			  
			  /***************************************/
			  go_on: (function(){
			  
			  
			  if( this.presNum >= this.num )
			  this.degree();
			  
			  else{
			  /* زيادة رقم السؤال الحالي */
			  this.presNum++;
			  
			  /* إلحاق قيمة رقم السؤال الحالي */	  
			  $( "#" + this.type + "_q_presNum" ).text( this.presNum );
			  
			  /* إلحاق قيمة مجموع الأسئلة في هذه الدورة */
			  $( "#" + this.type + "_q_num" ).text( this.num );
			 
			  /* توليد السؤال العشوائي */
			  var data = this.Q().getRandom( this.from , this.to );
			   
			  
			  /* اعداد رقم السورة الحالية */
			  var surah_id = data.surah;
			  			  
			  /* إلحاق محتوى الآية الحالية */
			  $( "#" + this.type + "_verse" ).text( data.verse );
			  
			  /* إلحاق رقم الآية الحالية */
			  $( "#" + this.type + "_number_ayah" ).text( data.ayah );
			  
			  /* إخفاء صندوق التصحيح */
			  $( "#" + this.type + "_box_correction" ).hide();
			  
			  /* إظهار الأسئلة */
			  $( "#" + this.type + "_main_box_question" ).fadeIn();
			  
			  this.option( surah_id );
			  }
			  
			  
			  }),
			  
			  
			  /***************************************/
			  degree: (function(){
			  qAction.degree(this);
			  }),
			  /***************************************/
			  end: (function(){
			  qAction.end(this);
			  })
			  
			  }
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  