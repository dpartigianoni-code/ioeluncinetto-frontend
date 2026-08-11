# ioeluncinetto-frontend - P-UI

Frontend Angular del progetto P001 ("Io e l'uncinetto"). Parla con il backend
**P-SRV** (repository separato `ioeluncinetto`) tramite le API REST descritte
nel Solution Design (PKG-P001-SD-1.0).

## Stack

- Angular 18, standalone components (nessun NgModule), signal per lo stato reattivo
- SCSS, routing lazy per pagina

## Cosa è implementato in questa consegna

| Rotta | Processo | Stato |
|---|---|---|
| `/catalogo` | EP01, EP02 (consultare/cercare) | Implementato |
| `/prodotto/:sku` | EP03 (dettaglio) + comando EP04 (aggiungi al carrello) | Implementato |
| `/carrello` | EP05, EP06, EP07 (visualizza/modifica/rimuovi) | Implementato |
| `/checkout`, `/checkout/pagamento`, `/ordine/conferma` | EP08, EP09 | **Non ancora implementato** |

## Scostamenti rispetto al Solution Design (da confermare)

- **Angular Material non è stato integrato.** Il Solution Design (capitolo 3,
  Architettura applicativa) indica Angular Material e Angular CDK; per
  contenere l'ampiezza di questa prima consegna sono stati usati controlli
  HTML nativi con SCSS minimo. Angular Material resta da aggiungere: non
  richiede modifiche al contratto con il backend.
- Fogli di stile e contenuti editoriali **non replicano** il prototipo di
  validazione: il Solution Design li rinvia esplicitamente alla fase
  Implementation (capitolo 1.1). Lo stile qui presente è funzionale, non definitivo.
- Non sono presenti test automatici (Karma/Jasmine non configurati).

## Avvio in locale

Prerequisiti: **Node.js 20+** (verificato disponibile in questo ambiente:
Node 22, npm 10) e il backend P-SRV in esecuzione su `http://localhost:8080`
(vedi il README del repository `ioeluncinetto`).

```bash
npm install
npm start        # http://localhost:4200, proxy CORS gestito dal backend
```

`environment.ts` punta di default a `http://localhost:8080`. Per un dominio
diverso, modifica `apiBaseUrl` oppure introduci un file `environment.*.ts`
per ambiente.

## Limiti di questa consegna (ambiente di sviluppo)

Le versioni dei pacchetti in `package.json` sono quelle correnti al momento
della scrittura ma **non è stato eseguito `npm install` né una build reale**
in questo ambiente (Angular CLI non era installato e non è stato verificato
l'accesso al registry npm). Prima di fare affidamento sul codice:

- Esegui `npm install` e `npm start`; correggi eventuali disallineamenti di
  versione tra i pacchetti Angular indicati.
- Verifica che il backend sia raggiungibile e che CORS sia configurato verso
  `http://localhost:4200` (già impostato lato P-SRV in sviluppo).

## Struttura

```
src/app/
  core/
    models/       DTO TypeScript speculari a quelli di P-SRV
    services/     CatalogService, CartService (stato con signal), SessionService, AlertService
    http/         interceptor di correlazione (X-Correlation-Id)
  features/
    catalog/      pagina catalogo/ricerca + card prodotto
    product/      pagina dettaglio + aggiunta al carrello
    cart/         pagina carrello
```

## Prossimi passi

- Pagine `/checkout`, `/checkout/pagamento`, `/ordine/conferma` (EP08/EP09),
  quando il backend le esporrà.
- Angular Material/CDK, se confermato.
- Accessibilità: verifica WCAG 2.1 AA sul flusso essenziale (RNF05), non
  ancora eseguita.
- Test end-to-end e unitari.
