const REPLACEMENTS: Record<string, string> = {
  SITE_NAME: "Studi.0x",
  TAGLINE_SHORT_FR: "L'agence visuelle & design 360°",
  TAGLINE_SHORT_EN: "The 360° visual & design studio",
  CONTACT_EMAIL: "hello@studi.ox",
  CONTACT_PHONE: "+33 6 00 00 00 00",
  CTA_PRIMARY_FR: "Parlez-moi de votre projet",
  CTA_PRIMARY_EN: "Let's talk about your project",
  CTA_SECONDARY_FR: "Voir les projets",
  CTA_SECONDARY_EN: "View projects",
  CITY_COUNTRY_FR: "France",
  CITY_COUNTRY_EN: "France",
  YEAR: new Date().getFullYear().toString(),
};

export function replaceVariables(text: string): string {
  return text.replace(/\$\{(\w+)\}/g, (match, key) => {
    return REPLACEMENTS[key] || match;
  });
}

export function replaceVariablesInObject<T>(obj: T): T {
  if (typeof obj === 'string') {
    return replaceVariables(obj) as T;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => replaceVariablesInObject(item)) as T;
  }
  
  if (obj !== null && typeof obj === 'object') {
    const result = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = replaceVariablesInObject(obj[key]);
      }
    }
    return result;
  }
  
  return obj;
}

