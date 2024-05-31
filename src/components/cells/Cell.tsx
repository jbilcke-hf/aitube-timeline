import { a } from "@react-spring/three"
import { ClapSegment } from "@aitube/clap"

import { DEFAULT_DURATION_IN_MS_PER_STEP } from "@/constants"

import { ImageCell } from "./ImageCell"
import { VideoCell } from "./VideoCell"
import { TextCell } from "./TextCell"
import { useTimelineState } from "@/hooks"

export function Cell({
  segment: s,
  setHoveredSegment
}: {
  segment: ClapSegment
  setHoveredSegment: (hoveredSegment?: ClapSegment) => void
}) {

  const getSegmentColorScheme = useTimelineState(s => s.getSegmentColorScheme)
  const colorScheme = getSegmentColorScheme(s)

  const cellWidth = useTimelineState((s) => s.horizontalZoomLevel)
  const getCellHeight = useTimelineState((s) => s.getCellHeight)
  const getVerticalCellPosition = useTimelineState((s) => s.getVerticalCellPosition)

  const cellHeight = getCellHeight(s.track)
  const verticalCellPosition = getVerticalCellPosition(0, s.track)

  const durationInSteps = (
    (s.endTimeInMs - s.startTimeInMs) / DEFAULT_DURATION_IN_MS_PER_STEP
  )

  const startTimeInSteps = (
    s.startTimeInMs / DEFAULT_DURATION_IN_MS_PER_STEP
  )

  const widthInPx = durationInSteps * cellWidth

  const currentZoomLevel = useTimelineState(s => s.currentZoomLevel)

  // we need to round this one to avoid *too* many re-renders
  const widthInPxAfterZoom = Math.round(currentZoomLevel * durationInSteps * cellWidth)

  const hoveredSegment = useTimelineState(s => s.hoveredSegment)
  const isHovered = hoveredSegment?.id === s.id

  const SpecializedCell =
    s.assetUrl.startsWith("data:image/")
      ? ImageCell
    : s.assetUrl.startsWith("data:video/")
      ? VideoCell
      : TextCell

  return (
    <a.mesh
      key={s.id}
      position={[
        (startTimeInSteps * cellWidth) 

          // the position of a RoundedBox is defined from its center
          // so we have to shift its container (the a.mesh)
          // to the right, exactly one half of the RoundedBox's width
          + ((durationInSteps * cellWidth) / 2),

        -verticalCellPosition  + (cellHeight / 2),
        1
      ]}

      onPointerEnter={(e) => {
        // console.log('enter')
        setHoveredSegment(s)
      }}
      onPointerLeave={(e) => {
        // console.log('leave')
        setHoveredSegment(undefined)
      }}


      onClick={(e) => console.log('click')}
      onContextMenu={(e) => console.log('context menu')}
      onDoubleClick={(e) => console.log('double click')}
      // onWheel={(e) => console.log('wheel spins')}
      // onPointerUp={(e) => console.log('up')}
      // onPointerDown={(e) => console.log('down')}
      // onPointerOver={(e) => console.log('over')}
      // onPointerOut={(e) => console.log('out')}

      // onPointerMove={(e) => console.log('move')}
      // onPointerMissed={() => console.log('missed')}
      // onUpdate={(self) => console.log('props have been updated')}
    >
      <SpecializedCell
          segment={s}
          cellWidth={cellWidth}
          cellHeight={cellHeight}
          isHovered={isHovered}
          setHoveredSegment={setHoveredSegment}
          durationInSteps={durationInSteps}
          startTimeInSteps={startTimeInSteps}
          colorScheme={colorScheme}
          widthInPx={widthInPx}
          widthInPxAfterZoom={widthInPxAfterZoom}
        />
    </a.mesh>
  )
}