const formatPage = (pathObj, url) => {
    const { get: getObj, post: postObj } = pathObj;

    // Group get and post objects into the same request url, and push it to an array.
    const arrayOfPages = [];
    let page;

    if (getObj) {
        page = getObj;
        page.method = 'get';
        page.slug = `${page.operationId}/${page.method}`;
        page.url = url;
        arrayOfPages.push(page);
    }

    if (postObj) {
        page = postObj;
        page.method = 'post';
        page.slug = `${page.operationId}/${page.method}`;
        page.url = url;
        arrayOfPages.push(page);
    }

    return arrayOfPages;
}

module.exports = formatPage;