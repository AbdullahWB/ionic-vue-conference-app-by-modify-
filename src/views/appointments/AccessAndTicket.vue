<template>
  <ion-content :fullscreen="true">
    <div class="ion-padding">
      <h2 class="section-title">Digital Pass</h2>
      <p class="section-subtitle">
        Present this QR code at the entrance for check-in.
      </p>
    </div>

    <!-- 1. Digital Pass / QR Code Card -->
    <ion-card class="ticket-card">
      <ion-card-header class="ticket-header">
        <div class="header-info">
          <ion-card-title>{{ userTicket.eventName }}</ion-card-title>
          <ion-card-subtitle>{{ userTicket.holderName }}</ion-card-subtitle>
        </div>
        <!-- 2. Ticket Tier Badge -->
        <ion-chip :color="getTierColor(userTicket.tier)" class="tier-chip">
          <ion-icon :icon="star" v-if="userTicket.tier === 'VIP'"></ion-icon>
          <ion-label>{{ userTicket.tier }}</ion-label>
        </ion-chip>
      </ion-card-header>
      <ion-card-content class="qr-container">
        <!-- The QR Code will be rendered on this canvas -->
        <canvas ref="qrCodeCanvas"></canvas>
      </ion-card-content>
    </ion-card>

    <!-- 3. Offline Access Button -->
    <div class="ion-padding">
      <ion-button expand="block" @click="saveToDevice" size="large">
        <ion-icon slot="start" :icon="downloadOutline"></ion-icon>
        Save to Device
      </ion-button>
    </div>
  </ion-content>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonIcon,
  IonChip,
  IonLabel,
  toastController,
} from "@ionic/vue";
import { downloadOutline, star } from "ionicons/icons";

// --- Static Data ---
const userTicket = ref({
  id: "CONF-TICKET-12345",
  holderName: "Jane Doe",
  eventName: "Ionic World Conference",
  tier: "VIP", // Can be 'VIP', 'Standard', 'Early Bird'
  qrData: JSON.stringify({
    ticketId: "CONF-TICKET-12345",
    userId: "USER-9876",
    conference: "Ionic World Conf 2025",
  }),
});

const qrCodeCanvas = ref(null);

// --- Helper Functions ---

const getTierColor = (tier) => {
  switch (tier) {
    case "VIP":
      return "warning";
    case "Standard":
      return "primary";
    case "Early Bird":
      return "success";
    default:
      return "medium";
  }
};

const loadScript = (url) => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const saveToDevice = async () => {
  // This is a simulation. A real implementation would use Capacitor's
  // Filesystem API to save the ticket or screenshot.
  const toast = await toastController.create({
    message: "Ticket saved for offline access.",
    duration: 2000,
    position: "bottom",
    color: "success",
  });
  await toast.present();
};

// --- Lifecycle Hook to Generate QR Code ---

onMounted(async () => {
  try {
    // Dynamically load the QR code generation library from a CDN
    await loadScript(
      "https://cdn.jsdelivr.net/npm/qrcode@1.4.4/build/qrcode.min.js"
    );

    // Check if the QRCode library is loaded and the canvas element is available
    if (window.QRCode && qrCodeCanvas.value) {
      window.QRCode.toCanvas(qrCodeCanvas.value, userTicket.value.qrData, {
        width: 240,
        margin: 2,
        errorCorrectionLevel: "H",
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
    } else {
      console.error("QR Code canvas element not found or library not loaded.");
    }
  } catch (error) {
    console.error("Failed to load or generate QR Code:", error);
  }
});
</script>

<style scoped>
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

.ticket-card {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  margin: 0 16px;
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 8px;
}

.tier-chip {
  font-weight: bold;
}

.qr-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background-color: #f9f9f9;
}

ion-button {
  --border-radius: 12px;
}
</style>
