/* jslint browser: true */
/* global $, jQuery, alert, console */
var Builder = (function() {

    "use strict";

    Builder = {};

    var formattedData,
        formattedKey,
        formattedArray = '',
        unformattedData,
        value,
        key,
        keyName,
        arrayValue,
        i = 0;

    /**
     * Return data type
     * @param data
     * @return dataType
     */
    function getDataType(data) {

        "use strict";

        var dataType;

        dataType = typeof(data);

        return dataType;
    }

    /**
     * get formatted data from the Array
     * replace helpers.js variables
     * @param array
     * @param keyName
     * @return formattedArray
     */
    function getFormattedArray(array, keyName) {

        var formattedArray = '',
            formattedKey,
            formattedData,
            i = 0;

        formattedKey = "HTML" + keyName;

        for (i; i < array.length; i += 1) {

            formattedData = window[formattedKey].replace("%data%", array[i]);

            formattedArray = formattedArray + formattedData;

        }

        return formattedArray;
    }

    /**
     * search and transform helper.js variables with object's data
     * Function checks if the key of the object is not another object
     * @param obj - Object
     * @param key - Key from the given Object
     * @return formattedData
     */
    function getFormattedData(obj, key) {

        var formattedData,
            formattedKey,
            value,
            keyName,
            arrayValue;

        value = obj[key];

        formattedKey = "HTML" + key;

        if (window.hasOwnProperty(formattedKey) && typeof(value) !== "object") {

            formattedData = window[formattedKey].replace("%data%", value);

        } else if (typeof(value) === "object") {

            keyName = key;
            arrayValue = value;

            formattedData = getFormattedArray(arrayValue, keyName);

        } else {

            return false;

        }

        return formattedData;

    }

    function doAttachment(attacheddData, locator, attachment) {

        attachment.toLowerCase();

        if (attachment === 'append') {
            jQuery(locator).append(attacheddData);
        } else if (attachment === 'prepend') {
            jQuery(locator).prepend(attacheddData);
        } else {
            console.log('do not forget to defined append or prepend attachment style');
            return false;
        }

        // cleaning mechanism
        formattedArray, formattedData, attacheddData = '';

        return formattedArray, formattedData, attacheddData;
    }

    /**
     * Append single formatted value to the locator
     * @param obj - Object
     * @param key - Single key from the given Object
     * @param locator - jQuery locator
     * @param attachmentStyle - append or prepend
     */
    Builder.attachSingleValue = function(obj, key, locator, attachmentStyle) {

        var formattedData;

        formattedData = getFormattedData(obj, key);

        doAttachment(formattedData, locator, attachmentStyle);

    };

    /**
     * Append object with formatted values to the locator
     * @param obj - Object
     * @param locator - jQuery locator
     * @param attachmentStyle - append or prepend
     */
    Builder.attachObject = function(obj, locator, attachmentStyle) {

        var formattedArray = '',
            formattedData,
            key;

        for (key in obj) {

            if (obj.hasOwnProperty(key)) {

                formattedData = getFormattedData(obj, key);

                formattedArray += formattedData;

            }

        }

        doAttachment(formattedArray, locator, attachmentStyle);

    }

    /**
     * Append array with formattedData to the locator
     * htmlVarName is variable name from helper.js where
     * @param obj - Object
     * @param locator - jQuery locator
     * @param htmlVarName - HTML variable name from helper.js
     * @param attachmentStyle - append or prepend
     */
    Builder.attachArray = function(array, locator, htmlVarName, attachmentStyle) {

        var formattedArray = '',
            value,
            unformattedData,
            formattedData,
            i = 0;

        for (i; i < array.length; i += 1) {

            value = array[i];
            unformattedData = htmlVarName;

            if (window.hasOwnProperty(unformattedData) && typeof(value) !== "object") {

                formattedData = window[unformattedData].replace("%data%", value);

                formattedArray = formattedArray + formattedData;

            }

        }

        doAttachment(formattedArray, locator, attachmentStyle);



    };
    
    return Builder;

})(Builder);

