'use client'
import { Input } from "@/components/ui/input";
import { createPost } from "@/features/posts/actions/create-post";
import { useAction } from "next-safe-action/hooks";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import CardWrapper from "../../../components/card-wrapper";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { toast } from "sonner";
import { postCreateSchema } from "../schemas/post-create-schema";
import RichTextEditor from "@/components/rich-text-editor";
import TagInput from "./tag-input";
import ImageUpload from "./image-upload";

const CreatePostForm = () => {
  const { execute, isExecuting, hasSucceeded, hasErrored } = useAction(createPost);

  const form = useForm<z.infer<typeof postCreateSchema>>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: {
      title: "",
      body: "",
      images: [],
      tags: [],
    },
  });

  async function onSubmit(data: z.infer<typeof postCreateSchema>) {
    const { title, body, images, tags } = data;
    await execute({title, body, images, tags});
  }

  useEffect(() => {
    if (hasSucceeded) {
      form.reset()
      toast.success('Post create successfully.')
    }
    if (hasErrored) {
      toast.error("Failed to create post")
    }
  },[form, hasSucceeded, hasErrored])

  return (
    <CardWrapper
      title="Create new post"
      description="This will be create a new post"
    >
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-title">Title</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="post title"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-description">
                  Content
                </FieldLabel>
                <RichTextEditor value={field.value} onChange={field.onChange}  />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="images"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-description">
                  Images
                </FieldLabel>
                <ImageUpload value={field.value || [] } onChange={field.onChange} max={4} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="tags"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-description">
                  Tags
                </FieldLabel>
                <TagInput value={field.value} onChange={field.onChange} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button className="w-full mt-5" type="submit" disabled={isExecuting}> Create</Button>
      </form>
    </CardWrapper>
  );
};

export default CreatePostForm;
