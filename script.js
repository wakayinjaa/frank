// Get the navigation menu and the hamburger icon
const navMenu = document.querySelector('nav ul');
const hamburger = document.querySelector('.hamburger');

// Add event listener to toggle the navigation menu
hamburger.addEventListener('click', function() {
  navMenu.classList.toggle('show');
});

// Check the width of the viewport and add or remove the 'mobile' class accordingly
function toggleMobileClass() {
  if (window.innerWidth <= 768) {
    document.body.classList.add('mobile');
  } else {
    document.body.classList.remove('mobile');
  }
}

// Add event listener to toggle the 'mobile' class on page load and window resize
window.addEventListener('load', toggleMobileClass);
window.addEventListener('resize', toggleMobileClass);

const gallery = document.querySelector('.gallery');
const images = gallery.querySelectorAll('img');

let current = 0;

// Add event listener to the gallery container
gallery.addEventListener('click', function(e) {
  if (e.target.tagName === 'IMG') {
    current = Array.from(images).indexOf(e.target);
    showImage(current);
  }
});

// Show the selected image in a lightbox
function showImage(index) {
  const lightbox = document.createElement('div');
  lightbox.classList.add('lightbox');
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <img src="${images[index].src}" alt="${images[index].alt}">
      <button class="prev-btn">&lt;</button>
      <button class="next-btn">&gt;</button>
      <button class="close-btn">&times;</button>
    </div>
  `;
  document.body.appendChild(lightbox);

  const prevBtn = lightbox.querySelector('.prev-btn');
  const nextBtn = lightbox.querySelector('.next-btn');
  const closeBtn = lightbox.querySelector('.close-btn');

  // Add event listeners to the lightbox buttons
  prevBtn.addEventListener('click', function() {
    current--;
    if (current < 0) {
      current = images.length - 1;
    }
    lightbox.querySelector('img').src = images[current].src;
    lightbox.querySelector('img').alt = images[current].alt;
  });

  nextBtn.addEventListener('click', function() {
    current++;
    if (current > images.length - 1) {
      current = 0;
    }
    lightbox.querySelector('img').src = images[current].src;
    lightbox.querySelector('img').alt = images[current].alt;
  });

  closeBtn.addEventListener('click', function() {
    document.body.removeChild(lightbox);
  });
}

{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script> */}


// Get the form element
const form = document.querySelector('form');

// Get the form fields
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const messageField = document.getElementById('message');

// Add event listeners for window resize and form submit
window.addEventListener('resize', adjustLayout);
form.addEventListener('submit', handleSubmit);

// Adjust the layout based on the device size
function adjustLayout() {
  if (window.innerWidth < 768) {
    // For mobile devices
    nameField.style.width = '100%';
    emailField.style.width = '100%';
    messageField.style.width = '100%';
  } else {
    // For larger devices
    nameField.style.width = '48%';
    emailField.style.width = '48%';
    messageField.style.width = '100%';
  }
}

// Handle the form submit event
function handleSubmit(event) {
  event.preventDefault();
  
  // Get the form data
  const formData = new FormData(form);
  
  // Send the data to the server using AJAX
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'store_data.php');
  xhr.send(formData);
  
  // Display a success message to the user
  alert('Your message has been sent!');
  
  // Clear the form fields
  form.reset();
}
