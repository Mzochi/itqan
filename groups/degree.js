			 
			 
			 
			 
			 
			
			 
			  /*****  إنشاء قروب الدرجات  *****/
			  
				  
			  
			  Group.create({
			  
			  id   : "degree",
			  first: false,
			  
			  start: (function(){
			  
			  /* تأثير الدخول */
			  animate.group_in();
			  
			  /* جلب الدرجات وتحويلها إلى جسون */
			  var degrees = JSON.parse( localStorage.getItem("degree") );
			  
			  /* متغير التقييم العام */
			  var general_degree = 0 ;
			  var general_i = 0 ;
			  
			  $("#rows_degree").html("");
			  
			  /* عملية معالجة الدرجات */ 
			  degrees.forEach( function(e){
			  var e = JSON.parse( e );
			  $("#rows_degree").append( "<tr><td align='right'>" + e.date + "</td><td align='left'>" + Math.round( e.degree ) + "% </td></tr>");
			  
			  /* تجميع جميع درجات التقييم العام */
			  general_degree = general_degree + parseInt( e.degree );
			  
			  /* لمعرفة عدد الاختبارات لأخذ التقييم العام */
			  general_i++;
			  
			  });/* end forEach */
			  
			  /* حساب نسبة التقييم العام */
			  general_degree = general_degree / general_i ;
			  
			  /* إلحاق التقييم العام */
			  $("#general_degree").text( Math.round( general_degree ) + "%");
 
			  }),
			  
			  
			  end: (function(){
			  
			  animate.group_out();
			  
			  }) 
			  
			  });
			  
			  
			 