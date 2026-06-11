"use client";
import { useAction } from "next-safe-action/hooks";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { toast } from "sonner";
import { commentCreateSchema } from "../schemas/comment-create";
import { createComment } from "../actions/create-comment";
import { useParams } from "next/navigation";

const CreateCommentForm = () => {
  const { execute, isExecuting, hasSucceeded, hasErrored } =
    useAction(createComment);

  const params = useParams();
  console.log(params);

  const form = useForm<z.infer<typeof commentCreateSchema>>({
    resolver: zodResolver(commentCreateSchema),
    defaultValues: {
      content: "",
      postId: params.id as string,
    },
  });

  async function onSubmit(data: z.infer<typeof commentCreateSchema>) {
    const { content, postId } = data;
    await execute({ content, postId });
  }

  useEffect(() => {
    if (hasSucceeded) {
      form.reset();
      toast.success("Your comment send.");
    }
    if (hasErrored) {
      toast.error("Your comment not send.");
    }
  }, [form, hasSucceeded, hasErrored]);

  return (
    <>
      <form
        id="form-rhf-demo"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3"
      >
        <FieldGroup>
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="relative w-full">
                  <InputGroupTextarea
                    {...field}
                    id="form-rhf-demo-description"
                    placeholder="Write a comment..."
                    rows={2}
                    className="min-h-10 pb-10 pr-14 resize-none rounded-2xl border border-muted bg-muted/30 focus:bg-background transition-colors text-sm py-2 px-4 w-full"
                    aria-invalid={fieldState.invalid}
                  />

                  <div className="absolute right-2 bottom-1">
                    <Button
                      type="submit"
                      disabled={isExecuting || !field.value?.trim()}
                      size="icon"
                      className="h-8 w-8 rounded-full flex items-center justify-center bg-primary text-primary-foreground hover:scale-105 transition-transform"
                    >
                      {isExecuting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4 ml-0.5" />
                      )}
                    </Button>
                  </div>
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
    </>
  );
};

export default CreateCommentForm;
