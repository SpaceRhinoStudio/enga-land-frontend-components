<script lang="ts">
  import { __$ } from './locales'

  export let message: string
  export let status: string | number
</script>

<div class="flex flex-col grow gap-4 items-center justify-center">
  <span class="text-4xl font-serif text-text-hover tracking-wide">
    {status == 404 ? $__$.nav.notFound : $__$.main.genericErrorMessage}
  </span>
  <span class="text-text-secondary">{status}</span>
</div>
