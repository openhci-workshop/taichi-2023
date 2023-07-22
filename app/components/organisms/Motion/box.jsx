import { MeshTransmissionMaterial } from '@react-three/drei'

export default function Box({ config }) {
  return (
    <>
      <mesh>
        <boxGeometry args={[4, 4, 4]}/>
        <MeshTransmissionMaterial {...config} color="#FFFFFF" toneMapped={false} />
      </mesh>
    </>
  )
}