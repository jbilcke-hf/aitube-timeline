import React from "react"

import {
  useTimeline
} from "@/hooks"

import { useCursorGeometry } from "@/hooks/useCursorGeometry"
import { leftBarTrackScaleWidth } from "@/constants/themes"

export function Cursor() {
  const setTimelineCursor = useTimeline(s => s.setTimelineCursor)

  const contentHeight = useTimeline(s => s.contentHeight)
  const cursorGeometries = useCursorGeometry()

  // console.log(`re-rendering <Cursor>`)
  
  return (
    <>
      <group
      position={[
        leftBarTrackScaleWidth,
       (contentHeight / 2),
        -4
      ]}
      ref={r => {
        if (r) {
          setTimelineCursor(r)
        }
      }}
      >
      {cursorGeometries.map((lineGeometry, idx) => (
        <line
          // @ts-ignore
          geometry={lineGeometry}
          key={idx}>
          <lineBasicMaterial
            attach="material"
            color="#ffffff"
            linewidth={1}
          />
        </line>
      ))}
      </group>

    </>
  );
};
