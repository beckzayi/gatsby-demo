const listPages = (pathObj, url) => {
    // Group get and post objects into the same request url, and push it to an array.
    const arrayOfPages = [];

    const actions = ['get', 'post', 'put', 'delete'];

    Object.keys(pathObj).forEach((key) => {
        if (actions.includes(key)) {
            const page = { ...pathObj[key] };
            page.method = key;
            page.slug = `${page.operationId}/${key}`;
            page.url = url;
            arrayOfPages.push(page);
        }
    });

    return arrayOfPages;
};

module.exports = listPages;
