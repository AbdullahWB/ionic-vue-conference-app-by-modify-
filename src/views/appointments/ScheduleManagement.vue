<template>
  <ion-content class="custom-content" :fullscreen="true">
    <!-- 1. Personalized Agenda Section -->
    <div class="ion-padding">
      <h2 class="section-title">My Agenda</h2>
      <div v-if="myAgenda.length === 0" class="empty-state">
        <ion-icon :icon="calendarClearOutline" class="empty-icon"></ion-icon>
        <p>Your agenda is empty.</p>
        <p class="empty-subtitle">Add sessions from the schedule below.</p>
      </div>
      <ion-list v-else :inset="true" class="agenda-list">
        <ion-item-sliding
          v-for="session in myAgenda"
          :key="`agenda-${session.id}`"
        >
          <ion-item lines="none" class="agenda-item">
            <div class="time-slot" slot="start">
              <span class="time">{{ session.startTime }}</span>
            </div>
            <ion-label>
              <h3>{{ session.title }}</h3>
              <p>
                <ion-badge color="light" class="location-badge">{{
                  session.location
                }}</ion-badge>
              </p>
            </ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="danger" @click="removeFromAgenda(session)">
              <ion-icon slot="icon-only" :icon="removeCircleOutline"></ion-icon>
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
    </div>

    <ion-item-divider></ion-item-divider>

    <!-- 2. Daily Calendar View Section -->
    <div class="ion-padding">
      <h2 class="section-title">Conference Schedule</h2>
    </div>
    <div v-for="(sessionsInSlot, time) in sessionsByTime" :key="time">
      <ion-item-divider sticky>
        <ion-label>{{ time }}</ion-label>
      </ion-item-divider>
      <ion-card
        v-for="session in sessionsInSlot"
        :key="session.id"
        class="session-card"
      >
        <ion-card-content>
          <div class="session-info">
            <ion-label>
              <h3>{{ session.title }}</h3>
              <p class="speaker-name">{{ session.speaker }}</p>
              <ion-badge color="light" class="location-badge">{{
                session.location
              }}</ion-badge>
            </ion-label>
          </div>
          <div class="session-actions">
            <ion-button fill="clear" @click="toggleReminder(session.id)">
              <ion-icon
                slot="icon-only"
                :icon="
                  reminders.has(session.id)
                    ? notifications
                    : notificationsOutline
                "
                :color="reminders.has(session.id) ? 'primary' : 'medium'"
              ></ion-icon>
            </ion-button>
            <ion-button
              class="add-button"
              :fill="isInAgenda(session.id) ? 'solid' : 'outline'"
              :color="isInAgenda(session.id) ? 'success' : 'primary'"
              @click="addToAgenda(session)"
            >
              <ion-icon
                slot="icon-only"
                :icon="isInAgenda(session.id) ? checkmarkDone : add"
              ></ion-icon>
            </ion-button>
          </div>
        </ion-card-content>
      </ion-card>
    </div>
  </ion-content>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonItemDivider,
  IonBadge,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  alertController,
} from "@ionic/vue";
import allSessions from "@/Data/sessions";
import {
  add,
  notifications,
  notificationsOutline,
  removeCircleOutline,
  checkmarkDone,
  calendarClearOutline,
} from "ionicons/icons";

const myAgenda = ref([]);
const reminders = ref(new Set());

const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const hasConflict = (newSession) => {
  const newStart = timeToMinutes(newSession.startTime);
  const newEnd = timeToMinutes(newSession.endTime);
  for (const existingSession of myAgenda.value) {
    const existingStart = timeToMinutes(existingSession.startTime);
    const existingEnd = timeToMinutes(existingSession.endTime);
    if (newStart < existingEnd && newEnd > existingStart) {
      return existingSession;
    }
  }
  return null;
};

const addToAgenda = async (session) => {
  if (isInAgenda(session.id)) {
    // If already in agenda, treat click as removal
    removeFromAgenda(session);
    return;
  }

  const conflictingSession = hasConflict(session);
  if (conflictingSession) {
    const alert = await alertController.create({
      header: "Schedule Conflict",
      message: `This session overlaps with "${conflictingSession.title}". Please adjust your schedule.`,
      buttons: ["OK"],
    });
    await alert.present();
    return;
  }
  myAgenda.value.push(session);
  myAgenda.value.sort(
    (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
  );
};

const removeFromAgenda = (session) => {
  myAgenda.value = myAgenda.value.filter((s) => s.id !== session.id);
};

const isInAgenda = (sessionId) => {
  return myAgenda.value.some((s) => s.id === sessionId);
};

const toggleReminder = (sessionId) => {
  if (reminders.value.has(sessionId)) {
    reminders.value.delete(sessionId);
    console.log(`Reminder cancelled for session ${sessionId}`);
  } else {
    reminders.value.add(sessionId);
    console.log(`Reminder set for session ${sessionId}`);
  }
};

const sessionsByTime = computed(() => {
  return allSessions.reduce((acc, session) => {
    const time = session.startTime;
    if (!acc[time]) {
      acc[time] = [];
    }
    acc[time].push(session);
    return acc;
  }, {});
});
</script>

<style scoped>
.custom-content {
  --padding-top: 62px;
  --padding-bottom: 32px;
  --padding-start: 16px;
  --padding-end: 16px;
}

.section-title {
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--ion-color-step-800, #333);
  padding: 0 8px;
}

.empty-state {
  text-align: center;
  color: var(--ion-color-medium);
  padding: 40px 20px;
}
.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}
.empty-subtitle {
  font-size: 0.9rem;
}

/* Agenda List Styling */
.agenda-list {
  border-radius: 12px;
}
.agenda-item {
  --padding-start: 0;
}
.time-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  font-weight: bold;
  color: var(--ion-color-primary);
}

/* Session Card Styling */
.session-card {
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
}

ion-card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
}

.speaker-name {
  font-style: italic;
  color: var(--ion-color-medium-shade);
  margin: 4px 0 8px;
}

.location-badge {
  font-weight: 500;
  --background: var(--ion-color-light-shade);
  --color: var(--ion-color-step-700);
}

.session-actions {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.add-button {
  --border-radius: 50%;
  width: 40px;
  height: 40px;
}
</style>
