import * as FileSystem from 'expo-file-system';

export async function SaveImage(uri: string): Promise<string> {
    const fileExtension = uri.split('.').pop();

    // Read the file content
    return FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 })
        .then((data) => {
        const imageData: string = data;
        const destination = `${FileSystem.documentDirectory}${new Date().getTime()}.${fileExtension}`;
        
        // Store the content of the image in the file system
        return FileSystem.writeAsStringAsync(
            destination,
            imageData,
            { encoding: FileSystem.EncodingType.Base64 }
        )
            .then(() => {
                return destination;
            })
            .catch((error) => {
                throw error;
            });
    })
        .catch((error) => {
            throw error;
        });
}

export async function LoadImage(picture: string): Promise<string> {
    // If the picture is not a file, return it (image from API)
    if (picture && !picture.startsWith("file://")) return picture;

    // Read the file content and return it
    return FileSystem.readAsStringAsync(picture, { encoding: FileSystem.EncodingType.Base64 }).then((data) => {
        return `data:image/jpeg;base64,${data}`;
    })
        .catch((error) => {            
            throw error;
        });
}