const Manager = require("../lib/Manager");

describe('Manager', () => {
    let Jim = new Manager("Jim", 2, "Jim@gmail.com", 101);
    let Ellen = new Manager("Ellen", 3, "Ellen@gmail.com", 102);
    it('should return the name of the manager', () =>{
        expect(Jim.getName()).toBe("Jim");
        expect(Ellen.getName()).toBe("Ellen");
    });

    it('should return the id of the manager', () =>{
        expect(Jim.getId()).toBe(2);
        expect(Ellen.getId()).toBe(3);
    });

    it('should return the email of the manager', () =>{
        expect(Jim.getEmail()).toBe("Jim@gmail.com");
        expect(Ellen.getEmail()).toBe("Ellen@gmail.com");
    });

    it('should return the role of the manager', () =>{
        expect(Jim.getRole()).toBe("Manager");
        expect(Ellen.getRole()).toBe("Manager");
    });
});