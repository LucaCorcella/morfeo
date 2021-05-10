import { Theme } from '@morfeo/spec';
import { parsers, theme } from '../../src';
import { components } from '../../src/parsers/components';

const THEME: Theme = {
  colors: {
    primary: '#e3e3e3',
    secondary: '#000',
  },
  space: {
    m: '10px',
  },
  components: {
    Button: {
      style: {
        bg: 'primary',
        componentTag: 'button',
      },
      variants: {
        primary: {
          color: 'secondary',
        },
      },
    },
  },
} as any;

describe('components', () => {
  beforeAll(() => {
    theme.set(THEME);
  });
  afterAll(() => {
    theme.reset();
  });

  test('should hide the attribute `componentTag` from the generated style', () => {
    const result = components({
      property: 'componentName',
      value: 'Button',
    });
    expect((result as any).componentTag).not.toBeDefined();
  });

  test('should return the default components style', () => {
    const result = components({
      property: 'componentName',
      value: 'Button',
    });
    expect(result).toEqual({ backgroundColor: '#e3e3e3' });
  });

  test('should return an empty object if the component does not exist', () => {
    const result = components({
      property: 'componentName',
      value: 'Not Found' as any,
    });
    expect(result).toEqual({});
  });

  test('should return an empty object if the componentName is not specified', () => {
    const result = components({
      property: 'componentName',
    } as any);
    expect(result).toEqual({});
  });

  test('should take the style of the component from the theme', () => {
    const result = parsers.resolve({
      style: { componentName: 'Button' },
    });
    expect(result).toEqual({ backgroundColor: '#e3e3e3' });
  });

  test('should merge the base component style with the variant primary', () => {
    const result = parsers.resolve({
      style: { componentName: 'Button', variant: 'primary' },
    });
    expect(result).toEqual({ backgroundColor: '#e3e3e3', color: '#000' });
  });

  test('should merge the base component style with rest of the style', () => {
    const result = parsers.resolve({
      style: { componentName: 'Button', p: 'm' },
    });
    expect(result).toEqual({ backgroundColor: '#e3e3e3', padding: '10px' });
  });

  test('should override the base component style with rest of the style', () => {
    const result = parsers.resolve({
      style: { bg: 'secondary', componentName: 'Button' },
    });
    expect(result).toEqual({ backgroundColor: '#000' });
  });

  test('should extends the style of another component', () => {
    theme.set({
      ...THEME,
      components: {
        ...THEME.components,
        Typography: {
          style: {
            componentName: 'Button',
            color: 'secondary',
          },
        },
      },
    });
    const result = parsers.resolve({
      style: { componentName: 'Typography' },
    });
    expect(result).toEqual({ color: '#000', backgroundColor: '#e3e3e3' });
  });
});
