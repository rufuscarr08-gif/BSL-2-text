import fs from "node:fs";
import path from "node:path";

const [, , inputCsv, outputJson, perLetterArg = "18"] = process.argv;
const perLetter = Number(perLetterArg);

if (!inputCsv || !outputJson || !Number.isFinite(perLetter) || perLetter < 1) {
  console.error("Usage: node scripts/build-baseline-training.mjs <two_hand_dataset.csv> <output.json> [samples-per-letter]");
  process.exit(1);
}

const dynamicLetters = new Set(["H", "J", "Y"]);
const rows = fs.readFileSync(inputCsv, "utf8").trim().split(/\r?\n/);
const output = {};

for (const row of rows) {
  const parts = row.split(",");
  const label = parts.pop()?.trim() || "";
  const letter = label[0]?.toUpperCase();
  if (!letter || dynamicLetters.has(letter)) continue;
  if ((output[letter]?.length || 0) >= perLetter) continue;

  const values = parts.map(Number);
  if (values.length !== 126 || values.some((value) => !Number.isFinite(value))) continue;

  const hands = [0, 1].map((handIndex) => {
    const offset = handIndex * 63;
    const points = [];
    for (let index = 0; index < 21; index += 1) {
      const base = offset + index * 3;
      points.push({ x: values[base], y: values[base + 1], z: values[base + 2] });
    }
    return { points, wristX: points[0].x };
  }).sort((a, b) => a.wristX - b.wristX);

  output[letter] = output[letter] || [];
  output[letter].push(makeVector(hands));
}

fs.mkdirSync(path.dirname(outputJson), { recursive: true });
fs.writeFileSync(outputJson, `${JSON.stringify({
  source: "datMaul/BSL_Numbers_and_Alphabet_Recognition two_hand_dataset.csv",
  sourceUrl: "https://github.com/datMaul/BSL_Numbers_and_Alphabet_Recognition",
  notes: "Compact baseline generated from the public companion repo for the Kaggle BSL Numbers & Alphabet Hand Position For MediaPipe dataset. H, J, and Y are not present in the source dataset.",
  generatedAt: new Date().toISOString(),
  samplesPerLetter: perLetter,
  training: output
}, null, 2)}\n`);

function makeVector(hands) {
  const flat = [];
  const handScale = hands
    .slice(0, 2)
    .reduce((total, hand) => total + (distance(hand.points[0], hand.points[9]) || 1), 0) / 2;

  hands.slice(0, 2).forEach((hand) => {
    const origin = hand.points[0];
    const scale = distance(hand.points[0], hand.points[9]) || 1;
    hand.points.forEach((point) => {
      flat.push((point.x - origin.x) / scale);
      flat.push((point.y - origin.y) / scale);
      flat.push((point.z - origin.z) / scale);
    });
  });

  const leftWrist = hands[0].points[0];
  const rightWrist = hands[1].points[0];
  const span = distance(leftWrist, rightWrist) || 1;
  flat.push((rightWrist.x - leftWrist.x) / span);
  flat.push((rightWrist.y - leftWrist.y) / span);
  flat.push(span);
  flat.push(...contactFeatures(hands[0].points, hands[1].points, handScale));
  return flat;
}

function contactFeatures(a, b, scale) {
  const indices = [4, 8, 12, 16, 20];
  const features = [];
  indices.forEach((i) => {
    indices.forEach((j) => {
      features.push(distance(a[i], b[j]) / (scale || 1));
    });
  });
  return features;
}

function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = (a.z || 0) - (b.z || 0);
  return Math.hypot(dx, dy, dz);
}
