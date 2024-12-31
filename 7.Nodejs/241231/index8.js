/*
    확실하게 설계

    해당 블로그 클래스는 블로그 주소와 블로그 주소의 소유자를 정의합니다.
    인스턴스 객체를 만들거에요
*/
class Blog {
    constructor(_address, _owner) {
        this.address = _address;
        this.owner = _owner;
    }

    setBlogValue(_address, _owner) {
        this.address = _address;
        this.owner = _owner;
    }

    getBlogValue() {
        return `현재 블로그 주소 ${this.address} 현재 블로그 소유자 ${this.owner}`;
    }

    // set _address(address) {
    //     return this.address = address;
    // }

    // get _address() {
    //     return this.address;
    // }

    // set _owner(owner) {
    //     return this.owner = owner;
    // }

    // get _owner() {
    //     return this.owner
    // }
}

const blog1 = new Blog("https://github.com/imbhj", "주병현");
const blog2 = new Blog("https://chic09.tistory.com", "은유정");

blog1.setBlogValue("https://choa323.tistory.com", "조상아");
console.log(blog1.getBlogValue());

module.exports = {
    Blog
}