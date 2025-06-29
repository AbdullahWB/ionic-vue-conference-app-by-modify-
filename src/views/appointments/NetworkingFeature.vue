<template>
  <ion-content class="custom-content" :fullscreen="true">
    <!-- 1. Contact Exchange Section -->
    <div class="ion-padding">
      <h2 class="section-title">Contact Exchange</h2>
      <p class="section-subtitle">Share your digital business card instantly.</p>
    </div>
    <ion-card class="contact-card">
      <ion-item lines="none">
        <ion-label>
          <h3>{{ currentUser.name }}</h3>
          <p>{{ currentUser.title }} at {{ currentUser.company }}</p>
        </ion-label>
        <ion-button slot="end" @click="showMyQrCode">
          <ion-icon slot="icon-only" :icon="qrCodeOutline"></ion-icon>
        </ion-button>
      </ion-item>
    </ion-card>

    <!-- 2. Meeting Requests Section -->
    <div class="ion-padding">
      <h2 class="section-title">Book a Meeting</h2>
      <p class="section-subtitle">Request a 1-on-1 slot with available speakers.</p>
    </div>
    <ion-list :inset="true">
      <ion-item v-for="speaker in availableSpeakers" :key="speaker.id" lines="full">
        <ion-avatar slot="start">
          <img :src="speaker.avatar" />
        </ion-avatar>
        <ion-label>
          <h3>{{ speaker.name }}</h3>
          <p>{{ speaker.title }}</p>
          <div class="slots-container">
            <ion-chip
              v-for="slot in speaker.availability"
              :key="slot.time"
              :disabled="slot.booked"
              :color="slot.booked ? 'medium' : 'primary'"
              @click="bookSlot(speaker, slot)"
              outline
            >
              {{ slot.time }}
            </ion-chip>
          </div>
        </ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script setup>
import { ref } from 'vue';
import {
  IonContent,
  IonCard,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonList,
  IonAvatar,
  IonChip,
  modalController,
  toastController,
} from '@ionic/vue';
import { qrCodeOutline } from 'ionicons/icons';
import availableSpeakers from '@/Data/speakers';
import currentUser from '@/Data/userProfile';
import ContactQrCodeModal from '@/components/ContactQrCodeModal.vue';

const bookSlot = async (speaker, slot) => {
  slot.booked = true; // Visually mark as booked
  const toast = await toastController.create({
    message: `Meeting with ${speaker.name} at ${slot.time} requested.`,
    duration: 3000,
    position: 'bottom',
    color: 'success'
  });
  await toast.present();
};

const showMyQrCode = async () => {
  const modal = await modalController.create({
    component: ContactQrCodeModal,
    componentProps: {
      userProfile: currentUser,
    },
    breakpoints: [0, 0.5, 0.8],
    initialBreakpoint: 0.5,
  });
  await modal.present();
};
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
}
.section-subtitle {
  color: var(--ion-color-medium);
  margin-top: -8px;
  margin-bottom: 16px;
}
.contact-card {
  margin: 0 16px;
}
.slots-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}
ion-list {
  border-radius: 12px;
}
</style>
