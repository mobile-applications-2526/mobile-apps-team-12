// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

import { mount } from 'cypress/react'

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}
if (typeof window !== 'undefined') {
  (window as any).__DEV__ = true;
  // Suppress console warnings for known React Native/Expo issues
  const originalWarn = console.warn;
  console.warn = (...args) => {
    const msg = args[0]?.toString() || '';
    if (
      msg.includes('TurboModuleRegistry') ||
      msg.includes('@react-native-vector-icons') ||
      msg.includes('ExpoModulesCoreJSLogger')
    ) {
      return;
    }
    originalWarn(...args);
  };
}

Cypress.Commands.add('mount', mount)

// Example use:
// cy.mount(<MyComponent />)