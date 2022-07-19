<script lang="ts">
  import { onMount } from 'svelte'
  import { fixed } from './actions/fixed'
  import { portal } from './actions/portal'

  import { Confetto, Sequin } from './classes/confetti'

  export let offsetWidth: number
  export let offsetHeight: number

  export let confettiCount = 20
  export let sequinCount = 10
  onMount(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let confetti = [] as Confetto[]
    let sequins = [] as Sequin[]

    const colors = [
      { front: '#7b5cff', back: '#6245e0' },
      { front: '#b3c7ff', back: '#8fa5e5' },
      { front: '#5c86ff', back: '#345dd1' },
    ]

    const initBurst = () => {
      for (let i = 0; i < confettiCount; i++) {
        confetti.push(new Confetto(canvas, colors, { offsetWidth, offsetHeight }))
      }
      for (let i = 0; i < sequinCount; i++) {
        sequins.push(new Sequin(canvas, colors, { offsetWidth, offsetHeight }))
      }
    }

    const render = () => {
      if (!ctx) {
        return
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      confetti.forEach((confetto, index) => {
        let width = confetto.dimensions.x * confetto.scale.x
        let height = confetto.dimensions.y * confetto.scale.y
        ctx.translate(confetto.position.x, confetto.position.y)
        ctx.rotate(confetto.rotation)
        confetto.update()
        ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back
        ctx.fillRect(-width / 2, -height / 2, width, height)
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        if (confetto.velocity.y < 0) {
          ctx.clearRect(
            canvas.width / 2 - offsetWidth / 2,
            canvas.height / 2 + offsetHeight / 2,
            offsetWidth,
            offsetHeight,
          )
        }
      })

      sequins.forEach((sequin, index) => {
        ctx.translate(sequin.position.x, sequin.position.y)
        sequin.update()
        ctx.fillStyle = sequin.color
        ctx.beginPath()
        ctx.arc(0, 0, sequin.radius, 0, 2 * Math.PI)
        ctx.fill()
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        if (sequin.velocity.y < 0) {
          ctx.clearRect(
            canvas.width / 2 - offsetWidth / 2,
            canvas.height / 2 + offsetHeight / 2,
            offsetWidth,
            offsetHeight,
          )
        }
      })

      confetti.forEach((confetto, index) => {
        if (confetto.position.y >= canvas.height) confetti.splice(index, 1)
      })
      sequins.forEach((sequin, index) => {
        if (sequin.position.y >= canvas.height) sequins.splice(index, 1)
      })

      window.requestAnimationFrame(render)
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', () => {
      resizeCanvas()
    })

    initBurst()
    render()
  })
</script>

<div use:portal class="fixed z-[999] inset-0 !pointer-events-none">
  <canvas id="canvas" />
</div>
