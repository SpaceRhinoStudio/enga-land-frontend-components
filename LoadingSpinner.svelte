<!--
  @component
  Enga special theme loading spinner component
 -->
<script lang="ts">
  import cn from 'classnames'

  export let className: { [key in 'container' | 'wrapper']?: string } = {}
</script>

<div class={cn('container', className.container)}>
  <div
    class={cn(
      'spinner',
      'relative',
      'children:border-white',
      'children:rounded-full',
      'children:absolute',
      className.wrapper,
    )}>
    <div />
    <div />
    <div />
  </div>
</div>

<style lang="postcss">
  @keyframes rotateLoadingSpinnerT {
    0% {
      transform: translate(0, 0);
    }

    33% {
      transform: translateX(calc((var(--containerDimensions) - var(--subjectDimensions)) / 2))
        translateY(calc(var(--containerDimensions) - var(--subjectDimensions)));
    }

    66% {
      transform: translateX(
          calc(-1 * ((var(--containerDimensions) - var(--subjectDimensions)) / 2))
        )
        translateY(calc(var(--containerDimensions) - var(--subjectDimensions)));
    }
    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes rotateLoadingSpinnerBR {
    0% {
      transform: translate(0, 0);
    }

    33% {
      transform: translateX(calc(-1 * ((var(--containerDimensions) - var(--subjectDimensions)))))
        translateY(0);
    }

    66% {
      transform: translateX(
          calc(-1 * ((var(--containerDimensions) - var(--subjectDimensions)) / 2))
        )
        translateY(calc(-1 * (var(--containerDimensions) - var(--subjectDimensions))));
    }

    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes rotateLoadingSpinnerBL {
    0% {
      transform: translate(0, 0);
    }

    33% {
      transform: translateX(calc(((var(--containerDimensions) - var(--subjectDimensions)) / 2)))
        translateY(calc(-1 * (var(--containerDimensions) - var(--subjectDimensions))));
    }

    66% {
      transform: translateX(calc(((var(--containerDimensions) - var(--subjectDimensions)))))
        translateY(0);
    }

    100% {
      transform: translate(0, 0);
    }
  }

  .container {
    --containerDimensions: 5em;

    width: calc(
      (var(--containerDimensions) / 5) + (var(--containerDimensions) / 5 * 4 * var(--big, 0))
    );
    height: calc(
      (var(--containerDimensions) / 5) + (var(--containerDimensions) / 5 * 4 * var(--big, 0))
    );

    .spinner {
      /* --containerDimensions: calc(1.25rem + (3.75rem * var(--big, 0))); */
      /* --subjectDimensions: calc(0.5rem + (1.25rem * var(--big, 0))); */
      --subjectDimensions: 2em;
      --duration: 2s;
      width: var(--containerDimensions);
      height: var(--containerDimensions);

      transform: scale(calc(20% + (var(--big, 0) * 80%)));
      transform-origin: top left;

      div {
        width: var(--subjectDimensions);
        height: var(--subjectDimensions);
        /* border-width: calc(1px + (var(--big, 0) * 3px)); */
        border-width: 4px;

        animation-duration: var(--duration);
        animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
        animation-iteration-count: infinite;
        animation-fill-mode: forwards;

        &:nth-child(1) {
          animation-name: rotateLoadingSpinnerT;
          top: 0;
          left: calc((var(--containerDimensions) / 2) - (var(--subjectDimensions) / 2));
        }
        &:nth-child(2) {
          animation-name: rotateLoadingSpinnerBR;
          top: calc(var(--containerDimensions) - var(--subjectDimensions));
          left: calc(var(--containerDimensions) - var(--subjectDimensions));
        }
        &:nth-child(3) {
          animation-name: rotateLoadingSpinnerBL;
          top: calc(var(--containerDimensions) - var(--subjectDimensions));
          left: 0;
        }
      }
    }
  }
</style>
