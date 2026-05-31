// Sample items available in the shop
const shopItems = [
    { id: 1, name: 'Chocolate Cake', emoji: '🍰', price: '$12.99' },
    { id: 2, name: 'Cupcakes', emoji: '🧁', price: '$3.99' },
    { id: 3, name: 'Cookies', emoji: '🍪', price: '$5.99' },
    { id: 4, name: 'Donut', emoji: '🍩', price: '$2.99' },
    { id: 5, name: 'Bread', emoji: '🍞', price: '$4.99' },
    { id: 6, name: 'Pastry', emoji: '🥐', price: '$3.49' },
    { id: 7, name: 'Ice Cream', emoji: '🍦', price: '$4.49' },
    { id: 8, name: 'Candy', emoji: '🍬', price: '$1.99' }
];

let selectedItemId = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    populateItems();
    setMinPickupDate();
    setupFormSubmission();
});

// Populate items grid
function populateItems() {
    const itemsGrid = document.getElementById('itemsGrid');
    itemsGrid.innerHTML = '';

    shopItems.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.innerHTML = `
            <div class="item-emoji">${item.emoji}</div>
            <div class="item-name">${item.name}</div>
            <div class="item-price">${item.price}</div>
        `;

        itemCard.addEventListener('click', () => selectItem(item, itemCard));
        itemsGrid.appendChild(itemCard);
    });
}

// Handle item selection
function selectItem(item, element) {
    // Remove previous selection
    document.querySelectorAll('.item-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Add selection to current item
    element.classList.add('selected');
    selectedItemId = item.id;

    // Update form field
    document.getElementById('selectedItem').value = `${item.emoji} ${item.name} (${item.price})`;
}

// Set minimum pickup date to today
function setMinPickupDate() {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    document.getElementById('pickupDate').min = dateString;
}

// Handle form submission
function setupFormSubmission() {
    document.getElementById('reservationForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate item selection
        if (selectedItemId === null) {
            alert('Please select an item first!');
            return;
        }

        // Get form data
        const formData = {
            item: document.getElementById('selectedItem').value,
            name: document.getElementById('customerName').value,
            email: document.getElementById('customerEmail').value,
            pickupDate: document.getElementById('pickupDate').value,
            notes: document.getElementById('notes').value
        };

        // Here you would normally send this data to a backend server
        // For now, we'll simulate a reservation and show success
        console.log('Reservation Data:', formData);

        // Send email simulation (in production, use a backend service)
        await sendReservationEmail(formData);

        // Show success message
        showSuccessMessage();

        // Reset form
        setTimeout(() => {
            resetForm();
        }, 3000);
    });
}

// Send email notification (simulated - in production use EmailJS or similar)
async function sendReservationEmail(formData) {
    // Option 1: Using EmailJS (requires setup)
    // Uncomment the code below and add your EmailJS credentials

    /*
    try {
        // Initialize EmailJS with your public key
        emailjs.init('YOUR_PUBLIC_KEY');

        // Send email
        await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', {
            to_email: 'your-shop-email@example.com',
            customer_email: formData.email,
            customer_name: formData.name,
            item: formData.item,
            pickup_date: formData.pickupDate,
            notes: formData.notes
        });

        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
    */

    // Option 2: Using a backend API endpoint
    try {
        const response = await fetch('/api/send-reservation-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            console.log('Using local simulation (backend not available)');
        }
    } catch (error) {
        console.log('Backend not available - using local simulation');
        // Simulate successful email send
        console.log('Email would be sent to:', formData.email);
    }
}

// Show success message
function showSuccessMessage() {
    const successDiv = document.getElementById('successMessage');
    successDiv.style.display = 'block';
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 5000);
}

// Reset form
function resetForm() {
    document.getElementById('reservationForm').reset();
    document.getElementById('selectedItem').value = '';
    document.querySelectorAll('.item-card').forEach(card => {
        card.classList.remove('selected');
    });
    selectedItemId = null;
}
