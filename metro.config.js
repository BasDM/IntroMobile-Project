const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname, { isCSSEnabled: true })

// Alias the Map component based on the platform.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'components/Map') {
    return context.resolveRequest(
      context, 
      platform === 'web' ? './Map.web' : './Map.native', 
      platform
    );
  } else if (moduleName === 'components/LocationPicker') {
    return context.resolveRequest(
      context, 
      platform === 'web' ? './LocationPicker.web' : './LocationPicker.native', 
      platform
    );
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: './global.css' })
