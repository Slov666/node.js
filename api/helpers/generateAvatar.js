const AvatarGenerator = require("avatar-generator");
const path = require("path");
const { promises: fsPromises } = require("fs");

async function generateAvatar(email) {
  const avatar = new AvatarGenerator({
    parts: ["background", "face", "clothes", "head", "hair", "eye", "mouth"],
    imageExtension: ".png",
  });
  const variant = "male";
  const image = await avatar.generate(email, variant);
  const filename = `${Date.now()}.png`;
  const pathFile = path.join("tmp", filename);

  await image.png().toFile(pathFile);

  const destPath = path.join("public", "images", filename);
  await fsPromises.copyFile(pathFile, destPath);
  await fsPromises.unlink(pathFile);

  return pathFile;
}

module.exports = generateAvatar;
