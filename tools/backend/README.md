# Mock backend for IntelliCode prototype

This tiny Express server returns mocked example usages for a requested function name.

Run (PowerShell):

```
cd tools/backend
npm install
npm start
```

Request examples:

```
curl "http://localhost:4000/examples?q=myFunction"
```

To extend: add a cache and replace mock results with data from an index or from the GitHub Search API.
