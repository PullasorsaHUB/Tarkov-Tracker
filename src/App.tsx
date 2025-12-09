import { AmmoTable } from './AmmoTable';
import { useState } from 'react'
import './App.css'

type SortKey = "damage" | "penetration" | null;
type SortDirection = "ASC" | "DESC";

type Ammo = {
  name: string;
  caliber: string;
  penetration: number;
  damage: number;
}

const ammoList: Ammo[] = [
  { name: "5.45x39mm PP gs", caliber: "5.45x39mm", damage: 51, penetration: 34 },
  { name: "7.62x39mm BP gzh", caliber: "7.62x39mm", damage: 58, penetration: 47 },
  { name: "6.8x51mm SIG Hybrid", caliber: "6.8x51mm", damage: 72, penetration: 47}
];

function sortAmmo(list: Ammo[], sortKey: SortKey, sortDirection: SortDirection): Ammo[] {
  if(!sortKey) return list;

  const copy = [...list];

  copy.sort((a,b) =>{
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if(aValue < bValue)
    {
      return sortDirection === "ASC" ? -1 : 1;
    }
    if(aValue > bValue)
    {
      return sortDirection === "ASC" ? 1 : -1;
    }
    return 0; // jos samat
  });
  return copy;
}

function App() {
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("ASC");
  const [search, setSearch] = useState("");
  const [selectedCaliber, setSelectedCaliber] = useState<string>("");
  
  const filteredAmmo = ammoList.filter(ammo => {
    const matchesName = ammo.name.toLowerCase().includes(search.toLowerCase());
    const matchescaliber = selectedCaliber === "" || ammo.caliber === selectedCaliber;
    return matchesName && matchescaliber;
  })
  const calibers = Array.from(new Set(ammoList.map(ammo => ammo.caliber)));
  
  return (
    <>
      <div>
        <div>
            <h1>Escape From Tarkov - Tracker</h1>
        </div>
        <input
          placeholder="Search Ammo"
          value={search}
          onChange={ e => setSearch(e.target.value)}
        />
        <select
          value={selectedCaliber}
          onChange={ e => setSelectedCaliber(e.target.value)}
        >
          <option value="">All calibers</option>{/* "" = ei rajata kaliperia */}
          {calibers.map(caliber => (
            <option key={caliber} value={caliber}>
              {caliber}
            </option>
          ))}
        </select>

        <AmmoTable ammoList={filteredAmmo} />
      </div>
    </>
  );
}

export default App
