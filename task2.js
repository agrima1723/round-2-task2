const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('monthYear');

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    monthYear.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });

    function getKey(day) {
      return `${year}-${month + 1}-${day}`;
    }

    function loadEvents() {
      for (let i = 1; i <= daysInMonth; i++) {
        const key = getKey(i);
        if (localStorage.getItem(key)) {
          const dateDiv = document.querySelector(`.date[data-day='${i}']`);
          if (dateDiv) {
            dateDiv.classList.add('event');
            if (!dateDiv.querySelector('.event-dot')) {
              const dot = document.createElement('div');
              dot.classList.add('event-dot');
              dateDiv.appendChild(dot);
            }
          }
        }
      }
    }

    function createCalendar() {
      // Add day labels
      for (let day of daysOfWeek) {
        const label = document.createElement('div');
        label.classList.add('day-label');
        label.textContent = day;
        calendar.appendChild(label);
      }

      // Empty cells before first day
      for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        calendar.appendChild(empty);
      }

      // Calendar dates
      for (let i = 1; i <= daysInMonth; i++) {
        const cell = document.createElement('div');
        cell.classList.add('date');
        cell.textContent = i;
        cell.dataset.day = i;

        cell.addEventListener('click', () => {
          const key = getKey(i);
          let note = localStorage.getItem(key);
          const action = note ? `Current note: ${note}\nUpdate or delete?\nEnter new note, or leave empty to delete:` : 'Add note:';
          const input = prompt(action, note || '');

          if (input === null) return;
          if (input.trim() === '') {
            localStorage.removeItem(key);
            cell.classList.remove('event');
            const dot = cell.querySelector('.event-dot');
            if (dot) dot.remove();
          } else {
            localStorage.setItem(key, input);
            cell.classList.add('event');
            if (!cell.querySelector('.event-dot')) {
              const dot = document.createElement('div');
              dot.classList.add('event-dot');
              cell.appendChild(dot);
            }
          }
        });

        calendar.appendChild(cell);
      }

      loadEvents();
    }

    createCalendar();