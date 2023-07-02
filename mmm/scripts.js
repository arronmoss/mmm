var agegroup = document.location.href.split('/').pop();
agegroup = agegroup.split('.').shift();
console.log(agegroup);

google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawFixtures);
google.charts.setOnLoadCallback(drawTableA);
google.charts.setOnLoadCallback(drawTableB);
google.charts.setOnLoadCallback(drawTableFinals);

var allGamesPlayed = true;
var dataUrl = "https://script.google.com/macros/s/AKfycbxg1MzLm6uVpMENFW5PcwKCpRtNcUXJkkETM741taPnUybHsgXJ_d6ejPwZmD3uKBPK5w/exec";

var redirectagegroup = agegroup.split('-').shift();
if(document.location.search.includes('?refresh='))
    var timer = document.location.search.replace("?refresh=", "");
if(timer<1000) timer = 1000;
if(redirectagegroup==='Mini') {
    window.setTimeout(window.location.href = `https://buxtonjfc.uk/mmm/Junior.html?refresh=${timer}`,timer);
} else {
    window.setTimeout(window.location.href = `https://buxtonjfc.uk/mmm/Junior.html?refresh=${timer}`,timer);
}




function drawTableFinals() {
    var liveUrl = `${dataUrl}?table=${agegroup}-Finals`;
    var table = new google.visualization.Table(document.getElementById('table_finals'));
    var dataTable = new google.visualization.DataTable();
    var leagueTable = [];
    var finalsComplete = false;
    console.log('blh');
    $.getJSON( liveUrl , function( data ) {
        $.each( data, function( key, team ) {
            console.log(typeof team[1]);

            if(typeof team[1]==='number') {
                // scores are in
                console.log('finalsComplete');
                leagueTable.push( team );
                finalsComplete = true;
            } else { // string
                console.log('finals inComplete');
                leagueTable.push( [team[0],'v',team[3]] );
            }

        });
        console.log(leagueTable);

        dataTable.addColumn('string', 'Team');
        if(finalsComplete === true) {
            // scores are in
            console.log('finalsComplete');
            dataTable.addColumn('number', 'Score');
            dataTable.addColumn('number', 'Score');
        } else {
            dataTable.addColumn('string', '');
        }
        dataTable.addColumn('string', 'Team');

        dataTable.addRows(leagueTable);
        table.draw(dataTable, {showRowNumber: false, width: '100%', height: '50%'});
    });
}



function drawFixtures() {
    var liveUrl = `${dataUrl}?table=Fixtures&agegroup=${agegroup}`;
    //var liveUrl = "https://script.google.com/macros/s/AKfycbx4uriTLlVllJfZG0TMXTww1T90JqQJyV1D2C7QbvoMWT29KJk/exec?table=Fixtures&agegroup="+agegroup;
    var table = new google.visualization.Table(document.getElementById('table_fixtures'));
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'T');
    dataTable.addColumn('string', 'G');
    dataTable.addColumn('string', 'Pitch');
    dataTable.addColumn('string', 'Home');
    dataTable.addColumn('string', '');
    dataTable.addColumn('string', 'Away');
    //dataTable.addColumn('string', '');

    var leagueTable = [];
    $.getJSON( liveUrl , function( data ) {
        $.each( data, function( key, team ) {
            if(typeof team[4]==='number' && typeof team[6]==='number')  {
                // nothing

            } else {
                leagueTable.push( [team[0],team[1],team[2],team[3],'v',team[5]] );

            }
        });
        dataTable.addRows(leagueTable);
        table.draw(dataTable, {showRowNumber: false, width: '100%', height: '50%'});
    });
}



