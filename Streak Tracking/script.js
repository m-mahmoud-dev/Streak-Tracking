const calendar = document.querySelector('.calendar');
const submitButton = document.getElementById('submitWork');
let submittedDays = JSON.parse(localStorage.getItem('submittedDays')) || [];

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0); 
  const diff = date - start; 
  const oneDay = 1000 * 60 * 60 * 24; 
  return Math.floor(diff / oneDay); 
}

function generateCalendar() {
  const totalDays = 365;
  for (let i = 1; i <= totalDays; i++) {
    const day = document.createElement('div');
    day.classList.add('day');
    day.textContent = i;
    if (submittedDays.includes(i)) {
      day.classList.add('submitted');
    }
    calendar.appendChild(day);
  }
}

submitButton.addEventListener('click', () => {
  const today = new Date(); 
  const dayOfYear = getDayOfYear(today); 

  if (!submittedDays.includes(dayOfYear)) {
    submittedDays.push(dayOfYear);
    localStorage.setItem('submittedDays', JSON.stringify(submittedDays));
    updateCalendar();
  }
});

function updateCalendar() {
  const days = document.querySelectorAll('.day');
  days.forEach((day, index) => {
    if (submittedDays.includes(index + 1)) {
      day.classList.add('submitted');
    }
  });
}

// Initialize
generateCalendar();