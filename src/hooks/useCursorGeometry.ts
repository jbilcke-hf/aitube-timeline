import { useEffect, useState } from "react"
import * as THREE from "three"

import { useTimeline } from "./useTimeline"
import { useThree } from "@react-three/fiber";
import { leftBarTrackScaleWidth } from "@/constants/themes";

export const useCursorGeometry = () => {


  const [gridlines, setGridLines] = useState([] as THREE.BufferGeometry<THREE.NormalBufferAttributes>[]);

  const contentHeight = useTimeline(s => s.contentHeight)
 
  useEffect(() => {

    const thisLines = [] as THREE.BufferGeometry<THREE.NormalBufferAttributes>[];

    for (let i = 0; i < 3; i++) {
      const verticalLinePoints = [
        new THREE.Vector3(i, 60, 1),
        new THREE.Vector3(i, -contentHeight, 1)
      ];
      const verticalLineGeometry = new THREE.BufferGeometry().setFromPoints(verticalLinePoints);

      thisLines.push(verticalLineGeometry);
    }
   
    setGridLines(thisLines);
  }, [contentHeight]);

  return gridlines;
};