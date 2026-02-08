document.addEventListener('DOMContentLoaded', () => {
    const experiencesGrid = document.getElementById('experiences-grid');
    const sceneSelect = document.getElementById('scene-select');
    const bookingForm = document.getElementById('booking-form');

    // Sample Data based on user requested context (Gifting Experiences)
    const scenes = [
        {
            id: 1,
            title: "Romantic Coffee Date",
            description: "A reserved corner in a premium cafe with a curated menu, flowers, and a polaroid keepsake.",
            price: "₹1,299",
            image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=1000"
        },
        {
            id: 2,
            title: "Customized Private Dining",
            description: "A fully personalized dining experience with custom decor, music, and a 5-course meal.",
            price: "₹4,499",
            image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000"
        },
        {
            id: 3,
            title: "Pottery & Clay Date",
            description: "Gift a hands-on creative session for two. meaningful, fun, and you get to keep what you make.",
            price: "₹1,999",
            image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=1000"
        },
        {
            id: 4,
            title: "Surprise Beach Picnic",
            description: "A magical sunset setup on the beach with fairy lights, comfortable seating, and gourmet snacks.",
            price: "₹2,999",
            image: "https://images.unsplash.com/photo-1534768372671-1557088bfa2e?auto=format&fit=crop&q=80&w=1000"
        }
    ];

    // Populate Experiences
    scenes.forEach(scene => {
        // Create Card
        const card = document.createElement('div');
        card.classList.add('experience-card');

        card.innerHTML = `
            <div class="card-image-container">
                <img src="${scene.image}" alt="${scene.title}" class="card-image">
            </div>
            <div class="card-content">
                <h3 class="card-title">${scene.title}</h3>
                <p class="card-description">${scene.description}</p>
                <div class="card-footer">
                    <span class="card-price">${scene.price}</span>
                    <button class="gift-btn-small" onclick="window.location.href='#booking'">Gift This</button>
                </div>
            </div>
        `;
        experiencesGrid.appendChild(card);

        // Populate Select Option
        const option = document.createElement('option');
        option.value = scene.id;
        option.textContent = `${scene.title} - ${scene.price}`;
        sceneSelect.appendChild(option);
    });

    // Handle Form Submission
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            yourName: document.getElementById('name').value,
            yourEmail: document.getElementById('email').value,
            recipientName: document.getElementById('recipient-name').value,
            message: document.getElementById('message').value,
            sceneId: document.getElementById('scene-select').value,
            date: document.getElementById('date').value
        };

        const submitBtn = bookingForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending Gift...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('http://localhost:3000/api/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                alert(`Success! ${result.message}`);
                bookingForm.reset();
            } else {
                alert('Booking failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Ensure the backend is running.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
});
