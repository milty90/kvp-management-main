import { BarChart } from "../components/charts/BarChart";
import { ColumnChart } from "../components/charts/ColumnChart";

export const translations = {
  de: {
    appName: "KVP Management System",
    topNavButton: { pdca: "Verbesserungen", stats: "Statistiken" },
    statCard: {
      total: "Gesamt",
      closed: "Abgeschlossen",
      assigned: "Zugewiesen",
      highPriority: "Hohe Priorität",
    },
    settingItem: {
      settings: "Einstellungen",
      profile: "Profil",
      logout: "Abmelden",
    },
    logOutModal: {
      title: "Abmelden",
      message: "Sind Sie sicher, dass Sie sich abmelden möchten?",
      toastMessage: "Sie wurden erfolgreich abgemeldet.",
      onCancel: "Abbrechen",
      onConfirm: "Abmelden",
    },
    settingsModal: {
      settings: "Einstellungen",
      settingTheme: {
        title: "Dunkelmodus",
        descriptionLight: "Wechseln Sie zum Hellmodus",
        descriptionDark: "Wechseln Sie zum Dunkelmodus",
        current: "Aktuell: ",
        dark: "Dunkel",
        light: "Hell",
      },
      settingLanguage: {
        title: "Sprache wechseln",
        description: "Wechseln Sie zu Deutsch oder Englisch",
        current: "Aktuell:",
      },
      settingsNotification: {
        title: "Benachrichtigungen",
        description:
          "Verwalten Sie Ihre Schalten Sie die Benachrichtigungen ein oder aus",
        current: "Aktuell: An",
      },
      settingsButton: {
        save: "Änderungen speichern",
        cancel: "Abbrechen",
      },
    },
    statistics: {
      DonutChart: {
        title: "PDCA-Phasen Verteilung",
        description: "Anzahl der Verbesserungen pro Phase",
      },
      ColumnChart: {
        title: "Prioritäten",
        description: "Verteilung nach Prioritätsstufen",
      },
      BarChart: {
        title: "Kategorien",
        description: "Verbesserungen nach Kategorien",
      },
      LineChart: {
        title: "Zeitverlauf",
        description: "Neue Verbesserungen pro Monat",
      },
    },
  },
  en: {
    appName: "PCDA Management System",
    topNavButton: { pdca: "Improvements", stats: "Statistics" },
    statCard: {
      total: "Total",
      closed: "Closed",
      assigned: "Assigned",
      highPriority: "High Priority",
    },
    settingItem: {
      settings: "Settings",
      profile: "Profile",
      logout: "Logout",
    },
    logOutModal: {
      title: "Log Out",
      message: "Are you sure you want to log out?",
      toastMessage: "You have been logged out successfully.",
      onCancel: "Cancel",
      onConfirm: "Log Out",
    },
    settingsModal: {
      settings: "Settings",

      settingTheme: {
        title: "Dark Mode",
        descriptionLight: "Switch to Light Mode",
        descriptionDark: "Switch to Dark Mode",
        current: "Current: ",
        dark: "Dark",
        light: "Light",
      },
      settingLanguage: {
        title: "Change Language",
        description: "Switch between English and German",
        current: "Current:",
      },
      settingsNotification: {
        title: "Notifications",
        description: "Manage your notifications by turning them on or off",
        current: "Current: On",
      },
      settingsButton: {
        save: "Save Changes",
        cancel: "Cancel",
      },
    },
    statistics: {
      DonutChart: {
        title: "PDCA Phase Distribution",
        description: "Number of improvements per phase",
      },
      ColumnChart: {
        title: "Priorities",
        description: "Distribution by priority levels",
      },
      BarChart: {
        title: "Categories",
        description: "Improvements by categories",
      },
      LineChart: {
        title: "Timeline",
        description: "New improvements per month",
      },
    },
  },
};
