import * as THREE from "three"
import { ClapEntity, ClapProject, ClapSegment } from "@aitube/clap"

import { ClapSegmentColorScheme, ClapTimelineTheme } from "./theme"
import { TimelineControlsImpl } from "@/components/controls/types"
import { TimelineCameraImpl } from "@/components/camera/types"
import { TimelineCursorImpl } from "@/components/timeline/types"
import { RenderingStrategy, SegmentRenderer } from "./rendering"

export type Track = {
  id: number
  name: string
  isPreview: boolean
  height: number
  hue: number
  occupied: boolean
  visible: boolean
}

export type Tracks = Track[]

export type ContentSizeMetrics = {
  nbMaxShots: number
  nbMaxTracks: number
  nbIdentifiedTracks: number
  contentWidth: number
  contentHeight: number
  tracks: Tracks
  cellWidth: number
  defaultCellHeight: number
  defaultSegmentDurationInSteps: number
  defaultSegmentLengthInPixels: number
  defaultMediaRatio: number
  defaultPreviewHeight: number
}

export type TimelineStoreState = {
  // used to track the timeline state
  // this helps informing parent app user
  // that the timeline has been recreated inside the React tree for instance
  isReady: boolean

  // container width and height
  width: number
  height: number
  
  clap?: ClapProject
  theme: ClapTimelineTheme

  segments: ClapSegment[]
  segmentsChanged: number
  visibleSegments: ClapSegment[]
  nbIdentifiedTracks: number

  isEmpty: boolean
  isLoading: boolean

  // -- metrics computed by computeContentSizeMetrics --
  nbMaxShots: number
  nbMaxTracks: number
  contentWidth: number
  contentHeight: number
  tracks: Tracks
  cellWidth: number
  defaultCellHeight: number
  defaultSegmentDurationInSteps: number
  defaultSegmentLengthInPixels: number
  defaultMediaRatio: number
  defaultPreviewHeight: number
  // -------------------------------------------------

  minHorizontalZoomLevel: number
  maxHorizontalZoomLevel: number
  originalHorizontalZoomLevel: number

  position: THREE.Vector3
  scale: THREE.Vector3
  initialized: boolean
  beforeSteps: number
  afterSteps: number
  timeout: NodeJS.Timeout

  typicalSegmentDurationInSteps: number

  // note: this is a mirror value of 
  // it might change rapidly (many times per seconds), so use with care!
  currentZoomLevel: number

  hoveredSegment?: ClapSegment

  /**
   * The timeline camera
   * 
   * Note: there will be no update of this value in case the camera settings have changed
   */
  timelineCamera?: TimelineCameraImpl

  /**
   * The timeline controls
   * 
   * Note: there will be no update of this value in case the controls settings have changed
   */
  timelineControls?: TimelineControlsImpl

  // ref to the cursor element
  timelineCursor?: TimelineCursorImpl

  // used to track current camera position, at zoom level 1.0
  scrollX: number
  scrollY: number

  // used to determine how long it has been since we touch the scroll
  // we use this information to render the grid faster, by disabling all text
  // until a given debouncing time has elapsed
  resizeStartedAt: number
  isResizing: boolean

  topBarTimelineScale?: THREE.Group<THREE.Object3DEventMap>
  leftBarTrackScale?: THREE.Group<THREE.Object3DEventMap>

  // the final video, if available
  finalVideo?: ClapSegment

  // position of the current timestamp
  cursorTimestampAt: number

  storyboardRenderingStrategy: RenderingStrategy
  videoRenderingStrategy: RenderingStrategy

  segmentRenderer?: SegmentRenderer
}


export type TimelineStoreModifiers = {
  setClap: (clap?: ClapProject) => Promise<void>
  setHorizontalZoomLevel: (newHorizontalZoomLevel: number) => void
  setSegments: (segments?: ClapSegment[]) => void
  setVisibleSegments: (visibleSegments?: ClapSegment[]) => void
  getCellHeight: (trackNumber?: number) => number
  getVerticalCellPosition: (start: number, end: number) => number
  getSegmentColorScheme: (segment?: ClapSegment) => ClapSegmentColorScheme
  setHoveredSegment: (hoveredSegment?: ClapSegment) => void
  setTimelineCamera: (timelineCamera?: TimelineCameraImpl) => void
  setTimelineControls: (timelineControls?: TimelineControlsImpl) => void
  setTopBarTimelineScale: (topBarTimelineScale?: THREE.Group<THREE.Object3DEventMap>) => void
  setLeftBarTrackScale: (leftBarTrackScale?: THREE.Group<THREE.Object3DEventMap>) => void
  handleMouseWheel: ({ deltaX, deltaY }: { deltaX: number; deltaY: number }) => void
  toggleTrackVisibility: (trackId: number) => void
  setContainerSize: ({ width, height }: { width: number; height: number }) => void
  setTimelineCursor: (timelineCursor?: TimelineCursorImpl) => void
  setCursorTimestampAt: (cursorTimestampAt: number) => void
  saveClapAs: (params: {
    // if embedded is true, the file will be larger, as all the content,
    // image, video, audio..
    // will be embedded into it (except the last big video)
    embedded?: boolean

    saveToFilePath?: string

    // note: the native select picker doesn't work in all browsers (eg. not in Firefox)
    // but it's not an issue, in our case we can save using Node/Electron + the cloud
    showTargetDirPopup?: boolean

    // some extra text to append to the file name
    extraLabel?: string
  }) => Promise<number>
  setStoryboardRenderingStrategy: (storyboardRenderingStrategy: RenderingStrategy) => void
  setVideoRenderingStrategy: (videoRenderingStrategy: RenderingStrategy) => void
  setSegmentRenderer: (segmentRenderer: SegmentRenderer) => void
  renderSegment: (segment: ClapSegment) => Promise<ClapSegment>
}

export type TimelineStore = TimelineStoreState & TimelineStoreModifiers
