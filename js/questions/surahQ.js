			 
			 
			  /************************** كائن الأسئلة حسب الأجزاء **************************/
			  var surahQ = {
			  type: "surah",
			  
			  /* الأجزاء الافتراضية تبدأ من */
			  from: 1,
			  
			  /* الأجزاء الافتراضية تنتهي إلى */
			  to: 114,
			  
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
			  getData: (function( surah , i ){
			  return Q.getData( this , surah , i );
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
			  this.to = 114;
			  this.num = 10;
			  this.presI = 1;
			  this.presT = null;
			  this.answers = [];
			  this.allQ = [{t: false, i: false}];
			  })
			  }/* End Object surahQ */
			  
			  
			  
			  /**************************** كائن تنفيذ الأسئلة ********************/
			  var surahAction = {
				  
			  type: "surah", from: null, to: null, num: null, presNum: null,
			  
			  /***************************************/
			  Q: (function(){
			  return surahQ;
			  }),

			  /***************************************/

			  setting: (function(){
			  qAction.setting(this);
			  }),
			  
			  /***************************************/
			  start: (function(){
			  qAction.start(this);
			  }),
			  
			  /***************************************/
			  end: (function(){
			  qAction.end(this);
			  }),
			  
			  /***************************************/
			  next: (function(){
			  qAction.next(this);
			  }),
			  
			  /***************************************/
			  prev: (function(){
			  qAction.prev(this);
			  }),
			  
			  /***************************************/
			  go_on: (function(){
			  qAction.go_on(this);
			  }),
			  
			  /***************************************/
			  no_answer: (function(){
			  qAction.no_answer(this);
			  }),
			  
			  /***************************************/
			  yes_answer: (function(){
			  qAction.yes_answer(this);
			  }),
			  
			  
			  
			  }