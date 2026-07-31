/* Subseazen — UI interactions */
(function () {
  'use strict';

  /* ---- Mobile nav ---- */
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav__toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.querySelectorAll('.nav__links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Active link by pathname ---- */
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === here || (here === 'index.html' && href === 'index.html')) a.classList.add('is-active');
  });

  /* ---- Scroll reveal ---- */
  var revealables = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealables.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealables.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 70 + 'ms';
      io.observe(el);
    });
  } else {
    revealables.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Quote form ---- */
  var form = document.getElementById('quote-form');
  if (form) {
    var status = form.querySelector('.form__status');
    var params = new URLSearchParams(location.search);
    // Pre-fill product/service interest if arriving from a catalogue link
    var interest = params.get('interest');
    if (interest) {
      var sel = form.querySelector('[name="interest"]');
      if (sel) {
        var found = Array.prototype.some.call(sel.options, function (o) {
          if (o.value.toLowerCase() === interest.toLowerCase()) { o.selected = true; return true; }
          return false;
        });
        if (!found) {
          var msg = form.querySelector('[name="message"]');
          if (msg && !msg.value) msg.value = 'Enquiry regarding: ' + interest + '\n\n';
        }
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var data = new FormData(form);

      // Live mode: POST to the PHP handler and show inline status (no page nav).
      if (form.dataset.live === 'true') {
        var btn = form.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; btn.style.opacity = '.7'; }
        fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
          .then(function (r) { return r.json().catch(function () { return { ok: r.ok }; }); })
          .then(function (res) {
            if (status) {
              status.className = 'form__status ' + (res.ok ? 'ok' : 'err');
              status.textContent = res.ok
                ? (res.message || 'Thanks — your request has been sent.')
                : (res.error || 'Something went wrong. Please email Ravikumar@subseazen.com directly.');
            }
            if (res.ok) form.reset();
          })
          .catch(function () {
            if (status) { status.className = 'form__status err'; status.textContent = 'Network error. Please email Ravikumar@subseazen.com directly.'; }
          })
          .finally(function () { if (btn) { btn.disabled = false; btn.style.opacity = ''; } });
        return;
      }

      // Zero-config fallback: open a pre-composed email to the sales inbox.
      var to = form.dataset.email || 'Ravikumar@subseazen.com';
      var subject = 'Quote request — ' + (data.get('company') || data.get('name') || 'Website');
      var body =
        'Name: ' + (data.get('name') || '') + '\n' +
        'Company: ' + (data.get('company') || '') + '\n' +
        'Email: ' + (data.get('email') || '') + '\n' +
        'Phone: ' + (data.get('phone') || '') + '\n' +
        'Interest: ' + (data.get('interest') || '') + '\n' +
        'Location: ' + (data.get('location') || '') + '\n\n' +
        'Message:\n' + (data.get('message') || '');
      window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      if (status) {
        status.className = 'form__status ok';
        status.textContent = 'Opening your email client to send the request. If nothing happens, email ' + to + ' directly.';
      }
    });
  }

  /* ---- Footer year ---- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
