import {ReactLenis, useLenis} from 'lenis/react'

export default function SmoothScroll({children}: { children: React.ReactNode }) {
  const lenis = useLenis(({scroll}) => {

  })

  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  )
}