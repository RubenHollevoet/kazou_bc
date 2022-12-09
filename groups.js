const { createApp } = Vue

createApp({
  data() {
    return {
        groups: [],
    }
  },
  mounted() {
    fetch("https://sheets.googleapis.com/v4/spreadsheets/1KF9ETxg0zd4GrSZ6rY__Rfo73EcPxHi4LEzTBRxZyyQ/values/Verdeling?alt=json&key=AIzaSyAoz6aOUGLy7vyGx_4GmTFuSVcV8qzjv-c")
      .then(response => response.json())
      .then(data => {
        data.values.shift();


        var groups = {};

        data.values.forEach(line => {
            if(line[1]) {
                groups[line[1]] = groups[line[1]] || {};

                groups[line[1]][line[2]] = groups[line[1]][line[2]] || {users: [], followup: null, location: null, link: null};

                // groups[line[1]][line[2]].users.push(line[0]);
                groups[line[1]][line[2]].users = line[0];

                if(line[3]) {
                    groups[line[1]][line[2]].followup = line[3];
                }

                if(line[4]) {
                    groups[line[1]][line[2]].location = line[4];
                }

                if(line[5]) {
                    groups[line[1]][line[2]].link = line[5];
                }
            }
        });

        this.groups = groups;
        console.log(this.groups);

        document.getElementById('app').classList.remove('d-none');
    });
  }
}).mount('#app')