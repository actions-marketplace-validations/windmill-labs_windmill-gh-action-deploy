# windmill-gh-action-deploy

**Github action marketplace page**:
<https://github.com/marketplace/actions/deploy-to-windmill-dev>

**windmill.dev documentation**: <https://docs.windmill.dev>

**public github repo**: <https://github.com/windmill-labs/windmill>

## Quickstart

The action below would, at merge on main, deploy a repo based on the content
locatet under the root path `starter`. It would deploy to the workspace
`starter` using an api token stored as a secret.

```yaml
name: Deploy to windmill.dev

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to windmill.dev
        uses: windmill-labs/windmill-gh-action-deploy@v2.0.0
        with:
          dry_run: false
          input_dir: starter
          windmill_workspace: starter
          windmill_token: ${{ secrets.WINDMILL_API_TOKEN }}
```
