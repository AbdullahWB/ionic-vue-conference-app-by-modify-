import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import store from "./store";
import { IonicVue } from "@ionic/vue";
import { App } from "vue";
import AppointmentsTab from "@/views/appointments/AppointmentsTab.vue";
import BookingOverview from "@/views/appointments/BookingOverview.vue";
import ScheduleManagement from "@/views/appointments/ScheduleManagement.vue";
import AccessAndTicket from "@/views/appointments/AccessAndTicket.vue";
import ConferenceDetails from "@/views/appointments/ConferenceDetails.vue";
import NetworkingFeature from "@/views/appointments/NetworkingFeature.vue";

const privateRoute: RouteRecordRaw["beforeEnter"] = function (to, from, next) {
  if (!store.state.user.isAuthenticated) {
    next({ name: "login" });
  } else {
    next();
  }
};

const ensureSessionData: RouteRecordRaw["beforeEnter"] = async function (
  to,
  from,
  next
) {
  if (store.state.sessions.sessions.length === 0) {
    await store.dispatch("loadSessionData");
  }
  next();
};

const ensureSpeakerData: RouteRecordRaw["beforeEnter"] = async function (
  to,
  from,
  next
) {
  if (store.state.speakers.speakers.length === 0) {
    await store.dispatch("loadSpeakerData");
  }
  next();
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/tutorial",
    name: "tutorial",
    component: () => import("@/views/Tutorial.vue"),
  },
  {
    path: "/account",
    name: "account",
    component: () => import("@/views/Account.vue"),
    beforeEnter: privateRoute,
  },
  {
    path: "/support",
    name: "support",
    component: () => import("@/views/Support.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/Signup.vue"),
  },
  {
    path: "/tutorial",
    name: "Tutorial",
    component: () => import("@/views/Tutorial.vue"),
  },
  {
    path: "/tabs",
    component: () => import("@/views/Tabs.vue"),
    children: [
      {
        path: "schedule",
        name: "schedule",
        component: () => import("@/views/SessionList.vue"),
      },
      {
        name: "session-detail",
        path: "schedule/session/:sessionId",
        component: () => import("@/views/SessionDetail.vue"),
        beforeEnter: ensureSessionData,
      },
      {
        path: "speakers",
        name: "speakers",
        component: () => import("@/views/SpeakerList.vue"),
      },
      {
        path: "speakers/speaker/:speakerId",
        name: "speaker-detail",
        component: () => import("@/views/SpeakerDetail.vue"),
        beforeEnter: ensureSpeakerData,
      },
      {
        path: "speakers/session/:sessionId",
        name: "speaker-session-detail",
        component: () => import("@/views/SessionDetail.vue"),
        beforeEnter: ensureSessionData,
      },
      {
        path: "map",
        name: "map",
        component: () => import("@/views/Map.vue"),
      },
      {
        path: "about",
        name: "about",
        component: () => import("@/views/About.vue"),
      },
      {
        path: "appointments",
        component: AppointmentsTab,
        children: [
          {
            path: "",
            redirect: "/tabs/appointments/booking-overview",
          },
          {
            path: "booking-overview",
            component: BookingOverview,
          },
          {
            path: "/booking-details/:id",
            name: "booking-details",
            component: () => import("@/views/appointments/BookingDetails.vue"),
            props: true, // This is important! It passes the :id as a prop to the page
          },
          {
            path: "schedule-management",
            component: ScheduleManagement,
          },
          {
            path: "access-and-ticket",
            component: AccessAndTicket,
          },
          {
            path: "conference-details",
            component: ConferenceDetails,
          },
          {
            path: "networking-feature",
            component: NetworkingFeature,
          },
        ],
      },
    ],
  },
  { path: "/", redirect: "tutorial" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export function configureRouter(app: App) {
  app.use(router);
  app.use(IonicVue, {
    maxPageCacheSize: 10,
  });
  return router;
}

export default router;
