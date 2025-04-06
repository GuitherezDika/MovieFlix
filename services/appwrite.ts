import { Client, Databases, ID, Query } from "react-native-appwrite"

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID;

const client = new Client()

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ? process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID : '')

const database = new Databases(client)

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', query)
        ])

        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];

            await database.updateDocument(
                DATABASE_ID ? DATABASE_ID : '',
                COLLECTION_ID ? COLLECTION_ID : '',
                existingMovie?.$id,
                {
                    count: existingMovie.count + 1
                }
            )
        } else {
            await database.createDocument(
                DATABASE_ID ? DATABASE_ID : '',
                COLLECTION_ID ? COLLECTION_ID : '',
                ID.unique(),
                {
                    searchTerm: query,
                    count: 1,
                    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    movie_id: movie.id ? movie.id : 0,
                    title: movie.title,
                }
            )
        }
    } catch (error) {
        console.log('appwrite failed = ', error);
        throw error;

    }
}