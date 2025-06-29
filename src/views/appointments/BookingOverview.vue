<template>
  <ion-page>
    <ion-header>
      <ion-toolbar><ion-title>Booking Overview</ion-title></ion-toolbar>
    </ion-header>
    <ion-content class="custom-content" :fullscreen="true">
      <h2 class="ion-padding-start">My Bookings</h2>

      <router-link
        v-for="booking in bookings"
        :key="booking.id"
        :to="{ name: 'booking-details', params: { id: booking.id } }"
        class="card-link"
      >
        <ion-card>
          <ion-card-header>
            <ion-card-title>{{ booking.name }}</ion-card-title>
            <ion-chip :color="getStatusColor(booking.status)">
              <ion-label>{{ booking.status }}</ion-label>
            </ion-chip>
          </ion-card-header>
          <ion-card-content>
            <ion-item lines="none" class="info-item">
              <ion-icon :icon="calendarOutline" slot="start" color="medium"></ion-icon>
              <ion-label>{{ booking.date }} at {{ booking.time }}</ion-label>
            </ion-item>
            <ion-item lines="none" class="info-item">
              <ion-icon :icon="locationOutline" slot="start" color="medium"></ion-icon>
              <ion-label>{{ booking.venue }}</ion-label>
            </ion-item>
          </ion-card-content>
        </ion-card>
      </router-link>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonChip, IonLabel, IonItem, IonIcon
} from "@ionic/vue";
import { calendarOutline, locationOutline } from 'ionicons/icons';
// Import the data from the new central file
import bookings from '@/Data/bookings';

// Helper function (remains the same)
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'upcoming': return 'primary';
    case 'ongoing': return 'success';
    case 'completed': return 'medium';
    case 'cancelled': return 'danger';
    default: return 'light';
  }
};
</script>

<style scoped>
/* Add this to remove the default hyperlink styling */
.card-link {
  text-decoration: none;
}

.custom-content {
  --padding-top: 62px;
  --padding-bottom: 32px;
  --padding-start: 16px;
  --padding-end: 16px;
}
h2 {
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--ion-color-step-800, #333);
  margin-top: 16px;
  margin-bottom: 0;
}
ion-card {
  margin-top: 12px;
  margin-bottom: 12px;
}
ion-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
ion-card-title {
  font-size: 1.1rem;
}
ion-chip {
  flex-shrink: 0;
  height: 28px;
  font-size: 0.8rem;
}
.info-item {
  --padding-start: 0;
  --inner-padding-end: 0;
  font-size: 0.9em;
  color: var(--ion-color-step-600, #666);
}
ion-icon {
  margin-right: 12px;
}
</style>