"use client";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteComment } from "../actions/delete-comment";

type CommentDeleteProps = {
  id: string;
};
const CommentDeleteButton = ({ id }: CommentDeleteProps) => {
  const { isPending, execute, hasErrored, hasSucceeded } =
    useAction(deleteComment);
  const router = useRouter();

  useEffect(() => {
    if (hasSucceeded) {
      toast.success("Comment deleted successfully");
    }
    if (hasErrored) {
      toast.error("Error deleting Comment");
    }
  }, [hasSucceeded, hasErrored, router]);

  return (
    <CardFooter>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolute sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              post and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={() => execute({ commentId: id })}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CardFooter>
  );
};

export default CommentDeleteButton;
