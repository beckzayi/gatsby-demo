import data from '../../data/api.json';
import OpenAPISnippet from 'openapi-snippet';

/**
 * Programming languages for code snippet. To find more, go to the package openapi-snippet.
 */
export const languages = ['java', 'javascript', 'shell_curl', 'csharp_restsharp', 'php_curl', 'python_python3'];

/**
 * Generate code snippets from the OpenAPI document via a 3rd party package openapi-snippet
 * @param {string} url - the endpoint path, such as "/users/self"
 * @param {string} method - the request action, such as "get" and "post"
 * @return {Object} -
 */
export default function getCodeSnippets(url, method = 'get') {
    const openApi = data;
    const targets = languages;
    try {
        const results = OpenAPISnippet.getEndpointSnippets(openApi, url, method, targets);
        return results;
    } catch (err) {
        throw new Error(err);
    }
}
