import "./plant-map.css";
import { PlantMapIsland } from "./ui";

export function PlantMapPage() {
  return (
    <div className="page">
      <div id="hdr">
        <span style={{ fontSize: 22 }}>🌿</span>
        <div>
          <h1>Chhauni Plant Map</h1>
          <p>Kathmandu · Living Collection</p>
        </div>
        <a
          href="/healing-garden"
          style={{
            marginLeft: "auto",
            fontSize: ".73rem",
            color: "var(--goldf)",
            background: "rgba(0,0,0,.25)",
            padding: "6px 14px",
            borderRadius: 999,
            border: "1px solid var(--gold)",
            letterSpacing: ".06em",
            textTransform: "uppercase",
            textDecoration: "none",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          🌿 Healing Garden
        </a>
      </div>

      <PlantMapIsland />
    </div>
  );
}

