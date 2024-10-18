
let participants = {
    terca: { adult: 0, child: 0, visitor: 0 },
    quarta: { adult: 0, child: 0, visitor: 0 },
    quinta: { adult: 0, child: 0, visitor: 0 },
    domingo: { adult: 0, child: 0, visitor: 0 }
  };
  let isCampanha = false;
  let isCeia = false;
  const whatsappNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
  
  moment.locale('pt-br');
  
  function updateClock() {
    const now = moment();
    document.getElementById('clock').textContent = now.format('HH:mm:ss');
    document.getElementById('calendar').textContent = now.format('D [de] MMMM [de] YYYY');
    
    if (now.day() === 0 && now.date() > 7 && now.date() <= 14) {
      document.getElementById('ceia').checked = true;
      isCeia = true;
    }
  }
  
  function adjustParticipant(day, type, amount) {
    participants[day][type] = Math.max(0, participants[day][type] + amount);
    updateParticipantCount(day);
  }
  
  function updateParticipantCount(day) {
    document.getElementById(`adultCount${capitalize(day)}`).textContent = participants[day].adult;
    document.getElementById(`childCount${capitalize(day)}`).textContent = participants[day].child;
    document.getElementById(`visitorCount${capitalize(day)}`).textContent = participants[day].visitor;
    const total = participants[day].adult + participants[day].child + participants[day].visitor;
    document.getElementById(`totalCount${capitalize(day)}`).textContent = total;
  }
  
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  function toggleCampanha() {
    isCampanha = document.getElementById('campanha').checked;
  }
  
  function toggleCeia() {
    isCeia = document.getElementById('ceia').checked;
  }
  
  function sendReport() {
    let message = `Relatório Semanal - ${moment().format('D [de] MMMM [de] YYYY')}\n\n`;
  
    for (const [day, counts] of Object.entries(participants)) {
      const total = counts.adult + counts.child + counts.visitor;
      message += `${capitalize(day)}:\n`;
      message += `Adultos: ${counts.adult}\n`;
      message += `Crianças: ${counts.child}\n`;
      message += `Visitantes: ${counts.visitor}\n`;
      message += `Total: ${total}\n`;
  
      if (day === 'quinta' && isCampanha) {
        message += 'Culto de Campanha: Sim\n';
      }
      if (day === 'domingo' && isCeia) {
        message += 'Ceia do Senhor: Sim\n';
      }
  
      message += '\n';
    }
  
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    setTimeout(() => {
      if (document.hasFocus()) {
        alert('Não foi possível abrir o WhatsApp. O relatório foi copiado para a área de transferência.');
        copyToClipboard(message);
      }
    }, 1000);
  
    const reportArea = document.getElementById('reportArea');
    reportArea.innerHTML = `<h3>Relatório:</h3><pre>${message}</pre>`;
    reportArea.style.display = 'block';
  }
  
  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Unable to copy to clipboard', err);
      }
      document.body.removeChild(textArea);
    }
  }
  
  function changeTheme(theme) {
    const body = document.body;
    const container = document.querySelector('.container');
    
    switch(theme) {
      case 'light':
        body.style.backgroundColor = '#f0f0f0';
        container.style.backgroundColor = '#fff';
        container.style.color = '#333';
        break;
      case 'dark':
        body.style.backgroundColor = '#333';
        container.style.backgroundColor = '#555';
        container.style.color = '#fff';
        break;
      case 'colorful':
        body.style.backgroundColor = '#ffcccc';
        container.style.backgroundColor = '#ccffcc';
        container.style.color = '#3333ff';
        break;
    }
  }
  
  setInterval(updateClock, 1000);
  updateClock();
  
  