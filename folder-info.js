import { cwd, argv } from 'process';
import { resolve, basename } from 'path';
import { readdir } from 'fs/promises';

async function main() {
  // Если пользователь передал путь — берём его, иначе — текущая папка
  const inputPath = argv[2];
  const targetPath = resolve(inputPath ?? cwd());

  try {
    // Читаем содержимое папки
    const entries = await readdir(targetPath, { withFileTypes: true });

    let filesCount = 0;
    let foldersCount = 0;

    for (const entry of entries) {
      if (entry.isFile()) filesCount++;
      else if (entry.isDirectory()) foldersCount++;
    }

    const folderName = basename(targetPath);

    console.log(`Folder: ${folderName}`);
    console.log(`Path: ${targetPath}`);
    console.log(`Files: ${filesCount}`);
    console.log(`Folders: ${foldersCount}`);
  } catch (err) {
    process.stderr.write(`error: could not read folder: ${inputPath ?? cwd()}\n`);
    process.exit(1);
  }
}

main();
