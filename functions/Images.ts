import * as FileSystem from 'expo-file-system';

export async function SaveImage(uri: string) {
    const fileExtension = uri.split('.').pop();

    let imageData: string;

    try {
        imageData = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    } catch (error) {
        console.error('Failed to read the file content:', error);
        return null;
    }

    const destination = `${FileSystem.documentDirectory}${new Date().getTime()}.${fileExtension}`;

    try {
        await FileSystem.writeAsStringAsync(
            destination,
            imageData,
            { encoding: FileSystem.EncodingType.Base64 }
        );
        return destination;
    } catch (error) {
        console.error('Failed to write the file:', error);
        return null;
    }
}

export async function LoadImage(picture: string): Promise<String> {
    try {
        if (picture && picture.startsWith("file://")) {
            const base64 = await FileSystem.readAsStringAsync(picture, { encoding: FileSystem.EncodingType.Base64 });
            return `data:image/jpeg;base64,${base64}`
        } else {
            return picture
        }
    } catch (error) {
        console.error("Error loading image:", error);
        return ''
    }
}