var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {
    // password --> hashed_password 변경, default 속성 모두 추가, salt 속성 추가
    var UserSchema = mongoose.Schema ({
        id:{type:String, required:true, unique:true},
        hashed_password: {type:String, required:true, 'default':' '},
        salt: {type:String, required:true, 'default': ' '},
        name:{type:String, index:'hashed', 'default':''},
        age:{type:Number, 'default':-1},
        created_at: {type:Date, index:{unique:false}, 'default':Date.now},
        updated_at: {type:Date, index:{unique:false}, 'defauul':Date.now}
    });
    //info를 virtual 메소드로 정의 - virtual().set().get()
    UserSchema.virtual('info').set(function(info) {
        var splitted = info.split(' ');
        this.id = splitted[0];
        this.name = splitted[1];
        console.log('virtual info 설정함 : %s, %s', this.id, this.name);
    }).get(function(){return this.id + ' ' + this.name});
    //password를 virtual 메소드로 정의 - virtual().set().get()
    UserSchema.virtual('password').set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPasswrod(password);
        console.log('virtual password 호출 됨 : ', this.hashed_password);
    }).get(function(){return this._password});
    // 스키마에 메소드 추가
    // 비밀번호 암호와 메소드
    UserSchema.method('encryptPasswrod', function(plainText, inSalt) {
        if(inSalt) {
            return crypto.createHmac('sha1', inSalt).update(plainText).digest('hex');
        } else {
            return crypto.createHmac('sha1', this.salt).update(plainText).digest('hex');
        }
    });
    // salt 값 만들기 메소드
    UserSchema.method('makeSalt', function() {
        return Math.round((new Date().valueOf()*Math.random())) + '';
    });
    // 인증 메소드 - 입력된 비밀번호와 비교 (true/false 리턴)
    UserSchema.method('authenticate', function(plainText, inSalt, hashed_password){
        if(inSalt) {
            console.log('authenticate 호출됨 : %s -> %s : %s', plainText, 
                       this.encryptPasswrod(plainText, inSalt), hashed_password);
            return this.encryptPasswrod(plainText, inSalt) === hashed_password;
        } else {
            console.log('authenticate 호출됨 : %s -> %s : %s', plainText, 
                       this.encryptPasswrod(plainText), hashed_password);
            return this.encryptPasswrod(plainText) === hashed_password;
        }
    });
    // 스키마에 static으로 findById 메소드 추가
	UserSchema.static('findById', function(id, callback) {
		return this.find({id:id}, callback);
	});
    // 스키마에 static으로 findAll 메소드 추가
	UserSchema.static('findAll', function(callback) {
		return this.find({}, callback);
	});
    console.log('UserSchma 정의함.');
    return UserSchema;
}; //end of createSchema

// module.exports에 UserSchema 객체 직접 할당
module.exports = Schema;