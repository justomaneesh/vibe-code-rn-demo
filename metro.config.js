const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Custom resolver: when a module inside @react-navigation/core requests a
 * relative path (e.g. ./usePreventRemove.js), resolve it to the physical file
 * so Metro can find it. Fixes "Unable to resolve module ./usePreventRemove.js".
 */
function resolveRequest(context, moduleName, platform) {
  const { originModulePath } = context;
  if (
    originModulePath &&
    originModulePath.includes('@react-navigation' + path.sep + 'core') &&
    (moduleName.startsWith('./') || moduleName.startsWith('../'))
  ) {
    const dir = path.dirname(originModulePath);
    let candidate = path.join(dir, moduleName);
    const ext = path.extname(candidate);
    const lookup = context.fileSystemLookup(candidate);
    if (lookup.exists && lookup.type === 'f') {
      return { type: 'sourceFile', filePath: lookup.realPath };
    }
    if (!ext) {
      const withJs = candidate + '.js';
      const lookupJs = context.fileSystemLookup(withJs);
      if (lookupJs.exists && lookupJs.type === 'f') {
        return { type: 'sourceFile', filePath: lookupJs.realPath };
      }
    }
  }
  return context.resolveRequest(context, moduleName, platform);
}

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    resolverMainFields: ['react-native', 'browser', 'main'],
    unstable_enablePackageExports: false,
    resolveRequest,
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
