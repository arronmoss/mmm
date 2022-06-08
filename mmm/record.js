var agegroup = document.location.href.split('/').pop();
agegroup = agegroup.split('.').shift();
console.log(agegroup);

google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawFixtureReport);


var allGamesPlayed = true;

var today = new Date();
var nowtime = today.getHours() + ":" + today.getMinutes();


function drawFixtureReport() {
    var liveUrl = "https://script.google.com/macros/s/AKfycbx4uriTLlVllJfZG0TMXTww1T90JqQJyV1D2C7QbvoMWT29KJk/exec?table=ScoreReport&agegroup="+agegroup;
    var table = new google.visualization.Table(document.getElementById('table_fixtures'));
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Time');
    dataTable.addColumn('string', 'Group');
    dataTable.addColumn('string', 'Pitch');
    dataTable.addColumn('string', 'Home');
    dataTable.addColumn('number', '');
    dataTable.addColumn('string', 'Away');
    dataTable.addColumn('number', '');

    var leagueTable = [];

    $.getJSON( liveUrl , function( data ) {

        // Check the time and only report ones with no data which are in the past
        $.each( data, function( key, team ) {
            //console.log(team[0]);
            console.log(team);
            var kotime = team[0]+':00';

            if (nowtime > kotime) {
                console.log('Time is in the past, good to report scores');
                if(team[4]==='' && team[6]==='') {
                    // Only push the score sheet to UX if scores empty
                    team[4]=null;team[6]=null;
                    leagueTable.push( team );


                }

            } else {
                console.log('dont show result');
            }

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
        }
    }

    function enableAdmins() {
        // checks required, URL query sets cookie?
        $(".google-visualization-table-type-number.google-visualization-table-td").attr("contenteditable","true");
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
    enableAdmins();

});