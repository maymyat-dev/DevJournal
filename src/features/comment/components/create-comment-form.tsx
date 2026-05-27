'use client'
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
import {
  InputGroup,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import CardWrapper from "../../../components/card-wrapper";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { toast } from "sonner";
import { commentCreateSchema } from "../schemas/comment-create";
import { createComment } from "../actions/create-comment";
import { useParams } from "next/navigation";

const CreateCommentForm = () => {
    const { execute, isExecuting, hasSucceeded, hasErrored } = useAction(createComment);
    
    const params = useParams();
    console.log(params)

  const form = useForm<z.infer<typeof commentCreateSchema>>({
    resolver: zodResolver(commentCreateSchema),
    defaultValues: {
        content: '',
        postId: params.id as string 
    },
  });

  async function onSubmit(data: z.infer<typeof commentCreateSchema>) {
    const { content, postId } = data;
    await execute({content, postId});
  }

  useEffect(() => {
    if (hasSucceeded) {
      form.reset()
      toast.success('Your comment send.')
    }
    if (hasErrored) {
      toast.error("Your comment not send.")
    }
  },[form, hasSucceeded, hasErrored])

  return (
    <CardWrapper
      title="Create new comment"
      description="This will be create a new comment for this post"
    >
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-description">
                  Comment
                </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id="form-rhf-demo-description"
                    placeholder="post description"
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>
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

export default CreateCommentForm;
