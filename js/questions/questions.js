			 
			  
			  
			  
			  
			  
			  /* تشغيل كائن Object.values */
			  if (!Object.values) {
			  Object.values = function(object) {
			  var values = [];
			  for(var property in object) {
			  values.push(object[property]);
			  }
			  return values;
			  }
			  } 
			  
			  
			  /*************************************************************/
			  
			  
			  
			  var Q = {
			  /* دالة يتم من خلالها التحقق من عدم تكرر الأسئلة  */
			  vali: (function( by , t , i , length ){
			  
			 
			  
			  /* متغير سيصبح ترو إذا كانت هنالك سؤال مكرر، فيجلب سؤال جديد حينها */
			  var there;
			  
			  var tmp_t = t;
			  var tmp_i = i;
			  
			  /* متغير لحصر اللوب على 100 تكرار فقط */
			  var loop = 0;
			  
			  do{
			  
			  /* في كل دورة سيزيد واحد */
			  loop++;
			  
			  there = false; 
			  
			  /* عملية التحقق من الأسئلة */
			  by.allQ.forEach(function( e ) {
			  /*  إذا كان هنالك سؤال مكرر سيضع ترو في المتغير وسيزيد 1 */
			  if( e.t == tmp_t && e.i == tmp_i ) there = true; 
			  });/* end forEach*/
			  
			  /* مادام السؤال مكرر سيزيد واحد في آي دي السؤال */
			  if( there == true ) tmp_i++;
			  
			  /* التأكد بأنّ السؤال الجديد ليس ىخر آية في النوع المطلوب */ 
			  if( tmp_i == ( length - 1 ) ) tmp_i = 0 ;
			  
			   
			  }while( there == true && loop < 100 );
			  
			  return tmp_i;
			  
			  
			  }),/* End Function Vali */
			  
			  /***************************************************************/
			  
			  /* متغير جلب بيانات آية معينة أو بيانات نوع معين */
			  getData : (function( by , t , i ){
			   
			  if( t > by.to ) t = by.to;
			  if( t < by.from  ) t = by.from ;
			  
			  /* عملية استدعاء الجسون الخاص بالنوع على هيئة نص */
			  var json = $.ajax({
			  url: "data/"+ by.type +"/"+ t +".json" , 
			  dataType:"json",
			  type: "GET",
			  async:false
			  });/* End Ajax */
			  
			  
			   /* تحويل نص الجسون إلى جسون حقيقي واسناده بمتغير */
			  var data =  jQuery.parseJSON( json.responseText );
			   
			  
			  /* استخلاص البيانات */
			  data = data.quran['quran-simple'];
			  
			  
			  
			  
			  
			  /* تحويل الجسون إلى مصفوفة */
			  data = Object.values( data );
			  
			  
			  
			 
			  
			  /* إذا كان المطلوب بيانات نوع بأكمله*/
			  if( i === undefined )
			  return data;
			  
			  /* إذا كان المطلوب بيانات آية فقط */
			  else
			  return data[i];

			  }),/* End Function getData */
			  
			  /***************************************************************/
			  
			  /*  دالة إحضار سؤال عشوائي على  هيئة كائن  */
			  getRandom : (function( by , from , to ){
			  
			  /* if(1) إذا كان النوع "من" أكبر من النوع "إلى" سيقوم بالعكس  */
			  if( from > to ){
			  var tmp   = to    ;
			  var to    = from  ;
			  var from  = tmp   ;
			  }/* end if(1) */
			  
			  
			  
			  /*  إذا كان الجزء "من" أقل من واحد  */
			  if( from <  by.from ) from = by.from;
			  
			  /*  إذا كان الجزء "إلى" أكبر من ثلاثين  */
			  if( to >  by.to ) to = by.to;
			  
			  /* توليد جزء عشوائي واسناده بمتغير */
			  var t = Math.floor(Math.random() * (to - from + 1)) + from;
			  
			 
			  /* جلب بيانات وجميع آيات  الجزء المختار */
			  var data = this.getData( by , t );
			  
			  
	
			  
			  /* عملية توليد محل آية السؤال العشوائي */
			  var i = Math.floor( Math.random() * ( data.length - 1 ) ) ;
			 
			  
			  
			  /* إذا كان محل الآية الذي تم توليده هو الآية الأخيرة من الجزء سينقصّه واحد */
			  if( i == data.length - 1 ) i--;
			  
			  
			  /* عملية التأكد من عدم تكرار السؤال */
			  i = this.vali( by , t , i , data.length );
			  
			  
			  /* تخزين السؤال الحالي لعدم تكراره لاحقًا */
			  by.allQ.push({ t: t, i: i });

			  
			  /* تخزين مكان السؤال الحالي لاستخدامه لاحقا لجلب الآية التالية والآية السابقة */
			  by.presI = i;
			  
			  /* تخزين رقم الجزء للسؤال الحالي لاستخدامه لاحقا لجلب بيانات الآيات التالية والسابقة */
			  by.presT = t;
			  
			 
			  
			  /* سيعيد بيانات الآية أخيرًا  */
			  return data[ i ];

			  
			  }),/* End Function getRandom */
			  
			  /***************************************************************/
			  
			  /* دالة تجلب بيانات الآية التالية */
			  getNext:(function( by , t , i ){
		       
			  
			  
			  var data = this.getData( by , t );
			  
			
			  /* إذا كانت الآية الأخيرة من النوع الأخير سيعيد فالس، لأن لا يوجد آية بعدها */
			  if( t == by.to && i == ( data.length - 1 ) ) return false;
			 
			  
			  
			  /*   إذا كانت آخر آية من النوع الحالي، سينتقل للنوع التالي   */
			  if( i == ( data.length - 1)  ){
			  t = t + 1;
			  i = 0;
			  data = this.getData( by , t );
			  } 
			  else{
			  t = t ; 
			  i = i + 1;  
			  }
			 
			  /* تعيين القيَم الحالية */
			  by.presI = i ;
			  by.presT = t ;
			  
			  
			  
			  /* إعادة قيمة الآية التالية */
			  return data[ i ];


			  }),/* End Function getNext() */
			  
			  /***************************************************************/
			  
			  /* دالة تجلب بيانات الآية السابقة */
			  getPrev:(function( by , t , i ){
		       
			  
			  
			  var data = this.getData( by , t );
			  
			
			  /* إذا كانت الآية الأولى من النوع الأول سيعيد فالس، لأن لا يوجد آية قبلها */
			  if( t == by.from && i == 0 ) return false;
			 
			  
			  
			  /*   إذا كانت آخر آية من النوع الحالي، سينتقل للنوع التالي   */
			  if( i == 0 ){
			  t = t - 1;
			  data = this.getData( by , t );
			  i = data.length - 1;
			  
			  } 
			  else{
			  t = t ; 
			  i = i - 1;  
			  }
			 
			  /* تعيين القيَم الحالية */
			  by.presI = i ;
			  by.presT = t ;
			  
			  
			  /* إعادة قيمة الآية التالية */
			  return data[ i ];


			  })/* End Function getNext() */
			 
			  
			  }/* End Q Object */
			  
			  
			  
			  /******************************* كائن تنفيذ الأسئلة ******************************/
			  
			  var qAction = {
			  
			  setting:(function( by ){
				  
			  /* إعداد القيم الأساسية لدورة الأسئلة القادمة */	  
			  by.from = parseInt( $( "#" + by.type + "_from" ).val() );
			  by.to   = parseInt( $( "#" + by.type + "_to"   ).val() );
			  by.num  = parseInt( $( "#" + by.type + "_num"  ).val() );
			  by.presNum  = 1; 
			  
			  
			  
			  }),
			  
			  start:(function( by ){
			  
			  /* إلحاق قيمة رقم السؤال الحالي */	  
			  $( "#" + by.type + "_q_presNum" ).text( by.presNum );
			  
			  /* إلحاق قيمة مجموع الأسئلة في هذه الدورة */
			  $( "#" + by.type + "_q_num" ).text( by.num );
			 
			  /* توليد أول سؤال عشوائي للاستناد عليه في هذه الدورة */
			  var data = by.Q().getRandom( by.from , by.to );
			   
			  
			  /* اعداد اسم السورة الحالية */
			  var surah_name = surah_data.getName( data.surah );
			  
			  /* إلحاق اسم السورة الحالية */
			  $( "#" + by.type + "_surah_name" ).text( surah_name );
			  
			  /* إلحاق محتوى الآية الحالية */
			  $( "#" + by.type + "_verse" ).text( data.verse );
			  
			  /* إلحاق رقم الآية الحالية */
			  $( "#" + by.type + "_number_ayah" ).text( data.ayah );
			  
			  
			  
			  
			  $( "#" + by.type + "_are_you_ready" ).fadeOut(200);
			  $( "#" + by.type + "_main_box_question" ).fadeIn(200);
			  
			  }),
			  
			  /*******************************************/
			  
			  end:(function( by ){
			  
			  /* إعادة الصفحات لحالتها الطبيعية */
			  $( "#" + by.type + "_main_box_question" ).fadeOut(200);
			  $( "#" + by.type + "_box_correction" ).fadeOut(200);
			  $( "#" + by.type + "_box_this_degree" ).fadeOut(200);
			  $( "#" + by.type + "_are_you_ready" ).fadeIn(200);
			  
			  
			  /* إعادة القيم للقيم الافتراضية */
			  by.from = null;
			  by.to = null;
			  by.num = null;
			  by.from = null;
			  
			  by.Q().clean();
			  
			  }),
			  
			  
			  /*******************************************/
			  
			  next:(function( by ){
			  var data = by.Q().getNext();
			  /* اعداد اسم السورة الحالية */
			  var surah_name = surah_data.getName( data.surah );
			  
			  /* إلحاق اسم السورة الحالية */
			  $( "#" + by.type + "_surah_name" ).text( surah_name );
			  
			  /* إلحاق محتوى الآية الحالية */
			  $( "#" + by.type + "_verse" ).text( data.verse );
			  
			  /* إلحاق رقم الآية الحالية */
			  $( "#" + by.type + "_number_ayah" ).text( data.ayah )
			  
			  }),
			  
			  /*******************************************/
			  
			  prev:(function( by ){
			  var data = by.Q().getPrev();
			  /* اعداد اسم السورة الحالية */
			  var surah_name = surah_data.getName( data.surah );
			  
			  /* إلحاق اسم السورة الحالية */
			  $( "#" + by.type + "_surah_name" ).text( surah_name );
			  
			  /* إلحاق محتوى الآية الحالية */
			  $( "#" + by.type + "_verse" ).text( data.verse );
			  
			  /* إلحاق رقم الآية الحالية */
			  $( "#" + by.type + "_number_ayah" ).text( data.ayah )
			  
			  }),
			  
			  /*******************************************/
			  
			  go_on:(function( by ){
				  
 			  $( "#" + by.type + "_main_box_question" ).fadeOut(200);
			  $( "#" + by.type + "_box_correction" ).fadeIn(200);
			  }),
			  
			  /*******************************************/
			  
			  no_answer:(function( by ){
			  
			  /* إضافة صفر لأنها إجابة خاطئة */
			  by.Q().answers.push(0);
			  
			  /* الانتقال للسؤال التالي */
			  this.changeQ( by );
			  
			  }),
			  
			  /*******************************************/
			  
			  yes_answer:(function( by ){
			  
			  /* إضافة واحد لإنها إجابة صحيحة */
			  by.Q().answers.push(1);
			  
			  /* الانتقال للسؤال التالي */
			  this.changeQ( by );
			  
			  }),
			  
			  /*******************************************/
			  
			  changeQ:(function( by ){
			  
			  
			  /* if(1) إذا لم ينتهي عدد الأسئلة المقرر بعد */
			  if( by.num > by.presNum  ){
			  
			  /* إخفاء صندوق التصحيح */
			  $( "#" + by.type + "_box_correction" ).hide();
			  
			  /* عرض خانة الأسئلة */
			  $( "#" + by.type + "_main_box_question" ).fadeIn(200);
			  
			  /* زيادة رقم السؤال الحالي  */
			  by.presNum++;
			  	  
			  /* إلحاق قيمة رقم السؤال الحالي */	  
			  $( "#" + by.type + "_q_presNum" ).text( by.presNum );
			  
			  /* إلحاق قيمة مجموع الأسئلة في هذه الدورة */
			  $( "#" + by.type + "_q_num" ).text( by.num );
			 
			  /* توليد  سؤال عشوائي جديد */
			  var data = by.Q().getRandom( by.from , by.to );
			   
			  
			  /* اعداد اسم السورة الحالية */
			  var surah_name = surah_data.getName( data.surah );
			  
			  /* إلحاق اسم السورة الحالية */
			  $( "#" + by.type + "_surah_name" ).text( surah_name );
			  
			  /* إلحاق محتوى الآية الحالية */
			  $( "#" + by.type + "_verse" ).text( data.verse );
			  
			  /* إلحاق رقم الآية الحالية */
			  $( "#" + by.type + "_number_ayah" ).text( data.ayah );
			  }/* End If(1) */
			  
			  /* else(1) إذا انتهى عدد الأسئلة المقرر سوف يظهر خانة النتيجة */
			  else this.degree( by );
			  
			  }),
			  /*******************************************/
			  
			  degree: (function( by ){
			  
			  /* متغير تُخزن فيه الدرجة النهائية */
			  var total_degree = 0; 
			  
			  /* عملية جمع درجات كل جواب */
			  by.Q().answers.forEach(function( e ) {
			  total_degree = total_degree + e ;
			  });
			  
			  /* العملية الحسابية للنسبة  */
			  total_degree =  Math.round( ( total_degree / by.num ) * 100 );
			  
			  
			  /* إخفاء صندوق التصحيح */
			  $( "#" + by.type + "_box_correction" ).hide();
			  
			  /* عرض خانة النتيجة */
			  $( "#" + by.type + "_box_this_degree" ).fadeIn(200);
			  
			   /* إلحاق النتيجة النهائية للعرض */
			  $( "#" + by.type + "_box_this_degree h1" ).text(   total_degree  + "%" );
			  
			  /* إعداد التاريخ */
			  var d = new Date();
              d = d.getDate() + "/" + ( d.getMonth() + 1) + "/" + d.getFullYear() + " - " +d.getHours() + ":" + d.getMinutes();
			  
			  /* جلب بيانات النتائج المخزنة مسبقًا وتحويلها إلى جسون */
			  var old_dgrees = JSON.parse( localStorage.getItem("degree") );
			  
			  /* إلحاق الدرجة الحالية مع الدرجات المسبقة */
			  old_dgrees.unshift('{"date": "'+d+'" , "degree": '+ total_degree +' }');
			  
			  /* إذا كانت النتائج المخزنة أكثر من 20 سيحذف أول نتيجة في المصفوفة */
			  if( old_dgrees.length > 20 )
			  old_dgrees.pop();
			  
			  /* تحويل جسون النتائج إلى نصّ  */
			  var new_dgrees = JSON.stringify( old_dgrees )
			  
			  /* تخزين النتائج في الذاكرة */
			  localStorage.setItem( "degree" , new_dgrees );
			  
			  
			  })
			  
			  
			  
			  

			  
			  }/* End Object */
			  
			  
			  
			  /**************************************************/
			  var selects = {
		    
			  make_option: (function( id , num , selectd ){
			  
			  
			  /* for(1) */
			  for( var i = 1; i <= num; i++ ){
			  
			  if( i == selectd )
			  $( "#" + id ).append("<option value='"+i+"' selected >"+i+"</option>");
			  else $( "#" + id ).append("<option value='"+i+"' >"+i+"</option>");
			  
			  }/* end for(1) */
			  
			  })/* end function make_option()*/
			  
			  
			  }/* end Object selects */
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  