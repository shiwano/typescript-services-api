/// <reference path="./typescriptServices.d.ts" />

declare module 'typescript-services-api' {
  var typeScriptServicesApi: { ts: typeof ts; TypeScript: typeof TypeScript };
  export = typeScriptServicesApi;
}
