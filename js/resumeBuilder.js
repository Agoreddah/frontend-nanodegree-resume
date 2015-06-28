/* jslint browser: true */
/* global $, jQuery, alert */
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
    skills: {
        skills: ['Play poker with the poker face', 'Brew and drink special slovak 52% plum alcohol \"slivovica\"', 'Read your mind you filthy monkey ;)']
    },
    bioPic: 'https://igcdn-photos-d-a.akamaihd.net/hphotos-ak-xft1/t51.2885-19/11123656_520967028041747_1809151877_a.jpg'

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

    }]

};

var projects = {

    Sentami: {

        projectTitle: 'Sentami - family restaurant',
        projectDates: 'January 2015',
        projectDescription: 'Website for small but uniquely delicious family restaurant, located in Zilina, Slovakia',
        projectImage: ['images/sentami.jpg', 'images/sentami2.jpg']

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
    }]
};

/////
//
// FORMATTING, APPENDING, PREPENDING functions
//
/////

/**
 * get formatted data from the Array
 * replace helpers.js variables
 * @param array
 * @param keyName
 * @return formattedArray
 */
function getFormattedArray(array, keyName) {

    "use strict";

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

    "use strict";

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
 * Append single formatted value to the locator
 * @param obj - Object
 * @param key - Key from the given Object
 * @param locator - jQuery locator
 */
function appendSingleValue(obj, key, locator) {

    "use strict";

    var formattedData;

    formattedData = getFormattedData(obj, key);

    jQuery(locator).append(formattedData);

}

/**
 * Prepend single formatted value to the locator
 * @param obj - Object
 * @param key - Key from the given Object
 * @param locator - jQuery locator
 */
function prependSingleValue(obj, key, locator) {

    "use strict";

    var formattedData;

    formattedData = getFormattedData(obj, key);

    jQuery(locator).prepend(formattedData);

}

/**
 * Append object with formatted values to the locator
 * @param obj - Object
 * @param locator - jQuery locator
 */
function appendObject(obj, locator) {

    "use strict";

    var formattedArray = '',
        formattedData,
        key;

    for (key in obj) {

        if (obj.hasOwnProperty(key)) {

            formattedData = getFormattedData(obj, key);

            formattedArray = formattedArray + formattedData;

        }

    }

    jQuery(locator).append(formattedArray);

}

/**
 * Append object with formatted values to the locator
 * @param obj - Object
 * @param locator - jQuery locator
 */
function prependObject(obj, locator) {

    "use strict";

    var formattedArray = '',
        formattedData,
        key;

    for (key in obj) {

        if (obj.hasOwnProperty(key)) {

            formattedData = getFormattedData(obj, key);

            formattedArray = formattedArray + formattedData;

        }

    }

    jQuery(locator).prepend(formattedArray);

}

/**
 * Append array with formattedData to the locator
 * htmlVarName is variable name from helper.js where
 * @param obj - Object
 * @param locator - jQuery locator
 * @param htmlVarName - HTML variable name from helper.js
 */
function appendArray(array, locator, htmlVarName) {

    "use strict";

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

    jQuery(locator).append(formattedArray);

}

/////
//
// BUILDERS - function callers
//
/////

// add bio info
prependSingleValue(bio, "headerRole", "#header");
prependSingleValue(bio, "headerName", "#header");
appendObject(bio.contacts, "#topContacts");
appendSingleValue(bio, "bioPic", "#header");
appendSingleValue(bio, "welcomeMsg", "#header");

// add skills
if (bio.skills) {

    jQuery("#header").append(HTMLskillsStart);
    appendArray(bio.skills.skills, "#skills", "HTMLskills");

}

// add work
if (work) {

    jQuery("#workExperience").append(HTMLworkStart);
    appendObject(work.jobs[0], ".work-entry");
    prependObject(work.jobs[1], ".work-entry");

}

// add projects
if (projects) {

    jQuery("#projects").append(HTMLprojectStart);
    appendObject(projects.Sentami, ".project-entry");

}

// add education
if (education) {

    jQuery("#education").append(HTMLschoolStart);
    appendObject(education.schools[0], ".education-entry:first");
    appendObject(education.schools[1], ".education-entry:nth-child(2)");

}

// add map
jQuery("#mapDiv").append(googleMap);

// add let's connect
if (bio) {

    appendObject(bio.contacts, "#footerContacts");

}