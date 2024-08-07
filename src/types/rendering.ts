import { ClapSegmentCategory } from "@aitube/clap"
import { TimelineSegment } from "./timeline"

export enum RenderingStrategy {

  // render assets when the user asks for it (could be a click or mouse hover)
  ON_DEMAND = "ON_DEMAND",

  // render assets currently visible on screen, never render invisible ones
  ON_SCREEN_ONLY = "ON_SCREEN_ONLY",

  // render assets visible on screen in priority,
  // then pre-render a few of the surrounding assets (but not the whole set)
  ON_SCREEN_THEN_SURROUNDING = "ON_SCREEN_THEN_SURROUNDING",


  // render assets visible on screen in priority,
  // then pre-render *ALL* the remaining project's assets
  // so yeah if you have 3000 storyboards, it will render that many ($$$)
  // (note: there is a setting to cap the number of parallel renderings)
  //
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !! this is hardcore! only GPU-rich people shoud use this feature! !!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  ON_SCREEN_THEN_ALL = "ON_SCREEN_THEN_ALL",
}

export type SegmentResolver = (segment: TimelineSegment) => Promise<TimelineSegment>

export type RenderableSegmentCategory =
  | ClapSegmentCategory.VIDEO
  | ClapSegmentCategory.STORYBOARD
  | ClapSegmentCategory.DIALOGUE
  | ClapSegmentCategory.SOUND
  | ClapSegmentCategory.MUSIC