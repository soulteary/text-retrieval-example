const { join } = require("path");
const { readdirSync, existsSync, mkdirSync, readFileSync, writeFileSync } = require("fs");

const baseDir = "./data";
const rawDir = join(baseDir, "RenMin_Daily");
const outputDir = join(baseDir, "output");

if (!existsSync(outputDir)) mkdirSync(outputDir);

const rawFiles = readdirSync("./data/RenMin_Daily").filter((file) => file.endsWith(".txt"));

let buffer = [];
let concatID = 1;
rawFiles.forEach((file, fileNo) => {
  const lines = readFileSync(join(rawDir, file), "utf-8")
    .split("\n")
    .map((line) => line.replace(/。/g, "。\n").split("\n"))
    .flat()
    .join("\n")
    .replace(/“([\S]+?)”/g, (match) => match.replace(/\n/g, ""))
    .replace(/“([\S\r\n]+?)”/g, (match) => match.replace(/[\r\n]/g, ""))
    .split("\n")
    .map((line) => line.replace(/s/g, "").trim().replace(/s/g, "—"))
    .filter((line) => line);

  buffer = buffer.concat(lines);
  if (buffer.length > 100000) {
    writeFileSync(join(outputDir, `${concatID}.txt`), buffer.slice(0, 100000).join("\n"), "utf8");
    buffer = buffer.slice(100000);
    console.log("存钱罐满啦，换一罐继续存 :D");
    concatID = concatID + 1;
  }
  if (fileNo === rawFiles.length - 1) {
    writeFileSync(join(outputDir, `${concatID}.txt`), buffer.join("\n"), "utf8");
    console.log("所有数据都存储完毕了");
  }
});