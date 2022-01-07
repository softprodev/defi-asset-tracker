import React from 'react';
import Link from 'next/link';
import { Box, Avatar, Heading, Flex, Tooltip, Divider, Badge, Text, AvatarBadge, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { styleConstants } from '../theme';
import nookies from 'nookies'
import { decode } from 'js-base64'

const HeaderBox = styled(Box)`
    background-color: ${styleConstants.background};
    display: flex;
    justify-content: space-between;
    min-height: ${styleConstants.headerHeight};
    padding: ${styleConstants.paddingWrapper};
    position: fixed;
    top: 0;
    z-index: ${styleConstants.topZindex};
`;

const HeaderDefault = styled(HeaderBox)`
    background-color: white;
    border-bottom: 1px solid #dddddd;
`;

export const HeaderElement: React.FC = () => {
    const [profile, setProfile] = React.useState<string>('')
    const [hasProfile, setHasProfile] = React.useState<boolean>(false)

    React.useEffect(() => {
        const cookies = nookies.get(null)
        const profile = cookies["__app.user"]
        if (profile) {
            setProfile(decode(profile))
            setHasProfile(true)
        }

    }, []);

    return (
        <>
            <Link href="/">
                <Heading
                    as="h1"
                    cursor="pointer"
                    bgGradient="linear(to-l, #07522c,#FF0080)"
                    bgClip="text"
                    letterSpacing="0.2rem" fontFamily="Dosis" size="sm">ALXSERI</Heading>
            </Link>

            {hasProfile &&
                <Stack isInline alignItems="center" justifyContent="flex-end" width="130px">
                    <Tooltip bg="green.600" hasArrow label={profile} placement="bottom">
                        <Avatar cursor="pointer" name={profile} size="sm">
                            <AvatarBadge p={1} bg="green.500" />
                        </Avatar>
                    </Tooltip>

                    <Link href="/logout">
                        <Badge
                            _hover={{
                                opacity: '0.7'
                            }}
                            cursor="pointer"
                            fontSize=".85rem"
                            colorScheme="red">Logout</Badge>
                    </Link>
                </Stack>
            }
        </>
    );
};

export const Header: React.FC<{ isDefault?: boolean; isBordered?: boolean }> = ({
    isDefault,
    isBordered,
}): JSX.Element => {

    return (
        <header>
            {isDefault ? (
                <HeaderDefault display="flex" bg="white" width="100%" alignItems="center">
                    <HeaderElement name="Fibonnaci Couture" />
                </HeaderDefault>
            ) : (
                    <HeaderBox
                        display="flex"
                        borderBottom={isBordered ? '1px solid #dddddd' : 'none'}
                        width="100%"
                        alignItems="center"
                    >
                        <HeaderElement name="Fibonnaci Couture" />
                    </HeaderBox>
                )}
        </header>
    );
};

export const FormPageHeader: React.FC<{ formHeading: string; formSubHeading?: string }> = (props): JSX.Element => {
    const { formHeading, formSubHeading } = props;
    return (
        <React.Fragment>
            <Heading as="h3" fontWeight="500" size="lg">
                {formHeading}
            </Heading>
            {formSubHeading && (
                <Flex my="2" mb={4} justifyContent="flex-start">
                    <Text fontSize="sm">{formSubHeading}</Text>
                </Flex>
            )}
            <Divider mb={12} pb={2} />
        </React.Fragment>
    );
};