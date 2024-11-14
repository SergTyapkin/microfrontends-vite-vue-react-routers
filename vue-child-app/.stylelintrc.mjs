import { propertyGroups } from 'stylelint-config-clean-order';

const propertiesOrder = propertyGroups.map(properties => ({
  noEmptyLineBetween: true,
  emptyLineBefore: 'never', // Don't add empty lines between order groups.
  properties,
}));

/** @type {import('stylelint').Config} */
export default {
  plugins: ['stylelint-order'],
  extends: ['stylelint-stylus/standard', 'stylelint-config-clean-order'],
  rules: {
    'order/properties-order': [
      propertiesOrder,
      {
        severity: 'warning',
        unspecified: 'bottomAlphabetical',
      },
    ],
  },
  overrides: [
    {
      files: ['*.css'],
      extends: ['stylelint-config-standard'],
    },
  ],
};
