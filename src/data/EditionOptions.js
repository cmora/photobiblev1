const ICON_FONT = require('../../assets/images/icon-font.png');
const ICON_FONT_ACTIVE = require('../../assets/images/icon-font-active.png');
const ICON_COLOR = require('../../assets/images/icon-color.png');
const ICON_COLOR_ACTIVE = require('../../assets/images/icon-color-active.png');
const ICON_ADJUSTS = require('../../assets/images/icon-adjusts.png');
const ICON_ADJUSTS_ACTIVE = require('../../assets/images/icon-adjusts-active.png');
const ICON_SHADOW = require('../../assets/images/icon-shadow.png');
const ICON_SHADOW_ACTIVE = require('../../assets/images/icon-shadow-active.png');
const ICON_ERASE = require('../../assets/images/icon-erase.png');
const ICON_ERASE_ACTIVE = require('../../assets/images/icon-erase-active.png');

export const Options = [
	{
		"name": 'Fuente',
		"icon": ICON_FONT,
        "iconActive": ICON_FONT_ACTIVE,
        "isSelected": true,
    },
    {
		"name": 'Color',
		"icon": ICON_COLOR,
		"iconActive": ICON_COLOR_ACTIVE
    },
    {
		"name": 'Ajustes',
		"icon": ICON_ADJUSTS,
		"iconActive": ICON_ADJUSTS_ACTIVE
    },
    {
		"name": 'Sombra',
		"icon": ICON_SHADOW,
		"iconActive": ICON_SHADOW_ACTIVE
    },
    {
		"name": 'Borrar',
		"icon": ICON_ERASE,
		"iconActive": ICON_ERASE_ACTIVE
	}
];