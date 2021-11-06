const Employee = require("./Employee.js");
class Manager extends Employee{
    constuctor(name, id, email, officeNumber){
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getRole(){
        return "Manager";
    }
}