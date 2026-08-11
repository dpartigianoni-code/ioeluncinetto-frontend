// Dominio definitivo non ancora noto (Solution Design 14.3, punto 14): valorizzare
// apiBaseUrl al momento del deploy, con -c production --define o un file generato in pipeline.
export const environment = {
  production: true,
  apiBaseUrl: '',
  confirmationPollIntervalMs: 2000,
  confirmationPollTimeoutMs: 30000,
  defaultPageSize: 6,
};
