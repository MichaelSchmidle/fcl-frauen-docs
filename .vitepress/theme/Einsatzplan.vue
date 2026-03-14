<script setup>
import { ref, computed, onMounted } from 'vue'

const data = ref(null)
const filter = ref('')
const showPast = ref(false)
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('/einsatzplan.json')
    data.value = await res.json()
  } catch (e) {
    console.error('Failed to load einsatzplan:', e)
  } finally {
    loading.value = false
  }
})

const today = new Date().toISOString().slice(0, 10)

const upcomingMatches = computed(() => {
  if (!data.value) return []
  let all = data.value.matches.filter(m => m.datum >= today)
  if (filter.value) {
    all = all.filter(m => m.spielleiter === filter.value || m.backup === filter.value)
  }
  return all
})

const pastMatches = computed(() => {
  if (!data.value) return []
  let all = data.value.matches.filter(m => m.datum < today)
  if (filter.value) {
    all = all.filter(m => m.spielleiter === filter.value || m.backup === filter.value)
  }
  // Reverse: most recent first
  return [...all].reverse()
})

const pool = computed(() => data.value?.pool || [])
const updatedAt = computed(() => data.value?.updatedAt || '')

function icsUrl(m) {
  const start = m.isoDate.replace(/[-:]/g, '').replace('T', 'T') + '00'
  const startDate = new Date(m.isoDate)
  // 90 min: covers match + buffer
  const endDate = new Date(startDate.getTime() + 90 * 60000)
  const end = endDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '').replace('Z', '')

  const title = `Spielleitung: ${m.team} vs ${m.gegner}`
  const location = m.ort
  const desc = `${m.wettbewerb} | ${m.team} vs ${m.gegner}`

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//FCL Frauen//Spielleitung//DE',
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${desc}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Spielleitung in 2 Stunden',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')

  return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics)
}

function badgeClass(m) {
  if (m.spielleiter) return 'badge assigned'
  return 'badge open'
}
</script>

<template>
  <div class="einsatzplan">
    <div v-if="loading" class="loading">Lade Einsatzplan...</div>

    <template v-else-if="data">
      <p class="updated">Aktualisiert: {{ updatedAt }}</p>

      <!-- Filter -->
      <div class="filter-section">
        <span class="filter-label">Filter</span>
        <div class="filter-bar">
          <button
            :class="['filter-btn', { active: filter === '' }]"
            @click="filter = ''"
          >Alle</button>
          <button
            v-for="p in pool"
            :key="p"
            :class="['filter-btn', { active: filter === p }]"
            @click="filter = filter === p ? '' : p"
          >{{ p }}</button>
        </div>
      </div>

      <!-- Upcoming matches -->
      <div v-if="upcomingMatches.length === 0" class="empty">
        Keine kommenden Einsätze{{ filter ? ` für ${filter}` : '' }}.
      </div>

      <div
        v-for="m in upcomingMatches"
        :key="`${m.datum}-${m.zeit}-${m.team}`"
        :class="['match-card', { parallel: m.parallel }]"
      >
        <div class="match-header">
          <div class="match-date">
            <span class="day">{{ m.displayDate }}</span>
            <span class="time">{{ m.displayTime }}</span>
            <span v-if="m.parallel" class="parallel-tag">⚡</span>
          </div>
          <span :class="badgeClass(m)">
            {{ m.spielleiter || 'offen' }}
          </span>
        </div>

        <div class="match-body">
          <div class="teams">
            <span class="team-home">{{ m.team }}</span>
            <span class="vs">vs</span>
            <span class="team-away">{{ m.gegner }}</span>
          </div>
          <div class="meta">
            {{ m.wettbewerb }} · {{ m.ort }}
            <template v-if="m.backup"> · Backup: {{ m.backup }}</template>
            · <a :href="icsUrl(m)" download="spielleitung.ics" class="cal-link">📅 Kalender</a>
          </div>
        </div>
      </div>

      <!-- Past matches toggle -->
      <div v-if="pastMatches.length > 0" class="past-section">
        <button class="past-toggle" @click="showPast = !showPast">
          {{ showPast ? '▾' : '▸' }} Vergangene Spiele ({{ pastMatches.length }})
        </button>

        <template v-if="showPast">
          <div
            v-for="m in pastMatches"
            :key="`past-${m.datum}-${m.zeit}-${m.team}`"
            class="match-card past"
          >
            <div class="match-header">
              <div class="match-date">
                <span class="day">{{ m.displayDate }}</span>
                <span class="time">{{ m.displayTime }}</span>
              </div>
              <span :class="badgeClass(m)">
                {{ m.spielleiter || 'offen' }}
              </span>
            </div>

            <div class="match-body">
              <div class="teams">
                <span class="team-home">{{ m.team }}</span>
                <span class="vs">vs</span>
                <span class="team-away">{{ m.gegner }}</span>
              </div>
              <div class="meta">
                {{ m.wettbewerb }} · {{ m.ort }}
                <template v-if="m.backup"> · Backup: {{ m.backup }}</template>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>

    <div v-else class="error">Einsatzplan konnte nicht geladen werden.</div>
  </div>
</template>

<style scoped>
.einsatzplan {
  max-width: 640px;
}

.updated {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-bottom: 20px;
}

.filter-section {
  margin-bottom: 24px;
}

.filter-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--vp-c-text-3);
  margin-bottom: 8px;
}

.filter-bar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 3px 10px;
  border-radius: 12px;
  border: 1px solid transparent;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: transparent;
}

.filter-btn:hover:not(.active) {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.match-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 10px;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.2s;
}

.match-card:hover {
  border-color: var(--vp-c-brand-soft);
}

.match-card.parallel {
  border-left: 3px solid #ff8c00;
}

.match-card.past {
  opacity: 0.55;
}

.match-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.match-date {
  display: flex;
  gap: 8px;
  align-items: center;
}

.day {
  font-weight: 700;
  font-size: 15px;
  color: var(--vp-c-text-1);
}

.time {
  font-size: 14px;
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.parallel-tag {
  font-size: 14px;
  title: "Parallelspiel";
}

.badge {
  font-size: 12px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge.assigned {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.badge.open {
  background: rgba(255, 170, 0, 0.12);
  color: #cc8800;
}

.teams {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 2px;
}

.team-home {
  color: var(--vp-c-text-1);
}

.vs {
  color: var(--vp-c-text-3);
  margin: 0 6px;
  font-weight: 400;
  font-size: 13px;
}

.team-away {
  color: var(--vp-c-text-2);
}

.meta {
  font-size: 13px;
  color: var(--vp-c-text-3);
  line-height: 1.5;
}

.cal-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 600;
}

.cal-link:hover {
  text-decoration: underline;
}

/* Past section */
.past-section {
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
}

.past-toggle {
  background: none;
  border: none;
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 0;
  margin-bottom: 12px;
}

.past-toggle:hover {
  color: var(--vp-c-text-1);
}

.loading, .empty, .error {
  padding: 24px;
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 14px;
}
</style>
