function QuizNumber(){
	this.SIZE_PIC = 64; //번호판 크기
}

QuizNumber.prototype.init = function($con){
	this.$pieces = $con.find('.pieces li');
	this.$empty = $con.find('.empty');
	this.$rBtn = $con.find('.btn_random');
	this.nPieces = this.$pieces.length;
	this.nCols = Math.sqrt(this.nPieces);
	
	this.setPosition();
	this.firstPosition();
	this.initEventListener();
}

QuizNumber.prototype.initEventListener = function(){
	var objThis = this;
	
	this.$rBtn.bind('click', function(){
		objThis.randomPic();
	});
	
	this.$pieces.bind('click', function(){
		objThis.movePic($(this));
	});
}

QuizNumber.prototype.setPosition = function(){
	var count = 0;
	this.positionXY = new Array(this.nPieces);
	this.positionX = new Array(this.nCols);
	this.positionY = new Array(this.nCols);

	for(var i=0; i<this.nPieces; i++){
		if(i%this.nCols==0){
			count = 0;
		}

		this.positionX[i] = this.SIZE_PIC*count+1;
		this.positionY[i] = this.SIZE_PIC*parseInt(i/this.nCols)+1;
		this.positionXY[i] = [this.positionX[i], this.positionY[i]];
		
		count++;
	}
}

QuizNumber.prototype.firstPosition = function(){
	var objThis = this;
	this.$pieces.each(function(index){
		$(this).css({left:objThis.positionXY[index][0], top:objThis.positionXY[index][1]})
	});
}

QuizNumber.prototype.movePic = function($e){
	var thisIdx;
	var emptyIdx;
	var $thisX = parseInt($e.css('left'));
	var $thisY = parseInt($e.css('top'));
	var $emptyX = parseInt(this.$empty.css('left'));
	var $emptyY = parseInt(this.$empty.css('top'));
	
	for(var i=0; i<this.nPieces; i++){
		if(this.positionXY[i][0]==$emptyX && this.positionXY[i][1]==$emptyY) emptyIdx = i;
		if(this.positionXY[i][0]==$thisX && this.positionXY[i][1]==$thisY) thisIdx = i;
	}
	
	if(thisIdx==emptyIdx-5 || thisIdx==emptyIdx+5 || thisIdx==emptyIdx-1 || thisIdx==emptyIdx+1){
		this.$empty.css({left:$thisX, top:$thisY});
		//$e.css({left:$emptyX, top:$emptyY});
		$e.stop().animate({
			left:$emptyX,
			top:$emptyY
		}, 80, 'easeOutQuint', $.proxy(this,'winChk'));
	}else{
		alert('WHOOPS~!!!');
	}
} 

QuizNumber.prototype.randomPic = function(){
	var objThis = this;
	var chkNum;
	var nRandom = new Array();

	for(var i=0; i<25 ; i++){
		nRandom.push(i);
	}

	for(var i=0; i< nRandom.length ; i++){
		rNum = Math.floor(Math.random() * 25);
		chkNum = nRandom[i];
		nRandom[i] = nRandom[rNum];
		nRandom[rNum] = chkNum;
	}
	//alert(nRandom);
	
	this.$pieces.each(function(index){
		$(this).css({left:objThis.positionXY[nRandom[index]][0], top:objThis.positionXY[nRandom[index]][1]})
	});
}

QuizNumber.prototype.winChk = function(){
	var objThis = this;
	var count = 0;
	this.$pieces.each(function(index){
		//alert($(this).css('left'));
		if(objThis.positionXY[index][0] == parseInt($(this).css('left')) && objThis.positionXY[index][1] == parseInt($(this).css('top'))) count++;
	})
	if(count==25) alert('Finish');
}
