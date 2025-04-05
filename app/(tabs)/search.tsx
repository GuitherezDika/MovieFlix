import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'

const Search = () => {
    const [searchQuery, setSearchQuery] = useState<string>('')
    const {
        data: movies,
        loading,
        error,
        refetch: loadMovies,
        reset
    } = useFetch(() => fetchMovies({
        query: searchQuery
    }), false);

    useEffect(() => {
        const func = async () => {
            if(searchQuery.trim()) {
                loadMovies()
            } else {
                reset()
            }
        }
        
        func();
    }, [searchQuery])
    return (
        <View className='flex-1 bg-primary'>
            <Image source={images.bg} className='flex-1 absolute w-full z-0' />

            <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                className='px-5'
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'center',
                    gap: 16,
                    marginVertical: 16
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                    <>
                        <View className='w-full flex-row justify-center my-20 items-center'>
                            <Image source={icons.logo} className='w-12 h-10' />
                        </View>
                        <View className='my-5'>
                            <SearchBar
                                placeholder='Search movies...'
                                value={searchQuery}
                                onChangeText={(text: string) => setSearchQuery(text)}
                            />
                        </View>
                        {loading && (
                            <ActivityIndicator size={'large'} color={'#0000ff'} className='my-3' />
                        )}
                        {error && (
                            <Text className='text-red-500 px-5 my-3'>
                                Error: {error.message}
                            </Text>
                        )}
                        {!loading && !error && 'SEARCH TERM'.trim()
                            && movies?.length > 0 && (
                                <Text>Search Results for {' '}
                                    <Text className='text-accent'>{searchQuery}</Text>
                                </Text>
                            )}
                    </>
                }
            />
        </View>
    )
}

export default Search

const styles = StyleSheet.create({})