import * as core from '@actions/core'
import * as fs from 'fs/promises'
import * as tar from 'tar'

async function run(): Promise<void> {
  try {
    const dryRun = core.getInput('dry_run') === 'true'
    const inputDir = core.getInput('input_dir') ?? './'
    const pathPrefix = core.getInput('pathPrefix')
    const windmillToken = core.getInput('windmill_token')
    const windmillWorkspace = core.getInput('windmill_workspace')
    const windmillUrl = core.getInput('windmill_url') ?? 'https://alpha.windmill.dev'
    const scriptName = core.getInput('script_name') ?? 'u/bot/import_workspace_from_tarball'

    core.info(`dryRun: ${dryRun}`)
    core.info(`inputDir: ${inputDir}}`)
    core.info(`pathPrefix: ${pathPrefix}}`)
    core.info(`windmillWorksace: ${windmillWorkspace}`)

    await tar.c(
      {
        gzip: false,
        file: 'tarball.tar'
      },
      [inputDir]
    )
    core.info('tarball has been created')
    const content: string = await fs.readFile('./tarball.tgz', { encoding: 'base64' })
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${windmillToken}`
      },
      body: JSON.stringify({
        tarball: content
      })
    }
    const fetchResponse = await fetch(`${windmillUrl}/api/w/${windmillWorkspace}/scripts/${scriptName}`, settings)
    await fetchResponse.text()
  } catch (error: unknown) {
    if (error instanceof Error) {
      core.error(error.message)
      core.setFailed(error.message)
    }
  }
}

run()