/////
//
// DATA OBJECTS
//
/////
var bio = {
    headerName: 'Tomas Chudjak',
    headerRole: 'Webdeveloper',
    contacts: {
        mobile: '+421 949 099 955',
        email: 'tomas@kleidi.sk',
        github: 'https://github.com/Agoreddah',
        twitter: 'https://twitter.com/TomasChudjak',
        location: 'Bangalore, India'
    },
    welcomeMsg: 'Just another handsome guy from Slovakia',
    skills: ['Play poker with the poker face', 'Brew and drink special slovak 52% plum alcohol \"slivovica\"', 'Read your mind you filthy monkey ;)'],
    bioPic: 'images/me.jpg',
    display: function(skillLocator) {
        Builder.attachSingleValue(bio, "headerRole", "#header", "prepend");
        Builder.attachSingleValue(bio, "headerName", "#header", "prepend");
        Builder.attachSingleValue(bio, "bioPic", "#header", "append");
        Builder.attachSingleValue(bio, "welcomeMsg", "#header", "append");
        jQuery("#header").append(HTMLskillsStart);
        Builder.attachArray(bio.skills, "#skills", "HTMLskills", "prepend");
    },
    displayContacts: function(contactsLocator) {
        Builder.attachObject(bio.contacts, contactsLocator, "prepend");
    }
};

var work = {

    jobs: [{

        workEmployer: 'Siemens',
        workTitle: 'JSF Developer and GUI tester',
        workDates: 'june, 2012 - december, 2014',
        workLocation: 'Zilina, Slovak Republic',
        workDescription: 'Create and test GUI environment for JAVA based application. Front-end follows old Nokia Siemens Networks guidelines - Orange Touch. Implementation consits of HTML, CSS, jQuery changes based on JAVA front-end framework Richfaces 3.3. Testing concept was providing Continuous Integration architecture with Jenkins job runner and Selenium/Robotframework gui testing solution. Application itself has been build on Java basis, J2EE, Jboss 4.3.2, LDAP database, PostgreSQL, SLES linux, Richfaces 3.3, Python 2.7. Project is part of the SDM technologies at Nokia R&D.'

    }, {

        workEmployer: 'Nokia',
        workTitle: 'GUI and Test team mentor',
        workDates: 'january, 2014 - present',
        workLocation: 'Bangalore, India',
        workDescription: 'Team lead mentor responsible for developing GUI features and Continuous integration environment. As a part of project and Know-How transfer to India branch, I was involved to continue in the same project as a member of Nokia company. My basic role is mentoring, in focus with developing new features - rebranding according to new Nokia guidelines and Richfaces update to 4.4 version. Second half of the position responsibility, is test environment preparation for continuous integration, modification of the automated Robotframework based testcases for new GUI and cloud based testbed management for entire team in India. Project is part of the SDM technologies at Nokia R&D.'

    }],

    display: function() {
        jQuery("#workExperience").append(HTMLworkStart);
        Builder.attachObject(work.jobs[0], ".work-entry", "append");
        Builder.attachObject(work.jobs[1], ".work-entry", "prepend");
    }

};

var projects = {

    Sentami: {

        projectTitle: 'Sentami - family restaurant',
        projectDates: 'January 2015',
        projectDescription: 'Website for small but uniquely delicious family restaurant, located in Zilina, Slovakia',
        projectImage: ['images/sentami.jpg', 'images/sentami2.jpg']

    },

    display: function() {
        jQuery("#projects").append(HTMLprojectStart);
        Builder.attachObject(projects.Sentami, ".project-entry", "append");
    }

};

var education = {
    schools: [{
        schoolName: 'University of Zilina',
        schoolDegree: 'Master of Science',
        schoolDates: '2007-2012',
        schoolLocation: 'Zilina, Slovak Republic',
        schoolMajor: 'Mediamatics'
    }, {
        schoolName: 'University of Patras',
        schoolDegree: 'Business of Administration',
        schoolDates: '2011',
        schoolLocation: 'Patras, Greece',
        schoolMajor: 'Administration'
    }],

    display: function() {
        jQuery("#education").append(HTMLschoolStart);
        Builder.attachObject(education.schools[0], ".education-entry:first", "append");
        Builder.attachObject(education.schools[1], ".education-entry:nth-child(2)", "append");
    }
};

/////
//
// Display - function callers
//
/////

// add bio info and skills
bio.display();
bio.displayContacts("#topContacts");

// add work
work.display();

// add projects
projects.display();

// add education
education.display();

// add map
jQuery("#mapDiv").append(googleMap);

// add let's connect
bio.displayContacts("#footerContacts");