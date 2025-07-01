<template>
  <ion-page>
  <ion-content class="custom-content" :fullscreen="true">
    <div class="ion-padding">
      <!-- 1. Session Description Section -->
      <h2 class="section-title">Session Details</h2>
      <ion-card class="details-card">
        <ion-card-header>
          <ion-item lines="none">
            <ion-avatar slot="start">
              <img :src="conferenceInfo.mainSpeaker.avatar" />
            </ion-avatar>
            <ion-label>
              <ion-card-title>{{ conferenceInfo.topic }}</ion-card-title>
              <ion-card-subtitle>by {{ conferenceInfo.mainSpeaker.name }}</ion-card-subtitle>
            </ion-label>
          </ion-item>
        </ion-card-header>
        <ion-card-content>
          <p>{{ conferenceInfo.description }}</p>
          <div class="duration-badge">
            <ion-icon :icon="timeOutline" color="primary"></ion-icon>
            <ion-label color="primary">{{ conferenceInfo.duration }}</ion-label>
          </div>
        </ion-card-content>
      </ion-card>

      <!-- 2. Location Section -->
      <h2 class="section-title">Location</h2>
      <ion-card class="details-card">
        <div class="map-container">
          <iframe
            :src="conferenceInfo.location.mapEmbedUrl"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen="false"
            loading="lazy"
          ></iframe>
        </div>
        <ion-card-content class="location-content">
            <h3>{{ conferenceInfo.location.name }}</h3>
            <p>{{ conferenceInfo.location.address }}</p>
            <ion-button expand="block" :href="conferenceInfo.location.directionsUrl" target="_blank">
                <ion-icon slot="start" :icon="navigateCircleOutline"></ion-icon>
                Get Directions
            </ion-button>
        </ion-card-content>
      </ion-card>

      <!-- 3. Virtual Link Section -->
      <h2 class="section-title">Virtual Access</h2>
        <ion-item lines="none" class="details-card">
            <ion-icon :icon="videocamOutline" color="secondary" slot="start"></ion-icon>
            <ion-label>Online Session</ion-label>
            <ion-button slot="end" :href="conferenceInfo.virtualLink" target="_blank" color="secondary">
                Join Now
            </ion-button>
        </ion-item>
    </div>
  </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonIcon,
  IonLabel,
  IonItem,
  IonAvatar,
  IonPage
} from '@ionic/vue';
import { timeOutline, navigateCircleOutline, videocamOutline } from 'ionicons/icons';
import conferenceInfo from '@/Data/conferenceInfo';
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
  margin-top: 24px;
}

.details-card {
  box-shadow: none;
  border-radius: 12px;
  border: 1px solid var(--ion-color-step-200, #e0e0e0);
  margin-top: 8px;
  margin-bottom: 8px;
}

ion-card-title {
    font-size: 1.1rem;
    font-weight: 600;
}

.duration-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 16px;
    background: rgba(var(--ion-color-primary-rgb), 0.1);
    padding: 8px 12px;
    border-radius: 8px;
    width: fit-content;
}

.map-container {
    width: 100%;
    height: 200px;
    border-radius: 12px 12px 0 0;
    overflow: hidden;
}

.location-content {
    padding-top: 16px;
}
.location-content h3 {
    margin-top: 0;
    font-weight: 600;
}
.location-content p {
    color: var(--ion-color-medium);
}
</style>
