import { ASSET_TYPES, CANVAS_LIMITS, PLAY_STORE } from './assetTypes.js'
import { KEYBOARD, LIMITS } from './defaults.js'
import { DEVICES } from './devices.js'
import { THEMES } from './themes.js'

const names = obj => Object.values(obj).map(o => o.label).join(', ')
const maxMB = PLAY_STORE.maxFileBytes / 1048576

/**
 * Help content as data. Numbers and option lists are read from the same config the app runs on,
 * so this text cannot drift out of date. Item `keys` = alternatives; each alternative is a key combo.
 */
export const HELP = [
  {
    id: 'start', label: 'Quick start', icon: 'rocket',
    groups: [{
      title: 'Your first set of screenshots', ordered: true,
      items: [
        { title: 'Add your screenshot', text: 'Left panel, Screenshot: drop an image or click to browse. It appears inside the device frame.' },
        { title: 'Write your text', text: 'Fill in the headline, the highlighted accent line and the subtitle. The canvas updates as you type.' },
        { title: 'Position everything on the canvas', text: 'Drag the device or the headline. Hover (or tap) the device corners to resize and rotate it.' },
        { title: 'Add more screens', text: `Use the Add tile under the canvas (up to ${PLAY_STORE.maxScreens}). Each screen keeps its own text, theme, frame and overlays.` },
        { title: 'Set up the whole project', text: 'Right panel: choose the asset type and canvas size, the background and the watermark. These apply to every screen.' },
        { title: 'Export or save', text: 'Download one screen or all of them as a ZIP. Save project keeps everything so you can reopen it later.' },
      ],
    }],
  },
  {
    id: 'features', label: 'Features', icon: 'wand-magic-sparkles',
    groups: [
      { title: 'Screens (strip under the canvas)', items: [
        { icon: 'images', title: 'Switch screens', text: 'Click a thumbnail. Thumbnails are live previews, so they always match the canvas.' },
        { icon: 'plus', title: 'Add', text: `The Add tile creates a new screen, up to ${PLAY_STORE.maxScreens}. The Play Store expects ${PLAY_STORE.minScreens} to ${PLAY_STORE.maxScreens}.` },
        { icon: 'ellipsis', title: 'Duplicate or delete', text: 'The ⋯ button on a thumbnail opens a menu. A duplicate is inserted next to the original and copies everything. The last screen cannot be deleted.' },
      ] },
      { title: 'Canvas', items: [
        { icon: 'up-down-left-right', title: 'Move the device and headline', text: 'Drag them. Positions are kept when you change the asset type or size.' },
        { icon: 'rotate', title: 'Scale and rotate', text: 'Hover or tap the device: the bottom-right handle scales it and the orange top-right handle rotates it. Reset restores both.' },
        { icon: 'hand-pointer', title: 'Works with touch and pen', text: 'Every drag and handle works with a finger or stylus, not just a mouse.' },
      ] },
      { title: 'This screen (left panel)', items: [
        { icon: 'mobile-screen-button', title: 'Screenshot', text: 'Drop or click to upload a PNG, JPG, WebP, GIF or SVG up to 15 MB. On a Daydream asset it becomes the icon.' },
        { icon: 'font', title: 'Text and typography', text: 'Headline, accent line and subtitle, with a font choice and size (60–160%) for the headline and the subtitle.' },
        { icon: 'tag', title: 'Badges, awards and popups', text: 'Add a badge (4 styles), an award (3 styles, title and subtitle) or a popup image. Click one to select it, then drag, nudge or delete it. “Show badges” hides all badges.' },
        { icon: 'expand', title: 'Device scale and rotation', text: `Sliders or numbers, ${LIMITS.deviceScale[0] * 100}–${LIMITS.deviceScale[1] * 100}% scale and ±180° rotation, plus Reset.` },
        { icon: 'table-cells', title: 'Feature strip', text: `Up to ${LIMITS.maxFeatures} short chips at the bottom, top or centre, with an adjustable size.` },
        { icon: 'mobile-screen', title: 'Frame and custom frame', text: `Choose ${names(DEVICES)}, or upload a PNG frame with a transparent screen area to replace the built-in one.` },
        { icon: 'palette', title: 'Color theme', text: `${Object.keys(THEMES).length} themes (${names(THEMES)}). They recolor accents and, unless you picked your own colors, the background.` },
      ] },
      { title: 'Whole project (right panel)', items: [
        { icon: 'floppy-disk', title: 'Save and open projects', text: 'Save project downloads one .zip with every setting and your original images. Open project restores it all. Opening replaces the current project.' },
        { icon: 'download', title: 'Export', text: `Exact-size PNGs: one screen or a ZIP of all. You get a warning if a file is over ${maxMB} MB, the Play Store limit.` },
        { icon: 'mobile-screen', title: 'Asset type', text: `${names(ASSET_TYPES)}. TV Banner and Daydream have fixed sizes and their own layouts.` },
        { icon: 'crop-simple', title: 'Custom canvas size', text: `Any width and height from ${CANVAS_LIMITS.minSide} to ${CANVAS_LIMITS.maxSide} px. The Play Store row shows whether the size is compliant (${PLAY_STORE.minSide}–${PLAY_STORE.maxSide} px, ratio up to ${PLAY_STORE.maxRatio}:1).` },
        { icon: 'droplet', title: 'Watermark', text: 'One text for every screen and export. Toggle it off any time.' },
        { icon: 'fill-drip', title: 'Background', text: 'Gradient, solid, mesh glow or your own image, plus the top strip, shapes and grain. The ↺ button returns a color to the theme.' },
        { icon: 'circle-check', title: 'Play Store guide', text: 'Live checks for size, ratio, file size and screen count.' },
      ] },
      { title: 'Layout', items: [
        { icon: 'table-columns', title: 'Resize panels (desktop)', text: 'Drag the thin divider next to a panel. Double-click it to reset.' },
        { icon: 'tablet-screen-button', title: 'Tablet', text: 'The Export button at the top right of the canvas opens the right panel as a drawer. Tap outside it or press Esc to close.' },
        { icon: 'mobile-screen', title: 'Phone', text: 'Use the Edit, Preview and Export tabs at the bottom. The preview always scales to fit the screen.' },
      ] },
    ],
  },
  {
    id: 'shortcuts', label: 'Shortcuts', icon: 'keyboard',
    groups: [
      { title: 'General', items: [
        { keys: [['?']], text: 'Open this help' },
        { keys: [['Esc']], text: 'Close a dialog, menu or the export drawer; deselect the selected overlay' },
      ] },
      { title: 'Selected overlay (badge, award, popup)', items: [
        { keys: [['Delete'], ['Backspace']], text: 'Remove it' },
        { keys: [['← ↑ → ↓']], text: `Nudge it ${KEYBOARD.nudge} px` },
        { keys: [['Shift', '← ↑ → ↓']], text: `Nudge it ${KEYBOARD.nudgeLarge} px` },
      ] },
      { title: 'Mouse and touch', items: [
        { keys: [['Drag']], text: 'Move the device, headline or an overlay' },
        { keys: [['Drag handle']], text: 'Bottom-right handle scales, orange top-right handle rotates' },
        { keys: [['Click']], text: 'Select an overlay; click empty canvas to deselect' },
        { keys: [['Drop file']], text: 'Drop an image onto any upload box' },
      ] },
      { title: 'Menus, screens and panels', items: [
        { keys: [['Tab']], text: 'Move between controls, thumbnails and menu buttons' },
        { keys: [['Enter'], ['Space']], text: 'Select a screen or activate a button' },
        { keys: [['↑ ↓']], text: 'Move through the screen menu' },
        { keys: [['← →']], text: `On a focused panel divider: resize by ${KEYBOARD.panelStep} px` },
        { keys: [['Double-click']], text: 'On a panel divider: reset its width' },
      ] },
    ],
  },
]
