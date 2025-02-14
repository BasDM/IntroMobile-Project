const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname, { isCSSEnabled: true })

// Alias the Map component based on the platform.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'components/Map') {
    // Return the alias based on the platform.
    const alias = platform === 'web' ? './Map.web' : './Map.native';
    return context.resolveRequest(context, alias, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: './global.css' })
