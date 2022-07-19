// helper function to pick a random number within a range
const randomRange = (min: number, max: number) => Math.random() * (max - min) + min

export class ConfettiPhysics {
  constructor(
    public gravityConfetti = 0.3,
    public gravitySequins = 0.55,
    public dragConfetti = 0.075,
    public dragSequins = 0.02,
    public terminalVelocity = 3,
  ) {}
}

export class Confetto {
  // helper function to get initial velocities for confetti
  // this weighted spread helps the confetti look more realistic
  static initConfettoVelocity(
    xRange: [number, number],
    yRange: [number, number],
  ): { x: number; y: number } {
    const x = randomRange(xRange[0], xRange[1])
    const range = yRange[1] - yRange[0] + 1
    let y = yRange[1] - Math.abs(randomRange(0, range) + randomRange(0, range) - range)
    if (y >= yRange[1] - 1) {
      // Occasional confetto goes higher than the max
      y += Math.random() < 0.25 ? randomRange(1, 3) : 0
    }
    return { x: x, y: -y }
  }

  randomModifier: number
  color: { front: string; back: string }
  dimensions: { x: number; y: number }
  position: { x: number; y: number }
  rotation: number
  scale: { x: number; y: number }
  velocity: { x: number; y: number }

  constructor(
    canvas: HTMLCanvasElement,
    colors: { front: string; back: string }[],
    sourceDimensions: { offsetWidth: number; offsetHeight: number },
    public physics: ConfettiPhysics = new ConfettiPhysics(),
  ) {
    this.randomModifier = randomRange(0, 99)
    this.color = colors[Math.floor(randomRange(0, colors.length))]!
    this.dimensions = {
      x: randomRange(5, 9),
      y: randomRange(8, 15),
    }
    this.position = {
      x: randomRange(
        canvas.width / 2 - sourceDimensions.offsetWidth / 4,
        canvas.width / 2 + sourceDimensions.offsetWidth / 4,
      ),
      y: randomRange(
        canvas.height / 2 + sourceDimensions.offsetHeight / 2 + 8,
        canvas.height / 2 + 1.5 * sourceDimensions.offsetHeight - 8,
      ),
    }
    this.rotation = randomRange(0, 2 * Math.PI)
    this.scale = {
      x: 1,
      y: 1,
    }
    this.velocity = Confetto.initConfettoVelocity([-9, 9], [6, 11])
  }
  update(): void {
    // apply forces to velocity
    this.velocity.x -= this.velocity.x * this.physics.dragConfetti
    this.velocity.y = Math.min(
      this.velocity.y + this.physics.gravityConfetti,
      this.physics.terminalVelocity,
    )
    this.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random()

    // set position
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    // spin confetto by scaling y and set the color, .09 just slows cosine frequency
    this.scale.y = Math.cos((this.position.y + this.randomModifier) * 0.09)
  }
}

export class Sequin {
  color: string
  radius: number
  position: { x: number; y: number }
  velocity: { x: number; y: number }

  constructor(
    canvas: HTMLCanvasElement,
    colors: { front: string; back: string }[],

    sourceDimensions: { offsetWidth: number; offsetHeight: number },
    public physics: ConfettiPhysics = new ConfettiPhysics(),
  ) {
    ;(this.color = colors[Math.floor(randomRange(0, colors.length))]!.back),
      (this.radius = randomRange(1, 2)),
      (this.position = {
        x: randomRange(
          canvas.width / 2 - sourceDimensions.offsetWidth / 3,
          canvas.width / 2 + sourceDimensions.offsetWidth / 3,
        ),
        y: randomRange(
          canvas.height / 2 + sourceDimensions.offsetHeight / 2 + 8,
          canvas.height / 2 + 1.5 * sourceDimensions.offsetHeight - 8,
        ),
      }),
      (this.velocity = {
        x: randomRange(-6, 6),
        y: randomRange(-8, -12),
      })
  }

  update(): void {
    // apply forces to velocity
    this.velocity.x -= this.velocity.x * this.physics.dragSequins
    this.velocity.y = this.velocity.y + this.physics.gravitySequins

    // set position
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}
