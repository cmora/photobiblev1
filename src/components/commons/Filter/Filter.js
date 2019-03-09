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
} from 'react-native-color-matrix-image-filters';

class Filter extends React.Component {

	getFilterComponent() {
		const { children, name } = this.props;
    switch (name) {
      case 'Grayscale':
        return <Grayscale>{children}</Grayscale>;

      case 'Sepia':
        return <Sepia>{children}</Sepia>;

      case 'Tint':
        return <Tint>{children}</Tint>;

      case 'ColorMatrix':
        return (
          <ColorMatrix
            matrix={concatColorMatrices([saturate(-0.9), contrast(5.2), invert()])}
          >
            {children}
          </ColorMatrix>
        );
			
			case 'Technicolor':
        return <Technicolor>{children}</Technicolor>;

      case 'Kodachrome':
        return <Kodachrome>{children}</Kodachrome>;
			
			case 'Polaroid':
        return <Polaroid>{children}</Polaroid>;

      case 'Browni':
        return <Browni>{children}</Browni>;

      case 'Vintage':
        return <Vintage>{children}</Vintage>;
			
			case 'Night':
        return <Night>{children}</Night>;
      
      case 'Original':
        return <View>{children}</View>;

      default:
        return <View>{children}</View>;
    }
	}
	
  render() {
    return this.getFilterComponent();
  }
}

export default Filter;
