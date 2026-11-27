import { forwardRef, useImperativeHandle } from 'react';
import { useReveal } from '../hooks/useReveal';

/**
 * Pembungkus animasi reveal.
 *
 * @param {string}   as      tag HTML yang dirender (default: div)
 * @param {string}   className kelas tambahan
 * @param {number}   delay   jeda sebelum animasi, dalam milidetik
 * @param {string}   variant 'left' | 'right' | 'zoom' (opsional)
 *
 * Ref diteruskan ke elemen DOM agar hook lain (count-up, shake, dll.)
 * tetap bisa mengakses node yang sama.
 */
const Reveal = forwardRef(function Reveal(
  { as: Tag = 'div', className = '', delay = 0, variant = '', style, children, ...rest },
  forwardedRef
) {
  const ref = useReveal();
  useImperativeHandle(forwardedRef, () => ref.current);

  const classes = ['reveal', variant ? `reveal--${variant}` : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      ref={ref}
      className={classes}
      style={{ ...style, '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
});

export default Reveal;
