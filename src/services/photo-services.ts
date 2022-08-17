import { Photo } from "../models/photos"
import { db } from "../db/db"
import { ObjectId } from "mongodb"

interface PhotoServices {
updateLikes(id: string, inc: number): Promise<Photo>
createPhoto(photo: Photo): Promise<string>
//createComment(id: string, comment:string): Promise<Photo>
getAllPhotos():Promise<Photo[]>
}

const photosCollections = db.collection<Photo>('photos"')

export const getAllPhotos = async (): Promise<Photo[]> => {
    const photos = await photosCollections.find().toArray()

return photos;
}

export const createPhoto = async (photo: Photo): Promise<string> => {
    try {
        const res = await photosCollections.insertOne(photo)
        return res.insertedId.toString()
        
    } catch (error) {
       return "something went wrong" 
    }
} 

export const updateLikes = async (
    id: string, 
    inc: number = 1): Promise<Photo> => {
  const res = await photosCollections.findOneAndUpdate(
    {_id: new ObjectId(id)},
    { $inc: { Likes:inc }}
  )
  const updatedPhoto = res.value as Photo;
//   updatedPhoto.likes = inc 
  return updatedPhoto;
}


// export const createComment = async (id: string, comment: string): Promise<Photo>=> {

// }

export const photoServices: PhotoServices = { 
    getAllPhotos, 
    createPhoto, 
    updateLikes,
    // createComment

}