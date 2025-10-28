'use client';
import { Air } from "@/components/elements/air"
import { Earth } from "@/components/elements/earth"
import { Fire } from "@/components/elements/fire"
import { Water } from "@/components/elements/water"
import { HomeLink } from "@/components/homeLink"
import { Ouroboros } from "@/components/ouroboros"
import { ElementCard } from "@/components/elementCard"
import { useEffect, useState } from "react"
import results from "../../db/elem.json";


interface RecipeData {
  img: string;
  transmute: string;
};

type RecipesState = Record<string, RecipeData>;

const LOCAL_STORAGE_KEY = 'alchemiaUnlockedRecipes';

const BASE_RECIPES: RecipesState = {
  "water": { "img": "", "transmute": "" },
  "air": { "img": "", "transmute": "" },
  "fire": { "img": "", "transmute": "" },
  "earth": { "img": "", "transmute": "" }
};

const initializeRecipes = (): RecipesState => {
  if (typeof window === 'undefined') {
    // Servidor (SSR), retorna apenas a base
    return BASE_RECIPES; 
  }
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      return { ...BASE_RECIPES, ...JSON.parse(saved) };
    }
  } catch (error) {
    console.error("Erro ao carregar dados do LocalStorage:", error);
  }
  return BASE_RECIPES;
};

const GamePage = () => {
  const [allRecipes, setAllRecipes] = useState<RecipesState>(initializeRecipes);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const unlockedOnly = Object.keys(allRecipes).reduce<Record<string, { img?: string; transmute: string }>>((acc, key) => {
        if (!BASE_RECIPES.hasOwnProperty(key)) {
          acc[key] = (allRecipes as Record<string, { img?: string; transmute: string }>)[key];
        }
        return acc;
      }, {} as Record<string, { img?: string; transmute: string }>);
            
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(unlockedOnly));
      console.log("Receitas salvas localmente.");
    }
  }, [allRecipes]);

  const MAX_CAPACITY = 3;
  const MIN_TRANSMUTE = 2;
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelect = (newItem: string) => {
    setSelectedItems((prevItems) => {
      if(prevItems.length < MAX_CAPACITY){
        // console.log(`Item ${newItem} selecionado e adicionado`); 
        return [...prevItems, newItem];
      }
      return prevItems;
    });
    // console.log(selectedItems);
  };

  const handleRemove = (indexToRemove: number) => {
    setSelectedItems(prevItems => {
      const itemsBefore = prevItems.slice(0, indexToRemove);
        
      const itemsAfter = prevItems.slice(indexToRemove + 1);
        
      return [...itemsBefore, ...itemsAfter];
    });
  };

  const renderElement = (elementName: string) => {
    switch (elementName) {
      case 'water': return <Water />;
      case 'air': return <Air />;
      case 'fire': return <Fire />;
      case 'earth': return <Earth />;
      default: return <ElementCard elem={elementName} />;}
  };

  
  const find = (_file: Record<string, RecipeData>, combination: string) => {
    let resultElement: { img?: string; transmute: string; name: string; } | null = null;
    for (const [productName, productData] of Object.entries(_file)) {
      if (productData.transmute === combination) {
        resultElement = {
            name: productName,
            ...productData // Inclui img e transmute
        };
        break;
      }
    }
    return resultElement;
  }

  const transmute = () => {
    // console.log(selectedItems);
    const combination = selectedItems.sort().join(" + ");
    // console.log(`Combinação: ${combination}`);
    let resultElement = find(results, combination);
    if (
      resultElement &&
      typeof resultElement.name === "string" &&
      typeof resultElement.transmute === "string" &&
      !allRecipes.hasOwnProperty(resultElement.name)
    ) {
      const name = resultElement.name;
      const img = typeof resultElement.img === "string" ? resultElement.img : "";
      const trans = resultElement.transmute;
      console.log(name);
      setAllRecipes(prev => ({
        ...prev,
        [name]: {
          img: img,
          transmute: trans
        }
      }));
    }
    resultElement = null;
  }

  return (
    <main className="w-full h-full min-h-[100vh] relative">
      <div className="relative">
        <h1 className="uppercase font-black text-center text-[32px] py-3">alchemia</h1>
        <HomeLink />
      </div>
      <div className="w-full h-full flex flex-wrap gap-4">

        {Object.entries(allRecipes).map(([itemName, itemData]) => (

          <div
            key={itemName}
            onClick={() => handleSelect(itemName)}
            data-name={itemName} 
            className="border-foreground border-2 rounded-3xl w-[100px] h-[100px] cursor-pointer flex flex-col place-items-center p-2 transition-all duration-150 hover:scale-[1.03]"
          >
          {renderElement(itemName)} 
          <h2 className="uppercase text-sm">{itemName.charAt(0).toUpperCase() + itemName.slice(1)}</h2>
        </div>
      ))}
      </div>
      <div className="fixed flex items-center justify-evenly bottom-4 left-1/2 translate-x-[-50%] w-full max-w-[320px] h-[56px] rounded-xl border-2 border-foreground">
        {selectedItems.map((item, index) => (
          <div 
              key={index}
              onClick={() => handleRemove(index)} 
              className="flex justify-center items-center w-[48px] h-[48px] border-white border-2 rounded-full cursor-pointer bg-transparent"
          >
            {renderElement(item)}
          </div>
        ))}
        {Array(MAX_CAPACITY - selectedItems.length).fill(null).map((_, index) => (
            <div 
                key={`empty-${index}`} 
                className="flex justify-center items-center w-[48px] h-[48px] border-dashed border-gray-400 border-2 rounded-full bg-transparent"
            >
            </div>
        ))}
        <button 
          className={`flex justify-center items-center w-[48px] h-[48px] border-white border-2 bg-violet-600 cursor-pointer rounded-full ${selectedItems.length >= MIN_TRANSMUTE ? '' : 'disabled:cursor-default' }`}
          onClick={transmute}
          disabled={selectedItems.length < MIN_TRANSMUTE}
        >
          <Ouroboros size="32px"/>
        </button>
      </div>
    </main>
  )
}

export default GamePage