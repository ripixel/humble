import * as fs from "fs";
import * as path from "path";

const findInDir = (startPath: string, filter: string): string[] => {
  if (!fs.existsSync(startPath)) {
    return [];
  }

  let foundFiles: string[] = [];
  const files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      foundFiles = [...foundFiles, ...findInDir(filename, filter)]; //recurse
    } else if (filename.indexOf(filter) >= 0) {
      foundFiles.push(filename);
    }
  }

  return foundFiles;
};

export default findInDir;
