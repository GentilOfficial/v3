const issueCopy = {
  en: {
    missing_env: {
      title: "Local fallback active",
      description:
        "The database configuration is missing. Showing local fallback content.",
    },
    db_unavailable: {
      title: "Live content temporarily unavailable",
      description:
        "A database or network issue occurred. Showing local fallback content.",
    },
    invalid_data: {
      title: "Content sync issue",
      description:
        "The live data shape was invalid. Showing local fallback content.",
    },
  },
  it: {
    missing_env: {
      title: "Fallback locale attivo",
      description:
        "La configurazione del database non e disponibile. Sto mostrando contenuti locali di fallback.",
    },
    db_unavailable: {
      title: "Contenuti live temporaneamente non disponibili",
      description:
        "Si e verificato un problema di rete o database. Sto mostrando contenuti locali di fallback.",
    },
    invalid_data: {
      title: "Problema di sincronizzazione contenuti",
      description:
        "I dati live non avevano il formato atteso. Sto mostrando contenuti locali di fallback.",
    },
  },
}

const emptyCopy = {
  projects: {
    en: {
      title: "No published projects yet",
      description:
        "Projects will appear here as soon as they are published in the database.",
    },
    it: {
      title: "Nessun progetto pubblicato",
      description:
        "I progetti appariranno qui non appena saranno pubblicati nel database.",
    },
  },
  certifications: {
    en: {
      title: "No certifications available",
      description:
        "Certifications will appear here once they are published in the database.",
    },
    it: {
      title: "Nessuna certificazione disponibile",
      description:
        "Le certificazioni appariranno qui una volta pubblicate nel database.",
    },
  },
  experiences: {
    en: {
      title: "No experiences available",
      description:
        "Experiences will appear here once they are published in the database.",
    },
    it: {
      title: "Nessuna esperienza disponibile",
      description:
        "Le esperienze appariranno qui una volta pubblicate nel database.",
    },
  },
}

export function getIssueNotice(issue, lang) {
  if (!issue) return null
  return issueCopy[lang]?.[issue] ?? issueCopy.en[issue] ?? null
}

export function getEmptyStateCopy(collection, lang) {
  return emptyCopy[collection]?.[lang] ?? emptyCopy[collection]?.en ?? null
}
