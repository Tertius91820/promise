function createVoltagePairs(cellsA, cellsB) {
  const pairs = [];

  for (let i = 0; i < cellsA.length; i++) {
    const cellA = cellsA[i];
    let bestMatchIndex = -1;
    let bestMatchDiff = Infinity;

    for (let j = 0; j < cellsB.length; j++) {
      const cellB = cellsB[j];
      const totalVoltage = cellA + cellB;
      const diff = Math.abs(totalVoltage - cellsA.reduce((a,b)=>a+b)/8);

      if (diff < bestMatchDiff) {
        bestMatchIndex = j;
        bestMatchDiff = diff;
      }
    }

    if (bestMatchIndex !== -1) {
      const cellB = cellsB.splice(bestMatchIndex, 1)[0];
      const totalVoltage = cellA + cellB;
      const averageVoltage = totalVoltage / 2;

      pairs.push(`Pair ${i + 1}: Cell ${i + 1}a (${cellA.toFixed(2)}), Cell ${bestMatchIndex + 1}b (${cellB.toFixed(2)}) - Total voltage ≈ ${averageVoltage.toFixed(2)}`);
    }
  }

  return pairs;
}

const cellsA = [3.00, 3.06, 2.89, 3.07, 3.18, 3.16, 3.17, 3.14, 3.08, 2.86, 3.17, 3.18, 3.16, 3.18, 3.12, 3.18];
const cellsB = [3.00, 3.06, 2.89, 3.07, 3.18, 3.16, 3.17, 3.14, 3.08, 2.86, 3.17, 3.18, 3.16, 3.18, 3.12, 3.18];

const pairs = createVoltagePairs(cellsA.slice(), cellsB.slice());
pairs.forEach(pair => {
  console.log(pair);
});
