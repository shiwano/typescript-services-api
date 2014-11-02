/// <reference path="./typescriptServices.d.ts" />

// Avoid circular definition
declare module __TypeScriptServicesApi {
  export import __ts = ts;
  export import __TypeScript = TypeScript;
}

declare module 'typescript-services-api' {
  export import ts = __TypeScriptServicesApi.__ts;
  export import TypeScript = __TypeScriptServicesApi.__TypeScript;
}
