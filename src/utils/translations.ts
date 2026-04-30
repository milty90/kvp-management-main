import { SettingsModal } from "../components/items/SettingsModal";

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
    SettingsModal: {
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
        current: "Aktuell: Deutsch",
      },
      settingsNotification: {
        title: "Benachrichtigungen",
        description:
          "Verwalten Sie Ihre Schalten Sie die Benachrichtigungen ein oder aus",
        current: "Aktuell: An",
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
    SettingsModal: {
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
        current: "Current: English",
      },
      settingsNotification: {
        title: "Notifications",
        description: "Manage your notifications by turning them on or off",
        current: "Current: On",
      },
    },
  },
};
