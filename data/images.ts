/**
 * Every image on the site is referenced from here.
 * The client hosts images on Cloudflare and will supply the links.
 * An entry with `src: null` renders a clearly marked stand-in until its link arrives.
 */

export type SiteImage = {
  src: string | null;
  alt: string;
  width: number;
  height: number;
  /** Stand-in styling used only while `src` is null. */
  tone?: "dusty" | "clean" | "brand";
};

export const images = {
  /** Official logo supplied by the client, background removed. Served locally from /public. */
  logo: {
    src: "/brand/citychic-logo.png",
    alt: "CityChic Nigeria Ltd logo",
    width: 538,
    height: 195,
    tone: "brand",
  },
  hero: {
    src: null,
    alt: "CityChic cleaner polishing the kitchen of a newly completed Lagos home",
    width: 1200,
    height: 1400,
    tone: "clean",
  },
} satisfies Record<string, SiteImage>;

export type WorkVideo = {
  /** Web-optimised MP4: no audio track, faststart so it streams while buffering. */
  src: string;
  /** Still frame shown blurred while the video loads or buffers. */
  poster: string;
  width: number;
  height: number;
  /** Describes the footage for screen readers. */
  label: string;
};

/**
 * Real job footage supplied by the client. Originals live in /public/videos
 * (work1.mp4, work2.mp4); these are the re-encoded web versions.
 */
export const workVideos = {
  crewFloorScrub: {
    src: "/videos/crew-floor-scrub.mp4",
    poster: "/images/work/crew-floor-scrub-poster.webp",
    width: 720,
    height: 1280,
    label: "CityChic crew in uniform scrubbing and polishing a marble floor by hand",
  },
  siteWalkthrough: {
    src: "/videos/site-walkthrough.mp4",
    poster: "/images/work/site-walkthrough-poster.webp",
    width: 720,
    height: 1280,
    label: "Walkthrough of a newly built property covered in construction dust, debris and paint residue",
  },
} satisfies Record<string, WorkVideo>;

export type WorkPhoto = SiteImage & {
  src: string;
  /** Short service label shown on the tile. */
  label?: string;
};

/**
 * Real job photos supplied by the client. Served locally from /public for now;
 * swap the paths for Cloudflare links when they are hosted there.
 */
export const workPhotos = {
  industrialFloor: {
    src: "/images/work/industrial-floor-clean.webp",
    alt: "CityChic crew mopping and scrubbing the tiled floor of a newly built industrial facility",
    width: 750,
    height: 1000,
    label: "Post-Construction",
  },
  warehouseSweep: {
    src: "/images/work/warehouse-site-sweep.webp",
    alt: "CityChic team sweeping construction dust from the grounds of a new warehouse",
    width: 750,
    height: 1000,
    label: "Site Clean-Up",
  },
  disinfectionWalk: {
    src: "/images/work/disinfection-walkthrough.webp",
    alt: "CityChic technician in protective gear carrying a disinfection sprayer through a compound",
    width: 540,
    height: 960,
    label: "Fogging & Disinfection",
  },
  disinfectionSpray: {
    src: "/images/work/disinfection-spraying.webp",
    alt: "CityChic technician applying disinfectant with a backpack sprayer",
    width: 540,
    height: 960,
    label: "Disinfection",
  },
  floorScrubbing: {
    src: "/images/work/floor-scrubbing-machine.webp",
    alt: "Floor scrubbing machine deep cleaning tiled flooring",
    width: 540,
    height: 960,
    label: "Deep Cleaning",
  },
  thankYouSign: {
    src: "/images/work/thank-you-sign.webp",
    alt: "CityChic Cleaning Services thank you sign placed at a completed job",
    width: 750,
    height: 1000,
  },
  crewTeam: {
    src: "/images/work/crew-team.webp",
    alt: "Six members of the CityChic cleaning crew in matching pink uniforms standing outside a residential compound",
    width: 750,
    height: 1000,
  },
  wallTileDetailing: {
    src: "/images/work/wall-tile-detailing.webp",
    alt: "CityChic cleaner on a ladder wiping down freshly installed white wall tiles",
    width: 750,
    height: 1000,
    label: "Post-Construction",
  },
  factoryEquipmentClean: {
    src: "/images/work/factory-equipment-clean.webp",
    alt: "CityChic crew cleaning under and around newly installed stainless steel factory machinery",
    width: 750,
    height: 1000,
    label: "Post-Construction",
  },
  facilityFloorMopping: {
    src: "/images/work/facility-floor-mopping.webp",
    alt: "CityChic crew in green uniforms, masks and gloves mopping the floor of a large facility hall",
    width: 750,
    height: 1000,
    label: "Post-Construction",
  },
  forecourtScrub: {
    src: "/images/work/forecourt-scrub.webp",
    alt: "CityChic crew scrubbing mud and residue from the forecourt of a newly completed building",
    width: 750,
    height: 1000,
    label: "Post-Construction",
  },
  tileResidueScraping: {
    src: "/images/work/tile-residue-scraping.webp",
    alt: "CityChic crew kneeling to scrape paint and cement residue from floor tiles by hand",
    width: 540,
    height: 960,
    label: "Post-Construction",
  },
  warehouseFloorClean: {
    src: "/images/work/warehouse-floor-clean.webp",
    alt: "Floor machines and vacuums at work across the floor of a large new warehouse",
    width: 750,
    height: 1000,
    label: "Post-Construction",
  },
  /** Sister company photo. Only ever shown inside the road marking banner, which links out. */
  roadMarkingSurvey: {
    src: "/images/work/road-marking-survey.webp",
    alt: "CityChic Road Marking Services team member in an orange uniform surveying a city road with a measuring wheel",
    width: 540,
    height: 960,
  },
} satisfies Record<string, WorkPhoto>;
