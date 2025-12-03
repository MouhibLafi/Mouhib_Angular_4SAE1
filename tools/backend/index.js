const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

// Simple mock endpoint that returns example usages for a queried function name.
app.get('/examples', (req, res) => {
  const q = req.query.q || 'unknown';
  // In a real implementation you'd query a database or the GitHub index.
  const examples = [
    {
      repo: 'microsoft/example-repo',
      file: 'src/usage.js',
      snippet: `// Usage of ${q}\nconst out = ${q}(1, 2);\nconsole.log(out);`
    },
    {
      repo: 'community/lib',
      file: 'examples/example.ts',
      snippet: `// Another usage\nimport { ${q} } from 'lib';\n${q}('arg');`
    }
  ];

  res.json({query: q, examples});
});

app.listen(port, () => {
  console.log(`Mock IntelliCode backend running on http://localhost:${port}`);
});

// Note: To index GitHub you can use the Search API (https://docs.github.com/en/rest/search)
// but you must handle rate limits and authentication. This mock server is intentionally
// simple so you can extend it safely.
