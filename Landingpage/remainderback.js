// Mock data for upcoming sales 
const upcomingEvents = [
    { event: 'Summer Sale', date: '2024-08-15' },
    { event: 'Winter Haul', date: '2024-12-01' },
    { event: 'Back-to-School Sale', date: '2024-09-05' }
];

const upcomingList = document.getElementById('upcoming-list');
const reminderForm = document.getElementById('reminder-form');
const eventInput = document.getElementById('event');
const dateInput = document.getElementById('date');

// Populate upcoming events list
upcomingEvents.forEach((event, index) => {
    const li = document.createElement('li');
    li.innerText = `${event.event} - ${event.date}`;
    li.setAttribute('data-index', index); // Store index for easy retrieval
    li.addEventListener('click', handleEventClick);
    upcomingList.appendChild(li);
});

// Function to handle event click
function handleEventClick(event) {
    const selectedIndex = event.target.getAttribute('data-index');
    const selectedEvent = upcomingEvents[selectedIndex];

    // Set reminder form fields
    eventInput.value = selectedEvent.event;
    
    // Calculate date 2 days before the event
    const eventDate = new Date(selectedEvent.date);
    const reminderDate = new Date(eventDate);
    reminderDate.setDate(eventDate.getDate() - 5);
    
    // Format date for input (YYYY-MM-DD)
    const formattedDate = reminderDate.toISOString().split('T')[0];
    dateInput.value = formattedDate;
}

// Event listener for reminder form submission
reminderForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const eventText = eventInput.value.trim();
    const dateText = dateInput.value.trim();

    if (eventText && dateText) {
        alert(`Reminder set for ${eventText} on ${dateText}`);
        eventInput.value = '';
        dateInput.value = '';
        // You can add further logic here to store reminders or integrate with a backend
    } else {
        alert('Please fill out all fields.');
    }
});
