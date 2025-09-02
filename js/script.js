// Page switching
document.querySelectorAll('.top-nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.getAttribute('href').substring(1);

    // Deactivate all
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.top-nav a').forEach(a => a.classList.remove('active'));

    // Activate target
    document.getElementById(target).classList.add('active');
    link.classList.add('active');
  });
});
