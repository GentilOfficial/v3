export const feedback = {
  issues: {
    missing_env: {
      title: {
        en: "Local fallback active",
        it: "Fallback locale attiva",
      },
      description: {
        en: "The database configuration is missing. Showing local fallback content.",
        it: "La configurazione del database non è disponibile. Sto mostrando contenuti locali di fallback.",
      },
    },
    db_unavailable: {
      title: {
        en: "Live content temporarily unavailable",
        it: "Contenuti live temporaneamente non disponibili",
      },
      description: {
        en: "A database or network issue occurred. Showing local fallback content.",
        it: "Si è verificato un problema di rete o database. Sto mostrando contenuti locali di fallback.",
      },
    },
    invalid_data: {
      title: {
        en: "Content sync issue",
        it: "Problema di sincronizzazione contenuti",
      },
      description: {
        en: "The live data shape was invalid. Showing local fallback content.",
        it: "I dati live non avevano il formato atteso. Sto mostrando contenuti locali di fallback.",
      },
    },
  },
  emptyStates: {
    projects: {
      title: {
        en: "No published projects yet",
        it: "Nessun progetto pubblicato",
      },
      description: {
        en: "Projects will appear here as soon as they are published in the database.",
        it: "I progetti appariranno qui non appena saranno pubblicati nel database.",
      },
    },
    certifications: {
      title: {
        en: "No certifications available",
        it: "Nessuna certificazione disponibile",
      },
      description: {
        en: "Certifications will appear here once they are published in the database.",
        it: "Le certificazioni appariranno qui una volta pubblicate nel database.",
      },
    },
    experiences: {
      title: {
        en: "No experiences available",
        it: "Nessuna esperienza disponibile",
      },
      description: {
        en: "Experiences will appear here once they are published in the database.",
        it: "Le esperienze appariranno qui una volta pubblicate nel database.",
      },
    },
  },
}
