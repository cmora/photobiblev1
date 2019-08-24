import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import {
  Grayscale,
  Sepia,
  Tint,
  ColorMatrix,
  Polaroid,
  Technicolor,
	Kodachrome,
	Browni,
	Vintage,
  Night,
  concatColorMatrices,
  invert,
  contrast,
  saturate,
  Warm,
  Cool,
  Predator,
  Lsd,
  Protanomaly,
  Deuteranomaly,
  Tritanomaly,
  Deuteranopia,
  Tritanopia,
  Achromatopsia,
  Achromatomaly,
} from 'react-native-color-matrix-image-filters';

class Filter extends React.Component {

	getFilterComponent() {
    const { children, name, props } = this.props;
    switch (name) {
      case 'Grayscale':
        return <Grayscale {...props}>{children}</Grayscale>;

      case 'Sepia':
        return <Sepia {...props}>{children}</Sepia>;

      case 'Pink':
        return <Tint {...props}>{children}</Tint>;

      case 'ColorMatrix':
        return (
          <ColorMatrix
            matrix={concatColorMatrices([saturate(0.1), contrast(1.2)])}
          >
            {children}
          </ColorMatrix>
        );
			
			case 'Technicolor':
        return <Technicolor {...props}>{children}</Technicolor>;

      case 'Kodachrome':
        return <Kodachrome {...props}>{children}</Kodachrome>;
			
			case 'Polaroid':
        return <Polaroid {...props}>{children}</Polaroid>;

      case 'Browni':
        return <Browni {...props}>{children}</Browni>;

      case 'Vintage':
        return <Vintage {...props}>{children}</Vintage>;
			
			case 'Night':
        return <Night {...props}>{children}</Night>;
      
      case 'Warm':
        return <Warm {...props}>{children}</Warm>;
      
      case 'Cool':
        return <Cool {...props}>{children}</Cool>;
      
      case 'Predator':
        return <Predator {...props}>{children}</Predator>;
      
      case 'Lsd':
        return <Lsd {...props}>{children}</Lsd>;
      
      case 'Protanomaly':
        return <Protanomaly {...props}>{children}</Protanomaly>;
      
      case 'Deuteranomaly':
        return <Deuteranomaly {...props}>{children}</Deuteranomaly>;
      
      case 'Tritanomaly':
        return <Tritanomaly {...props}>{children}</Tritanomaly>;
      
      case 'Protanopia':
        return <Protanopia {...props}>{children}</Protanopia>;
      
      case 'Deuteranopia':
        return <Deuteranopia {...props}>{children}</Deuteranopia>;

      case 'Tritanopia':
        return <Tritanopia {...props}>{children}</Tritanopia>;

      case 'Achromatopsia':
        return <Achromatopsia {...props}>{children}</Achromatopsia>;

      case 'Achromatomaly':
        return <Achromatomaly {...props}>{children}</Achromatomaly>;
      
      case 'Original':
        return <View {...props}>{children}</View>;

      default:
        return <View>{children}</View>;
    }
	}
	
  render() {
    return this.getFilterComponent();
  }
}

export default Filter;
