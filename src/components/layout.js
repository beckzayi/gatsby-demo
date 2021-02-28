/** @jsx jsx */
import { jsx, Styled, Flex, Box } from 'theme-ui';
import Header from './header';

export default (props) => {
    return (
        <Styled.root>
            {/* <Head {...props} /> */}
            <Flex>
                <Box sx={{ px: 3 }}>
                    <Header />
                </Box>
                <Box sx={{ px: 3 }}>
                    <main
                        id="content"
                        sx={{
                            minWidth: 0,
                            mx: 'auto',
                            px: 3,
                        }}>
                        {props.children}
                    </main>
                </Box>
            </Flex>
        </Styled.root>
    );
};
