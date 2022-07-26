# Localization

## Adding a locale

Add a new `.ts` file that exports an instance of `WebsiteLocale` class ([interface.ts](./interface.ts)), as the default export.  
next you need to statically import and add the respected instance to `localeImportMaps` object ([index.ts](./index.ts))

## Using localized strings in the code

[index.ts](./index.ts) contains a named export `__$` which is a `ReplaySubject` that contains the current locale data implementing the `WebsiteLocaleData` interface ([types.d.ts](./types.d.ts)). this variable can be used in `.svelte` files as `$__$` to access the respected data without needing to manage component lifecycle cleanups.
