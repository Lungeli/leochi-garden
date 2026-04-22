import "./healing-garden.css";
import { HealingGardenIsland } from "./ui";

type ZoneKey = "mind" | "eye" | "nose" | "heart" | "lung" | "skin" | "stomach";

const ZONE_BORDER: Record<ZoneKey, string> = {
  mind: "#a78bfa",
  eye: "#38bdf8",
  nose: "#f472b6",
  heart: "#f87171",
  lung: "#67e8f9",
  skin: "#fbbf24",
  stomach: "#86efac",
};

export default function HealingGardenPage() {
  return (
    <div className="page">
      <header>
        <div className="eyebrow">Chhauni Park · Kathmandu, Nepal</div>
        <h1>
          Leochi&apos;s <em>Healing Garden</em>
        </h1>
        <p>
          Explore how the plants of Chhauni Park benefit different systems of the
          body. Click the glowing dots to discover each zone.
        </p>
      </header>

      <HealingGardenClient />

      <footer>
        Plant inventory &amp; GIS mapping by Circle · Agriculture &amp; Forestry
        University · Chhauni, Kathmandu
        <br />
        Designed as part of Omorenda internship — Chhauni Park Salutogenic Garden
        Project
      </footer>
    </div>
  );
}

function HealingGardenClient() {
  return <HealingGardenIsland borderByZone={ZONE_BORDER} />;
}

