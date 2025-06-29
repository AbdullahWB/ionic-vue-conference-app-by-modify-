<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Booking Details</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="custom-content">
        <!-- <ion-title>{{ booking ? booking.name : 'Booking Details' }}</ion-title> -->
      <ion-buttons>
        <ion-back-button
          default-href="/tabs/appointments/booking-overview"
        ></ion-back-button>
      </ion-buttons>
       <div v-if="booking">
        <!-- Banner Image -->
        <div class="banner-container">
          <img :src="booking.bannerImage" alt="Conference Banner" class="banner-image" />
          <h1 class="banner-title">{{ booking.name }}</h1>
        </div>

        <div class="ion-padding content-wrapper">
          <!-- About Section -->
          <div class="section">
            <h2 class="section-title">About</h2>
            <p class="about-text">{{ booking.about }}</p>
          </div>

          <!-- Details Section -->
          <div class="section">
            <h2 class="section-title">Details</h2>
            <ion-list :inset="true" class="details-list">
              <ion-item>
                <ion-label>Location</ion-label>
                <ion-note slot="end">{{ booking.location }}</ion-note>
              </ion-item>
              <ion-item>
                <ion-label>Date</ion-label>
                <ion-note slot="end">{{ booking.date }}</ion-note>
              </ion-item>
            </ion-list>
          </div>
          
          <!-- Internet Section -->
          <div class="section">
            <h2 class="section-title">Internet</h2>
            <ion-list :inset="true" class="details-list">
              <ion-item>
                <ion-label>Wifi network</ion-label>
                <ion-note slot="end">{{ booking.internet.network }}</ion-note>
              </ion-item>
              <ion-item>
                <ion-label>Password</ion-label>
                <ion-note slot="end">{{ booking.internet.password }}</ion-note>
              </ion-item>
            </ion-list>
          </div>

        </div>
      </div>

      <!-- Fallback if booking not found -->
      <div v-else class="ion-padding">
        <ion-label>Booking not found.</ion-label>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
   IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonBackButton, IonList, IonItem, IonLabel, IonNote
} from "@ionic/vue";
import { computed } from "vue";
// Import the central data source
import bookings from "@/Data/bookings";

// This `id` prop is automatically passed from the router because we used `props: true`
const props = defineProps({
  id: String
});

const booking = computed(() => {
  return bookings.find(b => b.id.toString() === props.id);
});
// We need the color function here as well
const getStatusColor = (status) => {
  if (!status) return "light";
  switch (status.toLowerCase()) {
    case "upcoming":
      return "primary";
    case "ongoing":
      return "success";
    case "completed":
      return "medium";
    case "cancelled":
      return "danger";
    default:
      return "light";
  }
};
</script>

<style scoped>
.custom-content {
  --padding-top: 62px;
  --padding-bottom: 32px;
  --padding-start: 16px;
  --padding-end: 16px;
}
/* Banner Styling */
.banner-container {
  position: relative;
  width: 100%;
  height: 200px;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image covers the container */
}

.banner-title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 24px 16px 16px;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
}

.content-wrapper {
  padding-top: 16px;
}

.section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--ion-color-step-700);
  margin-bottom: 8px;
  padding: 0 8px; /* Align with list inset padding */
}

.about-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--ion-color-step-600);
  padding: 0 8px;
}

.details-list {
  margin: 0;
}
</style>