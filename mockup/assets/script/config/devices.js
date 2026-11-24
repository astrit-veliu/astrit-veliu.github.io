/** heightRatio: frame height / stage height. aspect: frame width / frame height. */
export const DEVICES = {
  pixel:  { label: 'Pixel 9', icon: 'mobile-screen-button', kind: 'phone',  heightRatio: 0.62, aspect: 0.46 },
  fold:   { label: 'Z Fold',  icon: 'tablet-screen-button', kind: 'fold',   heightRatio: 0.62, aspect: 0.86 },
  flat:   { label: 'Flat UI', icon: 'display',              kind: 'flat',   heightRatio: 0.62, aspect: 0.46 },
  tablet: { label: 'Tablet',  icon: 'tablet',               kind: 'tablet', heightRatio: 0.48, aspect: 0.72 },
}
