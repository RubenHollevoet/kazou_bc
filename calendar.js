const { createApp } = Vue

createApp({
  data() {
    return {
        agendaItems: [],
    }
  },
  mounted() {
    fetch("https://sheets.googleapis.com/v4/spreadsheets/1KF9ETxg0zd4GrSZ6rY__Rfo73EcPxHi4LEzTBRxZyyQ/values/Kalender?alt=json&key=AIzaSyAoz6aOUGLy7vyGx_4GmTFuSVcV8qzjv-c")
      .then(response => response.json())
      .then(data => {
        data.values.shift();

        data.values.forEach(element => {
          if(element[1] && new Date(element[1]) < new Date()) {
            return;
          }
          this.agendaItems.push(element);
        });

        document.getElementById('app').classList.remove('d-none');
    });
  }
}).mount('#app')