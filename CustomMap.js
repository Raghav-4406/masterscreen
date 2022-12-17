import {
    Box,
    Flex,
    // HStack, 
    // IconButton,
    Input,
    // Text,
    SkeletonText,

} from '@chakra-ui/react'


import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete
} from '@react-google-maps/api'
import { useRef, useState } from 'react'
// import{ FaLocationArrow} from 'react-icons'


const center = { lat: 48.8584, lng: 2.2945 }

function CustomMap() {


    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyCjsribgsyojBFAhPMvopDaJ1BqT01UqNQ",
        libraries: ['places'],
    })


    const [map, setMap] = useState( /**@type google.maps.Map */(null))


    const SearchRef = useRef()





    if (!isLoaded) {
        return <SkeletonText />
    }


    // function  GoogleMap(){
    //     if(SearchRef.current.value === ''||)
    // }

    return (
        <Flex
            position='relative'
            flexDirection='column'
            alignItems='center'
            h='96vh'
            w='100vw'
        // referrerpolicy="no-referrer-when-downgrade"
        >
            <Box position='absolute' left={0} top={0} h='100%' w='100%'>
                {/*Google map box*/}
                <GoogleMap
                    center={center}
                    zoom={14}
                    mapContainerStyle={{ width: '50vw', height: '100vh' }}
                    options={{
                        zoomControl: true,
                        streetViewControl: true,
                        mapTypeControl: true,
                        fullscreenControl: true,

                    }}
                    onLoad={(map) => setMap(map)}
                >
                    <Marker position={center}
                    />
                    </GoogleMap>

                    {/* Displaying markers,or direction*/}
               
            </Box>

            <Box
                p={1}
                borderRadius='lg'
                mt={2}
                bgColor='white'
                marginLeft='-40%'
                // shadow='base'
                // minW='container.md'
                zIndex='1'
            // color='white'
            // backgroundColor='black'
            >               
                    <Autocomplete>
                        <Input type='text' placeholder='Search' ref={SearchRef} /> 
                        </Autocomplete>                                                                                    
                                
            </Box>          
        </Flex>
       
    )
}

export default CustomMap







