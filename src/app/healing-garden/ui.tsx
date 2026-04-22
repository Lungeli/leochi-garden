"use client";

import { useEffect, useMemo, useState } from "react";

type ZoneKey = "mind" | "eye" | "nose" | "heart" | "lung" | "skin" | "stomach";

type Plant = {
  name: string;
  desc: string;
  borderColorVar: string;
};

type Zone = {
  key: ZoneKey;
  dotClass: string;
  dotTitle: string;
  label: { text: string; style: React.CSSProperties };
  icon: string;
  zoneLabel: string;
  heading: string;
  benefit: string;
  plants: Plant[];
  accentVar: string;
};

export function HealingGardenIsland(props: {
  borderByZone: Record<ZoneKey, string>;
}) {
  const zones = useMemo<Zone[]>(
    () => [
      {
        key: "mind",
        dotClass: "mind",
        dotTitle: "Brain & Mind",
        label: {
          text: "Mind",
          style: { top: "7%", left: "55%", color: "var(--dot-mind)" },
        },
        icon: "🧠",
        zoneLabel: "Zone — Brain & Mind",
        heading: "Clarity & Focus",
        benefit:
          '"These plants calm the nervous system and promote mental clarity through aromatic and adaptogenic compounds."',
        plants: [
          {
            name: "Lad's Love (Artemisia)",
            desc: "Herbal/sharp aroma used for mental clarity zones. Reduces mental fatigue.",
            borderColorVar: "var(--dot-mind)",
          },
          {
            name: "Tulsi (Ocimum tenuiflorum)",
            desc: "Globally recognized adaptogen for stress reduction and cognitive support.",
            borderColorVar: "var(--dot-mind)",
          },
          {
            name: "Coffee",
            desc: "Natural stimulant that enhances alertness and short-term focus.",
            borderColorVar: "var(--dot-mind)",
          },
          {
            name: "Dhupi (Juniperus sabina)",
            desc: "Phytoncides (airborne antimicrobial compounds) reduce cortisol and restore attention.",
            borderColorVar: "var(--dot-mind)",
          },
        ],
        accentVar: "var(--dot-mind)",
      },
      {
        key: "eye",
        dotClass: "eye",
        dotTitle: "Eyes & Vision",
        label: {
          text: "Vision",
          style: { top: "20%", left: "14%", color: "var(--dot-eye)" },
        },
        icon: "👁️",
        zoneLabel: "Zone — Eyes & Vision",
        heading: "Visual Restoration",
        benefit:
          '"Fractal geometry in plants reduces visual stress and triggers a deep calm known as \'fractal fluency\'."',
        plants: [
          {
            name: "Fishbone Fern",
            desc: "Linear recursion with high fractal dimension — creates a protective shelter feel.",
            borderColorVar: "var(--dot-eye)",
          },
          {
            name: "Agave (Elephant's Trunk)",
            desc: "Perfect Fibonacci spiral — serves as a visual anchor for the eye.",
            borderColorVar: "var(--dot-eye)",
          },
          {
            name: "Spider Plant / Snake Plant",
            desc: "Rhythm & pattern geometry. Used in NASA studies for visual calm.",
            borderColorVar: "var(--dot-eye)",
          },
          {
            name: "Amaryllis / Birds of Paradise",
            desc: "Striking biomorphic forms that trigger Visual Fascination response.",
            borderColorVar: "var(--dot-eye)",
          },
          {
            name: "Bougainvillea / Poinsettia",
            desc: "High-contrast color saturation provides stimulating visual contrast against green.",
            borderColorVar: "var(--dot-eye)",
          },
        ],
        accentVar: "var(--dot-eye)",
      },
      {
        key: "nose",
        dotClass: "nose",
        dotTitle: "Nose & Olfactory",
        label: {
          text: "Aroma",
          style: { top: "28%", left: "56%", color: "var(--dot-nose)" },
        },
        icon: "🌸",
        zoneLabel: "Zone — Nose & Olfactory",
        heading: "Sweet Aroma & Relief",
        benefit:
          '"Olfactory stimulation travels directly to the amygdala — making it the fastest way to trigger a relaxation response."',
        plants: [
          {
            name: "Rose",
            desc: "Classic floral. Known to lower heart rate and blood pressure via scent.",
            borderColorVar: "var(--dot-nose)",
          },
          {
            name: "Pink Jasmine / Garlic Vine",
            desc: 'Sweet/heavy scent. Best placed near entrances as a "scent-gate."',
            borderColorVar: "var(--dot-nose)",
          },
          {
            name: "Brugmansia (Angels Trumpet)",
            desc: "Nocturnal scent — provides sensory experience during evening hours.",
            borderColorVar: "var(--dot-nose)",
          },
          {
            name: "Dhupi (Juniperus sabina)",
            desc: "Woody/pine aroma high in phytoncides — airborne stress reducers.",
            borderColorVar: "var(--dot-nose)",
          },
          {
            name: "Chrysanthemum / Petunia",
            desc: "Soft floral — provides a gentle, continuous scent profile.",
            borderColorVar: "var(--dot-nose)",
          },
        ],
        accentVar: "var(--dot-nose)",
      },
      {
        key: "heart",
        dotClass: "heart",
        dotTitle: "Heart",
        label: {
          text: "Heart",
          style: { top: "47%", left: "5%", color: "var(--dot-heart)" },
        },
        icon: "❤️",
        zoneLabel: "Zone — Heart & Circulation",
        heading: "Cardiovascular Calm",
        benefit:
          '"Certain plant aromas reduce sympathetic nervous activity, measurably lowering heart rate and blood pressure within minutes."',
        plants: [
          {
            name: "Rose",
            desc: "Classic floral scent known to measurably lower heart rate and blood pressure.",
            borderColorVar: "var(--dot-heart)",
          },
          {
            name: "Salla (Pine) / Dhupi (Juniper)",
            desc: "Forest bathing (Shinrin-yoku) with these trees reduces cortisol and supports cardiac health.",
            borderColorVar: "var(--dot-heart)",
          },
          {
            name: "Amala (Gooseberry)",
            desc: "High Vitamin C content; Ayurvedic staple for cardiovascular support.",
            borderColorVar: "var(--dot-heart)",
          },
        ],
        accentVar: "var(--dot-heart)",
      },
      {
        key: "lung",
        dotClass: "lung",
        dotTitle: "Lungs & Air",
        label: {
          text: "Lungs",
          style: { top: "41%", left: "63%", color: "var(--dot-lung)" },
        },
        icon: "🫁",
        zoneLabel: "Zone — Lungs & Air Quality",
        heading: "Clean Air & Breathing",
        benefit:
          '"Trees and plants release phytoncides — volatile organic compounds that boost NK cells and reduce airborne pathogens when inhaled."',
        plants: [
          {
            name: "Spider Plant / Snake Plant",
            desc: "Used in NASA clean-air studies. Filters VOCs and improves indoor/outdoor air quality.",
            borderColorVar: "var(--dot-lung)",
          },
          {
            name: "Salla (Pine) / Dhupi (Juniper)",
            desc: "Essential for Shinrin-yoku forest bathing effect. Phytoncide-rich air strengthens immune response.",
            borderColorVar: "var(--dot-lung)",
          },
          {
            name: "Lichen / Epiphytes",
            desc: "Bioindicators of clean air. Their presence signals healthy atmospheric conditions.",
            borderColorVar: "var(--dot-lung)",
          },
        ],
        accentVar: "var(--dot-lung)",
      },
      {
        key: "skin",
        dotClass: "skin",
        dotTitle: "Paws & Skin",
        label: {
          text: "Skin",
          style: { top: "63%", left: "5%", color: "var(--dot-skin)" },
        },
        icon: "🌱",
        zoneLabel: "Zone — Skin & Topical",
        heading: "Soothing Touch",
        benefit:
          '"Direct-contact plant compounds provide anti-inflammatory and wound-healing benefits absorbed through the skin."',
        plants: [
          {
            name: "Aloe Vera",
            desc: "Renowned for skin healing, burn relief, and anti-inflammatory properties. Direct topical use.",
            borderColorVar: "var(--dot-skin)",
          },
          {
            name: "White Clover",
            desc: "Rich in isoflavones; traditionally used for skin health and mild anti-inflammatory effect.",
            borderColorVar: "var(--dot-skin)",
          },
          {
            name: "Kurilo (Asparagus)",
            desc: "Shatavari variety — adaptogenic, supports skin hydration and hormonal skin health.",
            borderColorVar: "var(--dot-skin)",
          },
        ],
        accentVar: "var(--dot-skin)",
      },
      {
        key: "stomach",
        dotClass: "stomach",
        dotTitle: "Stomach & Nutrition",
        label: {
          text: "Nutrition",
          style: { top: "71%", left: "55%", color: "var(--dot-stomach)" },
        },
        icon: "🍃",
        zoneLabel: "Zone — Gut & Nutrition",
        heading: "Food Forest Vitality",
        benefit:
          '"Chhauni\'s food forest provides nutritional diversity that supports gut health, immunity, and overall \'vitality scores\' per urban agriculture studies."',
        plants: [
          {
            name: "Major Fruits",
            desc: "Mango, Banana, Guava, Avocado, Litchi, Kiwi, Pear, Fig, Pomegranate — high vitality score in urban agriculture studies.",
            borderColorVar: "var(--dot-stomach)",
          },
          {
            name: "Amala (Gooseberry)",
            desc: "Staple in Ayurvedic salutogenesis. Exceptionally high Vitamin C; supports gut microbiome.",
            borderColorVar: "var(--dot-stomach)",
          },
          {
            name: "Jamun (Syzgium jambos)",
            desc: "Local high-nutrient fruit with antioxidant and blood sugar-regulating properties.",
            borderColorVar: "var(--dot-stomach)",
          },
          {
            name: "Citrus Variety",
            desc: 'Pumelo, Lime, Sour Orange — "dual-sensation" (taste + aroma) with Vitamin C and digestive enzymes.',
            borderColorVar: "var(--dot-stomach)",
          },
          {
            name: "Aloe Vera / Tulsi / Kurilo",
            desc: "Herbals and edibles providing adaptogenic and gut-soothing compounds.",
            borderColorVar: "var(--dot-stomach)",
          },
        ],
        accentVar: "var(--dot-stomach)",
      },
    ],
    [],
  );

  const [activeZone, setActiveZone] = useState<ZoneKey | null>(null);

  const active = useMemo(
    () => zones.find((z) => z.key === activeZone) ?? null,
    [zones, activeZone],
  );

  useEffect(() => {
    if (!activeZone) return;
    if (window.innerWidth >= 750) return;
    document.getElementById("panel-card")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [activeZone]);

  return (
    <main>
      <div className="character-section">
        <div className="hint">↓ touch a dot to explore</div>
        <div className="character-wrap">
          <img
            src="/leochi.webp"
            alt="Leochi, the snow leopard guardian of Chhauni Park"
          />

          {zones.map((z) => (
            <button
              key={z.key}
              type="button"
              className={`dot ${z.dotClass} ${activeZone === z.key ? "active" : ""}`}
              aria-label={z.dotTitle}
              title={z.dotTitle}
              onClick={() => setActiveZone(z.key)}
            />
          ))}

          {zones.map((z) => (
            <span key={`${z.key}-label`} className="dot-label" style={z.label.style}>
              {z.label.text}
            </span>
          ))}
        </div>

        <div className="legend">
          {zones.map((z) => (
            <div
              key={`${z.key}-legend`}
              className="legend-item"
              onClick={() => setActiveZone(z.key)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setActiveZone(z.key);
              }}
            >
              <div className="legend-dot" style={{ background: z.accentVar }} />
              {z.label.text}
            </div>
          ))}
        </div>
      </div>

      <aside className="info-panel">
        <div
          className="panel-card"
          id="panel-card"
          style={{
            borderColor: activeZone ? props.borderByZone[activeZone] : undefined,
          }}
        >
          {!active ? (
            <div className="panel-empty">
              <div className="icon">🌿</div>
              <p>
                Select a glowing dot on Leochi
                <br />
                to discover the healing plants
                <br />
                of Chhauni Park
              </p>
            </div>
          ) : (
            <div className="panel-content visible">
              <div className="zone-icon">{active.icon}</div>
              <div className="zone-label" style={{ color: active.accentVar }}>
                {active.zoneLabel}
              </div>
              <h2>{active.heading}</h2>
              <div className="benefit">{active.benefit}</div>
              <div className="divider" />
              <div className="plants-label">Plants Found in Chhauni</div>
              <div className="plants-grid">
                {active.plants.map((p) => (
                  <div
                    key={p.name}
                    className="plant-tag"
                    style={{ borderColor: p.borderColorVar }}
                  >
                    <div className="plant-name">{p.name}</div>
                    <div className="plant-desc">{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
    </main>
  );
}

