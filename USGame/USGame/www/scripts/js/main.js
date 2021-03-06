// Initialize important game-wide variables (which have to be accessible across multiple gamestates/scenes)
var roles;
var actions;
var benefits;

var roleMenu;
var actionMenu;
var benefitMenu;

var roleBuild;
var actionBuild;
var benefitBuild;

var players = [];
var txt_progress;

// The contents of the userstory currently being made. It is comprised of standardtext and three variables for role-action-benefit
var usText;
var oText;
var roleText = "<???>";
var actionText = "<???>";
var benefitText = "<???>";

// To keep track of possible changes to the usText, the former role-action-benefit are also saved
var formerR = "<???>";
var formerA = "<???>";
var formerB = "<???>";

var menuType = "privacy";
var menuOpen = false;
var menuGroup = [];
var mbg;
var menBG;
var mText;
var header;

var times0 = [0, 0];
var times1 = [0, 0, 0, 0, 0];
var times2 = [0, 0, 0, 0, 0, 0, 0];
var times3 = [0, 0, 0, 0, 0, 0, 0];
var times4 = [0, 0, 0, 0, 0];

// Progress is the local storage object used throughout the entire game
var progress = {
    currentLevel: lvl0,
    currentEpic: 1,
    currentUserstories: [],
    currentMistakes: [],
    pointsPerLevel: [0, 0, 0, 0, 0],
    colours: [],
    totalTime: [times0, times1, times2, times3, times4],
    completedLevels: [false, false, false, false, false],
    player: [],
    id: []
};

var building = [];
building[0] = "";
building[1] = "";
building[2] = "";

var progressCircles = [];
var progressRects = [];

// Texts for descriptions, tips, etc.
var intros;
var intros2;
var introIndex;
var introIndex2;
var tips;
var introCircles;

// The possible databases (choose at start of the game which one to use)
var databases = [];
var database;
var skipDatabaseSelect = false;

// Tutorial parts
var tutorialProgress = "";
var currentTask;
var tutorialHandler;
var tapComplete = false;
var tapRoleComplete = false;
var tapActionBenefitComplete = false;
var dragComplete = false;

var scoreTimeFlash;
var progressFlash;
var menuFlash;
var menuButton1Flash;
var menuButton2Flash;
var menuButton3Flash;
var userstoryFlash;

// The different parts of the database
var epics;
var userstories;
var mistakes;
var accTests;

// Lists for keeping track of (menu) epics and userstories 
var eps = [];
var uss = [];
var mss = [];

// Lists for keeping track of the strings in the menu to assure the order stays the same and colours remain consistent
var strsr = [];
var strsa = [];
var strsb = [];

// Lists used in the debriefing of the player
var tups = [];
var mistakesMade = [];
var intr = [];

// Particle variables
var particles;
var emitter;
var firework1;
var firework2;
var firework3;

// Menu parts
var menuVisible = "None";
var menuBG;
var orderBG;
var usBG;
var bg;

// Menu text
var mTitle;
var mText1;
var mText2;
var mText3;
var mText4;
var mText5;
var orderText;
var titleText;
var scoreText;
var timeText;
var debrief;
var introText;
var conText;

var rolesEmptied = false;
var actionsEmptied = false;
var benefitsEmptied = false;

// Levels
var lvl0;
var lvl1;
var lvl2;
var lvl3;
var lvl4;
var lvlF;

// Pause items
var paused;
var timePaused;
var pauseTimeStart;
var pauseTimeEnd;
var times = [];
var timeIndex = 0;
var categoryHeader;
var category1;
var category2;
var category3;
var pausedCategory;
var creditsShown = false;
var page1;
var page2;
var currentPage = 1;

// #region Text configs
// Config for menu text
var textconfigMenu = {
    text: '',
    style: {
        fontFamily: 'Dosis',
        fontSize: 12,
        fill: '#000000',
        wordWrap: { width: window.innerWidth / 3 - window.innerWidth / 20, useAdvancedWrap: true }
    }
};

var textconfigMenuUserStory = {
    text: '',
    style: {
        fontFamily: 'Dosis',
        fontSize: 12,
        fill: '#000000',
        wordWrap: { width: 17 * window.innerWidth / 20 - window.innerWidth / 40, useAdvancedWrap: true }
    }
};

var textconfigMenuOrder = {
    text: '',
    style: {
        fontFamily: 'Dosis',
        fontSize: 18,
        align: 'center',
        fill: '#000000',
        wordWrap: { width: 3 * window.innerWidth / 4, useAdvancedWrap: true }
    }
};

var textconfigMenuOrder2 = {
    text: '',
    style: {
        fontFamily: 'Dosis',
        fontSize: 18,
        align: 'left',
        fill: '#000000',
        wordWrap: { width: 3 * window.innerWidth / 4, useAdvancedWrap: true }
    }
};

var textconfigMenuHeader = {
    text: '',
    style: {
        fontFamily: 'Dosis',
        fontSize: 24,
        fill: '#000000',
        align: 'center'
    }
};

var textconfigTitle = {
    text: '',
    style: {
        fontFamily: 'Dosis',
        fontSize: 48,
        fill: '#000000'
    }
};

var textconfigScore = {
    text: '',
    style: {
        fontFamily: 'Dosis',
        fontSize: 28,
        fill: '#FFFFFF'
    }
};

// #endregion

var dragging = false;
var score = 0;
var time = 0;
var countDown = 0;
var flawless = { inProgress: false, completed: false, lvlNr: 0 };

// #region Sounds
var correctSound;
var wrongSound;
var thudSound;
var thud2Sound;
var thumpSound;
var thump2Sound;
var dripSound;
var jingleSound;
var jingle2Sound;
var song1;
// #endregion

window.onload = function () {
    //statusbar.hide();
    runApp();
};

function runApp() {
    'use strict';

    // Initialize the Phaser game app
    let app = new App();
    app.start();
}

function resizeApp() {
    // Width-height-ratio of game resolution
    // Replace 360 with your game width, and replace 640 with your game height
    let game_ratio = 360 / 640;

    // Make div full height of browser and keep the ratio of game resolution
    let div = document.getElementById('phaser-app');
    div.style.width = (window.innerHeight * game_ratio) + 'px';
    div.style.height = window.innerHeight + 'px';

    // Check if device DPI messes up the width-height-ratio
    let canvas = document.getElementsByTagName('canvas')[0];

    let dpi_w = parseInt(div.style.width) / canvas.width;
    let dpi_h = parseInt(div.style.height) / canvas.height;

    let height = window.innerHeight * (dpi_w / dpi_h);
    let width = height * game_ratio;

    // Scale canvas	
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
}


