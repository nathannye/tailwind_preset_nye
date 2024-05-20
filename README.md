# Nye's Tailwind Config - Scalable Grids & Typography
A preset that scales all typography and provides grid classes that match Figma

> 🚨 This library is under active development and may not be production ready. It is strongly opiniated to how we work

<strong>Table of Contents</strong>
- [Fluid Typography](#typography)
- [Grid Devices](#grid-devices)
- [Grid Overlay](#grid-overlay)
- [Theming](#theming)
- [Extras](#extras)
<br/>

<strong>Upcoming Features</strong>
- [ ] Theming without `dark:` variants and configurable data attributes.
- [ ] Expand grid overlay visual settings to include filled columns, not just outlines

<br/>

## Fluid Typography {#typography}

#### Example config

```js
fontSize: {
  32: {
    size: 32,
    lineHeight: 1.25,
    letterSpacing: -0.022,
  },
  24: {
    size: 24,
    lineHeight: 1.4,
    letterSpacing: -0.022,
  },
  16: {
    size: 16,
    lineHeight: 1.5,
    letterSpacing: -0.022,
  },
  14: {
    size: 14,
    lineHeight: 1.42,
    letterSpacing: -0.022,
  },
},
```

<br/>

#### Usage

|property|description|default|type|
|:--------|:-------|:------|:-----|
|`size`| Pixel value of your font size, will be automatically converted to rems. | `null` | `number`
|`lineHeight`| Line height value, it will be a static px value, not a scaled rem value.| `.9` |`number`
|`letterSpacing`| Space between letters.| `-.03em` |`number`

<br/>

#### Settings
> ⚙️ Place all settings in your Tailwind config under `theme.fluidTypography`

|property|description|default|type|
|:--------|:-------|:------|:-----|
|`minFontSize`| In each `max()` function, what size should text never fall beneath to keep things readable. | `12` | `number`
|`minScalingFontSize`|If a text size is below the number provided here, it will be a static px value, not a scaled rem value.| `10`|`number`

<br/>
<br/>

## Grid 
This plugin creates grid classes that let you match Figma documents very closely. You can independently set `gutters`, `margins`, `sizes`, and `columns`.

<br/>

#### Usage
> Place all settings in your Tailwind config under `theme.gridOverlay`

<br/>

#### Grid Devices {#grid-devices}

> 🚨 WARNING: These `devices` settings add breakpoints, the `screens` property should not be used to override this. Use it to add others that do not require their own grid.

Speccing a grid for screen sizes. We recoMmend adding these exactly as-is from Figma into the format below:


|property|description|default|type|
|:--------|:-------|:------|:-----|
|`size`| Size of screen from Figma | `null` | `number`
|`columns`| Number of columns in pixels | `null`|`number`
|`gutter`| Width of gutter in pixels | `null`|`number`
|`margin`| Width of margin in pixels | `null`|`number`

<br/>

### Max Scaling Width
`maxScalingWidth: number` will disable scaling at a given screen width. Used best to not let text become HUGE on widescreen monitors

### Example Config

```js
maxScalingWidth: 1920
devices: {
  sm: {
    columns: 8,
    size: 390,
    gutter: 10,
    margin: 20
  },
  md: {
    columns: 8,
    size: 768,
    gutter: 16,
    margin: 16
  },
  lg: {
    columns: 18,
    size: 1024,
    gutter: 10,
    margin: 25
  }
}
```
<br/>

### Grid Classes
Using these devices, we generate a bunch of classes for you to use these measurements in CSS. All standard tailwind classes are still available but can be prefixed with `gutter`, `margin`, or `cols` to use measurements like below:

```css
/* Just a few examples, any Tailwind property can be used like this */
.margin-pr-1 {
  padding-right: calc(var(--margin) * 1);
}

.gutter-my-40 {
  margin-top: calc(var(--gutter) * 40);
  margin-bottom: calc(var(--gutter) * 40);
}

.cols-w-5 {
  width: calc((var(--column) * 5) + (var(--gutter) * 4));
}
```

<br/>

#### Column-specific Rules
Columns use both `var(--column)` and `var(--gutter)` to calculate their width. The `cols-` prefix also allows suffixes of `wide`,`wider`,`tight`, and `tighter` to modify the gutter value like so:

```css

/* Normal, unmodified class */
.cols-w-3 {
  width: calc((var(--column) * 3) + (var(--gutter) * 2));
}

/* +1 gutter */
.cols-w-3-wide {
  width: calc((var(--column) * 3) + (var(--gutter) * 3));
}

/* +2 gutters */
.cols-w-3-wider {
  width: calc((var(--column) * 3) + (var(--gutter) * 4));
}

/* -1 gutter */
.cols-w-3-tight {
  width: calc((var(--column) * 3) + (var(--gutter) * 1));
}

/* -2 gutters */
.cols-w-3-tighter {
  width: calc((var(--column) * 3) + (var(--gutter) * 0));
}
```

These suffixes come in handy when setting a width and you don't want to add `gutter-pr-1`, trust me.

<br/>

### Grid Utilities
The below css class is baked into our config, using it will lock an element when the max scaling width is reached.
```css
.grid-contain {
  max-width: 'var(--max-scaling)',
  margin-left: 'auto',
  margin-right: 'auto'
}
```

### Grid Overlay {#grid-overlay}
> ⚙️ These settings should be placed in `theme.gridOverlay`

An SVG background image on the `::before` pseudoelement of the `body` that will show an overlay of your grid on the page. It has a `display: var(--grid-visibility)` property where `var(--grid-visiblity)` is defaulted to `none`, to turn on the grid we recommend using a keypress listener to toggle this variable value to `block`.

<br/>

#### Example Config
```js
gridOverlay: {
  color: 'blue',
  opacity: 1,
  width: .5
}
```

<br/>

#### Settings
|property|description|default|type|
|:--------|:-------|:------|:-----|
|`color`| Color of grid lines, any hex, ockh, rgb, hsl, or css color is available here | `blue` | `color`
|`opacity`| opacity of grid lines| `1`|`number`
|`width`| Width of grid lines| `.5`|`pixels`

<br/>
<br/>

## Theming {#theming}
We prefer theming to be done with variables, specifying `dark:` or `light:` per element is ineffcient for us so we built our own:
</br>

### Usage
Supply colors like you normally would to tailwind but break them up into objects for each theme you want to create. As many themes as your heart desires, have at it.
> 🚨 Theming is only activated when Tailwind detects objects in the `colors` config, if you use normal string syntax, things will be business as usual, no themes.

```js
colors: {
  light: {
    primary: '#fff', 
    inverted: '#000', 
    accent: '#f0f'
  }, 
  dark: {
    primary: '#000', 
    inverted: '#fff', 
    accent: '#0f0'
  }, 
  otherThemeName: {
    primary: '#0f8', 
    inverted: '#0ff', 
    accent: '#f9f'
  }
}

```

</br>

### Settings
> These settings should be placed in `theme.themeConfig`
```js
themeConfig: {
  element: 'html',
  defaultTheme: 'light',
  dataAttribute: 'data-theme'
},

```

|property|description|value|default|
|:---|:----|:----|:----|
|`element`| Which element you will place your theme switching data attribute on (defined in `dataAttribute`). If you use `data-theme` on your `html` element, set html. Ids can be used as  `#yourElementId`, classes as `#yourClass`| `selector`|`html` 
|`defaultTheme`| Which theme is applied without having a theme selected?|`ThemeName`|First theme
|`dataAttribute`| Which data attribute will you used to change theme?. MUST be prefixed with `data-`|`string`|`data-theme`

</br>


## Extras {#extras}
We have a couple other useful utilities baked into the config that we use frequently, enjoy:


### Easing Values
We use preset easing values similar to js animation libraries:

```js
// In
'quad-in': 'cubic-bezier(0.26, 0, 0.6, 0.2)',
'cubic-in': 'cubic-bezier(0.4, 0, 0.68, 0.06)',
'quart-in': 'cubic-bezier(0.52, 0, 0.74, 0)',
'quint-in': 'cubic-bezier(0.64, 0, 0.78, 0)',
'sine-in': 'cubic-bezier(0.32, 0, 0.6, 0.36)',
'expo-in': 'cubic-bezier(0.66, 0, 0.86, 0)',
'circ-in': 'cubic-bezier(0.54, 0, 1, 0.44)',
'back-in': 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
// Out
'quad-out': 'cubic-bezier(0.4, 0.8, 0.74, 1)',
'cubic-out': 'cubic-bezier(0.34, 1.02, 0.68, 1)',
'quart-out': 'cubic-bezier(0.26, 1.04, 0.54, 1)',
'quint-out': 'cubic-bezier(0.22, 1.1, 0.48, 1)',
'sine-out': 'cubic-bezier(0.4, 0.64, 0.68, 1)',
'expo-out': 'cubic-bezier(0.16, 1.08, 0.38, 0.98)',
'circ-out': 'cubic-bezier(0, 0.56, 0.46, 1)',
'back-out': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
// In Out
'quad-inout': 'cubic-bezier(0.48, 0.04, 0.52, 0.96)',
'cubic-inout': 'cubic-bezier(0.66, 0, 0.34, 1)',
'quart-inout': 'cubic-bezier(0.77, 0, 0.175, 1)',
'quint-inout': 'cubic-bezier(0.84, 0, 0.16, 1)',
'sine-inout': 'cubic-bezier(0.36, 0, 0.64, 1)',
'expo-inout': 'cubic-bezier(0.9, 0, 0.1, 1)',
'circ-inout': 'cubic-bezier(0.88, 0.14, 0.12, 0.86)',
'back-inout': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
```

<br/>

### Additional Variants
|variant prefix| css|
|:---|:---|
|`not-first:`| `not:(:first-child)`|
|`not-last:`| `not:(:last-child)`|

<br/>

### `-max` Breakpoints
Any device you provide in your `devices` object will generate an `@media (min-width: [size])` breakpoint AND a `@media (max-width: [size])` breakpoint that can be used with `[deviceName]:max`.

<br/>

### Spacing
All spacing values get converted to rems automatically to keep scaling working.

<br/>

### Transition Duration
Values from `50` to `1000` are provided in increments of 50 ex: `50,100,150,200,...`

<br/>

### Hover where supported
This is enabled by default in our config, it wraps all `hover:` variants in `media (hover:hover)` so that hover effects don't apply on touch devices. Pretty nifty.

```js
  future: {
    hoverOnlyWhenSupported: true,
  },
```

<br/>

### Utilities
Just beacuse we use it all the time we have a `flex-center` class that expands to the following
```css
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

<br/>

### Z-Index
Having only `10,20,30...` we think is dumb so we added classes for `z-index` that go from -50 to 50 and can be used normally `z-38` without needing the arbitrary brackets.
