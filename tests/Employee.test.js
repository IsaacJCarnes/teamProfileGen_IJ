const Employee = require("../lib/Employee");

describe('Employee', () => {
    let John = new Employee("John", 21, "john@gmail.com");
    let Sean = new Employee("Sean", 27, "sean@gmail.com");
    it('should return the name of the employee', () =>{
        expect(John.getName()).toBe("John");
        expect(Sean.getName()).toBe("Sean");
    });

    it('should return the id of the employee', () =>{
        expect(John.getId()).toBe(21);
        expect(Sean.getId()).toBe(27);
    });

    it('should return the email of the employee', () =>{
        expect(John.getEmail()).toBe("john@gmail.com");
        expect(Sean.getEmail()).toBe("sean@gmail.com");
    });

    it('should return the role of the employee', () =>{
        expect(John.getRole()).toBe("Employee");
        expect(Sean.getRole()).toBe("Employee");
    });
});