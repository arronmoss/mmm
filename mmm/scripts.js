var agegroup = document.location.href.split('/').pop();
console.log(agegroup);

google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawFixtures);
google.charts.setOnLoadCallback(drawTableA);
google.charts.setOnLoadCallback(drawTableB);
google.charts.setOnLoadCallback(drawTableFinals);

var allGamesPlayed = true;


function drawTableFinals() {
    var liveUrl = "https://script.google.com/macros/s/AKfycbx4uriTLlVllJfZG0TMXTww1T90JqQJyV1D2C7QbvoMWT29KJk/exec?table="+ agegroup +"-Finals";
    var table = new google.visualization.Table(document.getElementById('table_finals'));
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Team');
    dataTable.addColumn('number', 'Score');
    dataTable.addColumn('number', 'Score');
    dataTable.addColumn('string', 'Team');

    var leagueTable = [];
    $.getJSON( liveUrl , function( data ) {
        $.each( data, function( key, team ) {
            leagueTable.push( team );
        });
        dataTable.addRows(leagueTable);
        table.draw(dataTable, {showRowNumber: false, width: '100%', height: '50%'});
    });
}



function drawFixtures() {
    var liveUrl = "https://script.google.com/macros/s/AKfycbx4uriTLlVllJfZG0TMXTww1T90JqQJyV1D2C7QbvoMWT29KJk/exec?table=Fixtures&agegroup="+agegroup;
    var table = new google.visualization.Table(document.getElementById('table_fixtures'));
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Time');
    dataTable.addColumn('string', 'Group');
    dataTable.addColumn('string', 'Pitch');
    dataTable.addColumn('string', 'Home');
    dataTable.addColumn('string', '');
    dataTable.addColumn('string', 'Away');
    dataTable.addColumn('string', '');

    var leagueTable = [];
    $.getJSON( liveUrl , function( data ) {
        $.each( data, function( key, team ) {
            leagueTable.push( team );
        });
        dataTable.addRows(leagueTable);
        table.draw(dataTable, {showRowNumber: false, width: '100%', height: '50%'});
    });
}








function drawTableA() {
    var liveUrl = "https://script.google.com/macros/s/AKfycbx4uriTLlVllJfZG0TMXTww1T90JqQJyV1D2C7QbvoMWT29KJk/exec?table=Table-"+ agegroup +"-A";
    var table = new google.visualization.Table(document.getElementById('table_div'));
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
    var liveUrl = "https://script.google.com/macros/s/AKfycbx4uriTLlVllJfZG0TMXTww1T90JqQJyV1D2C7QbvoMWT29KJk/exec?table=Table-"+ agegroup +"-B";
    var table = new google.visualization.Table(document.getElementById('table_div_b'));
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
        var newHref = '/mmm/?' + randomStringForQueryString;
        jQuery(refreshButton).attr('href', newHref);
    }

    function checkIfFinals() {
        if(allGamesPlayed===false)  {
            jQuery('#finals').hide();
            console.log('all games NOT played');
        } else {
            jQuery('#finals').show();
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

});