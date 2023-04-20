const axios = require('axios');

 const jsonUrl = 'http://192.168.88.254/cf/';

      // Funkcja pobieraj ^eca dane z pliku JSON za pomoc ^e Axios i wy ^{wietlaj ^eca je na stronie
      async function fetchData() {
        try {
          const response = await axios.get(jsonUrl);
          const jsonData = response.data;
          const jsonDataString = JSON.stringify(jsonData);
                  const parsedData = JSON.parse(jsonDataString);
                  //DevList();
                  console.log(parsedData);
          document.getElementById('json-data').textContent = jsonDataString;
        } catch (error) {
          console.error(error);
        }
      }

 fetchData();
