#!/usr/bin/env node

/**
 * Image grading and export script
 * - Applies a consistent boutique grade: warm tone, 5–8% fade, slight lifted shadows
 * - Exports WebP at 1.5x current pixel width (or a provided display width)
 *
 * Usage:
 *   node scripts/process-images.js [--input <dir>] [--output <dir>] [--quality <q>] [--displayWidth <px>]
 *
 * Defaults:
 *   input = public/images/source
 *   output = public/images/optimized
 *   quality = 80
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const key = argv[i];
    if (key.startsWith('--')) {
      const name = key.slice(2);
      const value = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
      args[name] = value;
    }
  }
  return args;
}

const args = parseArgs(process.argv);

const inputDir = path.resolve(__dirname, '..', 'public', 'images', 'source');
const outputDir = path.resolve(__dirname, '..', 'public', 'images', 'optimized');

const userInputDir = args.input ? path.resolve(process.cwd(), args.input) : inputDir;
const userOutputDir = args.output ? path.resolve(process.cwd(), args.output) : outputDir;
const quality = args.quality ? parseInt(args.quality, 10) : 80;
const displayWidthOverride = args.displayWidth ? parseInt(args.displayWidth, 10) : null;

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

function isImageFile(file) {
  return /(\.jpe?g|\.png|\.webp)$/i.test(file);
}

function outputName15x(file) {
  const parsed = path.parse(file);
  return path.join(parsed.dir, `${parsed.name}@1.5x.webp`);
}

async function gradeAndExport(inputPath, outputPath, targetWidth) {
  const warmOverlay = {
    r: 255, // warm tint
    g: 200,
    b: 150,
    alpha: 0.06 // subtle warm overlay (~6%)
  };

  const image = sharp(inputPath, { limitInputPixels: false });
  const metadata = await image.metadata();
  const baseWidth = metadata.width || targetWidth || 1600;
  const width15x = targetWidth || Math.round(baseWidth * 1.5);

  // Boutique grade:
  // - slight saturation reduction for 5–8% fade
  // - small gamma lift to open shadows
  // - warm overlay via soft-light style composite
  // - export to WebP
  const graded = sharp(inputPath)
    .resize({ width: width15x, withoutEnlargement: false })
    .modulate({ saturation: 0.94, brightness: 1.0, hue: -4 })
    .gamma(0.95)
    .composite([
      {
        input: {
          create: {
            width: 2,
            height: 2,
            channels: 4,
            background: {
              r: warmOverlay.r,
              g: warmOverlay.g,
              b: warmOverlay.b,
              alpha: Math.max(0, Math.min(1, warmOverlay.alpha))
            }
          }
        },
        tile: true,
        blend: 'soft-light'
      }
    ])
    .webp({ quality, effort: 4 });

  await graded.toFile(outputPath);
}

async function main() {
  console.log('🎨 Applying boutique image grade and exporting WebP @1.5x');
  await ensureDir(userOutputDir);

  let files = [];
  try {
    const all = await fs.promises.readdir(userInputDir);
    files = all.filter(isImageFile);
  } catch (err) {
    console.error(`❌ Input directory not found: ${userInputDir}`);
    console.error('Create it and place source images there, or pass --input <dir>');
    process.exit(1);
  }

  if (files.length === 0) {
    console.log('ℹ️ No images found to process.');
    return;
  }

  for (const file of files) {
    const inPath = path.join(userInputDir, file);
    const outPath = path.join(userOutputDir, outputName15x(file));
    try {
      const targetWidth = displayWidthOverride ? Math.round(displayWidthOverride * 1.5) : undefined;
      await gradeAndExport(inPath, outPath, targetWidth);
      console.log(`✅ Processed ${file} → ${path.basename(outPath)} (q=${quality})`);
    } catch (err) {
      console.error(`⚠️ Failed processing ${file}:`, err.message);
    }
  }

  console.log('✨ Done. Keep the grade consistent across all photography for a boutique feel.');
}

main().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});


