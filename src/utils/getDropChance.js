export function getDropChance(rarity, totalOfThisRarity) {
  const rarityChances = {
    "Consumer Grade": 79.92,
    "Industrial Grade": 15.98,
    "Mil-Spec Grade": 79.92,
    "Restricted": 15.98,
    "Classified": 3.2,
    "Covert": 0.64,
    "Rare Special Item": 0.26,
  };

  const baseChance = rarityChances[rarity];
  if (!baseChance || !totalOfThisRarity) return null;

  const chancePerSkin = baseChance / totalOfThisRarity;
  return chancePerSkin.toFixed(3); // % olarak
}