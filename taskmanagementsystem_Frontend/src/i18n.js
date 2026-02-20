import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Task Preferences": "Task Preferences",
      "Select Language": "Select Language",
      "Filter Tasks by Status": "Filter Tasks by Status",
      "All": "All",
      "Pending": "Pending",
      "In Progress": "In Progress",
      "Done": "Done",
      "Tasks": "Tasks",
      "Save Preferences": "Save Preferences",
      "Loading tasks...": "Loading tasks..."
    }
  },
  fr: {
    translation: {
      "Task Preferences": "Préférences des tâches",
      "Select Language": "Choisir la langue",
      "Filter Tasks by Status": "Filtrer les tâches par statut",
      "All": "Toutes",
      "Pending": "En attente",
      "In Progress": "En cours",
      "Done": "Terminées",
      "Tasks": "Tâches",
      "Save Preferences": "Enregistrer les préférences",
      "Loading tasks...": "Chargement des tâches..."
    }
  },
  es: {
    translation: {
      "Task Preferences": "Preferencias de tareas",
      "Select Language": "Seleccionar idioma",
      "Filter Tasks by Status": "Filtrar tareas por estado",
      "All": "Todas",
      "Pending": "Pendientes",
      "In Progress": "En progreso",
      "Done": "Completadas",
      "Tasks": "Tareas",
      "Save Preferences": "Guardar preferencias",
      "Loading tasks...": "Cargando tareas..."
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
