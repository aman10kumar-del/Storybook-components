const StyleDictionary = require('style-dictionary');

StyleDictionary.registerFormat({
  name: 'scss/number-custom',
  formatter: function({dictionary, options}) {
    const formatNumberToken = (token) => {
      let name = token.name;
      if (name.startsWith('number-primitives-')) {
        name = name.replace('number-primitives-', '');
      } 
      else if (name.startsWith('number-semantics-')) {
        name = name.replace('number-semantics-', '');
      }
      
      let value = token.value;
      if (options.outputReferences && dictionary.usesReference(token.original.value)) {
        value = dictionary.getReferences(token.original.value)[0].value;
      }
      if (typeof value === 'number') {
        value = `${value}px`;
      }
      
      return `$${name}: ${value};`;
    };

    return dictionary.allTokens
      .map(token => formatNumberToken(token))
      .join('\n');
  }
});

module.exports = {
  "source": ["./configs/**/*.json"],
  "platforms": {
    "scss": {
      "transformGroup": "scss",
      "buildPath": "./src/commonStyles/style-dictionary/",
      "files": [{
        "destination": "_colors.scss",
        "format": "scss/map-flat",
        "mapName": "colors",
        "filter": (token) => token.attributes.category === "color-semantics"
      },
      {
        "destination": "_typography.scss",
        "format": "scss/map-deep",
        "mapName": "typography",
        "filter": (token) => token.attributes.category === "typography"
      },
      {
        "destination": "_number.scss",
        "format": "scss/number-custom",
        "filter": (token) => token.attributes.category === "number-semantics" || token.attributes.category === "number-primitives",
        "options": {
          "outputReferences": true
        }
      }]
    },
    "scss-export": {
      "transformGroup": "scss",
      "buildPath": "./static/styles/",
      "files": [{
        "destination": "_colors.scss",
        "format": "scss/map-deep",
        "mapName": "colors",
        "filter": (token) => token.attributes.category === "color-semantics"
      },
      {
        "destination": "_typography.scss",
        "format": "scss/map-deep",
        "mapName": "typography",
        "filter": (token) => token.attributes.category === "typography"
      },
      {
        "destination": "_number.scss",
        "format": "scss/number-custom",
        "filter": (token) => token.attributes.category === "number-semantics" || token.attributes.category === "number-primitives",
        "options": {
          "outputReferences": true
        }
      }]
    }
  }
};