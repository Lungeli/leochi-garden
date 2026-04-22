"use client";

import "leaflet/dist/leaflet.css";

import { useEffect, useMemo, useRef, useState } from "react";

type LeafletNS = typeof import("leaflet");
type LeafletMap = import("leaflet").Map;
type LeafletMarker = import("leaflet").Marker;
type DivIcon = import("leaflet").DivIcon;

type PlantRow = {
  name: string;
  lat: number;
  lng: number;
  photo?: string;
  desc?: string;
  uses?: string;
};

type CatKey =
  | "fruits"
  | "medicinal"
  | "aromatic"
  | "flowering"
  | "nonflow"
  | "trees"
  | "lichen"
  | "nfixing";

const CAT_META: Record<
  CatKey,
  { label: string; color: string; cssVar: string; icon: string; iconUrl: string }
> = {
  fruits: {
    label: "Fruits & Edible",
    color: "#ff8f00",
    cssVar: "var(--cat-fruits)",
    icon: "🍎",
    iconUrl: "/fruits_and_edible.svg",
  },
  medicinal: {
    label: "Medicinal",
    color: "#ef4444",
    cssVar: "var(--cat-medicinal)",
    icon: "🌿",
    iconUrl: "/medicinal.svg",
  },
  aromatic: {
    label: "Aromatic",
    color: "#ab47bc",
    cssVar: "var(--cat-aromatic)",
    icon: "🌸",
    iconUrl: "/aromatic.svg",
  },
  flowering: {
    label: "Flowering",
    color: "#fbbf24",
    cssVar: "var(--cat-flowering)",
    icon: "🌺",
    iconUrl: "/flowering.svg",
  },
  nonflow: {
    label: "Non-Flowering",
    color: "#5c9ae6",
    cssVar: "var(--cat-nonflow)",
    icon: "🌵",
    iconUrl: "/non-flowering.svg",
  },
  trees: {
    label: "Trees",
    color: "#b7791f",
    cssVar: "var(--cat-trees)",
    icon: "🌳",
    iconUrl: "/trees.svg",
  },
  lichen: {
    label: "Lichen",
    color: "#22c55e",
    cssVar: "var(--cat-lichen)",
    icon: "🍄",
    iconUrl: "/lichen.svg",
  },
  nfixing: {
    label: "N-Fixing",
    color: "#86efac",
    cssVar: "var(--cat-nfixing)",
    icon: "🌱",
    iconUrl: "/n-fixing.svg",
  },
};

const FRUITS_KW = [
  "aaru",
  "amala",
  "avocado",
  "banana",
  "bhogate",
  "cherry plum",
  "citrus aurant",
  "coffee",
  "custard apple",
  "fig",
  "grapes",
  "guava",
  "japanese persimmon",
  "kiwi",
  "litchi",
  "loquat",
  "mango",
  "paradise apple",
  "pear",
  "pomegranate",
  "prickly pear",
  "pumelo",
  "sour orange",
  "strawberry guava",
  "jamun",
];
const MEDICINAL_KW = ["aloe", "kurilo", "tulsi"];
const AROMATIC_KW = ["garlic vine", "angel", "lad's love", "pink jasmine", "rose"];
const FLOWERING_KW = [
  "amaryllis",
  "bird of paradise",
  "bougainvillea",
  "calla lily",
  "chrysanthemum",
  "duranta",
  "garden pansy",
  "glebionis",
  "hibiscus",
  "hydrangea",
  "impatiens",
  "nerium",
  "petunia",
  "poinsettia",
  "primrose jasmine",
  "rhododendron",
  "yellow flax",
  "vanda orchid",
];
const NONFLOW_KW = [
  "agave",
  "chinese taro",
  "chinese dubo",
  "dhupi",
  "juniperus",
  "jade plant",
  "pyrrosia",
  "fishbone fern",
  "mondo grass",
  "mother-of-pearl",
  "snake plant",
  "spider plant",
  "phyrnium",
  "palm grass",
  "never never",
  "ficus retusa",
];
const TREES_KW = ["bottle brush", "silky oak", "swami", "salla", "pine"];
const LICHEN_KW = ["lichen"];
const NFIXING_KW = ["white clover"];

function getCat(name: string): CatKey {
  const n = name.toLowerCase();
  if (LICHEN_KW.some((k) => n.includes(k))) return "lichen";
  if (NFIXING_KW.some((k) => n.includes(k))) return "nfixing";
  if (FRUITS_KW.some((k) => n.includes(k))) return "fruits";
  if (MEDICINAL_KW.some((k) => n.includes(k))) return "medicinal";
  if (AROMATIC_KW.some((k) => n.includes(k))) return "aromatic";
  if (FLOWERING_KW.some((k) => n.includes(k))) return "flowering";
  if (NONFLOW_KW.some((k) => n.includes(k))) return "nonflow";
  if (TREES_KW.some((k) => n.includes(k))) return "trees";
  return "flowering";
}

