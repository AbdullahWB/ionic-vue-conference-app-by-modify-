<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>My Digital Card</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="dismissModal">Close</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <div class="qr-container">
      <canvas ref="qrCodeCanvas"></canvas>
      <h3>{{ userProfile.name }}</h3>
      <p>{{ userProfile.title }}</p>
    </div>
    <ion-list :inset="true">
      <ion-item>
        <ion-icon :icon="mailOutline" slot="start" color="primary"></ion-icon>
        <ion-label>{{ userProfile.email }}</ion-label>
      </ion-item>
      <ion-item>
        <ion-icon :icon="callOutline" slot="start" color="primary"></ion-icon>
        <ion-label>{{ userProfile.phone }}</ion-label>
      </ion-item>
      <ion-item>
        <ion-icon :icon="globeOutline" slot="start" color="primary"></ion-icon>
        <ion-label>{{ userProfile.website }}</ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonList, IonItem, IonLabel, IonIcon, modalController } from '@ionic/vue';
import { mailOutline, callOutline, globeOutline } from 'ionicons/icons';

const props = defineProps({
  userProfile: Object,
});

const qrCodeCanvas = ref(null);

const dismissModal = () => {
  modalController.dismiss();
};

const loadScript = (url) => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

onMounted(async () => {
  try {
    await loadScript('https://cdn.jsdelivr.net/npm/qrcode@1.4.4/build/qrcode.min.js');
    if (window.QRCode && qrCodeCanvas.value) {
      // Create a vCard string for the QR code
      const vCard = `BEGIN:VCARD\nVERSION:3.0\nFN:${props.userProfile.name}\nTITLE:${props.userProfile.title}\nORG:${props.userProfile.company}\nEMAIL:${props.userProfile.email}\nTEL;TYPE=WORK,VOICE:${props.userProfile.phone}\nURL:${props.userProfile.website}\nEND:VCARD`;
      window.QRCode.toCanvas(qrCodeCanvas.value, vCard, {
        width: 220,
        margin: 2,
        errorCorrectionLevel: 'H',
      });
    }
  } catch (error) {
    console.error('Failed to generate QR Code:', error);
  }
});
</script>

<style scoped>
.qr-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
}
.qr-container h3 {
    margin-top: 16px;
    margin-bottom: 4px;
}
.qr-container p {
    margin-top: 0;
    color: var(--ion-color-medium);
}
</style>
