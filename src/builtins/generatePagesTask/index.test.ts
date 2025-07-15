import { generatePagesTask, GeneratePagesConfig } from './index';
import * as fs from 'fs-extra';
import path from 'path';
import type { TaskContext } from '../../types';

describe('generatePagesTask', () => {
  const testOutDir = path.join(__dirname, 'testAssets', 'out');
  const pagesDir = path.join(__dirname, 'testAssets', 'pages');
  const partialsDir = path.join(__dirname, 'testAssets', 'partials');

  const ctx: TaskContext = {
    debug: false,
    globals: {},
    logger: { warn: jest.fn(), debug: jest.fn(), error: jest.fn(), info: jest.fn() },
  };

  beforeAll(async () => {
    await fs.remove(testOutDir);
    await fs.ensureDir(testOutDir);
  });

  afterAll(async () => {
    await fs.remove(testOutDir);
  });

  it('generates correct HTML for static pages (default config)', async () => {
    const config: GeneratePagesConfig = {
      pagesDir,
      partialsDir,
      outDir: testOutDir,
    };
    const task = generatePagesTask(config);
    await task.run(config, ctx);
    // Check that output HTML matches expected output for each page
    const pageFiles = await fs.readdir(pagesDir);
    for (const file of pageFiles) {
      if (file.endsWith('.html')) {
        const outPath = path.join(testOutDir, file);
        const expectedPath = path.join(__dirname, 'testAssets', 'expected', file);
        expect(await fs.pathExists(outPath)).toBe(true);
        expect(await fs.pathExists(expectedPath)).toBe(true);
        const actual = (await fs.readFile(outPath, 'utf8')).replace(/\r\n/g, '\n');
        const expected = (await fs.readFile(expectedPath, 'utf8')).replace(/\r\n/g, '\n');
        // Normalize by removing all whitespace for comparison
        const normalize = (str: string) => str.replace(/\s+/g, '');
        expect(normalize(actual)).toBe(normalize(expected));
      }
    }
  });

  // Additional tests for custom config, error handling, etc. can be added here
});
