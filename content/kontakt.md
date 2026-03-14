---
layout: page
---

<div class="kontakt-card">
  <img src="/michael.png" alt="Michael Schmidle" class="avatar" />
  <div class="kontakt-info">
    <h1>Michael Schmidle</h1>
    <p class="role">Spielleiter-Verantwortlicher<br>FC Luzern Frauen · Kinderfussball</p>
    <div class="kontakt-details">
      <a href="tel:+41791013787">📞 079 101 37 87</a>
      <a href="mailto:michael@schmidle.net">✉️ michael@schmidle.net</a>
    </div>
  </div>
</div>

<style>
.kontakt-card {
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 32px;
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  margin-top: 24px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.kontakt-info h1 {
  font-size: 24px;
  font-weight: 800;
  margin: 0 0 4px;
  border: none;
  padding: 0;
}

.role {
  font-size: 15px;
  color: var(--vp-c-text-2);
  margin: 0 0 16px;
  line-height: 1.4;
}

.kontakt-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.kontakt-details a {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.kontakt-details a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .kontakt-card {
    flex-direction: column;
    text-align: center;
    padding: 24px;
  }
  .kontakt-details {
    align-items: center;
  }
}
</style>
