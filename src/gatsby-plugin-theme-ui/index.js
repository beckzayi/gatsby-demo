import prism from '@theme-ui/prism/presets/theme-ui';

export default {
    colors: {
        text: '#020a2c',
        background: '#ffffff',
        primary: '#48a383',
        secondary: '#12af7f',
        muted: '#f6f6f6',
        highlight: '#efeffe',
        gray: '#b9bccb',
        accent: '#5864fe',
        darken: 'rgba(0, 0, 0, .25)',
    },
    fonts: {
        body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        heading: 'inherit',
        monospace: 'Menlo, monospace',
    },
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
    fontWeights: {
        body: 400,
        heading: 800,
        bold: 700,
        display: 800,
    },
    lineHeights: {
        body: 1.5,
        heading: 1.25,
    },
    sizes: {
        sidebar: 256,
        container: 1024,
    },
    text: {
        heading: {
            fontFamily: 'heading',
            fontWeight: 'heading',
            lineHeight: 'heading',
        },
        display: {
            variant: 'text.heading',
            fontSize: [5, 6],
            fontWeight: 'display',
            letterSpacing: '-0.03em',
            mt: 3,
        },
        caps: {
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
        },
    },
    buttons: {
        primary: {
            color: 'background',
            bg: 'primary',
            fontWeight: 'bold',
        },
        secondary: {
            variant: 'buttons.primary',
            color: 'background',
            bg: 'secondary',
        },
        black: {
            fontWeight: 'bold',
            color: 'background',
            bg: 'text',
            '&:hover, &:focus': {
                bg: 'primary',
            },
        },
    },
    links: {
        button: {
            display: 'inline-block',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: 2,
            p: 3,
            color: 'background',
            bg: 'text',
            borderRadius: 6,
            '&:hover, &:focus': {
                color: 'background',
                bg: 'primary',
            },
        },
        nav: {
            display: 'block',
            width: '100%',
            px: 2,
            py: 2,
            color: 'inherit',
            textDecoration: 'none',
            fontSize: 1,
            fontWeight: 'bold',
            bg: 'transparent',
            transitionProperty: 'background-color',
            transitionTimingFunction: 'ease-out',
            transitionDuration: '.2s',
            borderRadius: 2,
            '&:hover': {
                bg: 'highlight',
            },
            '&.active': {
                color: 'primary',
                bg: 'highlight',
            },
        },
    },
    forms: {
        label: {
            fontSize: 1,
            fontWeight: 'bold',
        },
        input: {
            borderColor: 'gray',
            '&:focus': {
                borderColor: 'primary',
                boxShadow: (t) => `0 0 0 2px ${t.colors.primary}`,
                outline: 'none',
            },
        },
        select: {
            borderColor: 'gray',
            '&:focus': {
                borderColor: 'primary',
                boxShadow: (t) => `0 0 0 2px ${t.colors.primary}`,
                outline: 'none',
            },
        },
        textarea: {
            borderColor: 'gray',
            '&:focus': {
                borderColor: 'primary',
                boxShadow: (t) => `0 0 0 2px ${t.colors.primary}`,
                outline: 'none',
            },
        },
        slider: {
            bg: 'muted',
        },
    },
    alerts: {
        primary: {
            color: 'background',
        },
        secondary: {
            color: 'background',
            bg: 'secondary',
        },
        accent: {
            color: 'background',
            bg: 'accent',
        },
        highlight: {
            color: 'text',
            bg: 'highlight',
        },
    },
    layout: {
        container: {
            p: 3,
            maxWidth: 1024,
        },
    },
    styles: {
        root: {
            margin: 0,
            fontFamily: 'body',
            lineHeight: 'body',
            fontWeight: 'body',
        },
        img: {
            maxWidth: '100%',
            height: 'auto',
        },
        h1: {
            variant: 'text.display',
        },
        h2: {
            variant: 'text.heading',
            fontSize: 5,
        },
        h3: {
            variant: 'text.heading',
            fontSize: 4,
        },
        h4: {
            variant: 'text.heading',
            fontSize: 3,
        },
        h5: {
            variant: 'text.heading',
            fontSize: 2,
        },
        h6: {
            variant: 'text.heading',
            fontSize: 1,
        },
        a: {
            color: 'primary',
            '&:hover': {
                color: 'secondary',
            },
        },
        pre: {
            fontFamily: 'monospace',
            fontSize: 1,
            p: 3,
            color: 'text',
            bg: 'muted',
            overflow: 'auto',
            code: {
                color: 'inherit',
            },
            variant: 'prism',
        },
        code: {
            fontFamily: 'monospace',
            fontSize: 1,
        },
        inlineCode: {
            fontFamily: 'monospace',
            color: 'secondary',
            bg: 'muted',
        },
        table: {
            width: '100%',
            my: 4,
            borderCollapse: 'separate',
            borderSpacing: 0,
            [['th', 'td']]: {
                textAlign: 'left',
                py: '4px',
                pr: '4px',
                pl: 0,
                borderColor: 'muted',
                borderBottomStyle: 'solid',
            },
        },
        th: {
            verticalAlign: 'bottom',
            borderBottomWidth: '2px',
        },
        td: {
            verticalAlign: 'top',
            borderBottomWidth: '1px',
        },
        hr: {
            border: 0,
            borderBottom: '1px solid',
            borderColor: 'muted',
        },
        xray: {
            '*': {
                outline: '1px solid rgba(0, 192, 255, .25)',
            },
        },
        navlink: {
            display: 'inline-block',
            fontWeight: 'bold',
            color: 'inherit',
            textDecoration: 'none',
            ':hover,:focus': {
                color: 'primary',
            },
        },
    },
    prism,
};
