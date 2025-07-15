import { ref, onBeforeUnmount } from 'vue'

export function useAnimationNumber (
  initial = 0,
  opts = {}
) {
  const {
    locale = 'en-US',
    mode = 'tween',
    gapThreshold = 1_000_000,
    duration: defaultDur = 2000
  } = opts

  const current = ref(toNumber(initial))
  const display = ref('')
  const nf = new Intl.NumberFormat(locale)

  // keep formatted string in sync
  watchEffect(() => {
    display.value = (Math.round(current.value))
  })

  /* ───────── rAF tween internals ───────── */
  let frame = 0, start = 0
  let from = current.value, to = current.value, duration = defaultDur

  const easeInOut = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

  function step (ts) {
    if (!start) start = ts
    const progress = Math.min((ts - start) / duration, 1)
    current.value = from + (to - from) * easeInOut(progress)
    if (progress < 1) frame = requestAnimationFrame(step)
  }
  /* ─────────────────────────────────────── */

  /** Animate (or snap / roll) to `target`. */
  function animate (
    target,
    dur = defaultDur,
    customMode = mode
  ) {
    cancelAnimationFrame(frame)
    const cleanTarget = toNumber(target)

    if (customMode === 'snap' &&
        Math.abs(cleanTarget - current.value) >= gapThreshold) {
      current.value = cleanTarget // instant jump
      return
    }

    if (customMode === 'roll') {
      const mag = Math.pow(10, Math.ceil(Math.log10(current.value + 1)))
      to = cleanTarget < current.value ? cleanTarget + mag : cleanTarget
    } else {
      to = cleanTarget
    }

    from = current.value
    duration = dur
    start = 0
    frame = requestAnimationFrame(step)
  }

  function clear () {
    cancelAnimationFrame(frame)
  }

  onBeforeUnmount(clear)

  return { current, display, animate, clear }
}

/* ---------- helpers ---------- */
function toNumber (v) {
  const n = typeof v === 'string'
    ? Number(v.replace(/[^\d.-]/g, ''))
    : Number(v)
  return Number.isFinite(n) ? n : 0
}