import { workPhotos, workVideos, type WorkPhoto, type WorkVideo } from "@/data/images";

export type GalleryCategory = "post-construction" | "residential" | "deep-clean" | "fogging";

/** Filter order and labels. Categories with no items are hidden automatically. */
export const galleryCategories: { value: GalleryCategory; label: string }[] = [
  { value: "post-construction", label: "Post-Construction" },
  { value: "residential", label: "Residential" },
  { value: "deep-clean", label: "Deep Clean" },
  { value: "fogging", label: "Fogging" },
];

/** The service a visitor is most likely to want after viewing work in each category. */
export const categoryService: Record<GalleryCategory, string> = {
  "post-construction": "post-construction-cleaning",
  residential: "residential-cleaning",
  "deep-clean": "deep-cleaning",
  fogging: "fogging-disinfection",
};

type GalleryBase = {
  id: string;
  title: string;
  caption: string;
  /** Leave out to show the item under "All" only. */
  category?: GalleryCategory;
};

export type GalleryItem =
  | (GalleryBase & { type: "photo"; photo: WorkPhoto })
  | (GalleryBase & { type: "video"; video: WorkVideo });

/** Every piece of real job media, newest showcase first. Add new photos and videos here. */
export const galleryItems: GalleryItem[] = [
  {
    id: "marble-floor-scrub",
    type: "video",
    video: workVideos.crewFloorScrub,
    category: "deep-clean",
    title: "Marble Floor Scrub",
    caption:
      "Our uniformed crew scrubbing and polishing a marble floor by hand, working it section by section.",
  },
  {
    id: "facility-floor-mopping",
    type: "photo",
    photo: workPhotos.facilityFloorMopping,
    category: "post-construction",
    title: "Facility Floor Mopping",
    caption:
      "A uniformed crew in masks and gloves mopping the floor of a large facility hall, working in a line so no patch is missed.",
  },
  {
    id: "compound-disinfection",
    type: "photo",
    photo: workPhotos.disinfectionWalk,
    category: "fogging",
    title: "Compound Disinfection",
    caption:
      "A technician in protective gear carrying a backpack sprayer through a compound during a disinfection treatment.",
  },
  {
    id: "wall-tile-detailing",
    type: "photo",
    photo: workPhotos.wallTileDetailing,
    category: "post-construction",
    title: "Wall Tile Detailing",
    caption:
      "Wiping down freshly installed wall tiles from a ladder, lifting dust and grout film from every row, right up to the ceiling.",
  },
  {
    id: "industrial-floor-clean",
    type: "photo",
    photo: workPhotos.industrialFloor,
    category: "post-construction",
    title: "Industrial Floor Clean",
    caption:
      "Mopping and scrubbing the tiled floor of a newly built industrial facility, clearing construction residue before handover.",
  },
  {
    id: "machine-floor-scrubbing",
    type: "photo",
    photo: workPhotos.floorScrubbing,
    category: "deep-clean",
    title: "Machine Floor Scrubbing",
    caption:
      "A rotary floor machine lifting ground-in grime from tiled flooring.",
  },
  {
    id: "meet-the-crew",
    type: "photo",
    photo: workPhotos.crewTeam,
    title: "Meet the Crew",
    caption:
      "Part of the CityChic team in uniform, ready for the day’s job.",
  },
  {
    id: "forecourt-scrub",
    type: "photo",
    photo: workPhotos.forecourtScrub,
    category: "post-construction",
    title: "Forecourt Scrub",
    caption:
      "Scrubbing mud and construction residue from the forecourt of a newly completed building.",
  },
  {
    id: "disinfectant-spraying",
    type: "photo",
    photo: workPhotos.disinfectionSpray,
    category: "fogging",
    title: "Disinfectant Spraying",
    caption:
      "Applying disinfectant with a backpack sprayer, wearing gloves, a mask and a hair cover.",
  },
  {
    id: "factory-equipment-clean",
    type: "photo",
    photo: workPhotos.factoryEquipmentClean,
    category: "post-construction",
    title: "Factory Equipment Clean",
    caption:
      "Cleaning under and around newly installed factory machinery, reaching the dust that quick cleans leave behind.",
  },
  {
    id: "site-walkthrough",
    type: "video",
    video: workVideos.siteWalkthrough,
    category: "post-construction",
    title: "Post-Construction Walkthrough",
    caption:
      "A newly built property covered in dust, debris and paint residue: exactly the kind of space our post-construction crews take on.",
  },
  {
    id: "warehouse-site-sweep",
    type: "photo",
    photo: workPhotos.warehouseSweep,
    category: "post-construction",
    title: "Warehouse Site Clean-Up",
    caption:
      "Sweeping construction dust from the grounds of a new warehouse so the site is ready to use.",
  },
  {
    id: "tile-residue-scraping",
    type: "photo",
    photo: workPhotos.tileResidueScraping,
    category: "post-construction",
    title: "Tile Residue Scraping",
    caption:
      "Crew members kneeling to scrape paint and cement residue from floor tiles by hand, one tile at a time.",
  },
  {
    id: "warehouse-floor-clean",
    type: "photo",
    photo: workPhotos.warehouseFloorClean,
    category: "post-construction",
    title: "Warehouse Floor Clean",
    caption:
      "Floor machines and vacuums at work across a large new warehouse, preparing the space for handover.",
  },
  {
    id: "job-complete",
    type: "photo",
    photo: workPhotos.thankYouSign,
    title: "Job Complete",
    caption:
      "The CityChic thank-you sign we leave behind at a finished job.",
  },
];

export function itemMedia(item: GalleryItem) {
  return item.type === "photo"
    ? { src: item.photo.src, width: item.photo.width, height: item.photo.height, alt: item.photo.alt }
    : { src: item.video.poster, width: item.video.width, height: item.video.height, alt: item.video.label };
}
