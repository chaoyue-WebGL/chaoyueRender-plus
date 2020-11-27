const path = require('path')
const fs = require('fs-extra')
const execa = require('execa')
const dts = require('dts-bundle')
const chalk = require('chalk')

const packagesDir = path.resolve('packages')
const buildTargets = process.argv.slice(2)
const isBuildAll = buildTargets.length === 0

function logger(msg) {
  return console.log(chalk.blue(chalk.bold(msg)))
}

async function makeBuild() {
  let files = await fs.readdir(packagesDir)
  files = files.filter((pkgDirName) => {
    const pkgDir = path.resolve(packagesDir, pkgDirName)
    const stat = fs.statSync(pkgDir)
    const isPkg = stat.isDirectory()
    if (!isPkg) return false
    return isBuildAll ? true : buildTargets.includes(pkgDirName)
  })
  if (!files.length) {
    logger(`No matching build targets: ${buildTargets.join(',')}`)
    return
  }
  logger(`Start building, Targets: ${files.join(',')}`)

  files.forEach(async (pkgDirName) => {
    const pkgDir = path.resolve(packagesDir, pkgDirName)
    const pkg = require(`${pkgDir}/package.json`)
    if (pkg.private) return
    await fs.remove(`${pkgDir}/dist`)
    await execa('rollup', ['-c', '--environment', `PKG_DIR:${pkgDirName}`], {
      stdio: 'inherit'
    })

    if (pkg.buildOptions.extractDts) {
      dts.bundle({
        name: pkg.name,
        main: `${pkgDir}/dist/packages/${pkgDirName}/src/index.d.ts`,
        out: `${pkgDir}/${pkg.types}`
      })
      await fs.remove(`${pkgDir}/dist/packages`)
    }
  })
}

makeBuild()
