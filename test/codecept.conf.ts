import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './*_test.ts',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:3010',
      show: !process.env.CI,
      windowSize: '1500x1500',
      chrome: {
        headless: "new",
      },
    }
  },
  include: {
    I: './steps_file'
  },
  "gherkin": {
    "features": "./features/*.feature",
    "steps": [
      "./step_definitions/steps.ts"
    ]
  },
  name: 'test'
}