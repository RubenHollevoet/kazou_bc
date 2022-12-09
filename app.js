const { createApp } = Vue

createApp({
  data() {
    return {
        userData: [],
        unlocked: false,
        password: ''
    }
  },
  mounted() {
    fetch("https://sheets.googleapis.com/v4/spreadsheets/1z-GGSSwzx6YfxA_1Bbnh2liHxB9AYaQ0TyG_yYdu2eA/values/Formulierreacties%201?alt=json&key=AIzaSyAoz6aOUGLy7vyGx_4GmTFuSVcV8qzjv-c")
      .then(response => response.json())
      .then(data => {
        this.userData = parseUserData(data.values);
        document.getElementById('app').classList.remove('d-none');
    });

    if(localStorage.getItem('password') === 'kazoukazou') {
        this.unlocked = true;
    }
  },
  watch: {
    password(value) {
        if(value.toLowerCase() === 'buurtwinkel') {
            this.unlocked = true;
            localStorage.setItem('password', 'kazoukazou');
        }
    }
  }
}).mount('#app')

function parseUserData(data) {
    data.shift();
    let users = {
        'CUL': [],
        'TP': [],
        'VPK': [],
        'Zinspeler': [],
        'Instructeur': [],
    };

    data.forEach(userData => {
        if(['CUL', 'TP', 'VPK', 'Zinspeler', 'Instructeur'].includes(userData[9]))
        users[userData[9]].push(userData.slice(2));
    });

    return users;
}