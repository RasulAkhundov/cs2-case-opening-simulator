'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import './caseOpening.scss';
import { getDropChance } from '@/utils/getDropChance';

export default function CaseOpening({ skins, rareItem }) {
   const [rolling, setRolling] = useState(false);
   const [selected, setSelected] = useState(null);
   const [displaySkins, setDisplaySkins] = useState([]);
   const reelRef = useRef(null);

   console.log(displaySkins)

   const countSkinsByRarity = (skins) => {
      const counts = {};
      skins.forEach((skin) => {
         const rarity = skin.rarity?.name;
         if (!rarity) return;
         counts[rarity] = (counts[rarity] || 0) + 1;
      });
      console.log(counts)
      return counts;
   };

   const attachDropChances = (skins) => {
      const counts = countSkinsByRarity(skins);
      return skins.map((skin) => {
         const rarity = skin.rarity?.name;
         const total = counts[rarity];
         const dropChance = parseFloat(getDropChance(rarity, total));
         return {
            ...skin,
            dropChance: isNaN(dropChance) ? 50 : dropChance, // fallback
         };
      });
   };

   const generateWeightedSkins = (allSkins, rareItems = [], totalCount = 39) => {
      const all = [...allSkins, ...rareItems];
      const counts = countSkinsByRarity(all);
      const skinsWithChances = attachDropChances(all);

      const weightedPool = [];

      skinsWithChances.forEach((skin) => {
         const weight = parseFloat(skin.dropChance);
         const entries = Math.floor(weight * 100);
         for (let i = 0; i < entries; i++) {
            weightedPool.push(skin);
         }
      });

      const selected = [];
      for (let i = 0; i < totalCount; i++) {
         const randomIndex = Math.floor(Math.random() * weightedPool.length);
         selected.push(weightedPool[randomIndex]);
      }

      for (let i = selected.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [selected[i], selected[j]] = [selected[j], selected[i]];
      }

      return selected;
   };

   const getRandomNumberForTransform = () => {
      const randomNumber = Math.floor(Math.random() * (5800 - 5680 + 1)) + 5680;
      return randomNumber;
   }

   // Roll function
   const roll = () => {
      if (rolling) return;
      setRolling(true);

      const reel = reelRef.current;
      reel.style.transform = `translateX(0)`;
      reel.style.transition = 'transform 0s';

      const allSkins = attachDropChances([...skins]);
      const rareSkins = attachDropChances([...rareItem]);

      const selectedItems = generateWeightedSkins(allSkins, rareSkins, 39);
      setDisplaySkins(selectedItems);

      reel.style.transition = 'transform 3.5s ease-out';
      reel.style.transform = `translateX(-${getRandomNumberForTransform()}px)`; // 👈 tam 19. kart ortalanıyor

      setTimeout(() => {
         setRolling(false);
         setSelected(selectedItems[32]);
         reel.style.transform = `translateX(0)`;
         reel.style.transition = 'transform 0s';
      }, 3700);
   };

   useEffect(() => {
      if (skins?.length > 0) {
         roll();
      }
   }, [skins]);

   const getTypeAndNameOfSkin = (name, index) => {
      if (!name) return '';
      return name.split(" | ")[index] || '';
   };

   return (
      <div className="case-opening__wrapper">
         <div className="reel-container">
            <div className="reel" ref={reelRef}>
               {displaySkins.map((skin, index) => (
                  <div className="skin-card" id={`skin__${index + 1}`} key={index}>
                     <div className="skin-image__wrapper">
                        <Image
                           src={skin.image}
                           alt={skin.name || 'Unknown Skin'}
                           width={200}
                           height={200}
                           quality={100}
                           draggable={false}
                        />
                     </div>

                     <div className="skin__info">
                        <h3 className="font skin__type">{getTypeAndNameOfSkin(skin.name, 0)}</h3>
                        <span className="font skin__name">{getTypeAndNameOfSkin(skin.name, 1)}</span>
                     </div>

                     <div className="skin__rarity">
                        <div className="line" style={{ background: skin.rarity?.color || '#ccc' }}></div>
                     </div>
                  </div>
               ))}
            </div>
            <div className="pointer" />
         </div>

         {selected && (
            <div className="font result">
               Previous Skin: <strong style={{ borderBottom: `2px solid ${selected.rarity.color}` }}>{selected.name}</strong>
            </div>
         )}

         <button onClick={roll} disabled={rolling} className='font'>
            {rolling ? 'Opening...' : 'Open Again'}
         </button>
      </div>
   );
}