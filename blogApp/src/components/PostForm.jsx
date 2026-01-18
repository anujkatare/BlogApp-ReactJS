import React, {use, useCallback} from 'react'
import { useForm, Controller } from 'react-hook-form'
import {Button, Input, Select, RTE} from './index'
import appWriteService from '../appwrite/configDatabase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PostForm = () => {
    const {register, handleSubmit, watch, control, setValue, getValues} = useForm({
        defaultValues: {
            title: post?.title ||'',
            category:post?.category|| '',
            content:post?.content || 'active',
        }
    });
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user.userData);

    const submit = useCallback(async (data) => {
        if (post) {
            const file = data.image;
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                const uploadedFile = await appWriteService.uploadFile(formData);
                data.image = uploadedFile?.url;
            }
            await appWriteService.updatePost(post.$id, data);
        } else {
            const file = data.image;
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                const uploadedFile = await appWriteService.uploadFile(formData);
                data.image = uploadedFile?.url;
            }
            await appWriteService.createPost({...data, userId: userData?.$id});
        }
        navigate("/all-posts");
    }, [post, userData]);

  return (
    <div>PostForm</div>
  )
}

export default PostForm