import data from '../../data/api.json';

export const objectToArray = (obj) => {
    const keys = Object.keys(obj);
    return keys.map((key) => obj[key]);
};

export const getComponentObject = (componentName) => {
    const { components } = data;
    return components.schemas[componentName];
};

export const PATH_PREFIX_DOCS = 'docs';
