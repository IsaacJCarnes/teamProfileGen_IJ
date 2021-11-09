const Intern = require("../lib/Intern");

describe('Intern', () => {
    let Isaac = new Intern("Isaac", 31, "Isaac@gmail.com", "PennState");
    let Cam = new Intern("Cam", 34, "Cam@gmail.com", "CCAC");
    it('should return the name of the intern', () =>{
        expect(Isaac.getName()).toBe("Isaac");
        expect(Cam.getName()).toBe("Cam");
    });

    it('should return the id of the intern', () =>{
        expect(Isaac.getId()).toBe(31);
        expect(Cam.getId()).toBe(34);
    });

    it('should return the email of the intern', () =>{
        expect(Isaac.getEmail()).toBe("Isaac@gmail.com");
        expect(Cam.getEmail()).toBe("Cam@gmail.com");
    });

    it('should return the school of the intern', () =>{
        expect(Isaac.getSchool()).toBe("PennState");
        expect(Cam.getSchool()).toBe("CCAC");
    });

    it('should return the role of the intern', () =>{
        expect(Isaac.getRole()).toBe("Intern");
        expect(Cam.getRole()).toBe("Intern");
    });
});