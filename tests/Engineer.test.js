const Engineer = require("../lib/Engineer");

describe('Engineer', () => {
    let Jake = new Engineer("Jake", 15, "jake@gmail.com", "JakeGit");
    let May = new Engineer("May", 12, "may@hotmail.com", "MayGit");
    it('should return the name of the engineer', () =>{
        expect(Jake.getName()).toBe("Jake");
        expect(May.getName()).toBe("May");
    });

    it('should return the id of the engineer', () =>{
        expect(Jake.getId()).toBe(15);
        expect(May.getId()).toBe(12);
    });

    it('should return the email of the engineer', () =>{
        expect(Jake.getEmail()).toBe("jake@gmail.com");
        expect(May.getEmail()).toBe("may@hotmail.com");
    });

    it('should return the github of the engineer', () =>{
        expect(Jake.getGithub()).toBe("JakeGit");
        expect(May.getGithub()).toBe("MayGit");
    });

    it('should return the role of the engineer', () =>{
        expect(Jake.getRole()).toBe("Engineer");
        expect(May.getRole()).toBe("Engineer");
    });
});