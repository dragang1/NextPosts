"use server";
import { uploadImage } from '@/lib/cloudinary';
import { storePost, updatePostLikeStatus } from '@/lib/posts';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export async function createPost(prevState, formData) {

    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');

    let errors = [];

    if (!title || title.trim().length === 0) {
        errors.push('Title is required.')
    }

    if (!image) {
        errors.push('Image is required.')

    }
    if (!content || content.trim().length === 0) {
        errors.push('Content is required.')

    }

    let imageUrl;
    try {

        imageUrl = await uploadImage(image);
    } catch (err) {
        throw new Error('Error uploading image.Please try again later.')
    }

    await storePost({
        imageUrl: imageUrl,
        title,
        content,
        userId: 1
    })

    redirect('/feed');
}

export async function toggleLikeButton(postId) {
    updatePostLikeStatus(postId, 2)
    revalidatePath('/feed')

}