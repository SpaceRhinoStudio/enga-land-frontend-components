<!--
  @component
  this is a helper component to add the `--vh` custom property as the 1% of the real usable viewport height to the `<html/>` element in mobile devices which mostly have a toolbar that shifts the viewport height (URL bar that hides on scroll)
 -->
<script lang="ts">
  import { onMount } from 'svelte'

  function updateMobileVH() {
    document.documentElement.style.setProperty(
      '--vh',
      `${document.documentElement.clientHeight * 0.01}px`,
    )
  }

  onMount(() => {
    updateMobileVH()
    window.addEventListener('resize', updateMobileVH)
  })
</script>
