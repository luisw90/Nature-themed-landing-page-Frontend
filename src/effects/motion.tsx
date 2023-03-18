import { useFrame } from '@react-three/fiber'
import { FC, useRef } from 'react' // literally anything, don't even have to use it
import { BufferGeometry } from 'three'
import * as THREE from 'three'


type AddImageEffectsProps = {
  themeid: string;
  image: string;
};

export const ImageEffects: FC<AddImageEffectsProps> = ({
  themeid,
  image,
}) => {

  const texmgr = new THREE.TextureLoader()
  const texture = texmgr.load(image)

  const meshes = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (meshes.current && meshes.current.geometry) {
      const geometry = meshes.current.geometry as BufferGeometry
      const count = geometry.attributes.position.count
      const time = clock.getElapsedTime()

      for (let i = 0; i < count; i++) {
        const attri = geometry.attributes as any
        const x = attri.position.getX(i)
        const y = attri.position.getY(i)

        // OCEAN
        if (themeid === 'a39493c2-c3d7-11ed-afa1-0242ac120002') {
          const anim1 = 0.25 * Math.sin(x + time * 0.7)
          const anim2 = 0.35 * Math.sin(x * 1 + time * 0.7)
          const anim3 = 0.1 * Math.sin(y * 15 + time * 0.7)

          attri.position.setZ(i, anim1 + anim2 + anim3)
          geometry.computeVertexNormals()
          geometry.attributes.position.needsUpdate = true
        }
        // FOREST
        if (themeid === '90052704-c3d7-11ed-afa1-0242ac120002') {
          const anim1 = 0.15 * Math.round(x / time + 1)
          const anim2 = 0.35 * Math.sin(x / time + 2)
          const anim3 = 0.1 * Math.sin(time / 0.6)

          attri.position.setZ(i, anim3, anim2, anim1)
          geometry.computeVertexNormals()
          geometry.attributes.position.needsUpdate = true
        }
        // DESERT
        if (themeid === 'b038576c-c3d7-11ed-afa1-0242ac120002') {
          const time2 = time / Math.random()
          const anim1 = 0.001 * Math.sin(x + time2 * 0.7)
          const anim2 = 0.2 * Math.sin(x * 1 + time * 0.7)
          const anim3 = 0.001 * Math.sin(time2)

          attri.position.setZ(i, anim1 + anim2 + anim3)
          geometry.computeVertexNormals()
          geometry.attributes.position.needsUpdate = true
        }
      }
    }
  })

  return (
    <mesh ref={meshes}>
      <planeGeometry args={[16, 9, 15, 9]} />
      <meshBasicMaterial map={texture}></meshBasicMaterial>
    </mesh>
  )
}