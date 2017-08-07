describe("when Doctor object", function() {


    global.$ = require("jquery");
    $.ajax = function() {
        //Mock function
    };

    var Doctor;
    var testDoc;

    beforeEach(function(){

        spyOn(global.$, "ajax").and.callFake(function() {

        });
        Doctor = require("../src/doctors");
        testDoc = Object.create(Doctor);

        Doctor.list = [
            {
                id: 1,
                name: "Matt Murdock",
                type: "Primary Care Provider",
                speciality: "Pulmonary Disease",
                area: "02120",
                score: 5.0,
                gender: "M"
            },
            {
                id: 2,
                name: "Jessica Jones",
                type: "Primary Care Provider",
                speciality: "Pediatrics",
                area: "02120",
                score: 4.8,
                gender: "F"
            },
            {
                id: 3,
                name: "Luke Cage",
                type: "Primary Care Provider",
                speciality: "Internal Medicine",
                area: "02121",
                score: 4.9,
                gender: "M"
            },
            {
                id: 4,
                name: "Danny Rand",
                type: "Primary Care Provider",
                speciality: "Pulmonary Disease",
                area: "02121",
                score: 4.5,
                gender: "M"
            },
            {
                id: 5,
                name: "Phil Colson",
                type: "Specialist",
                speciality: "Surgery General",
                area: "02122",
                score: 5.0,
                gender: "M"
            }
        ];

    });

    it("is initialized", function() {

        expect(Doctor.list.length).toEqual(5);

    });

    it("instance is created and initialized with some properties", function() {

        var props = {
            id: 3,
            name: "Luke Cage",
            type: "Specialist",
            speciality: "Pediatrics",
            area: "02121",
            score: 4.9,
            gender: "M"
        };

        testDoc.init(props);

        expect(testDoc.id).toEqual(3);
        expect(testDoc.name).toEqual("Luke Cage");
        expect(testDoc.type).toEqual("Specialist");
        expect(testDoc.speciality).toEqual("Pediatrics");
        expect(testDoc.area).toEqual("02121");
        expect(testDoc.score).toEqual(4.9);
        expect(testDoc.gender).toEqual("M");

    });

    it("instance wants similar doctors", function() {

        var props = {
            id: 3,
            name: "Luke Cage",
            type: "Specialist",
            speciality: "Pediatrics",
            area: "02121",
            score: 4.9,
            gender: "M"
        };

        testDoc.init(props);

        var list = testDoc.getSimilarDoctors();
        expect(list.length).toEqual(5);
        expect(list[0].similarity >= list[1].similarity).toEqual(true);
        expect(list[0].name).toEqual("Jessica Jones");

    })

});