// 인스턴스 객체를 만들어 할당함.
function User(id, name) {
    this.id = id;
    this.name = name;
}
User.prototype.getUser = function() {
    return {id:this.id, name:this.name};
}
User.prototype.group = {id:'group1', name:'친구'};
User.prototype.printUser = function() {
    console.log('user 이름 : %s, group 이름 : %s', 
                this.name, this.group.name);
}
module.exports.user = new User('test01', '방탄소년단');