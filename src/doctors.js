"use strict";

var Doctor = {

    list: (function() {
        $.ajax({
            url: "doctors.json",
            method: "GET",
            success: function(data) {
                Doctor.list = data.doctors;
            },
            error: function(data, error) {
                console.log("Error");
            }
        });
    })(),

    init: function(props) {
        this.id = props.id;
        this.name = props.name;
        this.type = props.type;
        this.speciality = props.speciality;
        this.area = props.area;
        this.score = props.score;
        this.gender = props.gender;
    },

    getSimilarDoctors: function(count) {

        count = count || 5;
        var list = [];
        var self = this;
        var similarity;
        var doctor;

        var doctorList = Doctor.list;
        for(var i = 0; i < doctorList.length; i++) {
            similarity = 0;
            if(self.id !== doctorList[i].id) {
                doctor = doctorList[i];
                if(self.speciality === doctor.speciality) {
                    similarity += 4;
                }
                if(self.type === doctor.type) {
                    similarity += 2;
                }
                if(self.area === doctor.area) {
                    similarity += 1;
                }
                if(self.gender === doctor.gender) {
                    similarity += 1;
                }
                doctor.similarity = similarity;
            } else {
                doctorList[i].similarity = 0;
            }
        }

        doctorList.sort(function(d1, d2) {
            if(d1.similarity === d2.similarity) {
                return d2.score - d1.score;
            } else {
                return d2.similarity - d1.similarity;
            }
        });

        return doctorList.splice(0, count);

    }

};

// Added for testing as a Node module
// This line will produce an error on the browser console
module.exports = Doctor;