const GARDEN_OUTLINE: [number, number][] = [
  [27.70519, 85.29769],
  [27.70514, 85.29793],
  [27.70500, 85.29801],
  [27.70473, 85.29810],
  [27.70455, 85.29804],
  [27.70444, 85.29777],
  [27.70443, 85.29758],
  [27.70447, 85.29747],
  [27.70460, 85.29740],
  [27.70484, 85.29743],
  [27.70498, 85.29750],
];

type MarkerEntry = {
  marker: LeafletMarker;
  plant: PlantRow;
  cat: CatKey;
  icon: DivIcon;
};

function esc(s: unknown) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildCardHTML(p: PlantRow, cat: CatKey) {
  const meta = CAT_META[cat];
  const icon = meta.icon || "🌿";

  const desc = p.desc ? esc(p.desc).replace(/\n/g, "<br>") : '<em style="opacity:.5">No description</em>';
  const uses = p.uses
    ? esc(p.uses).replace(/\?/g, "•").replace(/\n/g, "<br>")
    : '<em style="opacity:.5">No data</em>';
  const gps = `${p.lat.toFixed(5)}, ${p.lng.toFixed(5)}`;
  const uid = "pc" + ((Math.random() * 1e9) | 0);

  return `<div class="pc" id="${uid}">
  <div class="pc-track" id="${uid}-track">
    <div class="pc-slide">
      <div class="pc-icon">${icon}</div>
      <div class="pc-name">${esc(p.name)}</div>
      <span class="pc-badge" style="background:${meta.color}">${meta.label}</span>
      <div class="pc-gps">📍 ${gps}</div>
    </div>
    <div class="pc-slide">
      <div class="pc-stitle">About</div>
      <div class="pc-text">${desc}</div>
    </div>
    <div class="pc-slide">
      <div class="pc-stitle">Uses</div>
      <div class="pc-text">${uses}</div>
    </div>
  </div>
  <div class="pc-nav">
    <button class="pc-arr" id="${uid}-prev" onclick="pcNav('${uid}',-1)" disabled>‹</button>
    <div class="pc-dots">
      <span class="pc-dot on"  onclick="pcGo('${uid}',0)"></span>
      <span class="pc-dot"     onclick="pcGo('${uid}',1)"></span>
      <span class="pc-dot"     onclick="pcGo('${uid}',2)"></span>
    </div>
    <button class="pc-arr" id="${uid}-next" onclick="pcNav('${uid}',1)">›</button>
  </div>
</div>`;
}

function ensurePopupNavGlobals() {
  if (typeof window === "undefined") return;
  if ((window as any).__pcNavInstalled) return;
  (window as any).__pcNavInstalled = true;

  (window as any).pcGo = (uid: string, idx: number) => {
    const track = document.getElementById(uid + "-track") as HTMLElement | null;
    if (!track) return;
    track.style.transform = `translateX(-${idx * 192}px)`;
    track
      .closest(".pc")
      ?.querySelectorAll(".pc-dot")
      .forEach((d, i) => d.classList.toggle("on", i === idx));
    const prev = document.getElementById(uid + "-prev") as HTMLButtonElement | null;
    const next = document.getElementById(uid + "-next") as HTMLButtonElement | null;
    if (prev) prev.disabled = idx === 0;
    if (next) next.disabled = idx === 2;
  };

  (window as any).pcNav = (uid: string, dir: number) => {
    const track = document.getElementById(uid + "-track") as HTMLElement | null;
    if (!track) return;
    const raw = track.style.transform || "translateX(0px)";
    const cur = Math.round(-parseFloat(raw.replace("translateX(", "").replace("px)", "") || "0") / 192);
    (window as any).pcGo(uid, Math.max(0, Math.min(2, cur + dir)));
  };
}

