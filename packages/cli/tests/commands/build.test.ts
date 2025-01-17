import { expect, test } from '@oclif/test';
import { paramCase } from 'change-case';
import * as path from 'path';
import * as fs from 'fs';
import { rmdir } from '../utils';

const THEME_PATH = 'packages/cli/tests/config/theme';
const THEME_JSON_PATH = 'packages/cli/tests/config/themejson';
const BUILD_PATH = 'packages/cli/tests/builds';
const CONFIG_PATH = 'packages/cli/tests/config/.morfeorc';
const CONFIG_JSON_PATH = 'packages/cli/tests/config/.morfeorcjson';
const CONFIG_WITH_THEMES_PATH = 'packages/cli/tests/config/.morfeorcWithThemes';
const THEME_NAME = 'light';

function fileExists(fileName: string) {
  const filePath = path.join(BUILD_PATH, `${fileName}`);

  return fs.existsSync(filePath);
}

describe('build command', () => {
  afterEach(() => {
    rmdir(BUILD_PATH);
  });

  beforeEach(() => {
    // Needed because the initialization takes a lot of time.
    jest.setTimeout(150000);
  });

  describe(`if the build folder does not exists`, () => {
    beforeEach(() => {
      rmdir(BUILD_PATH);
    });

    test
      .command(['build', THEME_PATH, '--build', BUILD_PATH])
      .it(
        `should create the build folder in the path passed from the CLI`,
        () => {
          const exists = fileExists('');

          expect(exists).to.be.true;
        },
      );

    test
      .command(['build', THEME_JSON_PATH, '--build', BUILD_PATH])
      .it(`should work from a theme inside a json file`, () => {
        const exists = fileExists('');

        expect(exists).to.be.true;
      });

    test
      .command(['build', THEME_PATH, '--config', CONFIG_PATH])
      .it(
        `should create the build folder from the typescript configuration file`,
        () => {
          const exists = fileExists('');

          expect(exists).to.be.true;
        },
      );

    test
      .command(['build', THEME_PATH, '--config', CONFIG_JSON_PATH])
      .it(
        `should create the build folder from the json configuration file`,
        () => {
          const exists = fileExists('');

          expect(exists).to.be.true;
        },
      );
  });

  test
    .command(['build', THEME_PATH, '--build', BUILD_PATH])
    .it(`should create a file called default-variables.css`, () => {
      const exists = fileExists(`default-variables.css`);

      expect(exists).to.be.true;
    });

  test
    .command(['build', THEME_PATH, '--build', BUILD_PATH])
    .it(`should create a file called default-style.css`, () => {
      const exists = fileExists(`default-components.css`);

      expect(exists).to.be.true;
    });

  test
    .command(['build', THEME_PATH, '--build', BUILD_PATH])
    .it(`should create a file called classes.css`, () => {
      const exists = fileExists(`classes.css`);

      expect(exists).to.be.true;
    });

  test
    .command(['build', THEME_PATH, '--name', THEME_NAME, '--build', BUILD_PATH])
    .it(
      `should exist a scoped block with css variables inside the file "${paramCase(
        THEME_NAME,
      )}-variables.css"`,
      () => {
        const css = fs.readFileSync(
          path.join(BUILD_PATH, `${paramCase(THEME_NAME)}-variables.css`),
          {
            encoding: 'utf8',
          },
        );

        expect(css).to.contain(`data-morfeo-theme="${THEME_NAME}"`);
      },
    );

  describe('when no argument is passed', () => {
    beforeEach(() => {
      rmdir(BUILD_PATH);
    });

    test
      .stderr()
      .command(['build'])
      .catch(err => {
        expect(err.message).to.contain(
          'You need to specify the path to the theme',
        );
      })
      .it(
        `should fail if no theme is passed or there are no themes inside the configuration`,
      );

    test
      .command(['build', '--config', CONFIG_WITH_THEMES_PATH])
      .it(
        `should work if some theme is specified inside the configuration`,
        () => {
          const exists = fileExists('index.css');

          expect(exists).to.be.true;
        },
      );
  });
});
