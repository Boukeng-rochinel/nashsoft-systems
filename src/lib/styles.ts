/**
 * Liquid-glass button surface shared by <Button> and native form submit buttons:
 * translucent fill + blur + brand-blue border. Text adapts to the background
 * (brand blue on light sections, white on dark ones) and fills solid on hover.
 */
export const glassButton =
  'border-[1.5px] border-brand bg-brand/[0.06] text-brand backdrop-blur-md hover:bg-brand hover:text-white on-dark:border-brand-300 on-dark:bg-white/[0.08] on-dark:text-white on-dark:hover:border-brand on-dark:hover:bg-brand'
