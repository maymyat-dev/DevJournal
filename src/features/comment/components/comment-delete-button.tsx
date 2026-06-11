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
import { Trash2 } from "lucide-react";

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
      toast.error("You can only delete your own comments.");
    }
  }, [hasSucceeded, hasErrored, router]);

  return (
    <CardFooter>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="icon" aria-label="Delete comment">
            <Trash2 className="h-4 w-4" />
          </Button>
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
