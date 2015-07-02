function renderchart(path,divid1,divid2)
{
var scorelist=[]; var tweetlist=[];
            var positive=0,negative=0,neutral=0;
            $.getJSON(path).done(function(data) {
                console.log( "success" );
                if(data && data.length && data.length > 0){
                    for(i=0;i<data.length;i++)
                    {
                      scorelist[i]=parseInt(data[i].score); 
                      tweetlist[i]=data[i].tweet;
                      console.log(tweetlist[i]);
                      if(scorelist[i]>0)
                        positive++;
                    else if(scorelist[i]==0)
                        neutral++;
                    else if(scorelist[i]<0)
                        negative++;
                }
               // console.log("Postive" + postive);
                //console.log("Negative" + negative);


                var xaxis = [], p_yaxis = [], n_yaxis = [], z_yaxis = [];

                for(var i=-3;i<=3;++i){
                 xaxis.push(i);
                 p_yaxis.push(0);
                 n_yaxis.push(0);
                 z_yaxis.push(0);
             }

             var len = data.length;
             for(var i=0;i<len;++i){
                 var score = parseInt(data[i].score);
                 if(score < 0) ++n_yaxis[3 + score];
                 else if(score > 0) ++p_yaxis[3 + score];
                 else if(score == 0) ++z_yaxis[3 + score];
             }

             $(function () {
                $(divid1).highcharts({
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Sentiment Analysis chart'
                    },

                        xAxis: {
                            categories: xaxis,
                            crosshair: true,
                            type: 'category'
                        },
                        yAxis: {
                           min: 0,
                           title: {
                               text: 'Count'
                           }
                       },
                       plotOptions: {
                           column: {
                               pointPadding: 0.2,
                               borderWidth: 10,
                               pointWidth: 25
                           },
                           series: {
                            cursor: 'pointer',
                            point: {
                              events: {
                                click: function() {

                                   /* for(i=0;i<scorelist.length;i++)
                                    {
                                        
                                        if(scorelist[i]==this.category)
                                        {
                                            result+=(String(tweetlist[i]));
                                        }
                                    }
                                //alert (result);*/
                              }
                          }
                      }
                  }

              },
              series: [{
               name: 'Positive',
               data: p_yaxis,
               color: '#228B22'
           },
           {
               name: 'Negative',
               data: n_yaxis,
               color: '#FF0000'
           },
           {
               name: 'Zero',
               data: z_yaxis,
               color: '#000000'
           }],
           credits: {
            enabled: false
        },
                        /*series: [{
                            name: 'Score',
                            data: scorelist
                        }]*/
                    });
});

    $(function () {
        $(divid2).highcharts({
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: 'Sentiment'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'TweetShare',
                data: [
                ['Positive',   positive],
                ['Negative',   negative],
                ['Neutral', neutral]
                ]
            }]
        });
});
}else {
 console.log("Issues with data - please investigate");
}
})
    .fail(function(a,b,c) { debugger;
    });
  }