"use client";
import { updateCurrentBalance } from "@/app/actions/crud-milestone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

const initialState = { success: false };

export default function SavingsButton({ id }: { id: string }) {
  const [openInput, setOpenInput] = useState(false);
  const [amount, setAmount] = useState("");

  const [state, formAction, isPending] = useActionState(
    updateCurrentBalance,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpenInput(false);
      setAmount("");
    }
  }, [state.success]);

  return (
    <div className="p-4 space-y-3 mt-auto">
      {openInput && (
        <form
          action={formAction}
          className="flex gap-2 bg-muted/40 p-2 rounded-xl"
        >
          <input type="hidden" name="id" value={id} />

          <Input
            name="amount"
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="h-12 text-lg"
          />

          <Button type="submit" disabled={isPending} className="h-12 px-6">
            {isPending ? "Saving..." : "Add"}
          </Button>
        </form>
      )}

      {!openInput ? (
        <Button
          onClick={() => setOpenInput(true)}
          className="w-full h-12 gap-2"
        >
          <Plus size={18} />
          Tambah Tabungan
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={() => setOpenInput(false)}
          className="w-full h-12 gap-2"
        >
          <X size={18} />
          Batal
        </Button>
      )}
    </div>
  );
}
