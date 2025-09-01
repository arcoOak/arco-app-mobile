
// Variables base para light y dark mode
// Uso: import { light, dark } from './VariablesBase.styles';

export const light = {
	// Brand
	colorBrandPrimary: '#4070f4',
	colorBrandPrimaryLight: '#e2e2fb',
	colorBrandSecondary: '#0984e3',
	// Text
	colorTextPrimary: '#1F2936',
	colorTextSecondary: '#4B5563',
	colorTextTertiary: '#6B7280',
	colorTextContrast: '#FFFFFF',
	colorTextPlaceholder: '#798EAE',
	colorTextBrand: '#4070f4',
	// Surface / Background
	colorSurfacePrimary: '#f9fafb',
	colorSurfaceSecondary: '#ECECFD',
	colorSurfaceTertiary: '#FFFFFF',
	colorSurfaceContrast: '#1F2936',
	colorSurfaceOverlay: 'rgba(0,0,0,0.5)',
	// Borders
	colorBorderPrimary: '#E2E8F0',
	colorBorderSecondary: '#3B475C',
	colorBorderTertiary: '#CBD5E1',
	colorBorderInteractive: '#4070f4',
	// Semantic
	colorSuccess: '#28a745',
	colorSuccessBg: '#d1e7dd',
	colorWarning: '#ffc107',
	colorWarningBg: '#fff3cd',
	colorDanger: '#dc3545',
	colorDangerBg: '#f8d7da',
	colorInfo: '#0dcaf0',
	colorInfoBg: '#cff4fc',
	// Neutral
	colorWhite: '#FFFFFF',
	colorBlack: '#000000',
	colorTransparent: 'transparent',
	colorActive: '#007bff',
	colorBorderActive: '#0056b3',
	// Botones
	colorButtonPrimary: '#4070f4',
	colorButtonSecondary: '#0984e3',
	colorButtonTertiary: '#74b9ff',
	colorButtonNeutral: '#b2bec3',
	colorButtonVolver: '#0984e3',
	colorTextButtonPrimary: '#FFFFFF',
	colorTextButtonSecondary: '#FFFFFF',
	colorTextButtonTertiary: '#FFFFFF',
	colorTextButtonNeutral: '#2d3436',
	// Tipografía
	fontFamilySans: 'Poppins',
	fontSizeXs: 12,
	fontSizeSm: 14,
	fontSizeBase: 16,
	fontSizeMd: 18,
	fontSizeLg: 20,
	fontSizeXl: 24,
	fontSizeXxl: 32,
	fontWeightRegular: '400',
	fontWeightMedium: '500',
	fontWeightSemibold: '600',
	fontWeightBold: '700',
	// Espaciado
	spacingXs: 4,
	spacingSm: 8,
	spacingMd: 16,
	spacingLg: 24,
	spacingXl: 32,
	spacingXxl: 48,
	// Bordes y Sombras
	borderRadiusSm: 4,
	borderRadiusMd: 8,
	borderRadiusLg: 16,
	borderRadiusPill: 50,
	borderRadiusFull: 9999,
	borderColor: '#E2E8F0',
	shadowSm: '0 1px 2px 0 rgba(0,0,0,0.05)',
	shadowMd: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
	shadowLg: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
	shadowInset: 'inset 0 1px 3px rgba(0,0,0,0.05)',
	// Transiciones y Layout
	transitionDuration: 0.3,
	transitionTiming: 'ease-in-out',
	gridGutterX: 24, // 1.5rem aprox
	// Variables específicas de componentes
	footerHeight: 70,
	headerHeight: 70,
	footerIndicatorBorder: 6,
	backgroundImageLight: "../img/background_domex_light.webp",
	backgroundImageDark: "../img/background_domex_dark.webp",
	reservaBgGradient: 'linear-gradient(180deg, #f9fafb 0%, #f9fafb 100%)',
};

export const dark = {
	...light,
	// Brand
	colorBrandPrimaryLight: '#48566a',
	// Text
	colorTextPrimary: '#F1F5F9',
	colorTextSecondary: '#A6B7D2',
	colorTextTertiary: '#BAC8E0',
	colorTextPlaceholder: '#A6B7D2',
	// Surface / Background
	colorSurfacePrimary: '#111827',
	colorSurfaceSecondary: '#1f2937',
	colorSurfaceTertiary: '#3D4859',
	colorSurfaceOverlay: 'rgba(0,0,0,0.85)',
	// Borders
	colorBorderPrimary: '#3B475C',
	colorBorderSecondary: '#3B475C',
	// Semantic
	colorSuccess: '#198754',
	colorSuccessBg: '#0e2d1a',
	colorWarningBg: '#332701',
	colorDangerBg: '#4a1116',
	colorInfoBg: '#05313a',
	// Sombras
	shadowSm: '0 1px 2px 0 rgba(0,0,0,0.2)',
	shadowMd: '0 4px 6px -1px rgba(0,0,0,0.3), 0 2px 4px -2px rgba(0,0,0,0.2)',
	shadowLg: '0 10px 15px -3px rgba(0,0,0,0.4), 0 4px 6px -4px rgba(0,0,0,0.3)',
	// Componentes
	reservaBgGradient: 'linear-gradient(180deg, rgba(31,41,55,1) 0%, rgba(31,41,55,0.5) 100%)',
	// Botones
	colorButtonPrimary: '#111827',
	colorButtonSecondary: '#1f2937',
	colorButtonTertiary: '#3D4859',
	colorButtonVolver: '#111827',
};
