<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Appointments</ion-title>
      </ion-toolbar>

      <ion-toolbar>
        <ion-segment
          @ionChange="segmentChanged($event)"
          value="booking-overview"
        >
          <ion-segment-button
            value="booking-overview"
            router-link="/tabs/appointments/booking-overview"
          >
            <ion-label>Overview</ion-label>
          </ion-segment-button>
          <ion-segment-button
            value="schedule-management"
            router-link="/tabs/appointments/schedule-management"
          >
            <ion-label>Schedule</ion-label>
          </ion-segment-button>
          <ion-segment-button
            value="access-and-ticket"
            router-link="/tabs/appointments/access-and-ticket"
          >
            <ion-label>Ticket</ion-label>
          </ion-segment-button>
          <ion-segment-button
            value="conference-details"
            router-link="/tabs/appointments/conference-details"
          >
            <ion-label>Details</ion-label>
          </ion-segment-button>
          <ion-segment-button
            value="networking-feature"
            router-link="/tabs/appointments/networking-feature"
          >
            <ion-label>Network</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-router-outlet></ion-router-outlet>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonRouterOutlet,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from "@ionic/vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AppointmentsTab",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonRouterOutlet,
    IonSegment,
    IonSegmentButton,
    IonLabel,
  },
  setup() {
    const router = useRouter();
    const segmentChanged = (ev: CustomEvent) => {
      // The router-link on the segment button handles navigation,
      // but you could add more logic here if needed.
      const value = ev.detail.value;
      router.push(`/tabs/appointments/${value}`);
    };
    return {
      segmentChanged,
    };
  },
});
</script>

<style scoped>
ion-segment-button {
  text-transform: none; /* Optional: Makes labels look cleaner */
}
</style>
