const form = document.getElementById('booking-form');
if (!form) throw new Error('Booking form not found');

const successEl = form.querySelector('.form-success');
const submitBtn = form.querySelector('[type="submit"]');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Clear previous errors
  form.querySelectorAll('.field-error').forEach(function (el) { el.remove(); });
  form.querySelectorAll('[aria-invalid]').forEach(function (el) {
    el.removeAttribute('aria-invalid');
  });

  // Validate required fields
  const required = form.querySelectorAll('[required]');
  let valid = true;

  required.forEach(function (field) {
    if (!field.value.trim()) {
      valid = false;
      field.setAttribute('aria-invalid', 'true');
      const msg = document.createElement('span');
      msg.className = 'field-error';
      msg.textContent = 'This field is required.';
      field.parentElement.appendChild(msg);
    }
  });

  if (!valid) {
    const first = form.querySelector('[aria-invalid="true"]');
    if (first) first.focus();
    return;
  }

  // Show success, hide form fields
  Array.from(form.children).forEach(function (child) {
    if (child !== successEl) child.hidden = true;
  });
  successEl.hidden = false;
});

// Clear error on correction
form.addEventListener('input', function (e) {
  const field = e.target;
  if (field.hasAttribute('aria-invalid')) {
    field.removeAttribute('aria-invalid');
    const err = field.parentElement.querySelector('.field-error');
    if (err) err.remove();
  }
});
