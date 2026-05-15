"use client";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deletePost } from "../actions/delete-post";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { postsPath } from "@/path";

type DeleteButtonProps = {
  id: string;
};
const DeleteButton = ({ id }: DeleteButtonProps) => {
  const { isPending, execute, hasErrored, hasSucceeded } =
    useAction(deletePost);
  const router = useRouter();

  useEffect(() => {
    if (hasSucceeded) {
      toast.success("Post deleted successfully");
      router.push(postsPath);
      router.refresh();
    }
    if (hasErrored) {
      toast.error("Error deleting post");
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
              onClick={() => execute({ id })}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CardFooter>
  );
};

export default DeleteButton;
