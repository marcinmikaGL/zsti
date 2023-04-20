<!DOCTYPE html>
<html>
  <head>
    <title>Moja prosta strona</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  </head>
  <body>
    <h1>Witaj na mojej prostej stronie</h1>
   <div id="servername"></div>
   <div id="time"></div>
   <div id="info"></div>
   <div id="loader"></div>
   <div id="json-data"></div>
   <div id="ver"></div>
   
    <script>
	GetTime();
      const jsonUrl = 'http://imiki.pl/cf/';

      // Funkcja pobierająca dane z pliku JSON za pomocą Axios i wyświetlająca je na stronie
      async function fetchData() {
        try {
          const response = await axios.get(jsonUrl);
          const jsonData = response.data;
          const jsonDataString = JSON.stringify(jsonData);
		  const parsedData = JSON.parse(jsonDataString);
		  DevList(parsedData);
		  //console.log(parsedData.timeStamp);
          document.getElementById('json-data').textContent = jsonDataString;
        } catch (error) {
          console.error(error);
        }
      }
	  
function GetTime() {
    let d = new Date();
    let h = (d.getHours()<10?'0':'') + d.getHours();
    let m = (d.getMinutes()<10?'0':'') + d.getMinutes();
    let s = (d.getSeconds()<10?'0':'') + d.getSeconds(); 
    czas = h +":"+m + ":" + s;     
    document.getElementById("time").innerHTML= czas;
    setInterval(GetTime, 1000);
}

function DevList(datas) {
        console.log(datas);
        e("ajax run");
  let devices = datas.data;
  let servername = datas.servername;
  let ver = datas.ver;
  let timeStamp = datas.timeStamp.date;
  let contener = "";
  var icon_alt = "";
  var icon_img = "";
  var status_info ="";
  var state = "";
  var state_on = false;
  var state_color = "green";
  var state_status = true;
  var button_box = false;
  for(let i = 0 ; i < devices.length ; i++) {
    contener += '<div id="'+devices[i].id+'" class="col-box">\n<div class="box">';
        if(devices[i].function.id == 40) {
                icon_img = "temperatura.png";
                icon_alt = "Czujnik temperatury";
                state_status = true;
                state = devices[i].state.temperature;
            if(state > -272) {
               status_info = "włączone";
               state = state.toFixed(2) + " &deg;C";
            } else {
                    state = "brak danych";
                    state_color = "red";
                    status_info = "wyłączone";
            }
        }
        if(devices[i].function.id == 140) {
                icon_img = "swiatlo.png";
                icon_alt = "Światło";
                state_status = false;
                button_box = true;
                state_on = devices[i].state.on;
                state = Math.random(0,13).toFixed(2)+"W";
        }
        if(devices[i].function.id == 130) {
                icon_img = "kontakt.png";
                icon_alt = "Kontat";
                state_status = false;
                button_box = true;
                state_on = devices[i].state.on;
                state =  Math.random(0,13).toFixed(2)+"W";
        }      
    contener += '<div class="function-ico"><img alt="'+icon_alt+'" src="/img/'+icon_img+'"></div>\n';
    if(button_box) {
        if(state_on){  
            button_state = "green";
            state_color = "green";
            status_info = "włączone";
            state_status = true;
        } else {
            button_state = "red"; 
            state_color = "red";
            status_info = "wyłączone";
        }
        contener += '<div class="buttonbox">\n';
        contener += '<button class="button-reset btnfunction"><i class="fa-solid icb '+button_state+' fa-circle"></i></button>\n';	
        contener += '<button class="button-reset btnfunction"><i class="fa-solid mtc1 icb '+button_state+' fa-power-off"></i></button>\n</div>\n';
    }
    contener += '<h3 class="function">'+devices[i].caption+'</h3>\n';
    contener += '<p class="status-title nmb">status:<span class="status '+state_color+'">'+status_info+'</span></p>';
    if(state_status) { contener += '<p class="ph green">'+state+'</p>'; } 
    contener += '</div>\n</div>';
  }
  document.getElementById("loader").innerHTML= contener;
  document.getElementById("servername").innerHTML= servername;
  document.getElementById("ver").innerHTML= "Marcin Mika "+ver + "<br>"+ timeStamp;

} 

 function e(data) {
        document.getElementById("info").innerHTML=data;
    }
      // Wywołujemy funkcję pobierającą dane po załadowaniu strony
      setInterval(fetchData, 60000);
	  fetchData();
    </script>

  </body>
</html>
