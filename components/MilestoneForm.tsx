"use client";
import * as React from "react";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createMilestoneAction } from "@/app/actions/crud-milestone";

const initialState = { success: false };

export default function MilestoneForm() {
  const [date, setDate] = React.useState<Date>();
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [imgError, setImgError] = React.useState<string>("");
  const [state, formAction, isPending] = React.useActionState(
    createMilestoneAction,
    initialState
  );

  const MAX_SIZE = 2 * 1024 * 1024;
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const [file] = e.target.files;
      if (file.size > MAX_SIZE) {
        setImgError("Image size must be less than 2MB");
        e.target.value = "";
        return;
      }

      const newImageUrl = URL.createObjectURL(file);
      setImageUrl(newImageUrl);
      setImgError("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-14 rounded-xl text-foreground/70"
        >
          <Plus /> NEW TARGET
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form action={formAction} className="overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Target</DialogTitle>
            <DialogDescription>
              Make your dreams come true one by one
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="mt-4">
            <Field>
              <Label>Image</Label>
              <div>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                {imgError && (
                  <p className="text-red-500/70 text-sm">{imgError}</p>
                )}
              </div>
            </Field>
            <Field>
              <Label>Title</Label>
              <Input id="title" name="title" type="text" />
            </Field>
            <Field>
              <Label>Target Amount</Label>
              <Input
                id="targetAmount"
                type="number"
                min={0}
                name="targetAmount"
              />
            </Field>
            <Field>
              <Label>
                Description{" "}
                <span className="text-foreground/50">(Optional)</span>
              </Label>
              <Input id="description" name="description" type="text" />
            </Field>
            <Field>
              <Label>
                Due Date <span className="text-foreground/50">(Optional)</span>
              </Label>
              <Input
                type="hidden"
                name="dueDate"
                value={date ? date.toISOString() : ""}
                hidden
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!date}
                    className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                  >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </PopoverContent>
              </Popover>
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">{isPending ? "Saving..." : "Save"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