export function PlantMapIsland() {
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRegistryRef = useRef<MarkerEntry[]>([]);
  const leafletRef = useRef<LeafletNS | null>(null);

  const [plants, setPlants] = useState<PlantRow[] | null>(null);
  const [activeCats, setActiveCats] = useState<Set<CatKey>>(() => new Set(Object.keys(CAT_META) as CatKey[]));
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const isCatActive = (cat: CatKey) => activeCats.size === 0 || activeCats.has(cat);

  const matches = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term || !plants) return [];
    return plants
      .map((p) => ({ p, cat: getCat(p.name) }))
      .filter(({ p, cat }) => p.name.toLowerCase().includes(term) && isCatActive(cat));
  }, [query, plants, activeCats]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const r = await fetch("/plants.json", { cache: "force-cache" });
      const data = (await r.json()) as PlantRow[];
      if (cancelled) return;
      setPlants(data);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    ensurePopupNavGlobals();
  }, []);

  useEffect(() => {
    if (!plants) return;
    if (mapRef.current) return;

    let cancelled = false;
    (async () => {
      const Leaflet = await import("leaflet");
      if (cancelled) return;
      leafletRef.current = Leaflet;

      const map = Leaflet.map("map", { zoomControl: true }).setView(
        [27.7045, 85.2976],
        19,
      );
      mapRef.current = map;

      Leaflet.tileLayer("https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
      maxZoom: 22,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
      attribution: "© Google",
      }).addTo(map);

      Leaflet.polygon(GARDEN_OUTLINE, {
        color: "#c9a84c",
        weight: 2.5,
        opacity: 0.9,
        fillColor: "#5a7a44",
        fillOpacity: 0.08,
        dashArray: "6 4",
        lineJoin: "round",
      })
        .addTo(map)
        .bindTooltip(
          `<span style="font-family: ui-serif, Georgia, serif;font-size:.85rem;color:#3d5a2e">🌿 Chhauni Tree House Garden</span>`,
          { permanent: true, direction: "center", className: "garden-label" },
        );

      const style = document.createElement("style");
      style.textContent =
        ".garden-label{background:rgba(250,247,240,.88)!important;border:1.5px solid #c9a84c!important;border-radius:10px!important;padding:4px 12px!important;box-shadow:0 3px 12px rgba(0,0,0,.25)!important;white-space:nowrap}.garden-label::before{display:none}";
      document.head.appendChild(style);

      const popupOpts: import("leaflet").PopupOptions = {
        maxWidth: 192,
        minWidth: 192,
        autoPan: true,
        autoPanPaddingTopLeft: Leaflet.point(10, 110),
        autoPanPaddingBottomRight: Leaflet.point(10, 20),
        closeButton: true,
        className: "pc-popup",
      };

      const markerRegistry: MarkerEntry[] = plants.map((p) => {
        const cat = getCat(p.name);
        const meta = CAT_META[cat];
        const icon = Leaflet.divIcon({
          className: "",
          html: `<div class="picon" style="--dot-color:${meta.color};--icon-url:url('${meta.iconUrl}')"></div>`,
          iconSize: [35, 35],
          iconAnchor: [18, 18],
          popupAnchor: [0, -8],
        });
        const marker = Leaflet.marker([p.lat, p.lng], { icon }).addTo(map);
        marker.bindPopup(() => buildCardHTML(p, cat), popupOpts);
        marker.on("popupopen", () => ensurePopupNavGlobals());
        return { marker, plant: p, cat, icon };
      });

      markerRegistryRef.current = markerRegistry;
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markerRegistryRef.current = [];
      leafletRef.current = null;
    };
  }, [plants]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const markerRegistry = markerRegistryRef.current;
    markerRegistry.forEach(({ marker, cat }) => {
      const d = marker.getElement()?.querySelector(".picon") as HTMLElement | null;
      const visible = isCatActive(cat);
      if (visible) marker.addTo(map);
      else marker.remove();
      if (d) d.style.display = visible ? "" : "none";
    });
  }, [activeCats]);

  useEffect(() => {
    const term = query.trim().toLowerCase();
    const markerRegistry = markerRegistryRef.current;
    if (!term) {
      markerRegistry.forEach(({ marker, cat }) => {
        const d = marker.getElement()?.querySelector(".picon") as HTMLElement | null;
        if (!d) return;
        d.classList.remove("picon-dim", "picon-match");
        d.style.setProperty("--dot-color", CAT_META[cat].color);
      });
      return;
    }

    markerRegistry.forEach(({ marker, plant }) => {
      const d = marker.getElement()?.querySelector(".picon") as HTMLElement | null;
      if (!d) return;
      const hit = plant.name.toLowerCase().includes(term);
      d.classList.toggle("picon-dim", !hit);
      d.classList.toggle("picon-match", hit);
    });
  }, [query]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (!t.closest("#search-wrap")) setSearchOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  function toggleCat(cat: CatKey) {
    setActiveCats((prev) => {
      const all = Object.keys(CAT_META) as CatKey[];
      const allActive = prev.size === all.length;

      // If everything is currently active, first click should isolate the category.
      if (allActive) return new Set<CatKey>([cat]);

      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);

      // If user turned off the last remaining category, revert to "all active".
      if (next.size === 0) return new Set<CatKey>(all);

      return next;
    });
  }

  function zoomToPlant(p: PlantRow) {
    const map = mapRef.current;
    if (!map) return;
    map.setView([p.lat, p.lng], 21, { animate: true });

    const entry = markerRegistryRef.current.find((e) => e.plant === p);
    entry?.marker.openPopup();
    setSearchOpen(false);
  }

  return (
    <>
      <div id="mapWrap">
        <div id="filterPanel" className={filtersOpen ? "" : "collapsed"}>
          <div id="filterTitle">
            <span>Filter</span>
            <button
              type="button"
              className="filter-toggle"
              aria-expanded={filtersOpen}
              aria-controls="filterBody"
              aria-label={filtersOpen ? "Hide filters" : "Show filters"}
              onClick={() => setFiltersOpen((v) => !v)}
            >
              <svg
                viewBox="0 0 20 20"
                width="16"
                height="16"
                aria-hidden="true"
                focusable="false"
                style={{
                  display: "block",
                  transform: filtersOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform .15s ease",
                }}
              >
                <path
                  d="M5.25 7.75a1 1 0 0 1 1.41 0L10 11.09l3.34-3.34a1 1 0 1 1 1.41 1.41l-4.05 4.05a1 1 0 0 1-1.41 0L5.25 9.16a1 1 0 0 1 0-1.41Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <div className="filter-divider" />
          <div id="filterBody" style={{ display: filtersOpen ? "flex" : "none", flexDirection: "column", gap: 8 }}>
            <button
              type="button"
              className="filter-action"
              onClick={() => {
                const el = document.getElementById("search-box") as HTMLInputElement | null;
                el?.focus();
              }}
            >
              🔍 Search plants
            </button>
            {(Object.keys(CAT_META) as CatKey[]).map((k) => (
              <Pill
                key={k}
                label={CAT_META[k].label}
                iconUrl={CAT_META[k].iconUrl}
                iconColor={activeCats.has(k) ? CAT_META[k].color : "#9ca3af"}
                active={activeCats.has(k)}
                onClick={() => toggleCat(k)}
              />
            ))}
            <div className="filter-count">🌱 {plants?.length ?? 0} plants</div>
          </div>
        </div>

        <div id="search-wrap">
          <div style={{ position: "relative", width: "100%" }}>
            <span id="search-icon">🔍</span>
            <input
              id="search-box"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setQuery("");
                  setSearchOpen(false);
                  (e.currentTarget as HTMLInputElement).blur();
                }
                if (e.key === "Enter") {
                  const term = query.trim().toLowerCase();
                  if (!term) return;
                  const first = markerRegistryRef.current.find(
                    ({ plant, cat }) =>
                      plant.name.toLowerCase().includes(term) && isCatActive(cat),
                  );
                  if (first) {
                    zoomToPlant(first.plant);
                  }
                }
              }}
              placeholder="Search plants…"
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <div id="search-count" style={{ display: query.trim() ? "block" : "none" }}>
            {!query.trim()
              ? ""
              : matches.length
                ? `${matches.length} result${matches.length > 1 ? "s" : ""}`
                : "No results"}
          </div>

          <div id="search-results" style={{ display: searchOpen && query.trim() ? "block" : "none" }}>
            {query.trim() && matches.length === 0 ? (
              <div className="sr-item">
                <span className="sr-name" style={{ opacity: 0.55, fontStyle: "italic" }}>
                  No plants found
                </span>
              </div>
            ) : (
              matches.map(({ p, cat }) => (
                <div key={`${p.lat}-${p.lng}-${p.name}`} className="sr-item" onClick={() => zoomToPlant(p)}>
                  <span className="sr-dot" style={{ background: CAT_META[cat].color }} />
                  <span className="sr-name">{p.name}</span>
                  <span style={{ fontSize: ".6rem", color: CAT_META[cat].color, marginLeft: "auto", paddingLeft: 6 }}>
                    {CAT_META[cat].label}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div id="map" />
      </div>
    </>
  );
}

function Pill(props: {
  label: string;
  iconUrl?: string;
  iconColor?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`cpill ${props.active ? "active" : "inactive"}`}
      onClick={props.onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") props.onClick();
      }}
    >
      {props.iconUrl ? (
        <span
          className="cpill-icon"
          style={{
            ["--icon-url" as any]: `url('${props.iconUrl}')`,
            ["--icon-color" as any]: props.iconColor ?? "currentColor",
          }}
        />
      ) : (
        <span className="cpill-dot" style={{ background: props.iconColor }} />
      )}
      {props.label}
    </div>
  );
}

