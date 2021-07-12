(function () {

  fetch('https://raw.githubusercontent.com/GMVargass/frontend_dashboard_sample/main/data.json')
    .then(function (response) {
      response.json().then(function (itens) {

        let table = document.getElementById('tableData');

        for (let item of itens) 
        {
          let row = table.insertRow();
          row.insertCell(0).textContent = item.data;
          row.insertCell(1).textContent = item.demanda;
          row.insertCell(2).textContent = item.capacidade;
          row.insertCell(3).textContent = item.atendimentop;
          row.insertCell(4).textContent = item.atendimentor;
          row.insertCell(5).textContent = item.desvio;
        }
        criarGrafico(itens);
      });
    })
})()

function criarGrafico(itens){
  
  
  var labels = itens.map(function(e) {
    return e.data;
  });

  var data = itens.map(function(e) {
    return e.capacidade - e.atendimentor;
  });; 

  feather.replace({ 'aria-hidden': 'true' });
  var ctx = document.getElementById('myChart');

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        lineTension: 4,
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      legend: {
        text: 'Capacidade - Atendimento Realizado',
        display: false,
        position: 'bottom',
        align: 'start'        
      },
      title: {     
        display: true,
        text: 'Capacidade - Atendimento Realizado'
      }
    }
  })
}