function drawTableA() {
    var liveUrl = `${dataUrl}?table=Table-${agegroup}-A`;
    //var liveUrl = "https://script.google.com/macros/s/AKfycbx4uriTLlVllJfZG0TMXTww1T90JqQJyV1D2C7QbvoMWT29KJk/exec?table=Table-"+ agegroup +"-A";
    var table = new google.visualization.Table(document.getElementById('table_div_A'));

    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Team');
    dataTable.addColumn('number', 'MP');
    dataTable.addColumn('number', 'GF');
    dataTable.addColumn('number', 'GA');
    dataTable.addColumn('number', 'GD');
    dataTable.addColumn('number', 'Pts');

    var leagueTable = [];
    $.getJSON( liveUrl , function( data ) {
        $.each( data, function( key, team ) {
            //console.log("we should be putting data into table");
            console.log('Matches Played');
            if(typeof team[1] != 'number') {
                team[1] = 0;team[2] = 0;team[3] = 0;team[4] = 0;team[5] = 0;
            }
            // need to check if games played NOT 4, then hide Finals table
            if(team[1]<4) allGamesPlayed = false;
            leagueTable.push( team );
        });
        dataTable.addRows(leagueTable);
        table.draw(dataTable, {showRowNumber: false, width: '100%', height: '50%'});
    });
}

function drawTableB() {
    var liveUrl = `${dataUrl}?table=Table-${agegroup}-B`;
    var table = new google.visualization.Table(document.getElementById('table_div_B'));
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Team');
    dataTable.addColumn('number', 'MP');
    dataTable.addColumn('number', 'GF');
    dataTable.addColumn('number', 'GA');
    dataTable.addColumn('number', 'GD');
    dataTable.addColumn('number', 'Pts');

    var leagueTable = [];
    $.getJSON( liveUrl , function( data ) {
        $.each( data, function( key, team ) {
            //console.log("we should be putting data into table");
            console.log('Matches Played');
            if(typeof team[1] != 'number') {
                team[1] = 0;team[2] = 0;team[3] = 0;team[4] = 0;team[5] = 0;
            }
            // need to check if games played NOT 4, then hide Finals table
            if(team[1]<4) allGamesPlayed = false;
            leagueTable.push( team );
        });
        dataTable.addRows(leagueTable);
        table.draw(dataTable, {showRowNumber: false, width: '100%', height: '50%'});
    });
}

jQuery(document).ready(function(){
    // Wait for google tables to appear in DOM
    var waitForEl = function(selector, callback) {
        if (jQuery(selector).length) {
            callback();
        } else {
            setTimeout(function() {
                waitForEl(selector, callback);
            }, 1000);
        }
    };

    waitForEl('.google-visualization-table-table', function() {
        addClassesToTablesForFlags();
        checkIfFinals();
    });

    function setNewQueryStringOnRefreshButton() {
        var randomStringForQueryString = Math.random().toString(36).slice(2, 7);
        var refreshButton = jQuery('#refresh');
        var newHref = '/mmm/' + agegroup + '.html?' + randomStringForQueryString;
        jQuery(refreshButton).attr('href', newHref);
    }

    function checkIfFinals() {
        if(allGamesPlayed===false)  {
            jQuery('#finals').hide();
            console.log('all games NOT played');
        } else {
            jQuery('#finals').show();
            jQuery('#table_fixtures').hide();
            jQuery('.fixtures-title').hide();


        }
    }

    function addClassesToTablesForFlags() {
        var teamNameInTable = jQuery('.google-visualization-table-td');
        jQuery(teamNameInTable).each(function(){
            //if (!jQuery(this).hasClass('google-visualization-table-type-number')) {
            var contents = jQuery(this).html();
            if (contents==='Ukraine' ||
                contents==='Belgium' ||
                contents==='Germany' ||
                contents==='England' ||
                contents==='Holland' ||
                contents==='Ireland' ||
                contents==='Spain' ||
                contents==='France' ||
                contents==='Brazil' ||
                contents==='Portugal'
            ) {
                jQuery(this).addClass('flag');
                var teamName = jQuery(this).html();
                var teamNameClass = teamName + '-flag';
                //console.log(teamName);
                jQuery(this).addClass(teamNameClass);
            }
        });
    }

    setNewQueryStringOnRefreshButton();
    jQuery("span.age").text(agegroup);

    jQuery("a.players-list").attr("href", '/mmm/pdf/'+agegroup+'-az.pdf');
    jQuery("a.team-list").attr("href", '/mmm/pdf/'+agegroup+'-teamlist.pdf');



});
