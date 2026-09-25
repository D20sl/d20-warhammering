# Project practices

- When calling server API in the client, use the custom fetchApi function.
- When creating a new cookie, use the enum Cookies to store the cookie name.
- A layer's nuxt.config.ts stays an empty file unless the layer needs config.
  The file must exist, or Nuxt does not treat the directory as a layer.
- Use `undefined` for missing values, not `null`. Only use `null` where an
  external API or the database requires it. A loose `== null` check is fine,
  since it is shorter than checking for undefined.
- No prop drilling: don't pass data through components that only forward it.
  Share it instead: a `useFetch` composable with a fixed `key` for API data,
  `useState` or a store for app state, provide/inject within a subtree.
- Name a composable that wraps a fetch `useFetch<Thing>`, for example
  `useFetchPlayerStats`.
