import React, { useEffect, useContext, useState } from 'react';
import { Box, Heading, Text, HStack, FlatList, AspectRatio, Center, Stack, Image, Container, Button } from 'native-base';
import commonAPIService from '../axios-services/common-api-services';
import { ApiUrl } from '../api/BasicApi';
import { UserDetailContext } from '../context/UserContext';
import { ScreenNavigationProp } from '../../types';

interface IPost {
    userId: string | number,
    id: string | number,
    body: string,
    title: string
}
function Home({ navigation }:{ navigation: ScreenNavigationProp }) {
    const { userDetails, setIsLoggedIn} = useContext(UserDetailContext);
    const [posts, setPosts] = useState<IPost[]>();
    useEffect(() => {
        getPosts();
    }, []);
    const getPosts = () => {
        commonAPIService.get(ApiUrl.getPosts).then((res) => {
            setPosts(res.data);
        })
    }
    const logout = () => {
        setIsLoggedIn(false);
    }
    return (
        <Box p={2} flex={1}>
            <Box alignItems={"flex-end"}>
                <Button size={"md"} variant={"ghost"} colorScheme="secondary" onPress={logout}>Logout</Button>
            </Box>
            <Heading size={"md"} my={3}>
                <Text highlight _dark={{
                    color: "coolgray.800"
                }}>
                    Welcome
                </Text>
                {" "}{userDetails?.email}
            </Heading>
            <Box my={2} p={4}>
                <Heading size={"lg"}>
                    Your posts
                </Heading>
                <FlatList
                    data={posts?.slice(0, 5)}
                    renderItem={({ item }) => <Card item={{
                        ...item,
                        postBy: userDetails?.email
                    }} />}
                    horizontal={true}
                    keyExtractor={item => `${item.id}`}
                />
            </Box>
        </Box>
    );
}

export default Home;

const Card = ({
    item
}: {
    item: IPost & {
        postBy: string | undefined
    }
}) => {
    return <Box alignItems="center" m={2} py={2}>
        <Box maxW={"80"} height={"md"} rounded="lg" overflow="scroll" borderColor="coolGray.200" borderWidth="1" _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700"
        }} _web={{
            shadow: 2,
            borderWidth: 0
        }} _light={{
            backgroundColor: "gray.50"
        }}>
            <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                    <Image source={{
                        uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
                    }} alt="image" />
                </AspectRatio>
                <Center bg="violet.500" _dark={{
                    bg: "violet.400"
                }} _text={{
                    color: "warmGray.50",
                    fontWeight: "700",
                    fontSize: "xs"
                }} position="absolute" bottom="0" px="3" py="1.5">
                    {item?.id}
                </Center>
            </Box>
            <Container>
                <Stack p="4" space={3}>
                    <Stack space={2} >
                        <Heading size="md" ml="-1" isTruncated>
                            {item?.title}
                        </Heading>
                    </Stack>
                    <Text fontWeight="400">
                        {item.body}
                    </Text>
                    <HStack alignItems="center" space={4} justifyContent="space-between">
                        <HStack alignItems="center">
                            <Text color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }} fontWeight="400">
                                6 mins ago - by {item?.postBy}
                            </Text>
                        </HStack>
                    </HStack>
                </Stack>
            </Container>
        </Box>
    </Box>;
};