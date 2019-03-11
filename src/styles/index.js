import Config from '../../config';
import { Fonts } from '../../src/utils/Fonts';

export const STYLES = {
    color: {
        gray: Config.BACK_COLOR,
        grayLight: '#44454b',
        primary: Config.PRIMARY_COLOR,
        text: Config.SECONDARY_COLOR,
    },
    fonts: {
        montserrat: Fonts.montserrat,
        montserratLight: Fonts.montserratLight,
        montserratBold: Fonts.montserratBold,
        montserratBlack: Fonts.montserratBlack,
    },
    shadows: {
        bottom: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: -2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        top: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
    }
}