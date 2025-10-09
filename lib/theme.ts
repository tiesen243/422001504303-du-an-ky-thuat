import type { ThemeConfig } from 'heroui-native'

export const shadcnTheme = {
  light: {
    colors: {
      // Base Colors
      background: 'hsl(223.8136 0% 100%)',
      foreground: 'hsl(223.8136 0% 3.9388%)',
      panel: 'hsl(223.8136 0% 100%)',

      muted: 'hsl(223.8136 0.0002% 96.0587%)',
      mutedForeground: 'hsl(223.8136 0% 45.1519%)',

      surface: 'hsl(223.8136 0% 100%)',
      surfaceForeground: 'hsl(223.8136 0% 3.9388%)',

      default: 'hsl(223.8136 0.0002% 96.0587%)',
      defaultForeground: 'hsl(223.8136 0% 9.0527%)',

      accent: 'hsl(223.8136 0.0002% 96.0587%)',
      accentForeground: 'hsl(223.8136 0% 9.0527%)',

      accentSoft: 'hsl(223.8136 0.0001% 89.8161%)',
      accentSoftForeground: 'hsl(223.8136 0% 9.0527%)',

      success: 'hsl(211.788 101.9718% 78.6759%)',
      successForeground: 'hsl(223.8136 0% 3.9388%)',

      warning: 'hsl(217.4076 91.3672% 59.5787%)',
      warningForeground: 'hsl(223.8136 0% 3.9388%)',

      danger: 'hsl(351.7303 123.6748% 40.5257%)',
      dangerForeground: 'hsl(223.8136 0% 100%)',

      surface1: 'hsl(223.8136 0% 100%)',
      surface2: 'hsl(223.8136 0.0002% 96.0587%)',
      surface3: 'hsl(223.8136 0.0001% 89.8161%)',

      border: 'hsl(223.8136 0.0001% 89.8161%)',
      divider: 'hsl(223.8136 0.0001% 89.8161%)',
      link: 'hsl(223.8136 0.0000% 63.0163%)',
    },
    borderRadius: {
      DEFAULT: '10px',
      panel: '8px',
      'panel-inner': '6px',
    },
    opacity: {
      disabled: 0.5,
    },
  },
  dark: {
    colors: {
      background: 'hsl(223.8136 0% 3.9388%)',
      foreground: 'hsl(223.8136 0.0004% 98.0256%)',
      panel: 'hsl(223.8136 0% 9.0527%)',

      muted: 'hsl(223.8136 0% 14.9382%)',
      mutedForeground: 'hsl(223.8136 0% 63.0163%)',

      surface: 'hsl(223.8136 0% 14.9382%)',
      surfaceForeground: 'hsl(223.8136 0.0004% 98.0256%)',

      default: 'hsl(223.8136 0% 9.0527%)',
      defaultForeground: 'hsl(223.8136 0.0004% 98.0256%)',

      accent: 'hsl(223.8136 0% 25.0471%)',
      accentForeground: 'hsl(223.8136 0.0004% 98.0256%)',

      accentSoft: 'hsl(223.8136 0% 14.9382%)',
      accentSoftForeground: 'hsl(223.8136 0.0004% 98.0256%)',

      success: 'hsl(211.788 101.9718% 78.6759%)',
      successForeground: 'hsl(223.8136 0.0004% 98.0256%)',

      warning: 'hsl(217.4076 91.3672% 59.5787%)',
      warningForeground: 'hsl(223.8136 0.0004% 98.0256%)',

      danger: 'hsl(358.7594 101.8439% 69.8357%)',
      dangerForeground: 'hsl(223.8136 0.0004% 98.0256%)',

      surface1: 'hsl(223.8136 0% 9.0527%)',
      surface2: 'hsl(223.8136 0% 14.9382%)',
      surface3: 'hsl(223.8136 0% 20.3885%)',

      border: 'hsl(223.8136 0% 15.5096%)',
      divider: 'hsl(223.8136 0% 20.3885%)',
      link: 'hsl(223.8136 0% 45.1519%)',
    },
    borderRadius: {
      DEFAULT: '10px',
      panel: '8px',
      'panel-inner': '6px',
    },
    opacity: {
      disabled: 0.5,
    },
  },
} satisfies ThemeConfig
