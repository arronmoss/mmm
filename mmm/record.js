var agegroup = document.location.href.split('/').pop();
agegroup = agegroup.split('.').shift();
console.log(agegroup);

google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawFixtureReport);

var allGamesPlayed = true;
var today = new Date();
var nowtime = today.getHours() + ":" + (today.getMinutes()<10?'0':'') + today.getMinutes() ;

if(typeof document.location.href.split("time=")[1]==='string') {
    var hour = document.location.href.split("time=")[1]
    console.log("we are debugging, setting future hour to "+ hour);
    var nowtime = hour +':00';
}

document.getElementById("agegroup").innerHTML = agegroup.split('-').shift();


function drawFixtureReport() {

    var liveUrl = "https://script.google.com/macros/s/AKfycbxg1MzLm6uVpMENFW5PcwKCpRtNcUXJkkETM741taPnUybHsgXJ_d6ejPwZmD3uKBPK5w/exec?table=ScoreReport&agegroup="+agegroup;
    var table = new google.visualization.Table(document.getElementById('table_fixtures'));
    var dataTable = new google.visualization.DataTable();

    dataTable.addColumn('number', 'ID');
    dataTable.addColumn('string', 'Time');
    //dataTable.addColumn('string', 'Group');
    //dataTable.addColumn('string', 'Pitch');
    dataTable.addColumn('string', 'Home');
    dataTable.addColumn('number', '');
    dataTable.addColumn('string', 'Away');
    dataTable.addColumn('number', '');
    dataTable.addColumn('string', 'Save');

    var leagueTable = []; var id = 11;


    $.getJSON( liveUrl , function( data ) {
        // Check the time and only report ones with no data which are in the past
        $.each( data, function( key, team ) {
            //console.log(team[0]);
            console.log(team);
            var kotime = team[0]+':00';

            //if (nowtime > kotime) {
                console.log('Time is in the past, good to report scores');
                //if(team[4]==='' && team[6]==='') {
                    // Only push the score sheet to UX if scores empty
                    team[4]=null;team[6]=null;
                    leagueTable.push( [id,team[0],team[3],team[4],team[5],team[6],'<button class="button" style="width:100%;">SAVE</button>'] );
                //}
            //} else {
            //    console.log('dont show result');
            //}
            id++; // increment the ID so we know which row to post back to
        });
        dataTable.addRows(leagueTable);
        table.draw(dataTable, {allowHtml:true, showRowNumber: false, width: '100%', height: '50%'});

        $(".google-visualization-table-type-number.google-visualization-table-td").attr("contenteditable","true");

        $(".button").click(function(){
            console.log('diddly');
            console.log($(this).parent().parent().html());
            html = $.parseHTML( $(this).parent().parent().html() )
            var homescore = $(html[3]).text();
            var awayscore = $(html[5]).text();
            console.log(typeof homescore);
            console.log(typeof awayscore);
            $.post( "https://script.google.com/macros/s/AKfycbxg1MzLm6uVpMENFW5PcwKCpRtNcUXJkkETM741taPnUybHsgXJ_d6ejPwZmD3uKBPK5w/exec",
                { id: $(html[0]).text(),
                    home: homescore,
                    away: awayscore,
                    agegroup: agegroup.split('-').shift()
                })
                .done(function( data ) {
                    alert( "Scores Saved, well done me ewd!"  );
                    //alert( "Scores Saved to  Loaded: " + data );
                });
        });
        $(document).on("click", "a.remove" , function() {
            $(this).parent().remove();
        });
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
        //checkIfFinals();
    });

    function setNewQueryStringOnRefreshButton() {
        var randomStringForQueryString = Math.random().toString(36).slice(2, 7);
        var refreshButton = jQuery('#refresh');
        var newHref = '/mmm/' + agegroup + '.html?' + randomStringForQueryString;
        jQuery(refreshButton).attr('href', newHref);
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
                jQuery(this).addClass(teamNameClass);
            }
        });
    }
    setNewQueryStringOnRefreshButton();

});
