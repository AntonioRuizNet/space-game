export const materiales = [
  { id: 1, rarity: 5, name: "Titanium", icon: `http://localhost:3010/images/materiales/1.jpeg` },
  { id: 2, rarity: 8, name: "Quantum", icon: `http://localhost:3010/images/materiales/2.jpeg` },
  { id: 3, rarity: 3, name: "Plasma", icon: `http://localhost:3010/images/materiales/3.jpeg` },
  { id: 4, rarity: 4, name: "Nanofiber", icon: `http://localhost:3010/images/materiales/4.jpeg` },
  { id: 5, rarity: 2, name: "Regolith", icon: `http://localhost:3010/images/materiales/5.jpeg` },
  { id: 6, rarity: 7, name: "Matter", icon: `http://localhost:3010/images/materiales/6.jpeg` },
  { id: 7, rarity: 4, name: "Mesh", icon: `http://localhost:3010/images/materiales/7.jpeg` },
  { id: 8, rarity: 1, name: "Hyperion", icon: `http://localhost:3010/images/materiales/8.jpeg` },
  { id: 9, rarity: 1, name: "Aether", icon: `http://localhost:3010/images/materiales/9.jpeg` },
  { id: 10, rarity: 5, name: "Diamond", icon: `http://localhost:3010/images/materiales/10.jpeg` },
  { id: 11, rarity: 3, name: "Nebula", icon: `http://localhost:3010/images/materiales/11.jpeg` },
  { id: 12, rarity: 6, name: "Mercury", icon: `http://localhost:3010/images/materiales/12.jpeg` },
  { id: 13, rarity: 8, name: "Conduit", icon: `http://localhost:3010/images/materiales/13.jpeg` },
  { id: 14, rarity: 4, name: "Exoplanet", icon: `http://localhost:3010/images/materiales/14.jpeg` },
  { id: 15, rarity: 3, name: "Steel", icon: `http://localhost:3010/images/materiales/15.jpeg` },
  { id: 16, rarity: 2, name: "Quasar", icon: `http://localhost:3010/images/materiales/16.jpeg` },
  { id: 17, rarity: 1, name: "Titanium", icon: `http://localhost:3010/images/materiales/17.jpeg` },
  { id: 18, rarity: 1, name: "Celestial", icon: `http://localhost:3010/images/materiales/18.jpeg` },
  { id: 19, rarity: 5, name: "Orionium", icon: `http://localhost:3010/images/materiales/19.jpeg` },
  { id: 20, rarity: 6, name: "Antimatter", icon: `http://localhost:3010/images/materiales/20.jpeg` },
  { id: 21, rarity: 3, name: "Lunar", icon: `http://localhost:3010/images/materiales/21.jpeg` },
  { id: 22, rarity: 2, name: "Plasma", icon: `http://localhost:3010/images/materiales/22.jpeg` },
  { id: 23, rarity: 4, name: "Quantum", icon: `http://localhost:3010/images/materiales/23.jpeg` },
  { id: 24, rarity: 7, name: "Crystal", icon: `http://localhost:3010/images/materiales/24.jpeg` },
  /*{ id: 25, rarity: 2, name: "StellarRadiance" },
  { id: 26, rarity: 5, name: "CosmicAlloy" },
  { id: 27, rarity: 1, name: "PhotonFiber" },
  { id: 28, rarity: 1, name: "AstralDiamond" },
  { id: 29, rarity: 6, name: "QuantumEssence" },
  { id: 30, rarity: 2, name: "StarForge" },
  { id: 31, rarity: 4, name: "DarkPlasma" },
  { id: 32, rarity: 3, name: "NebulaMesh" },
  { id: 33, rarity: 2, name: "SolarSpectra" },
  { id: 34, rarity: 5, name: "VoidAlloy" },
  { id: 35, rarity: 3, name: "GalacticDust" },
  { id: 36, rarity: 1, name: "AetheriumNexus" },
  { id: 37, rarity: 1, name: "QuasarDiamond" },
  { id: 38, rarity: 6, name: "PlasmaInferno" },
  { id: 39, rarity: 2, name: "CelestialForge" },
  { id: 40, rarity: 4, name: "StarDust" },*/
];

export function obtenerMaterialPorRareza() {
  // Ordena la lista de materiales en orden descendente por rareza
  const listaOrdenada = materiales.sort((a, b) => b.rarity - a.rarity);

  // Elige aleatoriamente un índice basado en la rareza
  const indiceElegido = Math.floor(Math.random() * listaOrdenada.length);

  // Devuelve el material correspondiente al índice elegido
  return listaOrdenada[indiceElegido];
}
