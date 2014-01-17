
var permNamesArr = new Array("Modify or delete the contents of your USB storage", 
                              "Send sticky broadcast",
                              "Control vibration",
                              "View Wi-Fi connections");

var permRateArr = new Array(.588, .6, .675, .85);



// $(document).ready(function() {
//     $.ajax({
//         type: "GET",
//         url: "data.txt",
//         dataType: "text",
//         success: function(data) {processData(data);}
//      });
// });

// function processData(allText) {
//     var allTextLines = allText.split(/\r\n|\n/);
//     var headers = allTextLines[0].split(',');
//     var lines = [];

//     for (var i=1; i<allTextLines.length; i++) {
//         var data = allTextLines[i].split(',');
//         if (data.length == headers.length) {

//             var tarr = [];
//             for (var j=0; j<headers.length; j++) {
//                 tarr.push(headers[j]+":"+data[j]);
//             }
//             lines.push(tarr);
//         }
//     }
//     // alert(lines);
// }





function buildTable(namesArr, ratingsArr) {
  var myArray    = new Array();
  var myTable= "<table style='width:600px'><tr style='font-weight:bold'><td>Permission Name</td>";
  myTable+="<td style='width:200px'>Permission Approval Rating</td></tr>";
  for (var i=0; i<namesArr.length; i++) {
    var approvePerc = ratingsArr[i]*100;
    var warningCol = ""
    if(approvePerc<= 60){
      warningCol = "#F72400"
    }
    else if(approvePerc <= 80){
      warningCol = "#FF9300"
    }
    else{
      warningCol = "#F4E300"
    }
    var styTag = "background-image: -webkit-gradient(linear, left top, right top, from(#38CC13), to(" 
      + warningCol + "), color-stop(" 
      + ratingsArr[i] + ", #38CC13), color-stop(" 
      + ratingsArr[i] + ", " + warningCol + "));"
    myTable+="<tr><td>" + namesArr[i] + "</td>";
    myTable+="<td style='width: 200px; " + styTag + "'>" + approvePerc + "%</td></tr>";
  }  
  myTable+="</table>";
  document.getElementById('genTable').innerHTML = myTable;
}

function strStartsWith(str, prefix) {
    return str.indexOf(prefix) === 0;
}

var ratedAppURLS = new Array("https://play.google.com/store/apps/details?id=com.pandora.android",
                            "https://play.google.com/store/apps/details?id=com.facebook.katana");

var url = ""

chrome.tabs.query({active: true}, function(tab) {
    url = tab[0].url;
      // if(!ratedAppURLS.indexOf(url)){
      //   document.getElementById('currentLink').innerHTML = url
      // }
      // else{
      //   document.getElementById('currentLink').innerHTML = "This app has not yet been rated."
      // }     
    if(strStartsWith(url, "https://play.google.com/store/apps/")){
      if(ratedAppURLS.indexOf(url)>-1){
        document.getElementById('currentLink').innerHTML = "Hey there! This table shows you how other Android users have rated this app's permissions."
                                                           + " The number in the right-hand column is the percentage of raters who thought that permission was" 
                                                           + "\" acceptable\" for this app. Hope this helps, and happy app hunting!";
        buildTable(permNamesArr, permRateArr)
      }
      else{
        document.getElementById('currentLink').innerHTML = "Darn! We're sorry, but this app doesn't have any ratings yet. Hopefully it will soon!"
      }
    }
    else{
      // TODO: get links working
      document.getElementById('currentLink').innerHTML =  "This extension is for rating Android app permissions, so it only works if you're in the Google Play store. "
      //                                                    + "If you want to see how it works, check it out on the "
      //                                                    + "<a href='https://play.google.com/store/apps/details?id=com.pandora.android'>Pandora app page</a>!"
    }    
});
