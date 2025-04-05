import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

type Props = {
    onChangeText?: (text: string) => void;
    onPress?: () => void;
    placeholder: string;
    value?: string;
}

const SearchBar = ({ onPress, placeholder, value, onChangeText }: Props) => {
    return (
        <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4' >
            <Image source={icons.search} className='size-5' resizeMode='contain' tintColor={'#ab8bff'} />
            <TextInput
                onPress={onPress}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor={'#a8b5db'}
                className='flex-1 ml-2 text-white'
            />
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({})